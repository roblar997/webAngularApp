import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RuteforekomstDato } from "../../Models-typescript/ruteforekomstdato";

@Component({
  selector: "app-skjemaer-ruteforekomstdato",
  templateUrl: "ruteforekomstdato.component.html"
})
export class RuteforekomstdatoComponent {

  Skjema: FormGroup;
  public ruteforekomstdatoer: Array<RuteforekomstDato>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      forekomstDatoId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      ruteId: ["", Validators.required],
      erUtsolgt: ["", Validators.required]
    });
  }

  lagreForekomstDato() {

    const ruteforekomstdato = new RuteforekomstDato();
    ruteforekomstdato.forekomstDatoId = this.Skjema.value.forekomstDatoId;
    ruteforekomstdato.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdato.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdato.erUtsolgt = this.Skjema.value.erUtsolgt;


    this._http.post("admin/lagreRuteforekomstdato", ruteforekomstdato).subscribe((res) => {

    });
  }
  endreForekomstDato() {

    const ruteforekomstdato = new RuteforekomstDato();
    ruteforekomstdato.forekomstDatoId = this.Skjema.value.forekomstDatoId;
    ruteforekomstdato.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdato.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdato.erUtsolgt = this.Skjema.value.erUtsolgt;


    this._http.post("admin/endreRuteforekomstdato", ruteforekomstdato).subscribe((res) => {

    });
  }
  hentAlleRuteforekomstdatoer() {
    this.laster = "Laster inn...";
    this._http.get<RuteforekomstDato[]>("admin/hentBetalinger").subscribe((res) => {
      this.ruteforekomstdatoer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

