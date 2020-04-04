import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { OverlayService } from '../common/overlay/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private route: Router,
    private overlay: OverlayService
  ) {
  }
  loginLayout: any;
  username;
  password;
  messageValid = 'Có lỗi xãy ra!';
  valid = false;

  ngOnInit() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.route.navigate(['']);
    }
  }

  login() {
    this.loginService.successSignUp = '';
    this.overlay.open();
    this.loginService.login(this.username, this.password).subscribe(
      res => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        window.location.reload();
        this.overlay.close();
      }, error => {
        this.overlay.close();
        this.messageValid = error.message;
        this.valid = true;
      });
  }

}
