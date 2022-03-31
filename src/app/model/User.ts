import { deserializeAs, serializeAs } from 'cerialize';

export class User {
  @serializeAs('UserID')
  @deserializeAs('UserID')
  private _UserID!: number;

  public get UserID(): number {
    return this._UserID;
  }

  public set UserID(value: number) {
    this._UserID = value;
  }
  @serializeAs('EmailID')
  @deserializeAs('EmailID')
  private _EmailID!: string;

  public get EmailID(): string {
    return this._EmailID;
  }

  public set EmailID(value: string) {
    this._EmailID = value;
  }
  @serializeAs('MobileNo')
  @deserializeAs('MobileNo')
  private _MobileNo!: string;

  public get MobileNo(): string {
    return this._MobileNo;
  }

  public set MobileNo(value: string) {
    this._MobileNo = value;
  }
  @serializeAs('UserName')
  @deserializeAs('UserName')
  private _UserName!: string;

  public get UserName(): string {
    return this._UserName;
  }

  public set UserName(value: string) {
    this._UserName = value;
  }
  @serializeAs('ProfileName')
  @deserializeAs('ProfileName')
  private _ProfileName!: string;

  public get ProfileName(): string {
    return this._ProfileName;
  }

  public set ProfileName(value: string) {
    this._ProfileName = value;
  }
  @serializeAs('Password')
  @deserializeAs('Password')
  private _Password!: string;

  public get Password(): string {
    return this._Password;
  }

  public set Password(value: string) {
    this._Password = value;
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
}
