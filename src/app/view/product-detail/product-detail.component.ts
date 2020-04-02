import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailService } from './product-detail.service';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

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
            if (res.custom_attributes && res.custom_attributes.length > 0) {
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
        this.product.url = 'https:/shopee.vn/' + this.data.name + '-i.' + this.data.shopid + '.' + this.data.itemid;
        this.proSer.getShopeeProductDetail(this.data.itemid, this.data.shopid).subscribe((res: any) => {
          if (res) {
            this.product.description = res.item.description;
            this.product.thongke.vitri = res.item.shop_location;
            this.product.thongke.daban = res.item.historical_sold;
            this.product.thongke.doanhthu = this.product.price * this.product.thongke.daban;
            this.product.thongke.giamax = res.item.price_max / 100000;
            this.product.thongke.giamin = res.item.price_min / 100000;
            this.product.thongke.likes = res.item.liked_count;
            this.product.thongke.kho = res.item.stock;
            this.product.thongke.danhgia = res.item.cmt_count;
            this.product.thongke.luotxem = res.item.view_count;
            this.product.thongke.isshop = res.item.shopee_verified;
            if (res.item.models && res.item.models.length > 0) {
              res.item.models.forEach(ele => {
                const mausp = {
                  ma: ele.modelid,
                  ten: ele.name,
                  gia: ele.price / 100000,
                  kho: ele.stock,
                  daban: ele.sold
                };
                this.product.mausanpham.push(mausp);
              });
            }
            if (res.item.attributes && res.item.attributes.length > 0) {
              res.item.attributes.forEach(ele => {
                const tt = {
                  ma: ele.id,
                  ten: ele.name,
                  giatri: ele.value
                };
                this.product.thuoctinh.push(tt);
              });
            }
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
            this.product.price = res.result.data.final_price;
            this.product.thongke.giamax = res.result.data.price_max;
            this.product.thongke.daban = res.result.data.order_count;
            this.product.thongke.kho = res.result.data.quantity;
            this.product.thongke.danhgia = res.result.data.total_comment;
            this.product.thongke.vitri = res.result.data.shop_info.warehourse_region_name;
            if (res.result.data.attribute && res.result.data.attribute.length > 0) {
              res.result.data.attribute.forEach(ele => {
                if (res.result.data.attribute.value && res.result.data.attribute.value.length > 0) {
                  res.result.data.attribute.value.forEach(el => {
                    const tt = {
                      ma: ele.attribute_id,
                      ten: ele.name,
                      giatri: ele.product_option_id
                    };
                    this.product.thuoctinh.push(tt);
                  });
                }
              });
            }
            if (res.result.data.variants && res.result.data.variants.length > 0) {
              res.result.data.variants.forEach(ele => {
                const tt = {
                  ma: ele.attribute_hash,
                  ten: ele.name,
                  gia: ele.final_price,
                  kho: ele.stock,
                  daban: '--'
                };
                this.product.mausanpham.push(tt);
              });
            }
            if (res.result.data.category_info && res.result.data.category_info.length > 0) {
              res.result.data.category_info.forEach(ele => {
                this.product.chuyenmuc.push(ele.title);
              });
            }
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
