import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serialize } from 'cerialize';
import { Stage } from '../model/Stage';
import { UtilsService } from '../services/utiles.service';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class StageService {
  //varible
  searchText: any;
  isUpdate: number = 0;
  satgeObject!: Stage;
  stageFormGroup!: FormGroup;
  //Collection
  arrayForStage: Stage[] = [];
  arrayForStageFilter: Stage[] = [];

  constructor(public utilsService: UtilsService,public fb: FormBuilder,public datePipe: DatePipe) {
    this.satgeObject = new Stage();
    this.stageFormGroup = this.fb.group({
      StageName: [null, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      Deactive: [false],
    });
    this.getStageList();
  }


  //#region
  getStageList() {
    const formData = new FormData();
    const param = {};
    formData.append('ListJson', JSON.stringify(param));
    this.utilsService.postMethodAPI(false,this.utilsService.serverVariableService.GetStageList,formData,(response) => {
        if (!this.utilsService.isNullUndefinedOrBlank(response)) {
          this.arrayForStage = response.Result;
          this.arrayForStageFilter = response.Result;
        }
      },false,true);
  }
  //#endregion

  //#region
  addNewStage() {
    this.isUpdate = 0;
    //this.utilsService.hideModal('addNewStage');
    $('#addNewStage').modal('show');
    // this.utilsService.openModal('addNewStage');
    this.stageFormGroup.controls['Deactive'].disable();
  }
  //#endregion

  //#region
  clearAllObjects() {
    this.isUpdate = 0;
    this.clearAllFields();
    $('#addNewStage').modal('hide');
    this.stageFormGroup.controls['StageName'].enable();
  }
  //#endregion

  //#region
  clearAllFields() {
    this.satgeObject = new Stage();
  }
  //#endregion

  //#region
  SaveStage() {
    const formData = new FormData();
    const currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss a');
    this.satgeObject.CreatedByID = this.utilsService.getLoginUsers().UserID;
    this.satgeObject.ModifyByID = this.utilsService.getLoginUsers().UserID;
    this.satgeObject.ModificationDate = currentDate;
    this.satgeObject.CreationDate = currentDate;
    this.satgeObject.StageName = this.satgeObject.StageName.trim();

    this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.SaveStageAPI,Serialize(this.satgeObject, Stage),(response) => {
        // if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.clearAllObjects();
        this.getStageList();
        // }
      },false,true);
  }
  //#endregion
  //this.utilsService.openModal("addNewCalendar");
  UpdateStageModalOpen(stageObject: Stage) {
    this.isUpdate = 1;
    this.satgeObject = Object.assign({}, stageObject);
    this.stageFormGroup.controls['StageName'].disable();
    $('#addNewStage').modal('show');
    this.stageFormGroup.controls['Deactive'].enable();
  }

  //#region
  UpdateStage() {
    const currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss');
    this.satgeObject.ModifyByID = this.utilsService.getLoginUsers().UserID;
    this.satgeObject.ModificationDate = currentDate;
    this.satgeObject.CreationDate = currentDate;

    this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.UpdateStageAPI,this.satgeObject,(response) => {
        // if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.clearAllObjects();
        this.getStageList();
        // }
      },false,true);
  }
  //#endregion

  //#region
  DeleteStageConfirmation(stageDeleteObj: Stage) {
    this.satgeObject = Object.assign({}, stageDeleteObj);
    const currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd hh:mm:ss a');
    this.satgeObject.ModificationDate = currentDate;
    this.satgeObject.CreationDate = currentDate;
    $('#StageDeleteConfirmationModal').modal('show');
  }

  DeleteStage() {
    this.utilsService.postMethodAPI(true,this.utilsService.serverVariableService.DeleteStageAPI,this.satgeObject,(response) => {
        // if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.closeDeleteConfirmationPop();
        this.getStageList();
        // }
      },false,true);
  }
  //#endregion

  //#region
  closeDeleteConfirmationPop() {
    this.clearAllObjects();
    $('#StageDeleteConfirmationModal').modal('hide');
  }
  //#endregion

  //#region Grid Filter
  filterData(serach: any) {
    if (!this.utilsService.isNullUndefinedOrBlank(serach.value)) {
      this.arrayForStage = this.arrayForStageFilter.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(serach.value.toLowerCase())
      );
    } else {
      this.arrayForStage = this.arrayForStageFilter;
    }
  }
  //#endregion
}
