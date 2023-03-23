import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.page.html',
  styleUrls: ['./staff-details.page.scss'],
})
export class StaffDetailsPage implements OnInit {
  model: any = {}
  exam_hall=[]
  private getDashboardSubscribe: Subscription;

  constructor(private http: HttpClient,private commonUtils: CommonUtils,private router: Router,) { }

  ngOnInit() {
    this.dashboard()
  }

  dashboard() {
    this.getDashboardSubscribe = this.http.get('dashboard').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          let staff_data=res.return_data.staff_data
          this.exam_hall=res.return_data.exam_hall
          
        this.model={
          attendance_staff:staff_data.name,
          exam_hall_campus:this.exam_hall[0].campus1.campus_name,
          seating_capcity:staff_data.assign_hall
        }
          // this.commonUtils.presentToast('success', res.return_message);
        }
        else {
          this.commonUtils.presentToast('error', res.return_message);

        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);

      }
    );
  }

  onSubmit(_form: NgForm)
  {
    console.log(_form.value)
    if (!_form.valid) {
      if(!_form.value.exam_hall_name)
      {
        this.commonUtils.presentToast('error', 'This Examination Hall Name is required');
        return;
      }
      if(!_form.value.attendance_type)
      {
        this.commonUtils.presentToast('error', 'This Attendance Type is required');
        return;
      }
    }

    let hall_id=_form.value.exam_hall_name
    let type=_form.value.attendance_type
    this.router.navigateByUrl(`/attendance-add/${hall_id}/${type}`);

  }
  ngOnDestory() {
    if (this.getDashboardSubscribe !== undefined) {
      this.getDashboardSubscribe.unsubscribe();
    }
  }
}
