import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Serialize } from 'cerialize';
import { ActionMappingDetail } from '../model/ActionMappingDetail';
import { ProcessFlow } from '../model/ProcessFlow';
import { ProcessFlowDetail } from '../model/ProcessFlowDetail';
import { UtilsService } from '../services/utiles.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ProcessflowService {
  //#region variable declartion
  ProcessflowFormGroup!: FormGroup;
  isUpdate: number = 0;
  searchText!: string;
  processFlowObject!: ProcessFlow;
  isDeleteProcessFlowDetail: boolean = false;
  LoggedUser: any;
  indexOfActionMapping:number = 0;
  // actionMappingObj!:ActionMappingDetail
  processFlowDetailObject!:ProcessFlowDetail;
  actionMappingObject!:ActionMappingDetail;
  deleteCount:number = 0;

  //Arrays
  arrayForDDLSubStage!: any[];
  arrayForDDLAction!: any[];
  arrayForDDLPortalStatus!: any[];
  arrayForProcessFlowList!: any[];
  arrayForProcessFlowListFilter!: any[];
  arrayForDDLFileType!: any[];
  arrayForActionMapping:ActionMappingDetail[] = [];

  //#endregion

  constructor(public utilsService: UtilsService, public fb: FormBuilder, public datePipe: DatePipe) {
    this.processFlowObject = new ProcessFlow();
    this.processFlowDetailObject = new ProcessFlowDetail();
    this.actionMappingObject = new ActionMappingDetail();
    this.LoggedUser = this.utilsService.getLoginUsers().UserID;
    this.ProcessflowFormGroup = this.fb.group({
      ProcessFlowName: [null, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      Remark: [null],
      Deactive: [false]
    });
    this.getDDLList();
    this.getProcessFlowList();
  }

  //#region DDL For pages
  getDDLList() {
    const formData = new FormData();
    const param = {};
    formData.append('ListJson', JSON.stringify(param));
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.GetDDLList, formData, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.arrayForDDLPortalStatus = response.PortalStatus;
        this.arrayForDDLAction = response.Action;
        this.arrayForDDLSubStage = response.SubStage;
        this.arrayForDDLFileType = response.FileType
      }
    }, false, true);
  }
  //#endregion

  //#region List
  getProcessFlowList() {
    const formData = new FormData();
    const param = {};
    formData.append('ListJson', JSON.stringify(param));
    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.GetProcessFlowList, formData, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.arrayForProcessFlowList = response.Result;
        this.arrayForProcessFlowListFilter = response.Result;
      }
    }, false, true);
  }
  //#endregion

   //#region Grid Filter
   filterData() {
    if (!this.utilsService.isNullUndefinedOrBlank(this.searchText)) {
      this.arrayForProcessFlowList = this.arrayForProcessFlowListFilter.filter(item => JSON.stringify(item).toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.arrayForProcessFlowList = this.arrayForProcessFlowListFilter;
    }
  }
  //#endregion

  //#region
  addNewProcessFlow() {
    $('#addNewProcessFlow').modal('show');
    this.ProcessflowFormGroup.controls['Deactive'].disable();
  }
  //#endregion

  //#region
  SaveProcessFlow() {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.processFlowObject.CreatedByID = this.LoggedUser;
    this.processFlowObject.CreationDate = currentDate;

    this.processFlowObject.ModifyByID = this.LoggedUser;
    this.processFlowObject.ModificationDate = currentDate;
    this.processFlowObject.ProcessFlowName=this.processFlowObject.ProcessFlowName.trim();

    if(!this.utilsService.isNullUndefinedOrBlank(this.processFlowObject.Remark)){
      this.processFlowObject.Remark = this.processFlowObject.Remark.trim();
    }

    this.processFlowObject.WF_MProcessFlowDetails = this.processFlowObject.WF_MProcessFlowDetails.map(item => {
      item.CreatedByID = this.LoggedUser;;
      item.CreationDate = currentDate;
      item.ModifyByID = this.LoggedUser;
      item.ModificationDate = currentDate;
      return item;
    });

    this.processFlowObject.WF_MProcessFlowDetails = this.processFlowObject.WF_MProcessFlowDetails.reverse();

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.SaveProcessFlowAPI, Serialize(this.processFlowObject, ProcessFlow), (response) => {
      this.clearAllObjects();
      this.getProcessFlowList();
    }, false, true);
  }
  //#endregion


  //#region
  addProcessFlowDetils() {

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.SubStageID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Sub Stage', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.ActionID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Action', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.NextSubStageID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Next SubStage.', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.PortalStatusID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Portal Status', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.isUpdate == 1) {
      this.processFlowObject.WF_MProcessFlowDetails.unshift(Serialize(new ProcessFlowDetail(), ProcessFlowDetail));
    } else {
      this.processFlowObject.WF_MProcessFlowDetails.unshift(new ProcessFlowDetail());
    }

  }
