import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from './table.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() evShowDataDetail = new EventEmitter();
  checkAll = false;
  isLoading = false;
  rowSelected = {};
  loadMore = 1;
  pagination = {
    page: 1,
    pageSize: 100,
    totalRecords: 0
  };
  dataCopy: any[];
  dataProduct = [];
  cateId;
  typeTradingFloor = null;
  mess = {
    1: 'Không có dữ liệu, có thể đề xuất',
    2: 'Đã hết dữ liệu có thể đề xuất',
    3: 'Lỗi API! Không thể get được dữ liệu',
    4: 'Đã sao chép link sản phẩm'
  };
  displayedColumnsShopee: any[] = [
    'select',
    'index',
    'image',
    'name',
    'price',
    'historical_sold',
    'ctime',
    'stock',
    'discount',
    'view_count',
    'liked_count',
    'cmt_count',
    'rating_star',
    'shop_location',
    'sales'
  ];
  displayedColumnsTiKi: any[] = [
    'select',
    'index',
    'thumbnail_url',
    'name',
    'price',
    'order_count',
    'discount',
    'discount_rate',
    'review_count',
    'favourite_count',
    'rating_average',
    'sales'
  ];
  displayedColumnsSendo: any[] = [
    'select',
    'index',
    'image',
    'name',
    'final_price',
    'order_count',
    'original_price',
    'final_promotion_percent',
    'shop_name',
    'counter_view',
    'counter_like',
    'total_comment',
    'percent_star',
    'sales'
  ];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  constructor(
    private tableSer: TableService,
    private acRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.cateId = this.acRoute.snapshot.params.id;
    switch (0) {
      case this.cateId.indexOf('shopee'):
        this.typeTradingFloor = 0;
        break;
      case this.cateId.indexOf('tiki'):
        this.typeTradingFloor = 1;
        break;
      case this.cateId.indexOf('sendo'):
        this.typeTradingFloor = 2;
        break;
    }
    this.onLoadData();
  }
  async onLoadData() {
    await this.isLoadData(async () => {
      switch (this.typeTradingFloor) {
        case 0:
          await this.tableSer.getShopeeProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.dataProduct = res;
            } else {
              if (this.dataProduct.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
        case 1:
          await this.tableSer.getTikiProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.dataProduct = res;
            } else {
              if (this.dataProduct.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
        case 2:
          await this.tableSer.getSendoProduct(this.cateId, this.loadMore.toString()).toPromise().then((res: any) => {
            if (res && res.length > 0) {
              this.loadMore += 1;
              this.dataProduct = res;
            } else {
              if (this.dataProduct.length === 0) {
                this.typeTradingFloor = 7;
                return;
              }
              this._snackBar.open(this.mess[2], 'Undo', {
                duration: 3000
              });
            }
          }, err => {
            this.typeTradingFloor = 8;
            this.isLoading = false;
          });
          break;
      }
      this.dataSource.data = this.dataProduct;
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
      // this.dataSource.sort = this.sort;
      this.pagination.totalRecords = this.dataProduct.length;
      this.pagination.page = 1;
    });
  }
  onAllSelected(event) {
    this.checkAll = !this.checkAll;
    this.dataCopy = [];
    for (const iterator of this.dataSource.data) {
      iterator['isChecked'] = this.checkAll;
    }
  }
  async fillerCheckAllData() {
    for (const iterator of this.dataSource.data) {
      if (!iterator['isChecked']) {
        this.checkAll = false;
        return;
      }
    }
    this.checkAll = true;
  }
  onSelectedRow(event, row) {
    row['isChecked'] = !row['isChecked'];
    this.fillerCheckAllData();
  }
  onNothing(event) {
    event.stopPropagation();
  }
  onPaginatorBT(event) {
    this.isLoadData(() => {
      this.pagination.page = event;
      this.paginator.pageIndex = this.pagination.page - 1;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }
  onPaginator(event) {
    this.isLoadData(() => {
      this.pagination.pageSize = event.pageSize;
      this.pagination.page = event.pageIndex + 1;
    });
  }
  onShowDetail(ele) {
    this.rowSelected = ele;
    this.evShowDataDetail.emit(ele);
  }
  onFilterData(event: Event) {
    this.isLoadData(() => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      setTimeout(() => {
        this.pagination.pageSize = this.dataSource.paginator['_pageSize'];
        this.pagination.totalRecords = this.dataSource.paginator['_length'];
        this.pagination.page = this.dataSource.paginator['_pageIndex'] + 1;
      });
    });
  }
  isLoadData(func) {
    this.isLoading = true;
    setTimeout(async () => {
      await func();
      this.isLoading = false;
    });
  }
  onCopyToClipboard() {
    const arr = this.dataSource.data.filter((item) => {
      return item['isChecked'] === true;
    });
    let text = [];
    switch (this.typeTradingFloor) {
      case 0:
        text = arr.map((item) => (`https://shopee.vn/product/${item.shopid}/${item.itemid}`));
        break;
      case 1:
        text = arr.map((item) => `https://tiki.vn/${item.url_path}`);
        break;
      case 2:
        text = arr.map((item) => `https://www.sendo.vn/${item.cat_path}`);
        break;
    }
    const node = document.createElement('textarea');
    const selection = document.getSelection();
    node.textContent = text.join('\r\n');
    document.body.appendChild(node);
    selection.removeAllRanges();
    node.select();
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(node);
    this._snackBar.open(this.mess[4], 'Hủy', {
      duration: 3000
    });
  }
  formatCurrency() {
    return new Intl.NumberFormat('en');
  }
  formatNumber(value) {
    return value && Number(value.toFixed(2));
  }
  abbreviateNumber(n) {
    if (n < 1e3) { return n; }
    if (n >= 1e3 && n < 1e6) { return +(n / 1e3).toFixed(1) + 'k'; }
    if (n >= 1e6 && n < 1e9) { return +(n / 1e6).toFixed(2) + 'tr'; }
    if (n >= 1e9 && n < 1e12) { return +(n / 1e9).toFixed(3) + 'tỷ'; }
    if (n >= 1e12) { return +(n / 1e12).toFixed(1) + 'n tỷ'; }
  }
  convertOriginalPrice(value) {
    if (value) {
      value = value.replace(/[^0-9]/g, '');
    }
    return this.abbreviateNumber(Number(value));
  }
}
