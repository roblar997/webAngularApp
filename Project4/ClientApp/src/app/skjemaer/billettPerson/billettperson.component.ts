import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillettPerson } from "../../Models-typescript/BillettPerson";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-billettperson",
  templateUrl: "billettperson.component.html"
})
export class BillettpersonComponent {

  Skjema: FormGroup;
  public billettpersoner: Array<BillettPerson>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      personId: ["", Validators.required]
    });
  }

  lagreBillettPerson() {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.Skjema.value.billettId;
    billettperson.personId = this.Skjema.value.personId;


    this._http.post("admin/lagrebillettperson", billettperson).subscribe((res) => {
      this.hentAlleBillettpersoner();
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
          const billettperson = new BillettPerson();
          billettperson.billettId = this.billettpersoner[toSend].billettId;
          billettperson.personId = this.billettpersoner[toSend].personId;

          this._http.post("admin/slettBillettperson", billettperson).subscribe((res) => {
            this.hentAlleBillettpersoner();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagreBillettPerson();
        }
        else if (infoTitle == "endre") {
          this.endreBillettPerson();
        }
      }
      else {

      }
    });
  }
  endreBillettPerson() {

    const billettperson = new BillettPerson();
    billettperson.billettId = this.Skjema.value.billettId;
    billettperson.personId = this.Skjema.value.personId;


    this._http.post("admin/endrebillettperson", billettperson).subscribe((res) => {
      this.hentAlleBillettpersoner();
    });
  }

  visEndre(index: number) {
    this.Skjema.setValue({
      billettId: this.billettpersoner[index].billettId,
      personId: this.billettpersoner[index].personId,

    });

  }

  multipleSubmit(state: string, toSend) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.visModal("Ja", "Nei", "endre", "Vil du endre?", null);

      }
      else if (state.localeCompare("lagre") == 0) {
        this.visModal("Ja", "Nei", "lagre", "Vil du lagre?", null);
      }
      else if (state.localeCompare("slett") == 0) {
        this.visModal("Ja", "Nei", "slett", "Vil du slette?", toSend);
      }
    }

  }

  ngOnInit() {
    this.hentAlleBillettpersoner();
  }
  hentAlleBillettpersoner() {
    this.laster = "Laster inn...";
    this._http.get<BillettPerson[]>("admin/hentBillettpersoner").subscribe((res) => {
      this.billettpersoner = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