//#endregion

//#region
  removeProcessFlowDetils(index: any) {
    this.processFlowObject.WF_MProcessFlowDetails.filter((item, index) => { item.IsRowDuplicate = false; return item });

    if (this.processFlowObject.WF_MProcessFlowDetails[index].ProcessFlowDetailID != 0) {
      this.DeleteProcessFlowDetailConfirmationModal(this.processFlowObject.WF_MProcessFlowDetails[index]);
    } else {
      this.processFlowObject.WF_MProcessFlowDetails.splice(index, 1);
    }
  }
//#endregion

//#region
  getProcessFlowDetails(processFlow: ProcessFlow) {
    this.processFlowObject = Object.assign({}, processFlow);
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.processFlowObject.CreationDate = currentDate;
    this.processFlowObject.ModificationDate = currentDate;

    if (this.isDeleteProcessFlowDetail) {
      this.processFlowObject.WF_MProcessFlowDetails = this.processFlowObject.WF_MProcessFlowDetails.map(item => {
        item.CreationDate = currentDate;
        item.ModificationDate = currentDate;
        return item;
      });
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.GetProcessFlowDetailList, this.processFlowObject, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.processFlowObject.WF_MProcessFlowDetails = response.Result;
        this.isUpdate = 1;
        if (!this.isDeleteProcessFlowDetail) {
          $('#addNewProcessFlow').modal('show');
        }
        this.isDeleteProcessFlowDetail = false;
      }
    }, false, true);
    this.ProcessflowFormGroup.controls['Deactive'].enable();
  }
//#endregion

//#region
  updateProcessFlow() {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.processFlowObject.CreatedByID = this.LoggedUser;
    this.processFlowObject.CreationDate = currentDate;

    this.processFlowObject.ModifyByID = this.LoggedUser;
    this.processFlowObject.ModificationDate = currentDate;

    this.processFlowObject.WF_MProcessFlowDetails = this.processFlowObject.WF_MProcessFlowDetails.map(item => {
      item.CreationDate = currentDate;
      item.ModificationDate = currentDate;
      if (item.ProcessFlowDetailID == 0) {
        item.ModifyByID = this.LoggedUser;;
        item.CreatedByID = this.LoggedUser;
      }
      return item;
    });

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.UpdateProcessFlowAPI, this.processFlowObject, (response) => {
      this.clearAllObjects();
      this.getProcessFlowList();

    }, false, true);
  }
//#endregion

//#region
  updateFlagSet(index: number,ActionID?:number ) {
    this.processFlowObject.WF_MProcessFlowDetails[index].Edit = true;
    this.processFlowObject.WF_MProcessFlowDetails[index].ModifyByID = this.LoggedUser;
    this.processFlowObject.WF_MProcessFlowDetails.filter((item, index) => { item.IsRowDuplicate = false; return item });
  }
//#endregion

