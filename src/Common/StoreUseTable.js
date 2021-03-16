import { makeObservable, observable, action } from 'mobx';

class UseTable {
  constructor() {
    makeObservable(this, {
      pages: observable,
      page: observable,
      setPage: action,

      rowsPerPage: observable,
      setRowsPerPage: action,

      orderSort: observable,
      setOrderSort: action,

      orderSortBy: observable,
      setOrderSortBy: action,

      handleChangeRowsPerPage:action

    });
  }

  pages = [5, 10, 25];
  // Start page for sorting and filtering
  page = 0;

  rowsPerPage = this.pages[0];

  //  setup init sorting direction
  orderSort = 'asc';

  orderSortBy = 'model'

  setPage(page) {
    this.page = page;
  }

  setRowsPerPage(event) {
    this.rowsPerPage = +event.target.value
  }

  // set order sort
  setOrderSort() {
    if (this.orderSort === 'asc') {
      this.orderSort = 'desc'
    } else {
      this.orderSort = 'asc'
    }
    // console.log(this.orderSort);
  }

  setOrderSortBy(sortColumn) {
    this.orderSortBy = sortColumn;
  }

  handleChangeRowsPerPage(event) {
    this.setRowsPerPage(event);
    this.setPage(0);
  }

}

export const storeUseTable = new UseTable();
