import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Rute } from "../../Models-typescript/Rute";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-rute",
  templateUrl: "rute.component.html"
})
export class RuteComponent {

  Skjema: FormGroup;
  public ruter: Array<Rute>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      ruteId: [""],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      prisVoksen: ["", Validators.required],
      prisBarn: ["", Validators.required]

    });
  }

  lagreRute() {

    const rute = new Rute();
    rute.ruteId = 1;
    rute.fra = this.Skjema.value.fra;
    rute.til = this.Skjema.value.til;
    rute.prisVoksen = this.Skjema.value.prisVoksen;
    rute.prisBarn = this.Skjema.value.prisBarn;

    this._http.post("admin/lagreRute", rute).subscribe((res) => {
      this.hentAlleRuter();
    });
  }

  endreRute() {

    const rute = new Rute();
    rute.ruteId = this.Skjema.value.ruteId;
    rute.fra = this.Skjema.value.fra;
    rute.til = this.Skjema.value.til;
    rute.prisVoksen = this.Skjema.value.prisVoksen;
    rute.prisBarn = this.Skjema.value.prisBarn;

    this._http.post("admin/endreRute", rute).subscribe((res) => {
      this.hentAlleRuter();
    });
  }
  slett(index) {
    this.visModal("Ja", "Nei", "slett", "Vil du slette?",index);
  
  }
  visEndre(index: number) {
    this.Skjema.setValue({
      ruteId: this.ruter[index].ruteId,
      fra: this.ruter[index].fra,
      til: this.ruter[index].til,
      prisVoksen: this.ruter[index].prisVoksen,
      prisBarn: this.ruter[index].prisBarn
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
      if (retur == 'ja') {
        if (infoTitle == "slett") {
          this._http.post("admin/slettRute", this.ruter[toSend].ruteId).subscribe((res) => {
            this.hentAlleRuter();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreRute();
        }
        else if (infoTitle == "endre") {
          this.endreRute();
        }
      }
      else {

      }
    });
  }

  multipleSubmit(state: string, toSend) {

    if (state.localeCompare("endre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "endre", "Vil du endre?", null);
      }
    }
    else if (state.localeCompare("lagre") == 0) {
      if (this.Skjema.valid) {
        this.visModal("Ja", "Nei", "lagre", "Vil du lagre?", null);
      }
    }
    else if (state.localeCompare("slett") == 0) {
      this.visModal("Ja", "Nei", "slett", "Vil du slette?", toSend);
    }


  }

  ngOnInit() {
    this.hentAlleRuter();
  }
  hentAlleRuter() {
    this.laster = "Laster inn...";
    this._http.get<Rute[]>("admin/hentRutere").subscribe((res) => {
      this.ruter = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

