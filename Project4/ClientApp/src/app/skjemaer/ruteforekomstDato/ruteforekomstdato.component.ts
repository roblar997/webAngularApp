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
  submitState: string;

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
  visEndre(index: number) {
    this.Skjema.setValue({
      forekomstDatoId: this.ruteforekomstdatoer[index].forekomstDatoId,
      avgangsDato: this.ruteforekomstdatoer[index].avgangsDato,
      ruteId: this.ruteforekomstdatoer[index].ruteId,
      erUtsolgt: this.ruteforekomstdatoer[index].erUtsolgt,

    });

  }


  ngOnInit() {
    this.hentAlleRuteforekomstdatoer();
  }

  multipleSubmit(state : string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreForekomstDato();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreForekomstDato();
      }
    }

  }
  slett(index) {
    this._http.post("admin/slettForekomstdato", this.ruteforekomstdatoer[index].forekomstDatoId).subscribe((res) => {
      this.hentAlleRuteforekomstdatoer();
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
    this._http.get<RuteforekomstDato[]>("admin/hentRuteforekomstdatoer").subscribe((res) => {
      this.ruteforekomstdatoer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

