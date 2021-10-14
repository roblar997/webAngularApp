import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Billett } from "../../Models-typescript/Billett";

@Component({
  selector: "app-skjemaer-billett",
  templateUrl: "billett.component.html"
})
export class BillettComponent {

  Skjema: FormGroup;
  public billetter: Array<Billett>;

  public laster: string;
  constructor(private fb: FormBuilder, private _http: HttpClient) {
    this.Skjema = fb.group({
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

    });
  }


    endreBillett() {
      const billett = new Billett();
      billett.pris = this.Skjema.value.pris;
      billett.fra = this.Skjema.value.fra;
      billett.til = this.Skjema.value.til;
      billett.avgangsDato = this.Skjema.value.avgangsDato;
      billett.avgangsTid = this.Skjema.value.avgangsTid;
      billett.antVoksen = this.Skjema.value.antVoksen;
      billett.antBarn = this.Skjema.value.antBarn;

       this._http.post("admin/endreBillett", billett).subscribe((res) => {

      });
  }
  visEndre(index: number) {
   

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
