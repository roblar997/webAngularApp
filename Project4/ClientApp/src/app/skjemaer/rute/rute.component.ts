import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Rute } from "../../Models-typescript/Rute";

@Component({
  selector: "app-skjemaer-rute",
  templateUrl: "rute.component.html"
})
export class RuteComponent {

  Skjema: FormGroup;
  public ruter: Array<Rute>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
      ruteId: ["", Validators.required],
      fra: ["", Validators.required],
      til: ["", Validators.required],
      prisVoksen: ["", Validators.required],
      prisBarn: ["", Validators.required]

    });
  }

  lagreRute() {

    const rute = new Rute();
    rute.ruteId = this.Skjema.value.ruteId;
    rute.fra = this.Skjema.value.fra;
    rute.til = this.Skjema.value.til;
    rute.prisVoksen = this.Skjema.value.prisVoksen;
    rute.prisBarn = this.Skjema.value.prisBarn;

    this._http.post("admin/lagreRute", rute).subscribe((res) => {

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

    });
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

  multipleSubmit(state: string) {
    if (this.Skjema.valid) {
      if (state.localeCompare("endre") == 0) {
        this.endreRute();
      }
      else if (state.localeCompare("lagre") == 0) {
        this.lagreRute();
      }
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

