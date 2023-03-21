import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {

  timerOn = true;
  timeLeft: number = 60;
  interval: any;
  model: any = {}
  mobile: ""
  private newSubscribe: Subscription;
  private otpCheckSubscribe: Subscription;
  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils,) { }
  otp: any = {
    first: '',
    second: '',
    third: '',
    forth: '',

  };

  ngOnInit() {
    this.otp.first=""
    this.otp.second=""
    this.otp.third=""
    this.otp.forth=""
    this.model.student_name=""
    this.model.mobile_number=""
    localStorage.removeItem('base64');
    localStorage.removeItem('exammode');
    localStorage.removeItem('mobile');
    localStorage.removeItem("token");
    // this.startTimer();
    
    
  }






  onSubmit(_form: NgForm) {
    console.log('form login >>', _form.value);
  let message='';
  let count=0;
  if(!_form.value.swipe_key)
  {
    count=1

  }
  if(!_form.value.username || !_form.value.password)
  {
    count=2
    
  }
  if(_form.value.username && _form.value.password)
{
  count=0
  this.model.swipe_key==""
}
if(_form.value.swipe_key)
{
  count=0
  this.model.username==""
  this.model.password==""
}

  if(count==1)
  {
    this.commonUtils.presentToast('error', 'This Swipe Key is required');
    return ;

  }
if(count==2)
  {
    this.commonUtils.presentToast('error', 'This Username & Password is required');
    return ;
  }

    let fd = new FormData();
    console.log('form login >>', _form.value);
    // this.mobile = _form.value['mobile_number']
    // localStorage.setItem('mobile', this.mobile )

    for (let val in _form.value) {
      if (_form.value[val] == undefined) {
        _form.value[val] = '';
      }
      else {
        fd.append(val, _form.value[val]);
      }
    };
    this.otpCheckSubscribe = this.http.post('login', fd).subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          this.otp.first=""
          this.otp.second=""
          this.otp.third=""
          this.otp.forth=""
          this.timeLeft = 60;
          this.commonUtils.presentToast('success', res.return_message);
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

  otpCheck() {
    // this.model.student_name=""

    let otparray = ""
    console.log(this.otp)
    for (let val in this.otp) {
      // otparray.push(this.otp[val])
      console.log('otpcon', otparray, this.otp[val]);

      if (otparray === "") {
        otparray = this.otp[val].toString();
      }
      else {
        otparray += this.otp[val].toString();

      }

    };
    // otparray= this.otp[val].toString();
    let fd = new FormData();
    fd.append('otp', otparray.toString());
    fd.append('mobile_number', this.mobile);

    this.newSubscribe = this.http.post('get-otp-check', fd).subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          
          this.commonUtils.presentToast('success', res.return_message);
          
          this.router.navigateByUrl('/agree');

        }
        else {
          this.commonUtils.presentToast('error', res.return_message);
          // this.router.navigateByUrl('/agree');
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  ngOnDestory() {
    if (this.newSubscribe !== undefined) {
      this.newSubscribe.unsubscribe();
    }
    if (this.otpCheckSubscribe !== undefined) {
      this.otpCheckSubscribe.unsubscribe();
    }


  }

}
