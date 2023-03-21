import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.page.html',
  styleUrls: ['./register-success.page.scss'],
})
export class RegisterSuccessPage implements OnInit {
  profile_data: {};
  private getRegisterSubscribe: Subscription;
  profile_image: string;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils) { }

  ngOnInit() {
    console.log("hello",localStorage.getItem('token'))
    // if(!localStorage.getItem('mobile'))
    // {
    //   this.router.navigateByUrl('/newuser');
    // }
    // if(localStorage.getItem('token'))
    // {
    //   this.router.navigateByUrl('/register');
    // }
    // var t=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2MjMxLCJtb2JpbGUiOiI4NDM2OTkzMjY4IiwiaWF0IjoxNjcwMzExNDIxLCJleHAiOjE2NzAzOTc4MjF9.Zs4AvURzcsamjhXaEofjpD27wcYFVC7REaN2_ud2mI4`;
    var t= localStorage.getItem("token");
    this.profile_image=localStorage.getItem("base64");
    let fd = new FormData();
    fd.append("mobile_number", localStorage.getItem("mobile"));
    fd.append("authorization",t);
    this.getRegisterSubscribe = this.http.post('register-success',fd).subscribe(
      (res: any) => {
         console.log(res.return_data)
        this.profile_data=res.return_data
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);

      }
    );
    // this.profile_data={}
  }

}
