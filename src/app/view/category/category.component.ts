import {Component, OnInit} from '@angular/core';
import {CategoryService} from './category.service';
import {Router} from '@angular/router';
import {OverlayService} from '../../common/overlay/overlay.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  listCategory: any = [];
  listTiki = [];
  listSendo = [];
  listShopee = [];
  listLazada = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private overlay: OverlayService
  ) {
  }

  ngOnInit() {
    const categoryList = localStorage.getItem('listCategory');
    if (categoryList) {
      this.listCategory = JSON.parse(categoryList);
      this.listCategory.forEach(ele => {
        switch (0) {
          case ele.categoryId.indexOf('tiki'):
            this.listTiki.push(ele);
            break;
          case ele.categoryId.indexOf('shopee'):
            this.listShopee.push(ele);
            break;
          case ele.categoryId.indexOf('sendo'):
            this.listSendo.push(ele);
            break;
          case ele.categoryId.indexOf('lazada'):
            this.listLazada.push(ele);
            break;
        }
      });
    } else {
      this.overlay.open();
      this.categoryService.getListCategory().subscribe(res => {
        this.listCategory = res;
        localStorage.setItem('listCategory', JSON.stringify(res));
        this.listCategory.forEach(ele => {
          switch (0) {
            case ele.categoryId.indexOf('tiki'):
              this.listTiki.push(ele);
              break;
            case ele.categoryId.indexOf('shopee'):
              this.listShopee.push(ele);
              break;
            case ele.categoryId.indexOf('sendo'):
              this.listSendo.push(ele);
              break;
            case ele.categoryId.indexOf('lazada'):
              this.listLazada.push(ele);
              break;
          }
        });
        this.overlay.close();
      });
    }
  }

  openCategory(id_category, name) {
    const listCat: any = [];
    listCat.push({
      id: id_category,
      name: name
    });
    localStorage.setItem('category', JSON.stringify(listCat));
    this.router.navigate(['/category/' + id_category]);
  }
}
