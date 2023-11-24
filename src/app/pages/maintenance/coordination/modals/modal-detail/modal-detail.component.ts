import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Coordination, CoordinationList, MemberList, ResponseApi } from 'src/app/core/models';
import { ApiErrorFormattingService, FormService, CoordinationService, MemberService, SweetAlertService } from 'src/app/core/services';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit, OnDestroy{

   // VALORES DE ENTRADA
  @Input() coordination: CoordinationList;


  dataCoordination: CoordinationList = new CoordinationList();

  // DATOS DEL MODAL
  dataModal: any = {
    title: 'Detalle de grupo'
  };

  // Integrantes
  listMembers: MemberList[] = [];
  
  private subscription: Subscription = new Subscription();
  
  constructor( 
    public modalRef: BsModalRef,
    private cdr: ChangeDetectorRef,
    private _modalService: BsModalService, 
    private _memberService: MemberService,
    private _CoordinationService: CoordinationService,
    private _formService: FormService,
    private _apiErrorFormattingService: ApiErrorFormattingService,
    private _sweetAlertService: SweetAlertService,
  ){}

  ngOnInit(): void {    
    if(this.coordination){
      // this.apiMemberListByCoordination(this.coordination._id);
      this.dataCoordination = this.coordination;
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  closeModal(){
    this.modalRef.hide();
  }

  /**
   * ****************************************************************
   * OPERACIONES CON LA API
   * ****************************************************************
   */
  // public apiMemberListByCoordination(coordinationId: any){
  //   this._sweetAlertService.loadingUp('Obteniendo datos de integrantes')
  //   this._memberService.getByCoordination(this.coordinationoordinationId).subscribe((response: ResponseApi) => {
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
}
