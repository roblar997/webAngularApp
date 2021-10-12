import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Lugar } from "../../Models-typescript/Lugar";

@Component({
  selector: "app-skjemaer-lugar",
  templateUrl: "lugar.component.html"
})
export class LugarComponent {

  Skjema: FormGroup;
  
  public lugarer: Array<Lugar>;
  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      fornavn: ["", Validators.required],
      etternavn: ["", Validators.required],
      telefon: ["", Validators.required]
    });
  }

  hentAlleLugarer() {
    this.laster = "Laster inn...";
    this._http.get<Lugar[]>("admin/hentLugarer").subscribe((res) => {
      this.lugarer = res;
      this.laster = "";
      }, err => { }, () => { });
  }


  onSubmit() {

  }
}

