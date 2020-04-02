import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OverlayService} from './common/overlay/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CES';
  constructor( private route: Router,
               private overlay: OverlayService) {
  }
  isLogin = false;
  ngOnInit() {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      this.isLogin = false;
      this.route.navigate(['/login']);
    } else {
      this.isLogin = true;
    }
  }
}
