import { deserializeAs, serializeAs } from "cerialize";

export class ActionMappingDetail {

  @serializeAs('ActionMappingID')
  @deserializeAs('ActionMappingID')
  private _ActionMappingID!: number;

  public get ActionMappingID(): number {
    return this._ActionMappingID;
  }

  public set ActionMappingID(value: number) {
    this._ActionMappingID = value;
  }

  @serializeAs('ProcessFlowDetailID')
  @deserializeAs('ProcessFlowDetailID')
  private _ProcessFlowDetailID!: number;

  public get ProcessFlowDetailID(): number {
    return this._ProcessFlowDetailID;
  }

  public set ProcessFlowDetailID(value: number) {
    this._ProcessFlowDetailID = value;
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

  @serializeAs('SubActionID')
  @deserializeAs('SubActionID')
  private _SubActionID!: number;

  public get SubActionID(): number {
    return this._SubActionID;
  }

  public set SubActionID(value: number) {
    this._SubActionID = value;
  }

  @serializeAs('FileTypeID')
  @deserializeAs('FileTypeID')
  private _FileTypeID!: number;

  public get FileTypeID(): number {
    return this._FileTypeID;
  }

  public set FileTypeID(value: number) {
    this._FileTypeID = value;
  }

  @serializeAs('IsMandatory')
  @deserializeAs('IsMandatory')
  private _IsMandatory!: any;

  public get IsMandatory(): any {
    return this._IsMandatory;
  }

  public set IsMandatory(value: any) {
    this._IsMandatory = value;
  }

  @serializeAs('AllowMultipalFiles')
  @deserializeAs('AllowMultipalFiles')
  private _AllowMultipalFiles!: any;

  public get AllowMultipalFiles(): any {
    return this._AllowMultipalFiles;
  }

  public set AllowMultipalFiles(value: any) {
    this._AllowMultipalFiles = value;
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


  constructor(){
    this.SubActionID = 0;
    this.ActionMappingID = 0;
    this.Edit = false;
    this.Delete = false;
    this.IsRowDuplicate = false;
  }

}
