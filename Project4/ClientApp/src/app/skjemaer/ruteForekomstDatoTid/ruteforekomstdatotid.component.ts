import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RuteForekomstDatoTid } from "../../Models-typescript/ruteforekomstdatotid";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";

@Component({
  selector: "app-skjemaer-ruteforekomstdatotid",
  templateUrl: "ruteforekomstdatotid.component.html"
})
export class RuteforekomstdatotidComponent {

  Skjema: FormGroup;
  public ruteforekomstdatotider: Array<RuteForekomstDatoTid>;

  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService : NgbModal) {
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
  visModal(knapp1Tekst: string, knapp2Tekst: string, infoTitle: string, infoBody: string, toSend) {
    const modalRef = this.modalService.open(Modal, {
      backdrop: 'static',


      keyboard: false

    });


    modalRef.componentInstance.knapp1 = knapp1Tekst;
    modalRef.componentInstance.knapp2 = knapp2Tekst
    modalRef.componentInstance.infoTitle = infoTitle;
    modalRef.componentInstance.infoBody = infoBody;

    modalRef.result.then(retur => {

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
      this.hentAlleRuteforekomstdatotider();
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
      this.hentAlleRuteforekomstdatotider();
    });

  }

  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.visModal("Ja", "Nei", "endre", "Vil du endre?",null);
        this.endreForekomstDatoTid();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.visModal("Ja", "Nei", "lagre", "Vil du lagre?",null);
        this.lagreForekomstDatoTid();
      }
    }

  }
  slett(index) {
    this.visModal("Ja", "Nei", "slett", "Vil du slette?",index);
    const ruteforekomstdatotid = new RuteForekomstDatoTid();
    ruteforekomstdatotid.ruteId = this.ruteforekomstdatotider[index].ruteId;
    ruteforekomstdatotid.avgangsDato = this.ruteforekomstdatotider[index].avgangsDato;
    ruteforekomstdatotid.avgangsTid = this.ruteforekomstdatotider[index].avgangsTid;
    ruteforekomstdatotid.ankomstDato = this.ruteforekomstdatotider[index].ankomstDato;
    ruteforekomstdatotid.ankomstTid = this.ruteforekomstdatotider[index].ankomstTid;
    ruteforekomstdatotid.forekomstDatoId = this.ruteforekomstdatotider[index].forekomstDatoId;
    ruteforekomstdatotid.erUtsolgt = this.ruteforekomstdatotider[index].erUtsolgt;
  
    this._http.post("admin/slettRuteforekomstdatotid", ruteforekomstdatotid).subscribe((res) => {
      this.hentAlleRuteforekomstdatotider();
    });
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      ruteId: this.ruteforekomstdatotider[index].ruteId,
      avgangsDato: this.ruteforekomstdatotider[index].avgangsDato,
      avgangsTid: this.ruteforekomstdatotider[index].avgangsTid,
      ankomstDato: this.ruteforekomstdatotider[index].ankomstDato,
      ankomstTid: this.ruteforekomstdatotider[index].ankomstTid,
      forekomstDatoId: this.ruteforekomstdatotider[index].forekomstDatoId,
      erUtsolgt: this.ruteforekomstdatotider[index].erUtsolgt
    });

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

