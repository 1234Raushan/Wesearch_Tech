import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utiles.service';
import { MasterService } from './master.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent extends MasterService implements OnInit {
  // obj:MasterService=new MasterService();
  constructor(public utilsService: UtilsService, public formBuilder: FormBuilder) {
    super(utilsService);
  }

  ngOnInit(): void {
  }

  

}
