import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-skjemaer-billettperson",
  templateUrl: "billettperson.component.html"
})
export class BillettpersonComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      billettId: ["", Validators.required],
      personId: ["", Validators.required]
    });
  }

  onSubmit() {

  }
}

