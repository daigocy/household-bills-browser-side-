/// <reference types="jquery"/>
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import  {Location } from '@angular/common';

import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  bill: Bill = new Bill(0,'',0,'',0,0,new Date());
  formModel: FormGroup;
  users: string[] = ["媛媛", "阳阳"]

  constructor(public activatedRoute: ActivatedRoute,
    public billService: BillService,
    private location: Location) { }

  ngOnInit() {
    let fb = new FormBuilder;
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        category: ['3'],
        desc: [''],
        cost: [0, Validators.required],
        time: [''],
        user: fb.array([
          new FormControl(false),
          new FormControl(false)
        ],this.userValidator)
      }
    )
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = parseInt(params['id']);
      if(id) {this.getBill(id);}
    })
  }
  ngAfterViewInit() {
    $('.timepicker').timepicker({
      showInputs: false,
      showMeridian: false,
      minuteStep:1,
    });
  }

  resetTime() {
    if(this.formModel.value.time=='') {
      this.formModel.patchValue({
        time: this.bill.date.getHours()+':'+this.bill.date.getMinutes()
      })
    }
    
  }
  userValidator(control: FormArray) {
    var valid = false;
    control.controls.forEach(control => {
      if(control.value) {
        valid = true;
      }
    });
    if(valid) {
      return null;
    }else {
      return {usersNumber:true};
    }
  }

  getBill(id: number) {
    this.billService.getBill(id).subscribe( (bill: Bill) => {
      if(bill) {
        this.bill = bill;
      }else{
        this.bill = new Bill(0,'',0,'',0,0,new Date());
      };
      this.formModel.reset({
        name: this.bill.name,
        category: this.bill.category,
        desc: this.bill.desc,
        cost: this.bill.cost,
        time: this.bill.date.getHours()+':'+this.bill.date.getMinutes(),
        user:[this.bill.user==0||this.bill.user==2,this.bill.user==1||this.bill.user==2]
      });
    });
  }

  test(msg: any) {
    console.log(msg);
  }
  goBack() {
    this.location.back();
  }
  doSave() {
    let newBill = this.formModel.value;
    this.bill.name = newBill.name;
    this.bill.category = parseInt(newBill.category);
    this.bill.desc = newBill.desc;
    this.bill.cost = newBill.cost;
    let user = -1;
    if(newBill.user[0]) {user += 1};
    if(newBill.user[1]) {user += 2};
    this.bill.user = user;
    let hm = newBill.time.split(':');
    this.bill.date.setHours(hm[0]);
    this.bill.date.setMinutes(hm[1]);
    if(this.bill.id) {
      this.billService.putBill(this.bill).subscribe(
        () => this.goBack()
      )
    }else{
      this.billService.postBill(this.bill).subscribe(
        () => this.goBack()
      )
    }
  }
}
