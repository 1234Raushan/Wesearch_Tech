declare var chatlogout: Function;

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './utiles.service';

@Injectable({
  providedIn: 'root'
})
export class StorageListnerService implements OnDestroy {

  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable();
  key = 'user';

  constructor(public router: Router, public utilsService: UtilsService) {
    this.start();
  }
  ngOnDestroy() {
    this.stop();
  }

  public store(key: string, data: any): void {

    sessionStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data });

  }
  public clear(): void {
    const key = 'user';
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);

    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {

    if (event.storageArea === sessionStorage) {

      let v: any;
      try {
        v = JSON.parse(event.newValue||'');
      } catch (e) {
        v = event.newValue;
      }


      if (event.key === this.key) {
        if (!v) {

          this.router.navigate(['/labguru/login']);
        } else {
          this.utilsService.redirectTo('wfms/dashboard');
        }
      }
      this.onSubject.next({ key:<any>event.key, value: v });
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

}
