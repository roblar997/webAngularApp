import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Betaling } from "../../Models-typescript/Betaling";

@Component({
  selector: "app-skjemaer-betaling",
  templateUrl: "betaling.component.html"
})
export class BetalingComponent {

  Skjema: FormGroup;
  public betalinger: Array<Betaling>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      betalingsId: ["", Validators.required],
      kortnummer: ["", Validators.required],
      utloper: ["", Validators.required],
      postnr: ["", Validators.required],
      poststed: ["", Validators.required],
      telefon: ["", Validators.required],
      adresse: ["", Validators.required],
      email: ["", Validators.required],
      csv: ["", Validators.required],
      pris: ["", Validators.required]

    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({

    });

  }
  lagreBetaling() {
    const betaling = new Betaling();
    betaling.betalingsId = this.Skjema.value.betalingsId;
    betaling.kortnummer = this.Skjema.value.kortnummer;
    betaling.utloper = this.Skjema.value.utloper;
    betaling.postnr = this.Skjema.value.postnr;
    betaling.poststed = this.Skjema.value.poststed;
    betaling.telefon = this.Skjema.value.telefon;
    betaling.adresse = this.Skjema.value.adresse;
    betaling.email = this.Skjema.value.email;
    betaling.csv = this.Skjema.value.csv;
    betaling.pris = this.Skjema.value.pris;

    this._http.post("admin/lagreBetaling", betaling).subscribe((res) => {

    });

  }

  endreBetaling() {
    const betaling = new Betaling();
    betaling.betalingsId = this.Skjema.value.betalingsId;
    betaling.kortnummer = this.Skjema.value.kortnummer;
    betaling.utloper = this.Skjema.value.utloper;
    betaling.postnr = this.Skjema.value.postnr;
    betaling.poststed = this.Skjema.value.poststed;
    betaling.telefon = this.Skjema.value.telefon;
    betaling.adresse = this.Skjema.value.adresse;
    betaling.email = this.Skjema.value.email;
    betaling.csv = this.Skjema.value.csv;
    betaling.pris = this.Skjema.value.pris;

    this._http.post("admin/endreBetaling", betaling).subscribe((res) => {

    });

  }
  hentAlleBetalinger() {
    this.laster = "Laster inn...";
    this._http.get<Betaling[]>("admin/hentBetalinger").subscribe((res) => {
      this.betalinger = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}
