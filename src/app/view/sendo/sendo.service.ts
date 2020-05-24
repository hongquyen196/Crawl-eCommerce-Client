import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PathAPI } from 'src/app/common/api_path';

@Injectable({
  providedIn: 'root'
})
export class SendoService {

  constructor(private httpClient: HttpClient) { }

  formatCurrency(value) {
    return value && value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  searchInSendo(keyword, start_page, end_page){
    let numberProduct = (end_page - start_page + 1) * 60;
    return this.httpClient.get(PathAPI.SEARCH_SENDO_BY_NODE + '?keyword=' + keyword + '&start=' + start_page + '&size='+ numberProduct);
  }
}
