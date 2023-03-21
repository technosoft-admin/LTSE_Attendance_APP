import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-aggree',
  templateUrl: './aggree.page.html',
  styleUrls: ['./aggree.page.scss'],
})
export class AggreePage implements OnInit {

  private getSessionSubscribe: Subscription;
  session: any;
  constructor(private http: HttpClient,private router: Router,  private commonUtils: CommonUtils,) { }

  paragaph: any =
    {
      'id': '0',
      'paragaph_text': 'www.matrixhighschool.org is owned and operated by Matrix High School, an educational institute incorporated under the laws of India. Your use of the Website and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Website including the applicable policies which are incorporated herein by way of reference. If you transact on the Website, You shall be subject to the policies that are applicable to the Website for such transaction. By mere use of the Website, You shall be contracting with Matrix High School. and these terms and conditions including the policies constitute your binding obligations, with Matrix High School.'
    }


  ngOnInit() {
    // if(!localStorage.getItem('mobile'))
    // {
    //   this.router.navigateByUrl('/newuser');
      
    // }
    this.getSession();
  
  }

  onScrollDown() {
    console.log("scrolled down!!");
  }

  onScrollUp() {
    console.log("scrolled up!!");
  }

  getSession() {

    this.getSessionSubscribe = this.http.get('get-session').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          this.session=res.return_data.ltse_session
          // this.commonUtils.presentToast('Success', res.return_message);

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


  ngOnDestory() {
    if (this.getSessionSubscribe !== undefined) {
      this.getSessionSubscribe.unsubscribe();
    }
  }

}


