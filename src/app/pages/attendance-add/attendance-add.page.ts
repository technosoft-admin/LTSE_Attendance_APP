import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  private addAttendanceSubscribe: Subscription;
  private getAttendanceSubscribe: Subscription;
  private removeAttendanceSubscribe: Subscription;
  private updateAttendanceSubscribe: Subscription;
  hall_data: any;
  attendance_count: any;

  constructor(private http: HttpClient,private alertController: AlertController, private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.hall_id = this.activatedRoute.snapshot.paramMap.get('hall_id');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('this-----------------',this.hall_id,this.type)
    this.getHallName();
    this.getAttendance()
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

  autoEnterSwipKey(event) {
    console.log("hello", event.target.value);
    let swipekey= event.target.value
    if (!swipekey) {
      this.commonUtils.presentToast('error', 'This Swipe Key is required');
      return;

    }
    
    let fd = new FormData();
    console.log('form login >>', swipekey);


        fd.append('swipe_key',swipekey);
        fd.append('hall_id',this.hall_id);
        fd.append('type',this.type);
    // this.login(fd)
    this.addAttendance(fd);

  }

  addAttendance(fd)
  {
    this.addAttendanceSubscribe = this.http.post(`set-attendance`,fd).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
     let attendance_data=res.return_data
     this.model={
      ltse_number:attendance_data.username,
      name:attendance_data.name,
      attemp:attendance_data.attemp_no
     }
     this.getHallName();
     this.getAttendance();
          // this.commonUtils.presentToast('success', res.return_message);
        } if(res.return_status == -1)
        {
    this.presentAlertConfirm(res)

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

  getAttendance()
  {
    this.getAttendanceSubscribe = this.http.get(`get-attendance-list?hall_id=${this.hall_id}&type=${this.type}`).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.list=res.return_data.attendance_data
          
          // this.hall_data=res.return_data.hall_data
          // this.attendance_count=res.return_data.attendance_count
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

 removeAttendance(id)
  {
    this.removeAttendanceSubscribe = this.http.get(`remove-attendance/${id}`).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.getHallName();
          this.getAttendance();
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

  updateAttendance(id)
  {
    let fd = new FormData();
    fd.append('hall_id', this.hall_id);
    fd.append('type', this.type);
    // fd.append('id', id.return_data.);

    this.updateAttendanceSubscribe = this.http.post(`update-atendance`,fd).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.getHallName();
          this.getAttendance();
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

  

    // alert call
    async presentAlertConfirm(data) {
     let message=data.return_message
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        // message: 'Are you sure you want to exit the app?',
        message: message,
        cssClass: 'custom-alert2',
        buttons: [{
          text: 'No',
          role: 'cancel',
          cssClass: 'cancelBtn',
          handler: (blah) => { }
        }, {
          text: 'Yes',
          handler: () => {
          }
        }]
      });
  
      await alert.present();
    }
  ngOnDestory() {
    if (this.hallNameCheckSubscribe !== undefined) {
      this.hallNameCheckSubscribe.unsubscribe();
    }
    if (this.addAttendanceSubscribe !== undefined) {
      this.addAttendanceSubscribe.unsubscribe();
    }
    if (this.getAttendanceSubscribe !== undefined) {
      this.getAttendanceSubscribe.unsubscribe();
    }
    if (this.removeAttendanceSubscribe !== undefined) {
      this.removeAttendanceSubscribe.unsubscribe();
    }
    if (this.updateAttendanceSubscribe !== undefined) {
      this.updateAttendanceSubscribe.unsubscribe();
    }
  }

}
