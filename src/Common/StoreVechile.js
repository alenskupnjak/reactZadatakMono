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
      listVehiclePut: observable,
      listVehicleGet: computed,
      listVehicleDelete: action,
      listVehicleUpdate: action,
    });
  }

  // Init value
  vechileFormValue = initVechileValue;
  listVehicle = listVehicleInit;

  // Change value in form
  setVechileValue(name, value) {
    //set value form
    this.vechileFormValue = {
      ...this.vechileFormValue,
      [name]: value,
    };

    // for conosle.table() !
    const stateValueFormEdit = {
      id: this.vechileFormValue.id,
      modelAuto: this.vechileFormValue.modelAuto,
      email: this.vechileFormValue.email,
      mobile: this.vechileFormValue.mobile,
      city: this.vechileFormValue.city,
      motor: this.vechileFormValue.motor,
      sellDate: this.vechileFormValue.sellDate,
      isLoan: this.vechileFormValue.isLoan,
    };
    console.table(stateValueFormEdit);
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
  listVehicleDelete(data) {
    // some code
  }

  //
  // UPDATE - change one record in Vehicle list
  listVehicleUpdate(data) {
    //  some code
  }
}

export const store = new Store();
