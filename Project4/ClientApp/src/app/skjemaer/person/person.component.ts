import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html"
})
export class PersonComponent {

  Skjema: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Skjema = fb.group({
      brukernavn: ["", Validators.required],
      passord: ["", Validators.pattern("[0-9]{6,15}")]
    });
  }

  onSubmit() {
    console.log("Modellbasert skjema submitted:");
    console.log(this.Skjema);
    console.log(this.Skjema.value.brukernavn);
    console.log(this.Skjema.touched);
  }
}

