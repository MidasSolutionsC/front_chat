import { Component, QueryList, ViewChildren, OnInit, NgModule} from '@angular/core';
import { DecimalPipe  } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-coordinations',
  templateUrl: './coordinations.component.html',
  styleUrls: ['./coordinations.component.scss']
})
export class CoordinationsComponent {
  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  coordinationsListForm!: UntypedFormGroup;
  submitted: boolean = false;

  // Table data
  content?: any;
  lists?: any;
  

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder, private http: HttpClient) {
    this.updateContent();
  }
  

  
    

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Coordinations' }, { label: 'Lista de Coordinaciones', active: true }];

    /**
     * Form Validation
     */
    this.coordinationsListForm = this.formBuilder.group({
      id: "11",
      ids: [''],
      namecoord: ['', [Validators.required]],
      integrantes: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });

    /**
    * fetches data
    */
    
  }

  /**
  * Open modal
  * @param content modal content
  */
  
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
  }

  // Delete Data
  delete(event: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title:'¿Estás seguro?' ,
        text: 'No volverás a recuperarlo',
        icon: 'warning',
        confirmButtonText: 'Si, Borrar',
        cancelButtonText: 'No, cancelar!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado.',
            
          );
          event.target.closest('tr')?.remove();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu archivo está a salvo :)',
            'error'
          );
        }
      });
  }

  updateContent() {
    this.http.get('http://localhost:4200/coordinations', { responseType: 'text' }).subscribe(data => {
      this.content = data;
    });
 }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }

  /**
   * Form data get
   */
  get form() {
    return this.coordinationsListForm.controls;
  }

  /**
  * Save user
  */
 
   

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;

    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Editar Coordinación';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Actualzar";
    var listData = this.lists.filter((data: { id: any; }) => data.id === id);
    this.coordinationsListForm.controls['namecoord'].setValue(listData[0].namecoord);
    this.coordinationsListForm.controls['integrantes'].setValue(listData[0].integrantes);
    this.coordinationsListForm.controls['descripcion'].setValue(listData[0].descripcion);
    this.coordinationsListForm.controls['status'].setValue(listData[0].status);
    this.coordinationsListForm.controls['ids'].setValue(listData[0].id);
  }


}
