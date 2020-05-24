import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any = {};
  subSendo = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // this.user = userInfo.user;
  }

}
