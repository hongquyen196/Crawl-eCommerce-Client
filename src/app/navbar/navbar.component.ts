import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  constructor(config: NgbDropdownConfig,
    private loginService: LoginService,
    private router: Router) {
    config.placement = 'bottom-right';
  }

  user: any = {};

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.user = userInfo.user;
  }

  logout() {
    this.loginService.logout().subscribe(res => {
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    })
  }

}
