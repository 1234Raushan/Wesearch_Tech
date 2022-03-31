import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utiles.service';
import { ProcessflowService } from './processflow.service';

@Component({
  selector: 'app-processflow',
  templateUrl: './processflow.component.html',
  styleUrls: ['./processflow.component.css']
})
export class ProcessflowComponent extends ProcessflowService implements OnInit {

  constructor(public utilsService: UtilsService,public fb: FormBuilder,public datePipe: DatePipe) {
    super(utilsService,fb,datePipe);
  }

  ngOnInit(): void {
  }

}
