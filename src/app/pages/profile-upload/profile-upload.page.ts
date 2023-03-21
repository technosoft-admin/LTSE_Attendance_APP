import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-profile-upload',
  templateUrl: './profile-upload.page.html',
  styleUrls: ['./profile-upload.page.scss'],
})
export class ProfileUploadPage implements OnInit {
  public progress = 0;
  model: any = {}
  fileValprofile_image;
fileValprofile_imageCross;
normalFileNameprofile_image;
uploadprofile_imagePathShow = false;
imgaePreviewprofile_image;
cvPreviewprofile_image;
uploadcvPathShow = false;
cvPreviewCv;
fileValcv;
normalFileNamecv;
imgaePreviewcv;
  constructor(private commonUtils: CommonUtils,private router: Router,) {
 this.imgaePreviewcv="";  
   }

  ngOnInit() {
    // if(!localStorage.getItem('mobile'))
    // {
    //   this.router.navigateByUrl('/newuser');
    // }
    // if(!localStorage.getItem('exammode'))
    // {
    //   this.router.navigateByUrl('/exam-mode');
    // }
    // localStorage.removeItem('base64')
    let image=localStorage.getItem('base64')
    if(image)
    {
      this.imgaePreviewcv=image;
      this.progress=100;
    }
  }
  checkImage()
  {
    if(this.imgaePreviewcv==="")
    {
      this.commonUtils.presentToast('error',"Image is required");

    }
    else
    {
      this.router.navigateByUrl('/register');

    }
  }
  normalFileUpload(event) {
    this.progress=10;
    var file = event.target.files.length;
  
   
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.imgaePreviewcv = event.target.result;
          //  this.changeDetector.detectChanges();
       console.log(this.imgaePreviewcv);
       localStorage.setItem('base64', this.imgaePreviewcv)

       this.progress=100;

       }
       reader.onerror = function (error) {
        console.log('Error: ', error);
      };
       reader.readAsDataURL(event.target.files[i]);
       console.log(this.imgaePreviewcv);
      //  this.progress=100;

      
       
    }
  // }
  }
}
