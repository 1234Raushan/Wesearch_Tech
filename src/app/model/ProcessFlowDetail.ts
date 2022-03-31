import { deserializeAs, serializeAs } from 'cerialize';
import { ActionMappingDetail } from './ActionMappingDetail';

export class ProcessFlowDetail {
  @serializeAs('ProcessFlowDetailID')
  @deserializeAs('ProcessFlowDetailID')
  private _ProcessFlowDetailID!: number;

  public get ProcessFlowDetailID(): number {
    return this._ProcessFlowDetailID;
  }

  public set ProcessFlowDetailID(value: number) {
    this._ProcessFlowDetailID = value;
  }
  @serializeAs('ProcessFlowID')
  @deserializeAs('ProcessFlowID')
  private _ProcessFlowID!: number;

  public get ProcessFlowID(): number {
    return this._ProcessFlowID;
  }

  public set ProcessFlowID(value: number) {
    this._ProcessFlowID = value;
  }
  @serializeAs('SubStageID')
  @deserializeAs('SubStageID')
  private _SubStageID!: number;

  public get SubStageID(): number {
    return this._SubStageID;
  }

  public set SubStageID(value: number) {
    this._SubStageID = value;
  }
  @serializeAs('ActionID')
  @deserializeAs('ActionID')
  private _ActionID!: number;

  public get ActionID(): number {
    return this._ActionID;
  }

  public set ActionID(value: number) {
    this._ActionID = value;
  }
  @serializeAs('NextSubStageID')
  @deserializeAs('NextSubStageID')
  private _NextSubStageID!: number;

  public get NextSubStageID(): number {
    return this._NextSubStageID;
  }

  public set NextSubStageID(value: number) {
    this._NextSubStageID = value;
  }
  @serializeAs('PortalStatusID')
  @deserializeAs('PortalStatusID')
  private _PortalStatusID!: number;

  public get PortalStatusID(): number {
    return this._PortalStatusID;
  }

  public set PortalStatusID(value: number) {
    this._PortalStatusID = value;
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

  @serializeAs('CreatedBy')
  @deserializeAs('CreatedBy')
  private _CreatedBy!: string;

  public get CreatedBy(): string {
    return this._CreatedBy;
  }

  public set CreatedBy(value: string) {
    this._CreatedBy = value;
  }

  @serializeAs('ModifyBy')
  @deserializeAs('ModifyBy')
  private _ModifyBy!: string;

  public get ModifyBy(): string {
    return this._ModifyBy;
  }

  public set ModifyBy(value: string) {
    this._ModifyBy = value;
  }

  @serializeAs('Edit')
  @deserializeAs('Edit')
  private _Edit!: boolean;

  public get Edit(): boolean {
    return this._Edit;
  }

  public set Edit(value: boolean) {
    this._Edit = value;
  }

  @serializeAs('Delete')
  @deserializeAs('Delete')
  private _Delete!: boolean;

  public get Delete(): boolean {
    return this._Delete;
  }

  public set Delete(value: boolean) {
    this._Delete = value;
  }

  @serializeAs('IsRowDuplicate')
  @deserializeAs('IsRowDuplicate')
  private _IsRowDuplicate!: boolean;

  public get IsRowDuplicate(): boolean {
    return this._IsRowDuplicate;
  }

  public set IsRowDuplicate(value: boolean) {
    this._IsRowDuplicate = value;
  }

  @serializeAs('WF_MProcessFlowDetail_Action_Mappings')
  @deserializeAs('WF_MProcessFlowDetail_Action_Mappings')
  private _WF_MProcessFlowDetail_Action_Mappings!: ActionMappingDetail[];

  public get WF_MProcessFlowDetail_Action_Mappings(): ActionMappingDetail[] {
    return this._WF_MProcessFlowDetail_Action_Mappings;
  }

  public set WF_MProcessFlowDetail_Action_Mappings(value: ActionMappingDetail[]) {
    this._WF_MProcessFlowDetail_Action_Mappings = value;
  }


  constructor(){
    this.ProcessFlowDetailID = 0;
    this.Edit = false;
    this.Delete = false;
    this.IsRowDuplicate =  false;
    this.WF_MProcessFlowDetail_Action_Mappings = [];
  }

}
