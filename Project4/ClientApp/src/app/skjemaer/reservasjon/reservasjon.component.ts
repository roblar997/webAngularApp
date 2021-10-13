import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-reservasjon",
  templateUrl: "reservasjon.component.html"
})
export class ReservasjonComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      ruteId: ["", Validators.required],
      avgangsDato: ["", Validators.required],
      avgangsTid: ["", Validators.required]
    });
  }

  onSubmit() {

  }
}

