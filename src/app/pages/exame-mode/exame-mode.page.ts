import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-exame-mode',
  templateUrl: './exame-mode.page.html',
  styleUrls: ['./exame-mode.page.scss'],
})
export class ExameModePage implements OnInit {
  selectedDate: any;
  click_modal: boolean = false;
  message: string;
  head: string;
  messageId: any;
  private getExamTypeSubscribe: Subscription;
  offlineModal: boolean;
  onlineModal: boolean;

  constructor(private router: Router, private commonUtils: CommonUtils,private http: HttpClient ) { }

  ngOnInit() {
    if(!localStorage.getItem('mobile'))
    {
      this.router.navigateByUrl('/newuser');
    }
    this.getExamType();
  }

  onSelect(head,message){
    this.click_modal=true;
    this.messageId=message;
    console.log(message,head);
    
    this.head=head;
    if(message==='1')
    {
      this.message=` • No Exam Fee.<br />
      <span style="color: red;">• परीक्षा शुल्क नाही<br /></span>
      • Qualified students will be eligible for Admission only.<br />
      <span style="color: red;"> • पात्र विद्यार्थी केवळ ललित ट्यूटोरियलमध्ये प्रवेशासाठी पात्र असतील.</span><br />
      • To win Scholarship; the student will have to appear for Offline Scholarship Exam at the institute.<br />
      <span style="color: red;">• स्कॉलरशिप मिळविण्याकरीता विद्यार्थीने संस्थेत ऑफलाइन स्कॉलरशिप परीक्षेला बसावे.</span>`
    }
    else
    {
      this.message=`
      • Exam Fee Rs. 200.(to be paid at institute before exam)<br>
      <span style="color: red;"> • परीक्षा शुल्क रु. 200.(परीक्षा शुल्क परीक्षेपूर्वी संस्थेत भरावे)</span><br>
      • Qualified students will be eligible for Admission and respective scholarship the student has won.<br>
      <span style="color: red;">• पात्र विद्यार्थी प्रवेशासाठी आणि त्यांना मिळालेल्या संबंधित स्कॉलरशिपसाठी पात्र असतील</span><br>`
    }
    console.log("open Modal" );
  }
  clickedOut() {
    this.click_modal = false;
    console.log('this.click_modal', this.click_modal);
    
  }
  onSubmit()
  {
    localStorage.setItem('exammode', this.messageId)
    console.log("message",this.messageId)
    this.router.navigateByUrl('/profile-upload');

  }
  getExamType()
  {
    this.offlineModal=false;
    this.onlineModal=false;
    this.getExamTypeSubscribe = this.http.get('get-exam-time/1').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data.exam_reg_type)
          if(res.return_data.exam_reg_type=="offline")
          {
            this.offlineModal=true;
          }
          if(res.return_data.exam_reg_type=="online")
          {
            this.onlineModal=true;
          }
          if(res.return_data.exam_reg_type=="both")
          {
            this.onlineModal=true;
            this.offlineModal=true;

          }
        }
        else
        {
          this.commonUtils.presentToast('error', res.return_message);
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
        
      }
    );
  }

}
