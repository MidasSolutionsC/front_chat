import { Component, QueryList, ViewChildren, OnInit, NgModule} from '@angular/core';
import { DecimalPipe  } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-coordinations',
  templateUrl: './coordinations.component.html',
  styleUrls: ['./coordinations.component.scss']
})
export class CoordinationsComponent {
  odalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  groupsListForm!: UntypedFormGroup;
  submitted: boolean = false;

  // Table data
  content?: any;
  lists?: any;
  

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder) {
  
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Groups' }, { label: 'Groups List', active: true }];

    /**
     * Form Validation
     */
    this.groupsListForm = this.formBuilder.group({
      id: "11",
      ids: [''],
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      position: ['', [Validators.required]],
      type: ['', [Validators.required]],
      status: ['', [Validators.required]]
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
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          event.target.closest('tr')?.remove();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    
  }

  /**
   * Form data get
   */
  get form() {
    return this.groupsListForm.controls;
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
    modelTitle.innerHTML = 'Edit Order';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    var listData = this.lists.filter((data: { id: any; }) => data.id === id);
    this.groupsListForm.controls['title'].setValue(listData[0].title);
    this.groupsListForm.controls['name'].setValue(listData[0].name);
    this.groupsListForm.controls['location'].setValue(listData[0].location);
    this.groupsListForm.controls['experience'].setValue(listData[0].experience);
    this.groupsListForm.controls['position'].setValue(listData[0].position);
    this.groupsListForm.controls['type'].setValue(listData[0].type);
    this.groupsListForm.controls['status'].setValue(listData[0].status);
    this.groupsListForm.controls['ids'].setValue(listData[0].id);
  }


}
