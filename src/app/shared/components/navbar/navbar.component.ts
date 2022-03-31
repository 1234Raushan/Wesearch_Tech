import { Component, OnInit } from '@angular/core';
import { Deserialize, Serialize } from 'cerialize';
import { User } from 'src/app/model/User';
import { StorageListnerService } from 'src/app/services/storage-listner.service';
import { UtilsService } from 'src/app/services/utiles.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  LoginCompanyID !: number;
  FinancialYearID !: number;
  arrayOfLoginCompany: any = [];
  arrayOfFinancialYear: any = [];

  constructor(public utilsService: UtilsService, public storageService: StorageListnerService) {
  }

  ngOnInit() {
    $(function () {
      $("#sidebarnav").metisMenu();
    });

    $(document).ready(function () {
      // $('#sidebarnav li').removeClass('active');
      // $('#sidebarnav li').click(function (e) {
      //   //remove all pre-existing active classes
      //   alert('Kishan 1');
      //   $('#sidebarnav li').removeClass('active');
      //   //add the active class to the link we clicked
      //   $('#sidebarnav li').addClass('active');
      //   e.preventDefault();
      // });

      // $('.dyanamic-menu li a').click(function (event2) {
      //   $(".default-menu li a").removeClass("active");
      //   event2.preventDefault();
      // });

    });
  }
}
