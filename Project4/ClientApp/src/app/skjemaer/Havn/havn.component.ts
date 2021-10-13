import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Havn } from "../../Models-typescript/Havn";

@Component({
  selector: "app-skjemaer-havn",
  templateUrl: "havn.component.html"
})
export class HavnComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      havnId: ["", Validators.required],
      navn: ["", Validators.required]


    });
  }


  lagreHavn() {

    const havn = new Havn();
    havn.havnId = this.Skjema.value.havnId;
    havn.navn = this.Skjema.value.navn;


    this._http.post("admin/lagreHavn", havn).subscribe((res) => {

    });
  }
  endreHavn() {

    const havn = new Havn();
    havn.havnId = this.Skjema.value.havnId;
    havn.navn = this.Skjema.value.navn;


    this._http.post("admin/endreHavn", havn).subscribe((res) => {

    });
  }
}
