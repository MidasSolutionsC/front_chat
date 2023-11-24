import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Breadcrumb, CountryList, IdentificationDocument, Pagination, PaginationResult, ResponseApi, ResponsePagination, TypeDocumentList, TypeUserList, UserList, UserPerson, UserPersonList } from 'src/app/core/models';
import { ApiErrorFormattingService, CountryService, FormService, SweetAlertService, TypeDocumentService, TypeUserService, UserService } from 'src/app/core/services';
import { CleanObject } from 'src/app/core/helpers/clean-object.util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  
  modalRef?: BsModalRef;

   dataModal = {
    title: 'Crear usuarios',
  }

  // Configura las propiedades del jqxGrid
  // dataAdapter: any; // Define tu fuente de datos aquí
  // columns: any[] = []; // Define las columnas aquí
  
  // bread crumb items
  titleBreadCrumb: string = 'Usuarios';
  breadCrumbItems: Array<{}>;
  
  // Form 
  isNewData: boolean = true;
  submitted: boolean = false;
  userForm: FormGroup;

  // TABLE USUARIOS - SERVER SIDE
  // page: number = 1;
  // perPage: number = 5;
  // search: string = '';
  // column: string = '';
  // order: 'asc' | 'desc' = 'desc';
  // countElements: number[] = [5, 10, 25, 50, 100];
  // total: number = 0;
  // pagination: Pagination = new Pagination();

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
  lists?: UserList[] = [];

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'tableUser',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };
  // Tipo documentos
  listDocuments?: TypeDocumentList[];

  // Paises
  listCountries?: CountryList[];

  // Paises
  listTypeUsers?: TypeUserList[];
  
  private subscription: Subscription = new Subscription();

  constructor(
    private exportAsService: ExportAsService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService, 
    private _typeDocumentService: TypeDocumentService,
    private _countryService: CountryService,
    private _userService: UserService,
    private _typeUserService: TypeUserService,
    private _formService: FormService,
    private _apiErrorFormattingService: ApiErrorFormattingService,
    private _sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = Breadcrumb.casts([{ label: 'Mantenimiento'}, { label: 'Usuarios', active: true }]);

    this.initForm();
    // this.listDataApi();
    // this.apiCountryList();
    this.apiTypeDocumentList();
    this.apiTypeUserList();
    this.apiUserListPagination();
 
    // Usuarios
    // this.subscription.add(
    //   this._userService.listObserver$
    //   .pipe(
    //     distinctUntilChanged(
    //       (prevList, currentList) =>
    //         prevList.map(item => item.id).join(',') === currentList.map(item => item.id).join(',')
    //     )
    //   )
    //   .subscribe((list: UserPersonList[]) => {
    //     this.lists = list;
    //   })
    // );

    // Tipo de documentos
    this.subscription.add(
      this._typeDocumentService.typeDocuments$
      .pipe(distinctUntilChanged())
      .pipe(
        distinctUntilChanged((prevList, currentList) =>
            prevList.map(item => item._id).join(',') === currentList.map(item => item._id).join(',')
            )
          )
          .subscribe((list: TypeDocumentList[]) => {
            this.listDocuments = list;
      })
    );

    // Países
    this.subscription.add(
      this._countryService.listObserver$
      .pipe(distinctUntilChanged())
      .pipe(
        distinctUntilChanged((prevList, currentList) =>
            prevList.map(item => item.id).join(',') === currentList.map(item => item.id).join(',')
            )
          )
          .subscribe((list: CountryList[]) => {
            this.listCountries = list;
      })
    );

    // Tipo de usuarios
    this.subscription.add(
      this._typeUserService.listObserver$
      .pipe(distinctUntilChanged())
          .subscribe((list: TypeUserList[]) => {
            this.listTypeUsers = list;
      })
    );

    // PAGINACIÓN
    
    this.subscription.add(
      this.pagination.asObservable()
        // .pipe(distinctUntilChanged())
        .subscribe((pagination: Pagination) => {
          console.log("PAGINACIÓN:", pagination)
          this.apiUserListPagination()
        })
    );
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


    /**
   * ****************************************************************
   * GENERAR EXPORTACIONES DE DATOS - TABLE
   * ****************************************************************
   */
  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
      // this.config.options.jsPDF.orientation = 'portrait';
      this.config.options.jsPDF.unit = 'mm';
      this.config.options.jsPDF.format = 'a4';
      this.config.options.jsPDF.compress = false;
      this.config.options.jsPDF.scale = 3;
      this.config.options.jsPDF.fonts = [
        {
          family: 'Arial',
          style: 'normal',
          // src: 'path/to/arial.ttf' // Ruta a la fuente TrueType (ttf) incrustada
        }
      ];
    }
    this.exportAsService.save(this.config, 'usuarios').subscribe((value) => {
      // save started
    });
  }
  
  pdfCallbackFn (pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Pagina ' + i + ' de ' + noOfPages, pdf.internal.pageSize.getWidth() - 50, pdf.internal.pageSize.getHeight() - 10);
    }
  }


  /**
   * ****************************************************************
   * OPERACIONES CON LA API
   * ****************************************************************
   */
  public listDataApi(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._userService.getAll(forceRefresh).subscribe((response: any) => {
      this._sweetAlertService.stop();

      console.log("RESPUESTA:", response)
      this.lists = response;

      if(response.code == 200){
        this.lists = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }

  private saveDataApi(data: UserPerson){
    this._sweetAlertService.loadingUp()
    this.subscription.add(
      this._userService.register(data).subscribe((response: ResponseApi) => {
        this._sweetAlertService.stop();
        if(response.code == 201){
          if(response.data){
            const result = response.data;

          }
            // const dataUser = {...person, ...user.data};
            // const data: UserPersonList = UserPersonList.cast(dataUser);
            // this._userService.addObjectObserver(data);

          this.apiUserListPagination();
          this.modalRef?.hide();
        }

        if(response.code == 422){
          if(response.errors){
            const {user_errors, person_errors} = response.errors;
            let textErrors = '';

            if(person_errors){
              textErrors += this._apiErrorFormattingService.formatAsHtml(person_errors);
            }

            if(user_errors){
              textErrors += this._apiErrorFormattingService.formatAsHtml(user_errors);
            }

            if(textErrors != ''){
              this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});
            }

          }
          
        }

        if(response.code == 500){
          if(response.errors){
            this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
          }
        }
      }, (error) => {
        this._sweetAlertService.stop();
        if(error?.error){
          console.log(error);
          this._sweetAlertService.showTopEnd({type: 'error', title: 'Error', message: error?.error?.message});

        }
      })
    )
  }

  private updateDataApi(data: UserPerson, id: any){
    this._sweetAlertService.loadingUp()
    this._userService.update(data, id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        if(response.data){
          const {person, user} = response.data;
          const dataUser = {...person, ...user};
          const data: UserPersonList = UserPersonList.cast(dataUser);
          this._userService.updateObjectObserver(data);
        }

        this.apiUserListPagination();
        this.modalRef?.hide();
      }

      if(response.code == 422){
        if(response.errors){
          // const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
          // this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});

          const {user_errors, person_errors} = response.errors;
          let textErrors = '';

          if(person_errors){
            textErrors += this._apiErrorFormattingService.formatAsHtml(person_errors);
          }

          if(user_errors){
            textErrors += this._apiErrorFormattingService.formatAsHtml(user_errors);
          }

          if(textErrors != ''){
            this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});
          }

        }
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: ResponseApi) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }

  private deleteDataApi(id: string){
    this._sweetAlertService.loadingUp()
    this._userService.delete(id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        const data = response.data;
        // this._userService.removeObjectObserver(data._id);
        this.apiUserListPagination();
      }

      if(response.code == 422){
        if(response.errors){
          const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
          this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});
        }
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: ResponseApi) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }


  /**
   * ***************************************************************
   * SERVER SIDE - USERS
   * ***************************************************************
   */
  apiUserListPagination(): void {
    this.subscription.add(
      this._userService.getPagination(this.pagination.getValue())
      .pipe(debounceTime(250))
      .subscribe((response: ResponseApi) => {
        if(response.code == 200){
          this.paginationResult = PaginationResult.cast(response.data);
          this.lists = response.data.results;
        }
        
        if(response.code == 500){
          if(response.errors){
            this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
          }
        }
      }, (error: any) => {
        if(error.message){
          this._sweetAlertService.showTopEnd({type: 'error', title: 'Error al cargar usuarios', message: error.message, timer: 2500});
        }
      })
    ); 
  }

  getPage(event: any){
    const { page, itemsPerPage: limit } = event;
    this.pagination.next({...this.pagination.getValue(), page, limit})
  }

  getPageRefresh(){
    this.pagination.next({...this.pagination.getValue(), page: 1, limit: 10})
  }

  
  /**
   * OPERACIONES DE TABLAS FORÁNEAS
   */
  // Tipo documento
  public apiTypeDocumentList(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._typeDocumentService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        this.listDocuments = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  
  // Países
  public apiCountryList(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._countryService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        this.listCountries = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  
  // Tipo de usuario
  public apiTypeUserList(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._typeUserService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        this.listTypeUsers = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  


  /**
   * Form data get
   */
  get f() {
    return this.userForm.controls;
  }

  /**
   * INICIAR FORMULARTO CON LAS VALIDACIONES
   * @param model 
   */
  private initForm(){
    const userPerson = new UserPerson();
    const formGroupData = this.getFormGroupData(userPerson);
    this.userForm = this.formBuilder.group(formGroupData);
  }

  /**
   * CREAR VALIDACIONES DEL FORMGROUP
   * @param model 
   * @returns 
   */
  private getFormGroupData(model: UserPerson): object {
    return {
      ...this._formService.modelToFormGroupData(model),
      nombres: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(50)]],
      typeDocumentId: ['', [Validators.required, Validators.min(1)]],
      nroDocumento: ['', [Validators.required, Validators.min(5)]],
      typeUserId: ['', [Validators.required, Validators.min(1)]],
      genero: ['', [Validators.required, Validators.min(1)]],
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[^\s]+$/)]],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      clave_confirmation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
    }
  }


  
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.initForm();
    this.isNewData = true;
    this.dataModal.title = 'Crear usuario';
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-lg modal-dialog-centered' });
    this.modalRef.onHide.subscribe(() => {});
  }


  /**
    * Save
  */
  saveData() {
    if(!this.userForm.valid){
      this._sweetAlertService.showTopEnd({title: 'Validación de datos', message: 'Campos obligatorios vacíos', type: 'warning', timer: 1500});
    } else {
      const values: UserPerson = this.userForm.value;
      // values.identificaciones = CleanObject.cleanArrayOfObjects(values.identificaciones);
      const {_id, ...dataSend} = values

      if(this.isNewData){
        // Crear nuevo registro
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de registrar el usuario?').then((confirm) => {
          if(confirm.isConfirmed){
            this.saveDataApi(dataSend);
          }
        });
      } else {
        // Actualizar datos
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de modificar el usuario?').then((confirm) => {
          if(confirm.isConfirmed){
            this.updateDataApi(dataSend, _id);
          }
        });
      }
    }

    this.submitted = true;
  }

  /**
 * Open Edit modal
 * @param content modal content
 */
  editDataGet(data: any, content: any) {
    this.openModal(content)
    this.dataModal.title = 'Editar usuario';
    this.isNewData = false;
    this.submitted = false;

    const userPerson = UserPerson.cast(data);

    this.userForm = this.formBuilder.group({
      ...this._formService.modelToFormGroupData(userPerson), 
      // personas_id: [data.personas_id], 
      personId: [data?.personId?._id, []],
      nombres: [data?.personId?.nombres, []],
      apellidoPaterno: [data?.personId?.apellidoPaterno, []],
      apellidoMaterno: [data?.personId?.apellidoMaterno, []],
      genero: [data?.personId?.genero, []],
      typeDocumentId: [data?.personId?.typeDocumentId?._id, []],
      nroDocumento: [data?.personId?.nroDocumento, []],
      typeUserId: [data?.typeUserId?._id, []],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      clave_confirmation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      _id: [data._id]
    });



    // if(data.identificaciones.length > 0){
    //   data?.identificaciones?.forEach((doc) => {
    //     this.formDataIdentification.push(this.fieldIdentification({...doc,tipo_documentos_id: doc.tipo_documentos_id, documento: doc.documento}));
    //   });
    // } else {
    //   // this.formDataIdentification.push(this.fieldIdentification());
    // }
  }


  /**
   * Eliminar un registro
   * @param id id del registro a eliminar
   */
  deleteRow(id: any){
    this._sweetAlertService.showConfirmationAlert('¿Estas seguro de eliminar el usuario?').then((confirm) => {
      if(confirm.isConfirmed){
        this.deleteDataApi(id);
      }
    });
  }
}
