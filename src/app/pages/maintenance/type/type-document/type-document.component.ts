import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Breadcrumb, Pagination, PaginationResult, TypeDocument, TypeDocumentList } from 'src/app/core/models';
import { ResponseApi } from 'src/app/core/models/api/response-api.model';
import { TypeDocumentService } from 'src/app/core/services';
import { ApiErrorFormattingService, FormService, SweetAlertService } from 'src/app/core/services';
import { BehaviorSubject, Subscription, catchError, debounceTime, distinctUntilChanged, map, throwError } from 'rxjs';

@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  styleUrls: ['./type-document.component.scss']
})
export class TypeDocumentComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;

  dataModal = {
    title: 'Crear tipo de documento',
  }

  // bread crumb items
  titleBreadCrumb: string = 'Tipo de documentos';
  breadCrumbItems: Array<{}>;

  // FORM
  isNewData: boolean = true;
  typeDocumentForm!: FormGroup;
  submitted: boolean = false;


  // PAGINACIÓN
  countElements: number[] = [2, 5, 10, 25, 50, 100];
  pagination: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    page: 1,
    limit: 10,
    search: '',
    column: '',
    order: 'desc',
  });

  paginationResult: PaginationResult = new PaginationResult();

  // Table data
  // content?: any;
  lists?: TypeDocumentList[];

  private subscription: Subscription = new Subscription();

  constructor(
    private modalService: BsModalService,
    private _typeDocumentService: TypeDocumentService,
    private _formService: FormService,
    private _apiErrorFormattingService: ApiErrorFormattingService,
    private _sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = Breadcrumb.casts([{ label: 'Mantenimiento' }, { label: 'Man. de tipos' }, { label: 'Tipos de documentos', active: true }]);

    this.initForm();
    this.apiTypeDocumentListPagination()
    // this.listDataApi();

    this.subscription.add(
      this._typeDocumentService.typeDocuments$
        // .pipe(distinctUntilChanged())
        .pipe(
          distinctUntilChanged(
            (prevList, currentList) =>
              prevList.map(item => item._id).join(',') === currentList.map(item => item._id).join(',')
          )
        )
        .subscribe((list: TypeDocumentList[]) => {
          this.lists = list;
        })
    );

    // PAGINACIÓN
    this.subscription.add(
      this.pagination.asObservable()
        // .pipe(distinctUntilChanged())
        .subscribe((pagination: Pagination) => {
          this.apiTypeDocumentListPagination()
        })
    );


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




  /**
   * ***************************************************************
   * SERVER SIDE - USERS
   * ***************************************************************
   */
  apiTypeDocumentListPagination(): void {
    this.subscription.add(
      this._typeDocumentService.getPagination(this.pagination.getValue())
        .pipe(debounceTime(250))
        .subscribe((response: ResponseApi) => {
          if (response.code == 200) {
            this.paginationResult = PaginationResult.cast(response.data);
            this.lists = response.data.results;
          }

          if (response.code == 500) {
            if (response.errors) {
              this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
            }
          }
        }, (error: any) => {
          if (error.message) {
            this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al cargar usuarios', message: error.message, timer: 2500 });
          }
        })
    );
  }

  getPage(event: any) {
    const { page, itemsPerPage: limit } = event;
    this.pagination.next({...this.pagination.getValue(), page, limit})
    // this.pagination.value.page = page;
    // this.pagination.value.limit = itemsPerPage;
  }

  getPageRefresh(){
    this.pagination.next({...this.pagination.getValue(), page: 1, limit: 10})
  }


  /**
   * ****************************************************************
   * OPERACIONES CON LA API
   * ****************************************************************
   */
  public listDataApi(forceRefresh: boolean = false) {
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._typeDocumentService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        this.lists = response.data;
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }

  private saveDataApi(data: TypeDocument) {
    this._sweetAlertService.loadingUp()
    this.subscription.add(
      this._typeDocumentService.register(data).subscribe((response: ResponseApi) => {
        this._sweetAlertService.stop();
        if (response.code == 201) {
          const data = response.data[0];
          if (data) {
            const object: TypeDocumentList = TypeDocumentList.cast(data);
            this._typeDocumentService.addObjectObserver(object);
          }
          this.modalRef?.hide();
        }

        if (response.code == 422) {
          if (response.errors) {
            const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
            this._sweetAlertService.showTopEnd({ type: 'error', title: response.message, message: textErrors });
          }
        }

        if (response.code == 500) {
          if (response.errors) {
            this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
          }
        }
      }, (error) => {
        this._sweetAlertService.stop();
        console.log(error);
      })
    )
  }

  private updateDataApi(data: TypeDocument, id: any) {
    this._sweetAlertService.loadingUp()
    this._typeDocumentService.update(data, id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        const data: TypeDocumentList = TypeDocumentList.cast(response.data[0]);
        this._typeDocumentService.updateObjectObserver(data);
        this.modalRef?.hide();
      }

      if (response.code == 422) {
        if (response.errors) {
          const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.message, message: textErrors });
        }
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: ResponseApi) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }

  private deleteDataApi(id: number) {
    this._sweetAlertService.loadingUp()
    this._typeDocumentService.delete(id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        const data: TypeDocumentList = TypeDocumentList.cast(response.data[0]);
        this._typeDocumentService.removeObjectObserver(data._id);
      }

      if (response.code == 422) {
        if (response.errors) {
          const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.message, message: textErrors });
        }
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: ResponseApi) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }



  /**
   * Form data get
   */
  get form() {
    return this.typeDocumentForm.controls;
  }

  /**
   * INICIAR FORMULARTO CON LAS VALIDACIONES
   * @param model 
   */
  private initForm() {
    const typeDocument = new TypeDocument();
    const formGroupData = this.getFormGroupData(typeDocument);
    this.typeDocumentForm = this.formBuilder.group(formGroupData);
  }

  /**
   * CREAR VALIDACIONES DEL FORMGROUP
   * @param model 
   * @returns 
   */
  private getFormGroupData(model: TypeDocument): object {
    return {
      ...this._formService.modelToFormGroupData(model),
      nombre: [model.nombre || '', [Validators.required, Validators.maxLength(50)]],
    }
  }



  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.initForm();
    this.dataModal.title = 'Crear tipo de documento';
    this.submitted = false;
    this.isNewData = true;
    this.modalRef = this.modalService.show(content, { class: 'modal-md modal-dialog-centered' });
    this.modalRef.onHide.subscribe(() => { });
  }


  /**
    * Save
  */
  saveData() {
    if (!this.typeDocumentForm.valid) {
      this._sweetAlertService.showTopEnd({ title: 'Validación de datos', message: 'Campos obligatorios vacíos', type: 'warning', timer: 1500 });
    } else {
      const values: TypeDocument = this.typeDocumentForm.value;

      if (this.isNewData) {
        // Crear nuevo registro
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de registrar el tipo de documento?').then((confirm) => {
          if (confirm.isConfirmed) {
            this.saveDataApi(values);
          }
        });
      } else {
        // Actualizar datos
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de modificar el tipo de documento?').then((confirm) => {
          if (confirm.isConfirmed) {
            this.updateDataApi(values, values._id);
          }
        });
      }
    }

    this.submitted = true
  }

  /**
 * Open Edit modal
 * @param content modal content
 */
  editDataGet(data: any, content: any) {
    this.submitted = false;
    this.isNewData = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
    this.dataModal.title = 'Editar tipo de documento';

    // Cargando datos al formulario 
    const typeDocument = TypeDocument.cast(data);
    this.typeDocumentForm = this.formBuilder.group({ ...this._formService.modelToFormGroupData(typeDocument), _id: [data._id] });
  }


  /**
   * Eliminar un registro
   * @param id id del registro a eliminar
   */
  deleteRow(id: any) {
    this._sweetAlertService.showConfirmationAlert('¿Estas seguro de eliminar el tipo de documento?').then((confirm) => {
      if (confirm.isConfirmed) {
        this.deleteDataApi(id);
      }
    });
  }


}
