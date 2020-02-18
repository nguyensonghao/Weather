import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public time: string;

  constructor(private localNotifications: LocalNotifications, private backgroundMode: BackgroundMode) {
    this.time = localStorage.getItem('time');
  }

  ionViewWillEnter() {
    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(() => {
      this.backgroundMode.disableWebViewOptimizations();
      this.backgroundMode.disableBatteryOptimizations();
      setInterval(() => {
        localStorage.setItem('time', new Date().toString());
      }, 5000)
    })    
  }
}
