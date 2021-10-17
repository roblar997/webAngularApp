import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Billett } from "../Models-typescript/Billett";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../modal/modal";
@Component({
  selector: "app-logut",
  templateUrl: "logut.component.html"
})
export class LogUtComponent {

  constructor(private _http: HttpClient) {

  }

  ngOnInit() {
    this.logUt();
  }

  logUt() {

    this._http.get("admin/logUt").subscribe((res) => {
    
    });
  }
}