//#region
SaveUpdateCommon() {
    if (this.processFlowObject.WF_MProcessFlowDetails.length == 0) {
      this.utilsService.toasterService.error('Atleast one Record is compulsary', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails.filter(item =>
      this.utilsService.isNullUndefinedOrBlank(item.SubStageID)
      && this.utilsService.isNullUndefinedOrBlank(item.PortalStatusID)
      && this.utilsService.isNullUndefinedOrBlank(item.ActionID)
      && this.utilsService.isNullUndefinedOrBlank(item.NextSubStageID)).length > 0) {
      this.utilsService.toasterService.error('Please Filed All compulsary', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.SubStageID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Sub Stage', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.ActionID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Action', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.NextSubStageID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Next SubStage.', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item => this.utilsService.isNullUndefinedOrBlank(item.PortalStatusID)).length != 0) {
      this.utilsService.toasterService.error('Please Provide Portal Status', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.processFlowObject.WF_MProcessFlowDetails
      .filter(item =>{
        let flag:boolean = false;
          if((item.ActionID == 2|| item.ActionID == 4 ) && item.ProcessFlowDetailID == 0){
          if(item.WF_MProcessFlowDetail_Action_Mappings.length ==0){
            flag = true;
          }}
          return flag;
        }).length != 0) {
      this.utilsService.toasterService.error('Atleast one Action Mapping Record is compulsary', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }


    //#region Find Duplication Objects
    let DuplicationArrayChecking = [];
    DuplicationArrayChecking = this.processFlowObject.WF_MProcessFlowDetails.
      map((item) => {
        return JSON.stringify({ SubStageID: item.SubStageID, ActionID: item.ActionID, NextSubStageID: item.NextSubStageID, PortalStatusID: item.PortalStatusID })
      })

    let RowsIndex = DuplicationArrayChecking.map((item, index, array) => { if (array.indexOf(item) !== index) { return index } return undefined }).filter(item => item != undefined);

    if (RowsIndex.length > 0) {
      let RowNumbers: string = RowsIndex.toString();
      let pos = RowNumbers.lastIndexOf(',');
      let messageToShow = RowsIndex.length > 1 ? `Duplication records Exits at ${RowNumbers.substr(0, pos) + ' and ' + RowNumbers.substr(pos + 1)}` : `Duplication records Exits at ` + RowNumbers;

      this.processFlowObject.WF_MProcessFlowDetails.filter((item, index) => {
        if (RowsIndex.indexOf(index) != -1) {
          item.IsRowDuplicate = true;
        } else {
          item.IsRowDuplicate = false;
        }
        return item;
      })

      this.utilsService.toasterService.error(messageToShow, null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    } else {
      this.processFlowObject.WF_MProcessFlowDetails.filter((item, index) => { item.IsRowDuplicate = false; return item });
    }
    //#endregion
    //Save OR Update Function call
    if (this.isUpdate == 0) {
      this.SaveProcessFlow();
    } else {
      this.updateProcessFlow();
    }

  }
//#endregion

  //#region
  DeleteProcessFlowConfirmation(processFlow: ProcessFlow) {
    this.processFlowObject = Object.assign({}, processFlow);
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.processFlowObject.ModificationDate = currentDate;
    this.processFlowObject.CreationDate = currentDate;
    this.processFlowObject.CreationDate = currentDate;
    this.processFlowObject.ModificationDate = currentDate;
    $('#ProcessFlowDeleteConfirmationModal').modal('show');
  }
//#endregion

//#region
  DeleteProcessFlow() {
    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.DeleteProcessFlowAPI, this.processFlowObject,
      (response) => {
        this.closeDeleteConfirmationPop();
        this.getProcessFlowList();
      }, false, true);
  }
  //#endregion

  //#region
  closeDeleteConfirmationPop() {
    if(this.deleteCount == 0){
      this.clearAllFields();
    }else if(this.deleteCount == 1){
      this.processFlowDetailObject = new ProcessFlowDetail();
    }else{
      this.actionMappingObject = new ActionMappingDetail();
    }
    this.deleteCount = 0;
    //this.isUpdate = 0;
    $('#ProcessFlowDeleteConfirmationModal').modal('hide');
  }
  //#endregion

  //#region
  DeleteProcessFlowDetailConfirmationModal(ProcessFlowDetail: ProcessFlowDetail) {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    ProcessFlowDetail.ModificationDate = currentDate;
    ProcessFlowDetail.CreationDate = currentDate;
    this.isDeleteProcessFlowDetail = true;
    this.deleteCount = 1;
    this.processFlowDetailObject = Object.assign({},ProcessFlowDetail);
    $('#ProcessFlowDeleteConfirmationModal').modal('show');

  }
  //#endregion

  //#region
  DeleteProcessFlowDetail(){
    if(this.processFlowObject.WF_MProcessFlowDetails.length > 1){
      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.DeleteProcessFlowDetailAPI, this.processFlowDetailObject,
        (response) => {
          this.getProcessFlowDetails(this.processFlowObject);
          this.closeDeleteConfirmationPop();
        }, false, true);
    }else{
      this.utilsService.toasterService.error('Record Cannot be deleted, Because here One record is Compulsary.', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }
  }
  //#endregion

  //#region
  clearAllObjects() {
    this.isUpdate = 0;
    this.clearAllFields();
    $('#addNewProcessFlow').modal('hide');
    this.processFlowObject.WF_MProcessFlowDetails = [];
    this.isDeleteProcessFlowDetail = false;
  }
  //#endregion

  //#region
  clearAllFields() {
    this.processFlowObject = new ProcessFlow();
  }
  //#endregion

  //#region
  actionMapping(data:ProcessFlowDetail,index:any){
    let processFlowDetailActionMappingArray = this.processFlowObject.WF_MProcessFlowDetails[index].WF_MProcessFlowDetail_Action_Mappings;
    this.indexOfActionMapping = index;
    if(this.isUpdate == 1){
      this.getActionMappingList(data);
    }
      this.arrayForActionMapping = processFlowDetailActionMappingArray;
    $('#addActionMappingModal').modal('show');
  }
//#endregion

//#region
clearActionMappingObject(){
    this.arrayForActionMapping = [];
  }
//#endregion

//#region
  addActionMapping(){
    if (this.arrayForActionMapping.filter(item =>
       this.utilsService.isNullUndefinedOrBlank(item.FileTypeID)).length > 0) {
      this.utilsService.toasterService.error('Please Provide File Type', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.isUpdate == 1) {
      this.arrayForActionMapping.unshift(Serialize(new ActionMappingDetail(),ActionMappingDetail));
    }else{
      this.arrayForActionMapping.unshift(new ActionMappingDetail());
    }

    this.arrayForActionMapping.filter((item, index) => { item.IsRowDuplicate = false; return item });
  }
//#endregion

//#region
  removeActionMapping(index: any) {
    if (this.arrayForActionMapping[index].ActionMappingID != 0) {
      this.deleteActionMappingDetailConfirmation(this.arrayForActionMapping[index]);
    } else {
      this.arrayForActionMapping.splice(index,1);
    }
  }
//#endregion

//#region
  closeActionMappingModal(){
    $('#addActionMappingModal').modal('hide');
    this.clearActionMappingObject();
    this.indexOfActionMapping = 0;
  }
//#endregion

//#region
  SaveActionMappingInto(){
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');

    if (this.arrayForActionMapping.length == 0) {
      this.utilsService.toasterService.error('Atleast one Record is compulsary', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }

    if (this.arrayForActionMapping.filter(item =>
      this.utilsService.isNullUndefinedOrBlank(item.FileTypeID)).length > 0) {
     this.utilsService.toasterService.error('Please Provide File Type', null!, {
       positionClass: 'toast-top-center',
       closeButton: true
     });
     return;
   }

   let DuplicationArrayChecking = [];
   DuplicationArrayChecking = this.arrayForActionMapping.map((item) => {return JSON.stringify({ FileTypeID: item.FileTypeID})})

   let RowsIndex = DuplicationArrayChecking.map((item, index, array) => { if (array.indexOf(item) !== index) { return index } return undefined }).filter(item => item != undefined);

   if (RowsIndex.length > 0) {
     let RowNumbers: string = RowsIndex.toString();
     let pos = RowNumbers.lastIndexOf(',');
     let messageToShow = RowsIndex.length > 1 ? `Duplication records Exits at ${RowNumbers.substr(0, pos) + ' and ' + RowNumbers.substr(pos + 1)}` : `Duplication records Exits at ` + RowNumbers;

     this.arrayForActionMapping.filter((item, index) => {
       if (RowsIndex.indexOf(index) != -1) {
         item.IsRowDuplicate = true;
       } else {
         item.IsRowDuplicate = false;
       }
       return item;
     })

     this.utilsService.toasterService.error(messageToShow, null!, {
       positionClass: 'toast-top-center',
       closeButton: true
     });
     return;
   } else {
     this.arrayForActionMapping.filter((item, index) => { item.IsRowDuplicate = false; return item });
   }


    this.arrayForActionMapping.filter(item=>{
                                      item.CreatedByID = this.LoggedUser;
                                      item.CreationDate = currentDate;
                                      item.ModifyByID = this.LoggedUser;
                                      item.ModificationDate = currentDate;
                                    });

    this.processFlowObject
    .WF_MProcessFlowDetails[this.indexOfActionMapping]
    .WF_MProcessFlowDetail_Action_Mappings = this.arrayForActionMapping.map(item=>{item.ActionID =  this.processFlowObject.WF_MProcessFlowDetails[this.indexOfActionMapping].ActionID;return item});
    this.closeActionMappingModal();
  }
//#region

//#region
  getActionMappingList(data:ProcessFlowDetail){
    this.processFlowDetailObject = Object.assign({}, data);
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    this.processFlowDetailObject.CreationDate = currentDate;
    this.processFlowDetailObject.ModificationDate = currentDate;
    let processFlowDetailActionMappingArray = this.processFlowObject.WF_MProcessFlowDetails[this.indexOfActionMapping].WF_MProcessFlowDetail_Action_Mappings


    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.GetActionMappingList, this.processFlowDetailObject, (response) => {
      if (!this.utilsService.isNullUndefinedOrBlank(response)) {
        this.arrayForActionMapping = this.utilsService.isNullUndefinedOrBlank(processFlowDetailActionMappingArray)? response.Result : processFlowDetailActionMappingArray ;
      }
    }, false, true);
  }
  //#endregion

  //#region
  deleteActionMappingDetailConfirmation(actionMappingObj:ActionMappingDetail){
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss a');
    actionMappingObj.ModificationDate = currentDate;
    actionMappingObj.CreationDate = currentDate;
    this.actionMappingObject = Object.assign({},actionMappingObj);
    this.deleteCount = 2;
    $('#ProcessFlowDeleteConfirmationModal').modal('show');
  }
  //#endregion

  //#region
  deleteActionMappingDetail(){
    if(this.arrayForActionMapping.length > 1){
      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.DeleteActionMappingList, this.actionMappingObject,
        (response) => {
          this.closeDeleteConfirmationPop();
          this.getActionMappingList(this.processFlowDetailObject);
        }, false, true);
    }else{
      this.utilsService.toasterService.error('Record Cannot be deleted, Because here One record is Compulsary.', null!, {
        positionClass: 'toast-top-center',
        closeButton: true
      });
      return;
    }
  }
//#endregion

//#region Delete Common for ProcessFlow,ProcessFlowDetail,ActionMapping
  commonDelete(){
    switch(this.deleteCount){
      case 0: this.DeleteProcessFlow();
              break;
      case 1: this.DeleteProcessFlowDetail();
              break;
      case 2:this.deleteActionMappingDetail();
            break;
      default:break;
    }
  }
  //#endregion

  //#region
  changeActionMappingFlag(index:any){
    this.arrayForActionMapping[index].Edit = true;
    this.arrayForActionMapping.filter((item, index) => { item.IsRowDuplicate = false; return item });
  }
//#endregion
}
