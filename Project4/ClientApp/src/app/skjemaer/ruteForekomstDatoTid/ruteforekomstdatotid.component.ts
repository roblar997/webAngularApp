import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RuteForekomstDatoTid } from "../../Models-typescript/ruteforekomstdatotid";

@Component({
  selector: "app-skjemaer-ruteforekomstdatotid",
  templateUrl: "ruteforekomstdatotid.component.html"
})
export class RuteforekomstdatotidComponent {

  Skjema: FormGroup;
  public ruteforekomstdatotider: Array<RuteForekomstDatoTid>;

  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      ruteId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required],
      ankomstDato: ["", Validators.required],
      ankomstTid: ["", Validators.required],
      forekomstDatoId: ["", Validators.required],
      erUtsolgt: ["", Validators.required]
    });
  }

  lagreForekomstDatoTid() {

    const ruteforekomstdatotid = new RuteForekomstDatoTid();
    ruteforekomstdatotid.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdatotid.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdatotid.avgangsTid = this.Skjema.value.avgangsTid;
    ruteforekomstdatotid.ankomstDato = this.Skjema.value.ankomstDato;
    ruteforekomstdatotid.ankomstTid = this.Skjema.value.ankomstTid;
    ruteforekomstdatotid.forekomstDatoId = this.Skjema.value.forekomstDatoId;
    ruteforekomstdatotid.erUtsolgt = this.Skjema.value.erUtsolgt;

    this._http.post("admin/lagreRuteforekomstdatotid", ruteforekomstdatotid).subscribe((res) => {

    });

  }
  endreForekomstDatoTid() {

    const ruteforekomstdatotid = new RuteForekomstDatoTid();
    ruteforekomstdatotid.ruteId = this.Skjema.value.ruteId;
    ruteforekomstdatotid.avgangsDato = this.Skjema.value.avgangsDato;
    ruteforekomstdatotid.avgangsTid = this.Skjema.value.avgangsTid;
    ruteforekomstdatotid.ankomstDato = this.Skjema.value.ankomstDato;
    ruteforekomstdatotid.ankomstTid = this.Skjema.value.ankomstTid;
    ruteforekomstdatotid.forekomstDatoId = this.Skjema.value.forekomstDatoId;
    ruteforekomstdatotid.erUtsolgt = this.Skjema.value.erUtsolgt;

    this._http.post("admin/endreRuteforekomstdatotid", ruteforekomstdatotid).subscribe((res) => {

    });

  }
  visEndre(index: number) {
 

  }
  ngOnInit() {
    this.hentAlleRuteforekomstdatotider();
  }
  hentAlleRuteforekomstdatotider() {
    this.laster = "Laster inn...";
    this._http.get<RuteForekomstDatoTid[]>("admin/hentRuteforekomstdatotider").subscribe((res) => {
      this.ruteforekomstdatotider = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

