import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PathAPI } from '../../common/api_path';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(
    private http: HttpClient,
  ) { }

  getShopeeProductDetail(itemId, shopId) {
    const param = new HttpParams()
      .set('itemId', itemId)
      .set('shopId', shopId);
    return this.http.get(PathAPI.GET_SHOPEE_PRODUCT_DETAIL, { params: param });
  }
  getSendoProductDetail(urlPath) {
    const param = new HttpParams()
      .set('urlPath', urlPath)
    return this.http.get(PathAPI.GET_SENDO_PRODUCT_DETAIL, { params: param });
  }
  getTikiProductDetail(urlPath) {
    const param = new HttpParams()
      .set('urlPath', urlPath)
    return this.http.get(PathAPI.GET_TIKI_PRODUCT_DETAIL, { params: param });
  }
}
