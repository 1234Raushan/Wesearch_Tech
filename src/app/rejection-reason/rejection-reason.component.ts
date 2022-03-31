import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utiles.service';
import { RejectionReasonService } from './rejection-reason.service';

@Component({
  selector: 'app-rejection-reason',
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent extends RejectionReasonService implements OnInit {

  constructor(public utilsService:UtilsService,public fb:FormBuilder,public datePipe:DatePipe) { super(utilsService,fb,datePipe)}


  ngOnInit(): void {
  }

}
