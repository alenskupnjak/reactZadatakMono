import { makeObservable, observable, action, computed } from 'mobx';
import { listVehicleInit, initVechileValue } from './VehicleService';

//
// MAIN MAIN MAIN
class Store {
  constructor() {
    makeObservable(this, {
      vechileFormValue: observable,
      setVechileValue: action,
      listVehicle: observable,
      listVehiclePut: action,
      listVehicleGet: computed,
      listVehicleDelete: action,
      listVehicleUpdate: action,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      // setFilterFn: action,

      handleSearch: action,

      confirmDialog: observable,
      setConfirmDialog: action,

      disableSubmitButton: observable,
      setDisableSubmitButton: action,

      errors:observable,
      setErrors: action,
    });
  }

  // Init value
  vechileFormValue = initVechileValue;
  listVehicle = listVehicleInit;
  openCustomDialog = false;
  addOrUpdate = 'addFormValueToList';

  disableSubmitButton = true;

  confirmDialog = {
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: ''
  }

  filterFn = {
    fn: (items) => {
      return items;
    }
  }

  errors = {}


  // Change value in form
  setVechileValue(name, value) {
    //set value form
    this.vechileFormValue = {
      ...this.vechileFormValue,
      [name]: value,
    };

    // for conosle.table() !
    // const stateValueFormEdit = {
    //   id: this.vechileFormValue.id,
    //   modelAuto: this.vechileFormValue.modelAuto,
    //   email: this.vechileFormValue.email,
    //   mobile: this.vechileFormValue.mobile,
    //   city: this.vechileFormValue.city,
    //   motor: this.vechileFormValue.motor,
    //   sellDate: this.vechileFormValue.sellDate,
    //   isLoan: this.vechileFormValue.isLoan,
    // };
    // console.table(stateValueFormEdit);
  }

  //
  // PUT - add value to Vehicle list
  listVehiclePut(data) {
    this.listVehicle.push(data);
    // after save reset form
    this.vechileFormValue = initVechileValue;
  }

  //
  // GET - pull data from Vehicle list
  get listVehicleGet() {
    const listVehicle = this.listVehicle.map((data) => {
      const dataVehicle = {
        id: data.id,
        modelAuto: data.modelAuto,
        model: data.model,
        producer: data.producer,
        email: data.email,
        mobile: data.mobile,
        city: data.city,
        motor: data.motor,
        sellDate: data.sellDate,
        isLoan: data.isLoan,
      };
      return dataVehicle;
    });
    return listVehicle;
  }

  //
  // DELETE - delete one record from Vehicle list
  listVehicleDelete(id) {
    const index = this.listVehicle.findIndex((data) => {
      return data.id === id;
    });
    // delete record from list
    this.listVehicle.splice(index, 1);
  }

  //
  // UPDATE - change one record in Vehicle list
  listVehicleUpdate(updateData) {
    const index = this.listVehicle.findIndex((data) => {
      return data.id === updateData.id;
    });

    //  replace (UPDATE) value
    this.listVehicle.splice(index, 1, updateData);
  }

  //  Open/Close dialog
  setOpenCustomDialog(data) {
    this.openCustomDialog = data;
  }

  //  Open/Close dialog
  setAddOrUpdate(data) {
    this.addOrUpdate = data;
  }

  setFilterFn() {
    this.filterFn = {
      fn: (items) => {
        return items;
      }
    }
  }

  // 
  handleSearch(e) {
    if (e.target.value === '') {
      this.filterFn = {
        fn: (items) => {
          return items;
        },
      };
    } else {
      this.filterFn = {
        fn: (items) => {
          return items.filter((data) =>
            data.model.toLowerCase().includes(e.target.value.toLowerCase())
          );
        },
      };
    }
  }

  // 
  setConfirmDialog(isOpen, title = null, subTitle = null, onConfirm = null) {
    // console.log(isOpen, title, subTitle, onConfirm);
    this.confirmDialog = { isOpen: isOpen, title: title, subTitle: subTitle }
  }

  // 
  setDisableSubmitButton(data) {
    this.disableSubmitButton = data;
  }

  // 
  setErrors(data) {
    // console.log({data});
    this.errors = data;
    // console.log('poslije - ',this.errors);
  }


}

export const store = new Store();
