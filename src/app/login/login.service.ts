import { Deserialize } from 'cerialize';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {  Injectable } from '@angular/core';
import { User } from '../model/User';
import { UtilsService } from '../services/utiles.service';
import { StorageListnerService } from '../services/storage-listner.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  loginResponse = new User();
  flagForPasswordHideShow: boolean;
  isUpdate: number = 0;
  userOb = {
    EmailID: undefined,
    Password: undefined
  };
  EmailID!:any
  constructor(public utilsService: UtilsService, public storageService: StorageListnerService, public _formBuilder: FormBuilder) {
    this.flagForPasswordHideShow = true;
    this.forgotForm = this._formBuilder.group({
      EmailID: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }

  applyValidation(): void {
    this.loginForm = this._formBuilder.group({
      EmailID: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: [null, [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
    });
  }

  forgetPassword() {
    $('#forgetPassword').modal('show');
    //this.utilsService.openModal('forgetPassword');
  }

  loginAPI() {
    if (this.loginForm.valid) {

      const param = {
        'EmailID': this.userOb.EmailID,
        'Password': this.userOb.Password
      };
      this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.PostLoginAPI, param, (response, isResponseOnPage) => {
        this.utilsService.loaderStart--;
        if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
          this.loginResponse = Deserialize(response['Login_Data'], User);
          this.setLocalStorage(this.loginResponse);
          this.utilsService.redirectTo('/wfms/');
        }
      });
    }

  }

  //#region
  clearAllObjects() {
    this.isUpdate = 0;
    this.EmailID = null;
    $('#forgetPassword').modal('hide');
    // this.utilsService.hideModal('addNewStage');
    this.forgotForm.controls['EmailID'].setErrors(null);
    this.forgotForm.reset();
  }
  //#endregion

  ResetPassword() {
    if (this.forgotForm.valid) {

      const reset ={EmailID:this.EmailID};

      this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.ForgetPasswordUpAPI, reset, (response, isResponseOnPage) => {
        this.utilsService.loaderStart--;
        $('#forgetPassword').modal('hide');
        if (!this.utilsService.isEmptyObjectOrNullUndefiend(response)) {
          this.loginResponse = Deserialize(response['Login_Data'], User);
          this.setLocalStorage(this.loginResponse);
        }
      });
    }
  }

  setLocalStorage(loginResponse: User) {
    const promise = new Promise<void>((resolve, reject) => {
      try {
        this.storageService.store('user', JSON.stringify(loginResponse));
        resolve();
      } catch (error) {
        reject();
      }
    });
    return promise;
  }

}
