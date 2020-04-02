import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayService } from '../../common/overlay/overlay.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  listCategory: any = [];
  showListProduct = false;
  isLoading = false;
  showProduct = false;
  showDetailProduct = false;
  parentName;
  productDetail: any;
  listShopShopee = [];
  listShopTiki = [];
  listShopSendo = [];
  listShopLazada = [];
  listCatCB: any = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private overlay: OverlayService
  ) { }

  ngOnInit() {
    this.overlay.open();
    this.listCatCB = JSON.parse(localStorage.getItem('category'));
    // @ts-ignore
    const id;
    // @ts-ignore
    this.route.params.subscribe(params => id = params.id);
    this.categoryService.getListSubCategory(id).subscribe(res => {
      this.listCategory = res;
    });
    this.categoryService.getListShop(id).subscribe((res: any) => {
      switch (0) {
        case id.indexOf('tiki'):
          this.parentName = 'TIKI';
          if (res) {
            this.listShopTiki = res.filters[res.filters.length - 1].values;
          }
          break;
        case id.indexOf('shopee'):
          this.parentName = 'SHOPEE';
          if (res) {
            this.listShopShopee = res.data.items.map(shop => {
              shop.ctime = new Date(shop.ctime * 1000).toLocaleString();
              return shop;
            })
          }
          break;
        case id.indexOf('sendo'):
          this.parentName = 'SENDO';
          if (res) {
            this.listShopSendo = res.result.data.filter((thing, i, arr) => {
              return arr.indexOf(arr.find(t => t.admin_id === thing.admin_id)) === i
            });
          }
          break;
      }
      this.overlay.close();
    })
    this.parentName = this.categoryService.categoryParrent;
  }

  openCategory(id_category, name) {
    this.overlay.open();
    const listCatCB = JSON.parse(localStorage.getItem('category'));
    listCatCB.push({
      id: id_category, name: name
    })
    this.listCatCB = listCatCB;
    localStorage.setItem('category', JSON.stringify(listCatCB));
    this.categoryService.getListSubCategory(id_category).subscribe(res => {
      this.listCategory = res;
      this.overlay.close();
    });
  }

  loadProduct() {
    this.showProduct = true;
    this.showListProduct = true;
  }

  openProduct(event) {
    this.productDetail = event;
    this.showDetailProduct = true;
  }
  closeDetailProduct(event) {
    this.showDetailProduct = false;
  }
}
