import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-rute",
  templateUrl: "rute.component.html"
})
export class RuteComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      ruteId: ["", Validators.required],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      prisVoksen: ["", Validators.required],
      prisBarn: ["", Validators.required]

    });
  }

  onSubmit() {

  }
}

