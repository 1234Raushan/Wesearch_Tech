import { deserializeAs, serializeAs } from 'cerialize';
import { ProcessFlowDetail } from './ProcessFlowDetail';

export class ProcessFlow {
  @serializeAs('ProcessFlowID')
  @deserializeAs('ProcessFlowID')
  private _ProcessFlowID!: number;

  public get ProcessFlowID(): number {
    return this._ProcessFlowID;
  }

  public set ProcessFlowID(value: number) {
    this._ProcessFlowID = value;
  }
  @serializeAs('ProcessFlowName')
  @deserializeAs('ProcessFlowName')
  private _ProcessFlowName!: string;

  public get ProcessFlowName(): string {
    return this._ProcessFlowName;
  }

  public set ProcessFlowName(value: string) {
    this._ProcessFlowName = value;
  }
  @serializeAs('Remark')
  @deserializeAs('Remark')
  private _Remark!: string;

  public get Remark(): string {
    return this._Remark;
  }

  public set Remark(value: string) {
    this._Remark = value;
  }
  @serializeAs('Deactivate')
  @deserializeAs('Deactivate')
  private _Deactivate!: any;

  public get Deactivate(): any {
    return this._Deactivate;
  }

  public set Deactivate(value: any) {
    this._Deactivate = value;
  }
  @serializeAs('CreatedByID')
  @deserializeAs('CreatedByID')
  private _CreatedByID!: number;

  public get CreatedByID(): number {
    return this._CreatedByID;
  }

  public set CreatedByID(value: number) {
    this._CreatedByID = value;
  }
  @serializeAs('CreationDate')
  @deserializeAs('CreationDate')
  private _CreationDate!: any;

  public get CreationDate(): any {
    return this._CreationDate;
  }

  public set CreationDate(value: any) {
    this._CreationDate = value;
  }

  @serializeAs('WF_MProcessFlowDetails')
  @deserializeAs('WF_MProcessFlowDetails')
  private _WF_MProcessFlowDetails!: ProcessFlowDetail[];

  public get WF_MProcessFlowDetails(): ProcessFlowDetail[]{
    return this._WF_MProcessFlowDetails;
  }

  public set WF_MProcessFlowDetails(value: ProcessFlowDetail[]) {
    this._WF_MProcessFlowDetails = value;
  }

  @serializeAs('ModifyByID')
  @deserializeAs('ModifyByID')
  private _ModifyByID!: number;

  public get ModifyByID(): number {
    return this._ModifyByID;
  }

  public set ModifyByID(value: number) {
    this._ModifyByID = value;
  }
  @serializeAs('ModificationDate')
  @deserializeAs('ModificationDate')
  private _ModificationDate!: any;

  public get ModificationDate(): any {
    return this._ModificationDate;
  }

  public set ModificationDate(value: any) {
    this._ModificationDate = value;
  }

  @serializeAs('Status')
  @deserializeAs('Status')
  private _Status!: any;

  public get Status(): any {
    return this._Status;
  }

  public set Status(value: any) {
    this._Status = value;
  }


constructor(){
  this.ProcessFlowID = 0;
  this.Deactivate = false;
  this.WF_MProcessFlowDetails = [];
}

}
