import {Component, OnInit, Input} from '@angular/core';
import {ProductDetailService} from './product-detail.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('data') data: any;

  constructor(
    private proSer: ProductDetailService,
    private route: ActivatedRoute
  ) {
  }

  isLoading = false;
  product: any = {
    name: '',
    image: '',
    price: '',
    url: '',
    date: '',
    description: '',
    thongke: {
      vitri: '',
      daban: '',
      giamax: '',
      giamin: '',
      likes: '',
      kho: '',
      danhgia: '',
      luotxem: '',
      diemso: '',
      isshop: '',
    },
    chuyenmuc: [],
    mausanpham: [],
    thuoctinh: []
  };

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id = params.id);
    this.isLoading = true;
    this.product.name = this.data.name;
    this.product.price = this.data.price;
    switch (0) {
      case id.indexOf('tiki'):
        this.product.image = this.data.thumbnail_url;
        this.product.url = 'https:/tiki.vn/' + this.data.url_path;
        this.proSer.getTikiProductDetail(this.data.url_path).subscribe((res: any) => {
          if (res) {
            this.product.description = res.promotion;
            this.product.thongke.giamax = res.list_price;
            this.product.thongke.kho = res.stock_item.qty;
            if (res.custom_attributes.length > 0) {
              res.custom_attributes.forEach(ele => {
                const thuoctinh = {
                  ma: ele.attribute,
                  ten: ele.display_name,
                  giatri: ele.value
                };
                this.product.thuoctinh.push(thuoctinh);
              });
            }
          }
          this.isLoading = false;
        });
        break;
      case id.indexOf('shopee'):
        this.product.price = this.data.price / 100000;
        this.product.image = 'https://cf.shopee.vn/file/' + this.data.image;
        this.proSer.getShopeeProductDetail(this.data.itemid, this.data.shopid).subscribe((res: any) => {
          if (res) {
            this.product.description = res.item.description;
          }
          this.isLoading = false;
        });
        break;
      case id.indexOf('sendo'):
        this.product.image = this.data.image;
        this.product.url = 'https:/sendo.vn/' + this.data.cat_path;
        this.proSer.getSendoProductDetail(this.data.cat_path.substring(0, this.data.cat_path.length - 6)).subscribe((res: any) => {
          if (res) {
            this.product.description = res.result.data.description;
          }
          this.isLoading = false;
        });
        break;
    }

  }

  nothing(event) {
    event.stopPropagation();
  }

  formatCurrency() {
    return new Intl.NumberFormat('en');
  }

}
