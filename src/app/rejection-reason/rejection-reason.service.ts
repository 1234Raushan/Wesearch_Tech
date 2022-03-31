import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serialize } from 'cerialize';
import { RejectionReason } from '../model/RejectionReason';

import { UtilsService } from '../services/utiles.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class RejectionReasonService {

     //varible
  searchText: any;
  isUpdate: number = 0;
  RejectionReasonObject!: RejectionReason;
  RejectionReasonFormGroup!: FormGroup;

   //Collection
   arrayForRejectionReason: RejectionReason[] = [];
   arrayForRejectionReasonFilter: RejectionReason[] = [];
   constructor(public utilsService: UtilsService,public fb: FormBuilder,public datePipe: DatePipe) {
    this.RejectionReasonObject = new RejectionReason();
    this.RejectionReasonFormGroup = this.fb.group({
      Reason: [null,[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/) ]],
      Deactive: [false],
    });
    this.getRejectionReasonList();
  }



  //#region
  getRejectionReasonList() {
    const formData = new FormData();
    const param = {};
    formData.append('ListJson', JSON.stringify(param));
    this.utilsService.postMethodAPI(false,this.utilsService.serverVariableService.ListRejectionReasonAPI,formData,(response) => {
        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          this.arrayForRejectionReason = response.Result;
          this.arrayForRejectionReasonFilter = response.Result;
        }
      },false,true);
  }
  //#endregion

   //#region
   addNewRejectionReason() {
    this.isUpdate = 0;
    $('#addNewRejectionReason').modal('show');
    this.RejectionReasonFormGroup.controls['Deactive'].disable();
  }
  //#endregion

   //#region
   clearAllObjects() {
    this.isUpdate = 0;
    this.clearAllFields();
    $('#addNewRejectionReason').modal('hide');

    this.RejectionReasonFormGroup.controls['Reason'].enable();
  }

   //#region
   clearAllFields() {
    this.RejectionReasonObject = new RejectionReason();
  }
  //#endregion

  //#region
  SaveRejectionReason() {
    const formData = new FormData();
    const currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss a');
    this.RejectionReasonObject.CreatedByID = this.utilsService.getLoginUsers().UserID;
    this.RejectionReasonObject.ModifyByID = this.utilsService.getLoginUsers().UserID;
    this.RejectionReasonObject.ModificationDate = currentDate;
    this.RejectionReasonObject.CreationDate = currentDate;
    this.RejectionReasonObject.Reason = this.RejectionReasonObject.Reason.trim();
    this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.SaveRejectionReasonAPI,Serialize(this.RejectionReasonObject, RejectionReason),(response) => {
        this.clearAllObjects();
        this.getRejectionReasonList();
      },false,true);
  }
  //#endregion

  UpdateRejectionReasonModalOpen(RejectionReasonObject: RejectionReason) {
    this.isUpdate = 1;
    this.RejectionReasonObject = Object.assign({}, RejectionReasonObject);
    $('#addNewRejectionReason').modal('show');
    this.RejectionReasonFormGroup.controls['Deactive'].enable();
  }

  //#region
  UpdateRejectionReason() {
    const currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss a');
    this.RejectionReasonObject.ModifyByID = this.utilsService.getLoginUsers().UserID;
    this.RejectionReasonObject.ModificationDate = currentDate;
    this.RejectionReasonObject.CreationDate = currentDate;
    this.RejectionReasonObject.Reason = this.RejectionReasonObject.Reason.trim();

    this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.UpdateRejectionReasonAPI,this.RejectionReasonObject,(response) => {
        this.clearAllObjects();
        this.getRejectionReasonList();
      },false,true);
  }
  //#endregion

//#region
DeleteRejectionReasonConfirmation(RejectionReasonObject: RejectionReason) {
  this.RejectionReasonObject = Object.assign({}, RejectionReasonObject);
  const currentDate = this.datePipe.transform(
    new Date(),
    'yyyy-MM-dd hh:mm:ss a'
  );
  this.RejectionReasonObject.ModificationDate = currentDate;
  this.RejectionReasonObject.CreationDate = currentDate;
  $('#RejectionReasonDeleteConfirmationModal').modal('show');
}


DeleteRejectionReason() {
  this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.DeleteRejectionReasonAPI,this.RejectionReasonObject,(response) => {
      this.closeDeleteConfirmationPop();
      this.getRejectionReasonList();
    },false,true);
}
//#endregion

//#region
closeDeleteConfirmationPop() {
  this.clearAllObjects();
  $('#RejectionReasonDeleteConfirmationModal').modal('hide');
}
//#endregion

     //#region Grid Filter
  filterData(serach: any) {
    if (!this.utilsService.isNullUndefinedOrBlank(serach.value)) {
      this.arrayForRejectionReason = this.arrayForRejectionReasonFilter.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(serach.value.toLowerCase())
      );
    } else {
      this.arrayForRejectionReason = this.arrayForRejectionReasonFilter;
    }
  }
  //#endregion
}
