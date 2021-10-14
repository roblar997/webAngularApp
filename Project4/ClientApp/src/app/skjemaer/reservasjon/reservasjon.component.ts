import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Reservasjon } from "../../Models-typescript/Reservasjon";

@Component({
  selector: "app-skjemaer-reservasjon",
  templateUrl: "reservasjon.component.html"
})
export class ReservasjonComponent {

  Skjema: FormGroup;
  public reservasjoner: Array<Reservasjon>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      ruteId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required]
    });
  }

  lagreReservasjon() {

    const reservasjon = new Reservasjon();
    reservasjon.billettId = this.Skjema.value.billettId;
    reservasjon.ruteId = this.Skjema.value.ruteId;
    reservasjon.avgangsDato = this.Skjema.value.avgangsDato;
    reservasjon.avgangsTid = this.Skjema.value.avgangsTid;


    this._http.post("admin/lagreReservasjon", reservasjon).subscribe((res) => {

    });
  }

  endreReservasjon() {

    const reservasjon = new Reservasjon();
    reservasjon.billettId = this.Skjema.value.billettId;
    reservasjon.ruteId = this.Skjema.value.ruteId;
    reservasjon.avgangsDato = this.Skjema.value.avgangsDato;
    reservasjon.avgangsTid = this.Skjema.value.avgangsTid;


    this._http.post("admin/endreReservasjon", reservasjon).subscribe((res) => {

    });
  }
  visEndre(index: number) {
  
  }
  hentAlleReservasjoner() {
    this.laster = "Laster inn...";
    this._http.get<Reservasjon[]>("admin/hentReservasjoner").subscribe((res) => {
      this.reservasjoner = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

