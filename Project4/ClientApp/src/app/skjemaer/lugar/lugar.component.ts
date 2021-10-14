

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
      lugarId: ["", Validators.required],
      bildeUrl: ["", Validators.required],
      beskrivelse: ["", Validators.required],
      antall: ["", Validators.required],
      lugarType: ["", Validators.required],
      tittel: ["", Validators.required],
      romNr: ["", Validators.required],
      pris: ["", Validators.required],
      harWc: ["", Validators.required],
      harDysj: ["", Validators.required],
      harWifi: ["", Validators.required]
    });
  }

  lagreLugar() {

    const lugar = new Lugar();
    lugar.lugarId = this.Skjema.value.lugarId;
    lugar.bildeUrl = this.Skjema.value.bildeUrl;
    lugar.beskrivelse = this.Skjema.value.beskrivelse;
    lugar.antall = this.Skjema.value.antall;
    lugar.lugarType = this.Skjema.value.lugarType;
    lugar.tittel = this.Skjema.value.tittel;
    lugar.romNr = this.Skjema.value.romNr;
    lugar.pris = this.Skjema.value.pris;
    lugar.harWc = this.Skjema.value.harWc;
    lugar.harDysj = this.Skjema.value.harDysj;
    lugar.harWifi = this.Skjema.value.harWifi;

    this._http.post("admin/lagreLugar", lugar).subscribe((res) => {

    });
  }

  endreLugar() {

    const lugar = new Lugar();
    lugar.lugarId = this.Skjema.value.lugarId;
    lugar.bildeUrl = this.Skjema.value.bildeUrl;
    lugar.beskrivelse = this.Skjema.value.beskrivelse;
    lugar.antall = this.Skjema.value.antall;
    lugar.lugarType = this.Skjema.value.lugarType;
    lugar.tittel = this.Skjema.value.tittel;
    lugar.romNr = this.Skjema.value.romNr;
    lugar.pris = this.Skjema.value.pris;
    lugar.harWc = this.Skjema.value.harWc;
    lugar.harDysj = this.Skjema.value.harDysj;
    lugar.harWifi = this.Skjema.value.harWifi;

    this._http.post("admin/endreLugar", lugar).subscribe((res) => {

    });
  }

  visEndre(index: number) {
    this.Skjema.setValue({
      lugarId: this.lugarer[index].lugarId,
      bildeUrl: this.lugarer[index].bildeUrl,
      beskrivelse: this.lugarer[index].beskrivelse,
      antall: this.lugarer[index].antall,
      lugarType: this.lugarer[index].lugarType,
      tittel: this.lugarer[index].tittel,
      romNr: this.lugarer[index].romNr,
      pris: this.lugarer[index].pris,
      harWc: this.lugarer[index].harWc,
      harDysj: this.lugarer[index].harDysj,
      harWifi: this.lugarer[index].harWifi
    });

  }
  ngOnInit() {
    this.hentAlleLugarer();
  }
  hentAlleLugarer() {
    this.laster = "Laster inn...";
    this._http.get<Lugar[]>("admin/hentLugarer").subscribe((res) => {
      this.lugarer = res;
      this.laster = "";
    }, err => { }, () => { });
  }


  
}

