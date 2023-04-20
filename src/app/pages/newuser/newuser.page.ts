import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { LoadingController, MenuController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthLoginService } from 'src/app/services/auth/auth.service';

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
  // private loginCheckSubscribe: Subscription;
  private loginCheckSubscribe: Subscription;
  private getLoginSubscribe: Subscription;
  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils, private authService: AuthLoginService, private loadingController: LoadingController,) { }
  

  ngOnInit() {
    this.getLoginSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('authService', res);

      if (res && res != null && res != undefined && res != '') {
        if (res.token != undefined) {
          this.router.navigateByUrl('/staff-details');
        }
      }
    });
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
    // this.login(fd)
    this.authenticate({swipe_key:swipekey }, fd);

  }

  onSubmit(_form: NgForm) {
    console.log('form login >>', _form.value);
    let message = '';
    let count = 0;
    if (!_form.value.swipe_key) {
      count = 1

    }
    if (!_form.value.username || !_form.value.password) {
      count = 2

    }
    if (_form.value.username && _form.value.password) {
      count = 0
      this.model.swipe_key == ""
    }
    if (_form.value.swipe_key) {
      count = 0
      this.model.username == ""
      this.model.password == ""
    }

    if (count == 1) {
      this.commonUtils.presentToast('error', 'This Swipe Key is required');
      return;

    }
    if (count == 2) {
      this.commonUtils.presentToast('error', 'This Username & Password is required');
      return;
    }

    let fd = new FormData();
    console.log('form login >>', _form.value);


    for (let val in _form.value) {
      if (_form.value[val] == undefined) {
        _form.value[val] = '';
      }
      else {
        fd.append(val, _form.value[val]);
      }
    };
    // this.login(fd)
    this.authenticate(_form, fd);

  }

  login(fd) {
    this.loginCheckSubscribe = this.http.post('login', fd).subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
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
 
  authenticate(_form, form_data) {
  
    this.loadingController
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<any>;
        authObs = this.authService.login('login', form_data, '')

        this.loginCheckSubscribe = authObs.subscribe(
          resData => {
            console.log('resData ============= (sign in) ))))))))))))))>', resData);
            if (resData.return_status == 1) {
                this.router.navigateByUrl('/staff-details');
              this.commonUtils.presentToast('success', resData.return_message);

              loadingEl.dismiss();
            }
            else
            {
              this.commonUtils.presentToast('error', resData.return_message);

            }
            loadingEl.dismiss();

          },
          errRes => {
            loadingEl.dismiss();
          }
        );
      });
  }

  ngOnDestory() {
    if (this.loginCheckSubscribe !== undefined) {
      this.loginCheckSubscribe.unsubscribe();
    }


  }

}
