import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utiles.service';
import { StorageListnerService } from '../../../services/storage-listner.service';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']

})
export class ToolbarComponent implements OnInit {
  constructor(public utilsService: UtilsService, public storageListernerService: StorageListnerService) { }


  ngOnInit() {
    this.loadScript('/assets/js/custom.min.js');
    $(document).ready(function () {
      $('.navbar-nav .sidebartoggler').click(function (e:any) {
        $('body').toggleClass('mini-sidebar');
        $(".submenu").removeClass('active');
        $(".collapse").removeClass('in');
        e.preventDefault();
      });

      $(".left-sidebar").mouseleave(function(){
        //  if($("body").hasClass("mini-sidebar")) {
          //     $(".submenu").removeClass('active');
          //     $(".collapse").removeClass('in');
          //   }
          if($("body").hasClass("mini-sidebar")) {
            $(".submenu").addClass('sidemenuadded');
          }
      });
      $(".left-sidebar").mouseenter(function(){
          if($("body").hasClass("mini-sidebar")) {
            $(".submenu").removeClass('sidemenuadded');
          }
      });

    });
  }


  public loadScript(url:string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  openLoginDetailsModal() {
    this.utilsService.openModal('loginDetailsModal');
  }

  WindowResize(e:any) {
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 0);
    }
}
