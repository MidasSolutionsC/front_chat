import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExportAsConfig, ExportAsService, SupportedExtensions } from 'ngx-export-as';
import { BehaviorSubject, Observable, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { Breadcrumb, CampusList, Coordination, CoordinationList, MemberList, Pagination, PaginationResult, ResponseApi, TypeDocumentList, UserPersonList } from 'src/app/core/models';
import { ApiErrorFormattingService, CampusService, CoordinationService, FormService, SweetAlertService, TypeDocumentService, UserService } from 'src/app/core/services';
import { ModalDetailComponent } from './modals/modal-detail/modal-detail.component';

@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;

  dataModal = {
    title: 'Crear coordinación',
  }

  // bread crumb items
  titleBreadCrumb: string = 'Coordinaciones';
  breadCrumbItems: Array<{}>;

  // Form 
  isNewData: boolean = true;
  submitted: boolean = false;
  coordinationForm: FormGroup;

  // Formulario para buscar usuarios
  userSearchForm: FormGroup;

  // Table data
  // content?: any;
  lists?: CoordinationList[] = [];


  // EXPORTS DATA TABLE
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'tableCoordination', // the id of html/table element
  }

  config: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'tableCoordination',
    options: {
      jsPDF: {
        orientation: 'landscape'
      },
      // pdfCallbackFn: this.pdfCallbackFn // to add header and footer
    }
  };

  // SERVER SIDE - Coordination
  // CoordinationPage: number = 1;
  // CoordinationPerPage: number = 5;
  // CoordinationSearch: string = '';
  // CoordinationColumn: string = '';
  // CoordinationOrder: 'asc' | 'desc' = 'desc';
  // CoordinationCountElements: number[] = [2, 5, 10, 25, 50, 100];
  // CoordinationTotal: number = 0;
  // CoordinationPagination: Pagination = new Pagination();

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

  // USUARIO
  paginationUser: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({
    page: 1,
    limit: 10,
    search: '',
    column: '',
    order: 'desc',
  });

  paginationResultUser: PaginationResult = new PaginationResult();

  // Integrantes
  listMembers: MemberList[] = [];
  listMemberIdDeleted: number[] = [];

  // Sedes
  listDocuments?: TypeDocumentList[];
  listCampus?: CampusList[];


  // Listar usuarios
  loadingDataUsers: boolean = false;
  asyncUsers: Observable<UserPersonList[]>;
  listUsers?: UserPersonList[];
  listUserSelected?: UserPersonList[] = [];
  listUserSelectedId?: any[] = [];

  // USUARIO - NGX DATA TABLE
  userRows: any[] = [];
  // userColumns: any[] = [];
  userOffset: number = 0;
  userCount: number = 3;
  userLimit = 10;
  userColumns = [
    { prop: 'nombre_usuario', name: 'Usuario' },
    { prop: 'nombres', name: 'Nombres' },
    { prop: 'apellido_paterno', name: 'Apellido paterno' },
    { prop: 'apellido_materno', name: 'Apellido materno' }
  ];


  // TABLE USER - ANGULAR DATA TABLE
  dtOptions: any = {};
  dtColumns: DataTables.ColumnSettings[] = [];

  // TABLE USUARIOS - SERVER SIDE
  // page: number = 1;
  // perPage: number = 5;
  // search: string = '';
  // column: string = '';
  // order: 'asc' | 'desc' = 'desc';
  // countElements: number[] = [2, 5, 10, 25, 50, 100];
  // total: number = 0;
  // pagination: Pagination;

  // CHECKED USERS - SELECCIÓN DE USUARIOS EN LA TABLA
  selectAll: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private exportAsService: ExportAsService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private _typeDocumentService: TypeDocumentService,
    private _campusService: CampusService,
    // private _memberService: MemberService,
    private _userService: UserService,
    private _coordinationService: CoordinationService,
    private _formService: FormService,
    private _apiErrorFormattingService: ApiErrorFormattingService,
    private _sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.breadCrumbItems = Breadcrumb.casts([{ label: 'Mantenimiento' }, { label: 'Coordinaciones', active: true }]);

    // Instancias de FormGroup
    this.initForm();
    this.initFormUserSearch();

    // Lista de datos
    // this.listDataApi();

    this.apiTypeDocumentList();
    this.apiCampusList();


    // PAGINACIÓN DATA TABLE
    this.apiCoordinationListPagination();
    // this.apiUserListPagination();

    // Tipo de documentos
    this.subscription.add(
      this._typeDocumentService.typeDocuments$
        .pipe(distinctUntilChanged())
        .subscribe((list: TypeDocumentList[]) => {
          this.listDocuments = list;
        })
    );

    // Sedes
    this.subscription.add(
      this._campusService.listObserver$
        .pipe(
          distinctUntilChanged((prevList, currentList) =>
            prevList.map(item => item._id).join(',') === currentList.map(item => item._id).join(',')
          )
        )
        .subscribe((list: CampusList[]) => {
          this.listCampus = list;
        })
    );

    // PAGINACIÓN
    this.subscription.add(
      this.pagination.asObservable()
        // .pipe(distinctUntilChanged())
        .subscribe((pagination: Pagination) => {
          this.apiCoordinationListPagination()
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
  exportAsString(type: SupportedExtensions, opt?: string) {
    this.config.elementIdOrContent = '<div> test string </div>';
    this.exportAs(type, opt);
    setTimeout(() => {
      this.config.elementIdOrContent = 'tableCoordination';
    }, 1000);
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
      // this.config.options.jsPDF.orientation = 'portrait';
      this.config.options.jsPDF.unit = 'mm';
      this.config.options.jsPDF.format = 'a4';
      this.config.options.jsPDF.compress = true;
      this.config.options.jsPDF.scale = 3;
      this.config.options.jsPDF.fonts = [
        {
          family: 'Arial',
          style: 'normal',
          src: 'path/to/arial.ttf' // Ruta a la fuente TrueType (ttf) incrustada
        }
      ];
    }
    this.exportAsService.save(this.config, 'grupos').subscribe(() => {
      // save started
    });

    // this.exportAsService.get(this.config).subscribe(content => {
    //   const link = document.createElement('a');
    //   const fileName = 'export.pdf';

    //   link.href = content;
    //   link.download = fileName;
    //   link.click();
    //   console.log(content);
    // });
  }

  pdfCallbackFn(pdf: any) {
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
  public listDataApi(forceRefresh: boolean = false) {
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._coordinationService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
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
      if (error.message) {
        this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error', message: error.message, timer: 2500 });
      }
    });
  }

  private saveDataApi(data: Coordination) {
    this._sweetAlertService.loadingUp()
    this.subscription.add(
      this._coordinationService.register(data).subscribe((response: ResponseApi) => {
        this._sweetAlertService.stop();
        if (response.code == 201) {
          if (response.data) {
            const { Coordination, member } = response.data;
            const object = { ...Coordination };
            const data: CoordinationList = CoordinationList.cast(object);
            this._coordinationService.addObjectObserver(data);
          }

          this.apiCoordinationListPagination();
          this.modalRef?.hide();
        }

        if (response.code == 422) {
          if (response.errors) {
            const { Coordination_errors, member_errors } = response.errors;
            let textErrors = '';

            if (Coordination_errors) {
              textErrors += this._apiErrorFormattingService.formatAsHtml(Coordination_errors);
            }

            if (member_errors) {
              textErrors += this._apiErrorFormattingService.formatAsHtml(member_errors);
            }

            if (textErrors != '') {
              this._sweetAlertService.showTopEnd({ type: 'error', title: response.message, message: textErrors });
            }

          }

        }

        if (response.code == 500) {
          if (response.errors) {
            this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
          }
        }
      }, (error) => {
        this._sweetAlertService.stop();
        if (error?.error) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error', message: error?.error?.message });
        }
      })
    )
  }

  private updateDataApi(data: Coordination, id: any) {
    this._sweetAlertService.loadingUp()
    this._coordinationService.update(data, id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        if (response.data) {
          const { person, user } = response.data;
          const dataUser = { ...person, ...user };
          const data: CoordinationList = CoordinationList.cast(dataUser);
          this._coordinationService.updateObjectObserver(data);
        }

        this.apiCoordinationListPagination();
        this.modalRef?.hide();
      }

      if (response.code == 422) {
        if (response.errors) {
          // const textErrors = this._apiErrorFormattingService.formatAsHtml(response.errors);
          // this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});

          const { user_errors, person_errors } = response.errors;
          let textErrors = '';

          if (person_errors) {
            textErrors += this._apiErrorFormattingService.formatAsHtml(person_errors);
          }

          if (user_errors) {
            textErrors += this._apiErrorFormattingService.formatAsHtml(user_errors);
          }

          if (textErrors != '') {
            this._sweetAlertService.showTopEnd({ type: 'error', title: response.message, message: textErrors });
          }

        }
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      if (error.message) {
        this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al actualizar grupo', message: error.message, timer: 2500 });
      }
    });
  }

  private deleteDataApi(id: number) {
    this._sweetAlertService.loadingUp()
    this._coordinationService.delete(id).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        const data: CoordinationList = CoordinationList.cast(response.data[0]);
        this._coordinationService.removeObjectObserver(data._id);
        this.apiCoordinationListPagination();
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
      if (error.message) {
        this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al eliminar grupo', message: error.message, timer: 2500 });
      }
    });
  }


  /**
   * ****************************************************************
   * SERVER SIDE - GRUPOS
   * ****************************************************************
   */
  // DATA TABLE
  apiCoordinationListPagination(): void {
    this.subscription.add(
      this._coordinationService.getPagination(this.pagination.getValue()).pipe(debounceTime(250)).subscribe((response: ResponseApi) => {
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
          this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al cargar grupos', message: error.message, timer: 2500 });
        }
      })
    );
  }

  getPageCoordination(event: any) {
    const { page, itemsPerPage: limit } = event;
    this.pagination.next({ ...this.pagination.getValue(), page, limit })
  }

  getPageRefresh() {
    this.pagination.next({ ...this.pagination.getValue(), page: 1, limit: 10 })
  }



  /**
   * ****************************************************************
   * OPERACIONES DE TABLAS FORÁNEAS
   * ****************************************************************
   */
  // Tipo documento
  public apiTypeDocumentList(forceRefresh: boolean = false) {
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._typeDocumentService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        this.listDocuments = response.data;
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: any) => {
      console.log(error);
      this._sweetAlertService.stop();
      if (error.message) {
        this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al cargar tipo de documentos', message: error.message, timer: 2500 });
      }
    });
  }

  // Sedes
  public apiCampusList(forceRefresh: boolean = false) {
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._campusService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if (response.code == 200) {
        this.listCampus = response.data;
      }

      if (response.code == 500) {
        if (response.errors) {
          this._sweetAlertService.showTopEnd({ type: 'error', title: response.errors?.message, message: response.errors?.error });
        }
      }
    }, (error: any) => {
      console.log(error);
      this._sweetAlertService.stop();
      if (error.message) {
        this._sweetAlertService.showTopEnd({ type: 'error', title: 'Error al cargar sedes', message: error.message, timer: 2500 });
      }
    });
  }

  // Obtener lista de integrantes
  // public apiMemberListByCoordination(CoordinationId: number){
  //   this._sweetAlertService.loadingUp('Obteniendo datos de integrantes')
  //   this._memberService.getByCoordination(CoordinationId).subscribe((response: ResponseApi) => {
  //     this._sweetAlertService.stop();
  //     if(response.code == 200){
  //       this.listMembers = response.data;
  //     }

  //     if(response.code == 500){
  //       if(response.errors){
  //         this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
  //       }
  //     }
  //   }, (error: any) => {
  //     console.log(error);
  //     this._sweetAlertService.stop();
  //     if(error.message){
  //       this._sweetAlertService.showTopEnd({type: 'error', title: 'Error al cargar integrantes', message: error.message, timer: 2500});
  //     }
  //   });
  // }


  /**
   * TABLA DE DATOS DE USUARIOS - SERVER SIDE
   */

  // DATA TABLE
  apiUserListPagination(): void {
    this.subscription.add(
      this._userService.getPagination(this.paginationUser.getValue()).pipe(debounceTime(250)).subscribe((response: ResponseApi) => {
        if (response.code == 200) {
          this.paginationResult = PaginationResult.cast(response.data);
          this.userRows = response.data.results;
          // this.pagination = Pagination.cast(response.data);
          // this.asyncUsers = of(this.pagination.data);
          // this.page = response.data.current_page;
          // this.total = response.data.total;
          // // this.listUsers = this.pagination.data;

          // this.userRows = response.data.data;
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

  getPageUser(event: any) {
    const { page, itemsPerPage: limit } = event;
    this.paginationUser.next({ ...this.pagination.getValue(), page, limit })

  }




  /**
   * SELECCIÓN DE USUARIOS - INTEGRANTES DEL  GRUPO
   */

  /**
   * Seleccionar o quitar a todos os usuarios
   */
  toggleAllSelection() {
    if (!this.selectAll) {
      this.listUserSelected = [];
    } else {
      // this.listUserSelected = this.pagination.data.map((obj: any) => obj);

      this.listUserSelected = this.paginationResult.results.map((obj: any) => {
        if (!this.listMembers.some((member) => member.usuarios_id == obj.id)) {
          return obj;
        }
        return null; // Retorna null para los elementos que ya existen 
      }).filter((obj: any | null) => obj !== null); // Solo devolver los diferentes de null

    }

    setTimeout(() => {
      this.processingMemberCoordination();
    }, 0);
  }

  /**
   * Activar o desactivar / usuario agregado
   * @param id id del usuario
   */
  toggleSelection(data: UserPersonList) {
    const index = this.listUserSelected.findIndex((item) => item._id === data._id);
    if (index === -1) {
      this.listUserSelected.push(data); // Agregar el ID si no está en la lista
    } else {
      this.listUserSelected.splice(index, 1); // Quitar el ID si ya está en la lista
    }

    setTimeout(() => {
      this.processingMemberCoordination();
    }, 0);
  }

  /**
   * PROCESAR LOS INTEGRANTES SELECCIONADOS - CAPTURAR SOLO LOS ID
   */
  processingMemberCoordination() {
    this.listUserSelectedId = this.listUserSelected.map((data) => data._id);
  }


  /**
   * Verificar si el usuario se encuentra agregado en el array de usuarios seleccionados para agregar al grupo
   * @param id id del usuario
   * @returns true o false
   */
  getCheckedRowUser(id: any) {
    return this.listUserSelected.some((item) => item._id === id);
  }

  /**
   * Validar si el usuario ya es un miembro del grupo 
   * @param id id del usuario
   * @returns 
   */
  getRowIsMember(id: any) {
    return this.listMembers.some((item) => item.usuarios_id === id);
  }





  /**
   * ELIMINAR USUARIO - MIEMBRO DEL GRUPO
   */
  deleteMemberUser(memberId: number) {
    // Buscar en el array de nuevos integrantes
    const member = this.listMembers.find((member) => member.id === memberId);

    if (member) {
      this._sweetAlertService.showConfirmationAlert('¿Estas seguro de eliminar al integrante?').then((confirm) => {
        if (confirm.isConfirmed) {
          this.listMemberIdDeleted.push(member.id);
          this.listMembers = this.listMembers.filter((item) => item.id !== member.id);
        }
      });
    }

  }

  /**
   * ELIMINAR USUARIO - SELECCIONADO
   */
  deleteUserSelected(userId: any) {
    // Buscar en el array de nuevos integrantes
    const userSelected = this.listUserSelected.find((item) => item._id == userId);

    if (userSelected) {
      this._sweetAlertService.showConfirmationAlert('¿Estas seguro de eliminar al integrante?').then((confirm) => {
        if (confirm.isConfirmed) {
          this.toggleSelection(userSelected);
        }
      });
    }
  }


  /**
   * OBTENER NOMBRE DEL SEDE SELECCIONADO
   */
  get nameSede() {
    const campus = this.listCampus.find((item) => item._id === this.f.campusId.value);
    return campus.nombre;
  }


  /**
   * Form data get Coordination
   */
  get f() {
    return this.coordinationForm.controls;
  }

  /**
   * INICIAR FORMULARTO CON LAS VALIDACIONES
   * @param model 
   */
  private initForm() {
    const coordination = new Coordination();
    const FormGroupData = this.getFormGroupData(coordination);
    this.coordinationForm = this.formBuilder.group(FormGroupData);
  }

  /**
   * CREAR VALIDACIONES DEL FormGroup
   * @param model 
   * @returns 
   */
  private getFormGroupData(model: Coordination): object {
    return {
      ...this._formService.modelToFormGroupData(model),
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      camopusId: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.nullValidator, Validators.maxLength(500)]],
    }
  }


  /**
   * FORM SEARCH USER
   */
  get fs() {
    return this.userSearchForm.controls;
  }

  private initFormUserSearch() {
    this.userSearchForm = this.formBuilder.group({
      typeDocumentId: ['', [Validators.nullValidator, Validators.min(0)]],
      documento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
      search: ['', [Validators.nullValidator]],
    });
  }



  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.initForm();
    this.isNewData = true;
    this.dataModal.title = 'Crear grupo';
    this.submitted = false;
    this.listMembers = [];
    this.listMemberIdDeleted = [];
    this.listUserSelectedId = [];
    this.listUserSelected = [];

    this.modalRef = this.modalService.show(content, { class: 'modal-xl', backdrop: 'static' });
    this.modalRef.onHide.subscribe(() => { });
  }


  /**
    * Save
  */
  saveData() {
    if (!this.coordinationForm.valid) {
      this._sweetAlertService.showTopEnd({ title: 'Validación de datos', message: 'Campos obligatorios vacíos', type: 'warning', timer: 1500 });
    } else {
      const values: Coordination = this.coordinationForm.value;
      values.integrantes = this.listUserSelectedId;


      if (this.isNewData) {
        if (values?.integrantes.length <= 0) {
          this._sweetAlertService.showTopEnd({ title: 'Validación de integrantes', message: 'No se encontró integrantes para crear el grupo', type: 'warning', timer: 1500 });
          return;
        }
        // Crear nuevo registro
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de registrar el grupo?').then((confirm) => {
          if (confirm.isConfirmed) {
            this.saveDataApi(values);
          }
        });
      } else {
        values['integrantesEliminados'] = this.listMemberIdDeleted;
        // Actualizar datos
        this._sweetAlertService.showConfirmationAlert('¿Estas seguro de modificar el grupo?').then((confirm) => {
          if (confirm.isConfirmed) {
            this.updateDataApi(values, values._id);
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
    this.openModal(content);
    this.dataModal.title = 'Editar grupo';
    this.isNewData = false;

    // Cargando datos al formulario 
    const coordination = Coordination.cast(data);

    this.coordinationForm = this.formBuilder.group({
      ...this._formService.modelToFormGroupData(coordination), 
      _id: [data._id]
    });

    // Obtener los integrantes del grupo
    // this.apiMemberListByCoordination(coordination._id);
  }


  /**
   * Eliminar un registro
   * @param id id del registro a eliminar
   */
  deleteRow(id: any) {
    this._sweetAlertService.showConfirmationAlert('¿Estas seguro de eliminar el grupo?').then((confirm) => {
      if (confirm.isConfirmed) {
        this.deleteDataApi(id);
      }
    });
  }


  /**
   * *******************************************************************
   * DETALLE DE GRUPO - MODAL FORÁNEO
   * *******************************************************************
   */
  openModalDetailCoordination(coordination: CoordinationList) {
    const initialState = {
      coordination
    }

    this.modalRef = this.modalService.show(ModalDetailComponent, {initialState, class: 'modal-xl'});
  }
}
