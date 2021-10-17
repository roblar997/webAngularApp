import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  erLoggetInn = undefined;

  constructor( private _http: HttpClient, private router: Router) {
  }

  erInnlogget() {
    if (this.erLoggetInn == true) {
      this.router.navigate(['/lugar']);
    }
    if (this.erLoggetInn != undefined) {
      return this.erLoggetInn;
    }

    this._http.get<boolean>("admin/erLoggetInn").subscribe((res) => {
      this.erLoggetInn = res;
    }, err => { }, () => { return this.erLoggetInn; });


  }
}
