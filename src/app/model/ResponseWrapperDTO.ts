import { serializeAs, deserializeAs } from 'cerialize';

export class ResponseWrapperDTO {
  @deserializeAs('status')
  private _status: number;

  @deserializeAs('message')
  private _message: string;

  @deserializeAs('data')
  private _data: string;

  @serializeAs('error')
  @deserializeAs('error')
  private _error: string;

  @deserializeAs('token')
  private _token: string;

  /**
   * Getter status
   * @return {number}
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Getter message
   * @return {string}
   */
  public get message(): string {
    return this._message;
  }


  /**
   * Getter error
   * @return {string}
   */
  public get error(): string {
    return this._error;
  }

  /**
   * Setter status
   * @param {number} value
   */
  public set status(value: number) {
    this._status = value;
  }

  /**
   * Setter message
   * @param {string} value
   */
  public set message(value: string) {
    this._message = value;
  }



  /**
   * Setter error
   * @param {string} value
   */
  public set error(value: string) {
    this._error = value;
  }


  /**
   * Getter data
   * @return {string}
   */
  public get data(): string {
    return this._data;
  }

  /**
   * Setter data
   * @param {string} value
   */
  public set data(value: string) {
    this._data = value;
  }

  /**
   * Getter token
   * @return {string}
   */
  public get token(): string {
    return this._token;
  }

  /**
   * Setter token
   * @param {string} value
   */
  public set token(value: string) {
    this._token = value;
  }

  constructor(){
    this._status = 0;
    this._message = '';
    this._data = '';
    this._error = '';
    this._token = '';
  }
}

