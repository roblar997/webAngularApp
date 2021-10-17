import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Billett } from "../../Models-typescript/Billett";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-billett",
  templateUrl: "billett.component.html"
})
export class BillettComponent {

  Skjema: FormGroup;
  public billetter: Array<Billett>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({

      billettId: [""],
      pris: ["", Validators.required],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required],
      antVoksen: ["", Validators.required],
      antBarn: ["", Validators.required]

    });
  }

  lagreBillett() {
    const billett = new Billett();
    billett.pris = this.Skjema.value.pris;
    billett.fra = this.Skjema.value.fra;
    billett.til = this.Skjema.value.til;
    billett.avgangsDato = this.Skjema.value.avgangsDato;
    billett.avgangsTid = this.Skjema.value.avgangsTid;
    billett.antVoksen = this.Skjema.value.antVoksen;
    billett.antBarn = this.Skjema.value.antBarn;

    this._http.post("admin/lagreBillett", billett).subscribe((res) => {
      this.hentAlleBilletter();
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
          this._http.post("admin/slettBillett", this.billetter[toSend].billettId).subscribe((res) => {
            this.hentAlleBilletter();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreBillett();
        }
        else if (infoTitle == "endre") {
          this.endreBillett();
        }
      }
      else {

      }
    });
  }
    endreBillett() {
      const billett = new Billett();
      billett.billettId = this.Skjema.value.billettId;
      billett.pris = this.Skjema.value.pris;
      billett.fra = this.Skjema.value.fra;
      billett.til = this.Skjema.value.til;
      billett.avgangsDato = this.Skjema.value.avgangsDato;
      billett.avgangsTid = this.Skjema.value.avgangsTid;
      billett.antVoksen = this.Skjema.value.antVoksen;
      billett.antBarn = this.Skjema.value.antBarn;

       this._http.post("admin/endreBillett", billett).subscribe((res) => {
         this.hentAlleBilletter();
      });
  }

  slett(index) {
    this.visModal("Ja", "Nei", "slett", "Vil du slette?",index);

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

  visEndre(index: number) {
    this.Skjema.setValue({
      billettId: this.billetter[index].billettId,
      pris: this.billetter[index].pris,
      fra: this.billetter[index].fra,
      til: this.billetter[index].til,
      avgangsDato: this.billetter[index].avgangsDato,
      avgangsTid: this.billetter[index].avgangsTid,
      antVoksen: this.billetter[index].antVoksen,
      antBarn: this.billetter[index].antBarn
    });

  }
  ngOnInit() {
    this.hentAlleBilletter();
  }
  hentAlleBilletter() {
    this.laster = "Laster inn...";
    this._http.get<Billett[]>("admin/hentBilletter").subscribe((res) => {
      this.billetter = res;
      this.laster = "";
    }, err => { }, () => { });
  }

}
