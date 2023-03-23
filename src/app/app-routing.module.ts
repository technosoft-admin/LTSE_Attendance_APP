import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/newuser/newuser.module').then( m => m.NewuserPageModule)
  },
  {
    path: 'staff-details',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/staff-details/staff-details.module').then( m => m.StaffDetailsPageModule)
  },
  {
    path: 'attendance-add/:hall_id/:type',
    canLoad:[AuthGuard],
    loadChildren: () => import('./pages/attendance-add/attendance-add.module').then( m => m.AttendanceAddPageModule)
  }
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'newuser',
  //   loadChildren: () => import('./pages/newuser/newuser.module').then( m => m.NewuserPageModule)
  // },
  // {
  //   path: 'agree',
  //   loadChildren: () => import('./pages/aggree/aggree.module').then( m => m.AggreePageModule)
  // },
  // {
  //   path: 'exam-mode',
  //   loadChildren: () => import('./pages/exame-mode/exame-mode.module').then( m => m.ExameModePageModule)
  // },
  // {
  //   path: 'profile-upload',
  //   loadChildren: () => import('./pages/profile-upload/profile-upload.module').then( m => m.ProfileUploadPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'register-success',
  //   loadChildren: () => import('./pages/register-success/register-success.module').then( m => m.RegisterSuccessPageModule)
  // },
  



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
