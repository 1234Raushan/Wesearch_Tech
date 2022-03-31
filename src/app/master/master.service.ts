import {  Injectable } from '@angular/core';
import { UtilsService } from '../services/utiles.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  SelectedID!:number;
  SelectList: any[];
  arrayForAutoTables:any[] = [];
  arrayForAutoTablesFilter:any[]=[];
  constructor(public utilsService: UtilsService) { 
    this.SelectList  = [{id:1,Name:'Auto_WF_Action'},
                        {id:2,Name:'Auto_WF_FileType'},
                        {id:3,Name:'Auto_WF_PortalStatus'},
                        {id:4,Name:'Auto_WF_Status'},
                        {id:5,Name:'Admin_Muser'}];
  }

//#region Get Data  
 getDetails(){
   let listObject = this.SelectList.find(item=>item.id == this.SelectedID);
  this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.GetMasterList,listObject, (response) => {
    // if (!this.utilsService.isNullUndefinedOrBlank(response)) {
      this.arrayForAutoTables = response.Result;
      this.arrayForAutoTablesFilter = response.Result;
    // }
  }, false, true);
 }
 //#endregion

//#region Grid Filter
   filterData(serach: any) {
    if (!this.utilsService.isNullUndefinedOrBlank(serach.value)) {
      this.arrayForAutoTables = this.arrayForAutoTablesFilter.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(serach.value.toLowerCase())
      );
    } else {
      this.arrayForAutoTables = this.arrayForAutoTablesFilter;
    }
  }
//#endregion
}
