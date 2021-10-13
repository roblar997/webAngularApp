import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Person } from "../../Models-typescript/Person";

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

  constructor(private fb: FormBuilder, private _http: HttpClient) {
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

    });
  }
  endrePerson() {

    const person = new Person();
    person.personId = this.Skjema.value.personId;
    person.fornavn = this.Skjema.value.fornavn;
    person.etternavn = this.Skjema.value.etternavn;
    person.telefon = this.Skjema.value.telefon;


    this._http.post("admin/endrePerson", person).subscribe((res) => {

    });
  }



  hentAllePersoner() {
    this.laster = "Laster inn...";
    this._http.get<Person[]>("admin/hentPersoner").subscribe((res) => {
      this.personer = res;
      this.laster = "";
    }, err => { }, () => { });
  }
}

