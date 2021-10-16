import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Person } from "../../Models-typescript/Person";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../../modal/modal";
@Component({
  selector: "app-skjemaer-person",
  templateUrl: "./person.component.html"
})
export class PersonComponent {

  Skjema: FormGroup;

  public fornavn: string;
  public etternavn: string;
  public telefon: string;
  public personer: Array<Person>;

  public laster: string;

  constructor(private fb: FormBuilder, private _http: HttpClient, private modalService: NgbModal) {
    this.Skjema = fb.group({
      personId: ["", Validators.required],
      fornavn: ["", Validators.required],
      etternavn: ["", Validators.required],
      telefon: ["", Validators.required]
    });
  }

  lagrePerson() {

    const person = new Person();
    person.personId = this.Skjema.value.personId;
    person.fornavn = this.Skjema.value.fornavn;
    person.etternavn = this.Skjema.value.etternavn;
    person.telefon = this.Skjema.value.telefon;


    this._http.post("admin/lagrePerson", person).subscribe((res) => {
      this.hentAllePersoner();
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
  endrePerson() {

    const person = new Person();

    person.personId = this.Skjema.value.personId;
    person.fornavn = this.Skjema.value.fornavn;
    person.etternavn = this.Skjema.value.etternavn;
    person.telefon = this.Skjema.value.telefon;


    this._http.post("admin/endrePerson", person).subscribe((res) => {
      this.hentAllePersoner();
    });
  }

  visEndre(index : number) {
    this.Skjema.setValue({
      personId: this.personer[index].personId,
      fornavn: this.personer[index].fornavn,
      etternavn: this.personer[index].etternavn,
      telefon: this.personer[index].telefon
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
          this._http.post("admin/slettPerson", this.personer[toSend].personId).subscribe((res) => {
            this.hentAllePersoner();
          });
        }
        else if (infoTitle == "lagre") {
          this.lagrePerson();
        }
        else if (infoTitle == "endre") {
          this.endrePerson();
        }
      }
      else {

      }
    });
  }
  ngOnInit() {
    this.hentAllePersoner();
  }
  hentAllePersoner() {
    this.laster = "Laster inn...";
    this._http.get<Person[]>("admin/hentPersoner").subscribe((res) => {
      this.personer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

