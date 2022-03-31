import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariableService {
  constructor() { }

  STRING_WHEN_NO_RECORDS_FOUND = 'No records found.';
  STRING_WHEN_NO_ATTCHAMENT_FOUND = 'No attachment found.';

  // PATH For API
  PATH_FOR_API = 'api/';
  // API for Login
  PostLoginAPI = this.PATH_FOR_API + 'Admin/Login';

  //Stage Api Calls
  PostSignUpAPI = this.PATH_FOR_API + 'Admin/Signup';
  ForgetPasswordUpAPI = this.PATH_FOR_API + 'Admin/ForgetPassword';
  GetStageList = this.PATH_FOR_API + 'WorkStage/List';
  SaveStageAPI = this.PATH_FOR_API + 'WorkStage/Save';
  DeleteStageAPI = this.PATH_FOR_API + 'WorkStage/Delete';
  UpdateStageAPI = this.PATH_FOR_API + 'WorkStage/Update';

  //Process Flow Api Calls
  GetDDLList =  this.PATH_FOR_API + 'WorkFlow/DD_List';
  GetProcessFlowList = this.PATH_FOR_API + 'WorkFlow/List';
  SaveProcessFlowAPI = this.PATH_FOR_API + 'WorkFlow/Save';
  GetProcessFlowDetailList = this.PATH_FOR_API + 'WorkFlow/List_Detail';
  UpdateProcessFlowAPI = this.PATH_FOR_API + 'WorkFlow/Update';
  DeleteProcessFlowAPI = this.PATH_FOR_API + 'WorkFlow/Delete';
  DeleteProcessFlowDetailAPI = this.PATH_FOR_API + 'WorkFlow/Delete_Detail';
  //Action mapping
  GetActionMappingList = this.PATH_FOR_API + 'WorkFlow/Action_Mapping_List_Detail';
  DeleteActionMappingList = this.PATH_FOR_API + 'WorkFlow/Action_Mapping_Delete_Detail';

  //Rejection Reason Api Calls
  ListRejectionReasonAPI = this.PATH_FOR_API + 'RejectionReason/List';
  SaveRejectionReasonAPI=this.PATH_FOR_API+ 'RejectionReason/Save';
  DeleteRejectionReasonAPI = this.PATH_FOR_API + 'RejectionReason/Delete';
  UpdateRejectionReasonAPI = this.PATH_FOR_API + 'RejectionReason/Update';

  //Master List
  GetMasterList = this.PATH_FOR_API + 'Common/AutoTableList';
}
