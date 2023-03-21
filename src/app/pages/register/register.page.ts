import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;
  form5 = false;
  private getCourseSubscribe: Subscription;
  private getExamDateSubscribe: Subscription;
  private getExamTimeSubscribe: Subscription;
  private getStateSubscribe: Subscription;
  private getDistrictSubscribe: Subscription;
  private getTalukaSubscribe: Subscription;

  courseList: any;
  examDateList: any;
  examTimeList: any;
  stateList: any;
  model: any = {}
  districtList: any;
  casteList: any;
  talukaList: any;
  imgaePreviewcv: string;
  formDataVal: any[];
  fd: FormData;
  monthList = [
    { id: 1, value: "January" },
    { id: 2, value: "February" },
    { id: 3, value: "March" },
    { id: 4, value: "April" },
    { id: 5, value: "May" },
    { id: 6, value: "June" },
    { id: 7, value: "July" },
    { id: 8, value: "August" },
    { id: 9, value: "September" },
    { id: 10, value: "October" },
    { id: 11, value: "November" },
    { id: 12, value: "December" },
  ]
  private registerSubmitSubscribe: Subscription;
  yearList: any[];
  yearVal: any;
  monthVal: any;
  dayList: any;
  object: {};


  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils) { }

  ngOnInit() {
    // if(!localStorage.getItem('mobile'))
    // {
    //   this.router.navigateByUrl('/newuser');
    // }
    // if(!localStorage.getItem('exammode'))
    // {
    //   this.router.navigateByUrl('/exam-mode');
    // }
    // if(!localStorage.getItem('base64'))
    // {
    //   this.router.navigateByUrl('/profile-upload');
    // }
    this.yearList = [];
    this.object = {}
    this.model.aadhar1 = ""
    this.model.aadhar2 = ""
    this.model.aadhar3 = ""
    var startdate = moment();
    let yearStart = startdate.subtract(17, "years");
    startdate = moment();
    let yearsEnd = startdate.subtract(14, "years");

    console.log(yearStart.format("YYYY"), yearsEnd.format("YYYY"), moment(yearsEnd).diff(yearStart, 'years'))
    for (let i = 0; i < moment(yearsEnd).diff(yearStart, 'years') + 1; i++) {
      startdate = moment();
      let yearsEnd = startdate.subtract(14, "years");

      this.yearList.push(yearsEnd.subtract(i, "years").format("YYYY"));

    }
    let data = localStorage.getItem("exammode");
      // this.form1=false;
      // this.form2=true;
    this.getCourse();
    this.getExamDate();
    this.getExamTime(data);
    this.getState();
    this.getDistrict();
    this.getCaste();
    let image = localStorage.getItem('base64')
    if (image) {
      this.imgaePreviewcv = image;
    }
    // this.DataURIToBlob(this.imgaePreviewcv)
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  ionViewWillEnter() {
    let image = localStorage.getItem('base64')
    if (image) {
      this.imgaePreviewcv = image;
    }
  }

  countChange(event, type) {
    console.log(event.target.value.length)
    if (event.target.value.length >= 9) {
      if (type === "fmobile") {
        this.model.fmobile = event.target.value.slice(0, 9);
      }
      if (type === "mmobile") {
        this.model.mmobile = event.target.value.slice(0, 9);
      }
      if (type === "wmobile") {
        this.model.wmobile = event.target.value.slice(0, 9);
      }
    }
  }

  setVal(value, type) {
    if (type === 'year') {
      this.yearVal = value.target.value
    }
    if (type === 'month' && this.yearVal != "") {
      this.monthVal = value.target.value
      this.dayList = []
      for (let i = 1; i <= new Date(this.yearVal, this.monthVal, 0).getDate(); i++) {
        this.dayList.push(i);

      }

    }


    console.log(value.target.value, type)
  }

  onSubmit(_form: NgForm, item) {
    console.log("item...", item);
    console.log(_form.value)
    this.fd = new FormData();

    // if (!_form.valid) {
    //   this.commonUtils.presentToast('error', 'This field is required');
    //   return;
    // }

    if (item == 'next1') {

      if(!_form.value.coures)
      {
        this.commonUtils.presentToast('error', 'This coures is required');
        return;
      }
      if(!_form.value.examdate)
      {
        this.commonUtils.presentToast('error', 'This exam date is required');
        return;
      }
      if(!_form.value.examtime)
      {
        this.commonUtils.presentToast('error', 'This exam time is required');
        return;
      }
      if(!_form.value.aadhar1||!_form.value.aadhar2||!_form.value.aadhar3)
      {
        this.commonUtils.presentToast('error', 'This aadhar number is required');
        return;
      }
      this.formDataVal = []
      this.form1 = false;
      this.form2 = true;
      
    } else if (item == 'next2') {
      if(!_form.value.name)
      {
        this.commonUtils.presentToast('error', 'student name is required');
        return;
      }
      if(!_form.value.father)
      {
        this.commonUtils.presentToast('error', 'father name is required');
        return;
      }
      if(!_form.value.surname)
      {
        this.commonUtils.presentToast('error', 'surname is required');
        return;
      }
      if(!_form.value.mother)
      {
        this.commonUtils.presentToast('error', 'mother name is required');
        return;
      }
      this.form2 = false;
      this.form3 = true;
    } else if (item == 'next3') {
      if(!_form.value.fmobile)
      {
        this.commonUtils.presentToast('error', 'father mobile number is required');
        return;
      }
      if(!_form.value.mmobile)
      {
        this.commonUtils.presentToast('error', 'mother mobile number is required');
        return;
      }
      if(!_form.value.wmobile)
      {
        this.commonUtils.presentToast('error', 'whatsapp mobile number is required');
        return;
      }
      this.form3 = false;
      this.form4 = true;
    } else if (item == 'next4') {
      if(!_form.value.dobyear||!_form.value.dobmon||!_form.value.dobday)
      {
        this.commonUtils.presentToast('error', 'date of birth is required');
        return;
      }
      if(!_form.value.gender)
      {
        this.commonUtils.presentToast('error', 'gender is required');
        return;
      }
      if(!_form.value.caste)
      {
        this.commonUtils.presentToast('error', 'caste is required');
        return;
      }
      if(!_form.value.school_name)
      {
        this.commonUtils.presentToast('error', 'school is required');
        return;
      }
      if(!_form.value.address)
      {
        this.commonUtils.presentToast('error', 'residential address is required');
        return;
      }
      this.form4 = false;
      this.form5 = true;
    }

    for (let val in _form.value) {
      if (_form.value[val] == undefined) {
        _form.value[val] = '';
      }
      else {
        this.object[val] = _form.value[val]
      }
    };
    console.log(this.object);

    if (item == 'next5') {
      if(!_form.value.state)
      {
        this.commonUtils.presentToast('error', 'state is required');
        return;
      }
      if(!_form.value.district)
      {
        this.commonUtils.presentToast('error', 'district is required');
        return;
      }
      if(!_form.value.taluka)
      {
        this.commonUtils.presentToast('error', 'taluka is required');
        return;
      }
      if(!_form.value.city)
      {
        this.commonUtils.presentToast('error', 'city is required');
        return;
      }
      let fd2 = new FormData();
      localStorage.setItem('base64', this.imgaePreviewcv)
      let exam_mode=localStorage.getItem("exammode")
if(exam_mode=='1')
{
  fd2.append("exammode",'online');
}
else
{
  fd2.append("exammode",'offline');

}
      fd2.append("mobile_number", localStorage.getItem("mobile"));
      // fd2.append("exammode", localStorage.getItem("exammode"));
      fd2.append("pic", localStorage.getItem('base64'));
      
      for (let val in this.object) {
        // this.object[val]= _form.value[val]
        fd2.append(val, this.object[val]);
      }

      this.registerSubmitSubscribe = this.http.post('register', fd2).subscribe(
        (res: any) => {
          console.log(res)
          if (res.return_status == 1) {
            this.commonUtils.presentToast('success', res.return_message);
            // localStorage.removeItem('base64');
            localStorage.setItem("token",res.return_data)
            localStorage.removeItem('exammode');
            // localStorage.removeItem('mobile');
            this.router.navigateByUrl('/register-success');

            // this.subjectlist = res.return_data;
            // this.examMarkCheck();
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

  }

  checkAadharNumber(event: any, next: any, prev: any, index: any, type): 0 | any {
    console.log(event.target.value, index, type);

    if (index == 3) {
      if (type === "aadhar3") {
        console.log("aadhar3")
        this.model.aadhar3 = event.target.value.slice(0, 4);
        console.log(this.model.aadhar1, this.model.aadhar2, this.model.aadhar3)

        if (this.model.aadhar1 !== "" && this.model.aadhar2 !== "" && this.model.aadhar3 !== "" && this.model.aadhar3.length > 3) {
          let fd2 = new FormData();
          fd2.append("aadhar_number", this.model.aadhar1 + this.model.aadhar2 + this.model.aadhar3);
          this.getExamDateSubscribe = this.http.post('check-aadhar', fd2).subscribe(
            (res: any) => {
              console.log(res)
              if (res.return_status == 1) {
                console.log(res.return_data)
                // this.examDateList = res.return_data;

              }
              else {
                this.model.aadhar1 = ""
                this.model.aadhar2 = ""
                this.model.aadhar3 = ""
                this.commonUtils.presentToast('error', res.return_message);

              }

            },
            errRes => {
              console.log('DASHBOARD CHART COLOR => ', errRes);

            }
          );
        }
      }


    }
    if (event.target.value.length < 1 && prev) {

      prev.setFocus()
    }
    else if (next && event.target.value.length > 3) {
      if (type === "aadhar1") {
        this.model.aadhar1 = event.target.value.slice(0, 4);
      }
      if (type === "aadhar2") {
        this.model.aadhar2 = event.target.value.slice(0, 4);
      }

      next.setFocus();
    }
    else {
      return 0;
    }
  }

  onBack(item) {
    console.log("item...", item);
    if (item == 'back1') {
      this.form1 = true;
      this.form2 = false;
    } else if (item == 'back2') {
      this.form2 = true;
      this.form3 = false;
    } else if (item == 'back3') {
      this.form3 = true;
      this.form4 = false;
    } else if (item == 'back4') {
      this.form4 = true;
      this.form5 = false;
    }
  }

  getCourse() {
    this.getCourseSubscribe = this.http.get('get-courses').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          this.courseList = res.return_data;

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

  getExamDate() {
    this.getExamDateSubscribe = this.http.get('get-exam-date').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          this.examDateList = res.return_data;

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

  getExamTime(data) {
    this.examTimeList = []
    this.getExamTimeSubscribe = this.http.get('get-exam-time/' + data).subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          if (data == 1) {
            this.examTimeList.push(res.return_data.exam_slot2);

          }
          if (data == 2) {
            this.examTimeList.push(res.return_data.exam_slot1);
            this.examTimeList.push(res.return_data.exam_slot2);

          }
          console.log(this.examTimeList)
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

  getState() {
    this.getStateSubscribe = this.http.get('get-state').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          this.stateList = res.return_data;

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
  getCaste() {
    this.model.caste_id = ""
    this.getStateSubscribe = this.http.get('get-caste').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          this.casteList = res.return_data;
          console.log("model", this.model)
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

  getDistrict() {
    this.getDistrictSubscribe = this.http.get('get-district').subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log('district_name', res.return_data)
          this.districtList = res.return_data;
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

  getTaluka(_id) {
    console.log(_id)
    this.getTalukaSubscribe = this.http.get('get-taluka/' + _id).subscribe(
      (res: any) => {
        console.log(res)
        if (res.return_status == 1) {
          console.log(res.return_data)
          this.talukaList = res.return_data;
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

  firstFormGroup = ({
    firstCtrl: '',
  });
  secondFormGroup = ({
    secondCtrl: '',
  });

  ngOnDestory() {
    if (this.getCourseSubscribe !== undefined) {
      this.getCourseSubscribe.unsubscribe();
    }
    if (this.getExamDateSubscribe !== undefined) {
      this.getExamDateSubscribe.unsubscribe();
    }
    if (this.getExamTimeSubscribe !== undefined) {
      this.getExamTimeSubscribe.unsubscribe();
    }
    if (this.getStateSubscribe !== undefined) {
      this.getStateSubscribe.unsubscribe();
    }
    if (this.getStateSubscribe !== undefined) {
      this.getStateSubscribe.unsubscribe();
    } 
     if (this.getDistrictSubscribe !== undefined) {
      this.getDistrictSubscribe.unsubscribe();
    }
    if (this.getTalukaSubscribe !== undefined) {
      this.getTalukaSubscribe.unsubscribe();
    }
  }
}
