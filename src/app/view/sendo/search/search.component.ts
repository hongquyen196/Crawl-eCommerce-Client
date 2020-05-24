import { Component, OnInit } from '@angular/core';
import { SendoService } from '../sendo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchSendoComponent implements OnInit {

  dataResult = [];
  sortDefine = {
    'index': 1,
    'name': 1,
    'price': 1,
    'total_comment': 1,
    'counter_view': 1,
    'counter_like': 1,
    'total_rated': 1,
    'percent_star': 1,
    'order_count': 1,
    'total_sales': 1
  };
  start_page = 1;
  end_page = 5;
  keyword= '';
  constructor(public sendoService: SendoService) { }

  ngOnInit() {
  }

  searchProduct() {
    if (this.keyword == '') {
      return;
    }
    this.sendoService.searchInSendo(this.keyword, this.start_page, this.end_page).subscribe((res:any) => {
      this.dataResult = res.result.data;
      let count = 1;
      this.dataResult.forEach((p:any) => {
        p.index = count++;
        p.select = false;
        p.total_sales = p.price * p.order_count;
      })
    })
  }

  sortProduct(key) {
    this.sortDefine[key] = this.sortDefine[key] == 1 ? -1 : 1;
    this.dataResult = this.dataResult.sort((a,b) => {
      if (key == 'percent_star') {
        return a.rating_info.percent_star > b.rating_info.percent_star ? this.sortDefine[key] : -1 * this.sortDefine[key]; 
      } else {
        return a[key] > b[key] ? this.sortDefine[key] : -1 * this.sortDefine[key]; 
      }
    })
  }
}
