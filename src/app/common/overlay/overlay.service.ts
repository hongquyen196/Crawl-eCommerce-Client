import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(
  ) { }
  overlay = false;
  open() {
    setTimeout(res => {
      if (!this.overlay) { this.overlay = true; }
    }, 0);
  }
  close() {
    setTimeout(res => {
      if (this.overlay) { this.overlay = false; }
    }, 1000);
  }
}
