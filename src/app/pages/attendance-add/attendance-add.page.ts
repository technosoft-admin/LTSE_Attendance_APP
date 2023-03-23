import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.page.html',
  styleUrls: ['./attendance-add.page.scss'],
})
export class AttendanceAddPage implements OnInit {
  model: any = {}
  list : any[];
  hall_id:any;
  type:any;
  private hallNameCheckSubscribe: Subscription;
  hall_data: any;
  attendance_count: any;

  constructor(private http: HttpClient,private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.hall_id = this.activatedRoute.snapshot.paramMap.get('hall_id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
console.log('this-----------------',this.hall_id,this.type)
   this.getHallName();
  }
  getHallName()
  {
    this.hallNameCheckSubscribe = this.http.get(`get-hall-name?hall_id=${this.hall_id}&type=${this.type}`).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.hall_data=res.return_data.hall_data
          this.attendance_count=res.return_data.attendance_count
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

  }
  ngOnDestory() {
    if (this.hallNameCheckSubscribe !== undefined) {
      this.hallNameCheckSubscribe.unsubscribe();
    }
  }

}
