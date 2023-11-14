import { Component, QueryList, ViewChildren, OnInit, NgModule} from '@angular/core';
import { DecimalPipe  } from '@angular/common';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import {  groupsListModel } from './list.model';
import { GroupsListService } from './list.service';
import { NgbdGroupsListSortableHeader, SortEvent } from './list-sortable.directive';
import { GroupsListdata } from './data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [GroupsListService, DecimalPipe]
})

/**
 * List Component
 */
export class ListComponent implements OnInit {

  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  groupsListForm!: UntypedFormGroup;
  submitted: boolean = false;

  // Table data
  content?: any;
  lists?: any;
  groupsList!: Observable<groupsListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdGroupsListSortableHeader) headers!: QueryList<NgbdGroupsListSortableHeader>;
  currentPage: any;

  constructor(private modalService: BsModalService, public service: GroupsListService, private formBuilder: UntypedFormBuilder) {
    this. groupsList = service. groupsList$;
    this.total = service.total$;
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
    this. groupsList.subscribe(x => {
      this.content = this.lists;
      this.lists = Object.assign([], x);
    });
  }

  /**
  * Open modal
  * @param content modal content
  */
  openViewModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

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
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
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
  saveUser() {
    if (this.groupsListForm.valid) {
      if (this.groupsListForm.get('ids')?.value) {
        this.service.products = GroupsListdata.map((data: { id: any; }) => data.id === this.groupsListForm.get('ids')?.value ? { ...data, ...this.groupsListForm.value } : data)
      } else {
        const title = this.groupsListForm.get('title')?.value;
        const name = this.groupsListForm.get('name')?.value;
        const location = this.groupsListForm.get('location')?.value;
        const experience = this.groupsListForm.get('experience')?.value;
        const position = this.groupsListForm.get('position')?.value;
        const type = this.groupsListForm.get('type')?.value;
        const posted_date = "02 June 2021";
        const last_date = "25 June 2021";
        const status = this.groupsListForm.get('status')?.value;
        GroupsListdata.push({
          id: this.lists.length + 1,
          title,
          name,
          location,
          experience,
          position,
          type,
          type_color: "success",
          posted_date,
          last_date,
          status,
          status_color: "success"
        });
      }
    }
    this.modalService.hide();
    setTimeout(() => {
      this.groupsListForm.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
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

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

}
