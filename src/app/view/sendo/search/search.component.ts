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
  recordInPage = 20;
  currentPage = 1;
  constructor(public sendoService: SendoService) { }

  ngOnInit() {
  }

  searchProduct() {
    if (this.keyword == '') {
      return;
    }
    this.searchSendoByPage(this.start_page);
  }

  searchSendoByPage(page){
    if (page > this.end_page){
      this.currentPage = 1;
      return;
    } else {
      this.sendoService.searchInSendo(this.keyword, this.start_page).subscribe((res:any) => {
        let dataRs = res.result.data

        let count = this.dataResult.length + 1;
        dataRs.forEach((p:any) => {
          p.index = count++;
          p.select = false;
          p.total_sales = p.price * p.order_count;
        });
        this.dataResult = this.dataResult.concat(dataRs);
        this.searchSendoByPage(++page);
      })
    }
  }

  selectPage() {
    console.log(this.currentPage);
    
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
