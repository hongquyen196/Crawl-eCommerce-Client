import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {OverlayService} from '../common/overlay/overlay.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  email;
  username;
  firstname;
  lastname;
  password;
  password_confirm;
  address;
  phoneNumber;
  validError = {
    requiredEmail: '',
    requiredUsername: '',
    requiredFirstName: '',
    requiredLastName: '',
    requiredAddress: '',
    requiredPassword: '',
    validPC: '',
    validPhone: ''
  };

  constructor(private loginSer: LoginService, private route: Router, private overlay: OverlayService) {
  }

  ngOnInit() {
  }

  submit() {
    this.overlay.open();
    if (this.validate()) {
      this.overlay.close();
      return;
    }
    const params = {
      'username': this.username,
      'firstName': this.firstname,
      'lastName': this.lastname,
      'email': this.email,
      'password': this.password,
      'addresss': this.address,
      'phoneNumber': this.phoneNumber
    };
    this.loginSer.signup(params).subscribe(res => {
      this.overlay.close();
      this.loginSer.successSignUp = 'Chúc mừng bạn đã đăng ký thành công!'
      this.route.navigate(['/login']);
    }, error => {
      this.overlay.close();
      return;
    });
  }

  validate() {
    let error = false;
    if (!this.email) {
      this.validError.requiredEmail = 'Bạn hãy nhập email';
      error = true;
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.validError.requiredEmail = 'Định dạng email sai';
        error = true;
      } else {
        this.validError.requiredEmail = '';
      }
    }
    if (!this.username) {
      this.validError.requiredUsername = 'Bạn hãy nhập tên đăng nhập';
      error = true;
    } else {
      if (this.username.length < 6) {
        this.validError.requiredUsername = 'Username phải từ 6 ký tự trở lên';
        error = true;
      } else {
        this.validError.requiredUsername = '';
      }
    }
    if (!this.firstname) {
      this.validError.requiredFirstName = 'Bạn hãy nhập họ';
      error = true;
    } else {
      this.validError.requiredFirstName = '';
    }
    if (!this.lastname) {
      this.validError.requiredLastName = 'Bạn hãy nhập tên';
      error = true;
    } else {
      this.validError.requiredLastName = '';
    }
    if (!this.password) {
      this.validError.requiredPassword = 'Bạn hãy nhập mật khẩu';
      error = true;
    } else {
      this.validError.requiredPassword = '';
    }
    if (!this.password_confirm) {
      this.validError.validPC = 'Bạn hãy nhập mật khẩu xác nhận';
      error = true;
    } else {
      if (this.password_confirm !== this.password) {
        this.validError.validPC = 'Bạn đã nhập sai mật khẩu xác nhận';
        error = true;
      } else {
        this.validError.validPC = '';
      }
    }
    if (!this.phoneNumber) {
      this.validError.validPhone = 'Bạn hãy nhập số điện thoại';
      error = true;
    } else {
      if (! /^\d+$/.test(this.phoneNumber)) {
        this.validError.validPhone = 'Sai số điện thoại';
        error = true;
      } else {
        this.validError.validPhone = '';
      }
    }
    if (!this.address) {
      this.validError.requiredAddress = 'Bạn hãy nhập địa chỉ';
      error = true;
    } else {
      this.validError.requiredAddress = '';
    }
    return error;
  }
}
