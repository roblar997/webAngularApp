import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  erLoggetInn = undefined;

  constructor( private _http: HttpClient) {
  }

  erInnlogget() {
    if (this.erLoggetInn == undefined) {
      return this.erLoggetInn;
    }

    this._http.get<boolean>("admin/erLoggetInn").subscribe((res) => {
      this.erLoggetInn = res;
    }, err => { }, () => { });

    return false;
  }
}
