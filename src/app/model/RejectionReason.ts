import { deserializeAs, serializeAs } from 'cerialize';
export class RejectionReason {

    @serializeAs('ReasonID')
    @deserializeAs('ReasonID')
    private _ReasonID!: number;
  
    public get ReasonID(): number {
      return this._ReasonID;
    }
  
    public set ReasonID(value: number) {
      this._ReasonID = value;
    }
  
  @serializeAs('Reason')
  @deserializeAs('Reason')
  private _Reason!: string;

  public get Reason(): string {
    return this._Reason;
  }

  public set Reason(value: string) {
    this._Reason = value;
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
    this.ReasonID = 0;
    this.ModifyByID = 0;
    this.CreatedByID = 0;
    this.Deactivate = false;
  }

}