import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ValidationsService } from './validations.service';
import { Deserialize, Serialize } from 'cerialize';
import { ToastrService } from 'ngx-toastr';
import { ServerVariableService } from './server-varible-service';
import { User } from '../model/User';
import { ResponseWrapperDTO } from '../model/ResponseWrapperDTO';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /*Live Api Link*/
  // static URL ='https://edge.illusiondentallab.com/WFMS_API/';

  /*Uat Api Link*/
  static URL ='http://uat.illusiondentallab.com/WFMS_API/';
  //static URL ='http://localhost:44329/WFMS_API/';
 // https://localhost:44329/
  static FRONT_URL = 'localhost:4200';
  ipAddress: any;
  profileUrl: string = '';
  loaderStart = 0;

  toastConfig = {
    disableTimeOut: true,
    timeOut: 0,
    positionClass: 'toast-top-center',
    closeButton: true,
  };

  dateFormate = 'dd-MM-yyyy a';

  blankDataMessage:any;

  // Start pass data login page to forogot-password page using service.
  data:string = '';
  setUserName(value:any) {
    this.data = value;
  }

  getUserName() {
    return this.data;
  }
  // End

  constructor(public http: HttpClient, public router: Router,
    public serverVariableService: ServerVariableService,
    public toasterService: ToastrService,
    public validationService: ValidationsService) {
    if (!this.isNullUndefinedOrBlank(this.getLoginUsers())) {
      if (this.getLoginUsers().Profile) {
        this.profileUrl = this.getLoginUsers().Profile;
      } else {
        this.profileUrl = 'assets/images/1.jpg';
      }
    }

  }

  getToken(): any {
    return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
    // return localStorage.getItem('token') ? localStorage.getItem('token') : null;
  }


  /**
 * @author : Dhrumin-Ranoliya
 * @param isDisplayToast display tost or not , pass true or false
 * @param url API name
 * @param params params
 * @param callback response of server
 */
  postMethodAPI(isDisplayToast:boolean, apiName:string, params:any, callback: (response: any, isRoute: boolean) => void, isCallbackRequired?: boolean, isFormData?: boolean, isLoaderRequired?: boolean, isApiUrlProvided?: boolean) {
    if (!isLoaderRequired) {

      this.loaderStart++;
    }
    this.customJsonInclude(params);
    let headers = new HttpHeaders();

    if (!isFormData) {

      headers = headers.set('Content-Type', 'application/json');
    }

    //apiName = UtilsService.URL + apiName;
    apiName = isApiUrlProvided ? apiName : UtilsService.URL + apiName;
    return this.http.post(apiName, params, { headers: headers }).subscribe(response => {
      if (!isLoaderRequired) {

        if (this.loaderStart > 0) {
          this.loaderStart--;
        }
      }
      const serverResponse = Deserialize(response, ResponseWrapperDTO);

      if (!(serverResponse.status < 200 || serverResponse.status >= 300)) {


        if (isDisplayToast) {
          this.toasterService.success(serverResponse.message, '', {
            positionClass: 'toast-top-center',
            closeButton: true
          });

        }
        callback(serverResponse.data, true);
      } else {
        this.blankDataMessage=serverResponse._message;

        if (isCallbackRequired) {
          callback(serverResponse, true);
        }else {

          this.toasterService.error(serverResponse.message, '', {
            positionClass: 'toast-top-center',
            closeButton: true
          });
        }

      }

      if(!this.isNullUndefinedOrBlank(serverResponse.token)){
        sessionStorage.setItem('token_mobile', serverResponse.token);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.toasterService.error('Server down..', '', this.toastConfig);
        }
        else {
          const errorDTO = Deserialize(err.error, ResponseWrapperDTO);
          if(errorDTO){
          this.toasterService.error(errorDTO.message ? errorDTO.message : errorDTO.error, '', this.toastConfig);
          if (isCallbackRequired) {
            callback(errorDTO.message, true);
          }
          }
        }
        this.loaderStart--;
      }
    );
  }

  /**
  * This Method Is Use For Remove Blank And Null Key From Object.
  */
  customJsonInclude(obj:any): void {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (obj[key] && obj[key].length > 0) {
          obj[key] = this.removeEmptyElementsFromArray(obj[key]);
        }
        if (this.isEmptyObject(obj[key])) {
          delete obj[key];
        } else {
          this.customJsonInclude(obj[key]);
        }
      } else {
        if (obj[key] === undefined || obj[key] === null) {
          delete obj[key];
        }
      }
    }
  }

  /**
  * This Method Is Use From Remove Empty Element From Array
  * @param test_array  your selected array pass as args.
  */
  removeEmptyElementsFromArray(test_array:any): Array<any> {
    let index = -1;
    const arr_length = test_array ? test_array.length : 0;
    let resIndex = -1;
    const result = [];

    while (++index < arr_length) {
      const id = test_array[index];
      if (id) {
        result[++resIndex] = id;
      }
    }
    return result;
  }

  /*
  *
  * Used to check if object ios empaty or not..!
  * @param obj = 'indecated object which you want to check'
  * return true if empty..!
  */
  isEmptyObject(obj:any): boolean {
    return (obj && (Object.keys(obj).length === 0));
  }

  isAuthenticated(): any {
    return sessionStorage.getItem('isAuthenticate') ? sessionStorage.getItem('isAuthenticate') : null;
  }

  isNullUndefinedOrBlank(obj:any): boolean {
    if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
      return true;
    }
    return false;
  }

  isEmptyObjectOrNullUndefiend(...value:any[]): boolean {
    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        if (this.isNullUndefinedOrBlank(value[i]) || this.isEmptyObject(value[i])) {
          return true;
        }
      }
    }
    return false;
  }

  redirectTo(...route:any): void {
    this.router.navigate(route);
  }

  redirectToWithQueryParam(param:any, route: Array<string>): void {
    console.warn(param);
    console.warn(route);
    this.router.navigate(route, { queryParams: param, skipLocationChange : true});
  }


  /**
   * @author Dhrumin Ranoliya
   * @param modalId : id for hideModal
   * @function hideModal used for hide opened modal using modalId
   */
  hideModal(modalId: string) {
    $('' + '#' + modalId + '').modal('hide');
  }

  /**
   * @author Dhrumin Ranoliya
   * @param modalId : id for openModal
   * @function openModal used for open modal using modalId
   */
  openModal(modalId: string) {
    $('' + '#' + modalId + '').modal({ backdrop: 'static', keyboard: false });
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement:any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  convertBase64ToBlob(imageBase64: string) {
    const ImageURL = imageBase64;
    // Split the base64 string in data and contentType
    const block = ImageURL.split(';');
    // Get the content type of the image
    const contentType = block[0].split(':')[1]; // In this case 'image/gif'
    // get the real base64 content of the file
    const realData = block[1].split(',')[1]; // In this case 'R0lGODlhPQBEAPeoAJosM....'

    // Convert it to a blob to upload
    const blob = this.b64toBlob(realData, contentType);
    return blob;
  }

  getLoginUsers(): any {
    // const user = Serialize(JSON.parse(localStorage.getItem('user')), User);
    const user = Serialize(JSON.parse(sessionStorage.getItem('user')!),User);
    if (user != null) {
      return user;
    }
    return null;
  }


  /**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @return Blob
 */
  b64toBlob(b64Data:any, contentType:any, sliceSize?:any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  jsonConcat(o1:any, o2:any) {
    for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }

}
