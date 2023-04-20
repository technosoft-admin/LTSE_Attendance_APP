import { Component } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private alertController: AlertController,) {}
}
