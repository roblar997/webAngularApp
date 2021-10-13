import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-reservasjon",
  templateUrl: "reservasjon.component.html"
})
export class LugarComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
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

