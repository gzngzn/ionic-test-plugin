import {Component} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

let inAppBrowserRef;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  countLoading = 1;
  constructor(private iab: InAppBrowser) {}

  buttonClick(): void {
    // alert('Opening InAppBrowser');
    const inAppBrowser = this.iab.create('https://ionicframework.com/', '_blank',
      'clearcache=yes,clearsessioncache=yes,location=yes,hardwareback=no,zoom=no');

    inAppBrowser.on('loadstart').subscribe(event => {
      if(event.url.includes('twitter')){
        // alert('Twitter opened');
        inAppBrowser.close();
      }
    });
  }

  openInAppBrowser(): void {
    /* Open URL */
    const openUrl = 'https://ionicframework.com/';
    inAppBrowserRef = (window as any).cordova.InAppBrowser.open(
      openUrl, '_blank', 'clearcache=yes,clearsessioncache=yes,location=yes,hardwareback=no,zoom=no'
    );
    /* Add event listener to close InAppBrowser*/
    inAppBrowserRef.addEventListener('loadstart', this.loadStartCallBack);
    // inAppBrowserRef.addEventListener( 'loadstop', function() {
    //   inAppBrowserRef.executeScript({ code: 'alert( \'hello\' );' });
    // });
  };


  loadStartCallBack(event): void {
    /* Close InAppBrowser if loading the predefined close URL */
    // alert(this.countLoading++);
    // inAppBrowserRef.executeScript({ code: 'alert( \'hello\' );' });
    if (event.url.includes('twitter')) {
      // alert('twitter detected');
      inAppBrowserRef.close();
    }
  }
}
