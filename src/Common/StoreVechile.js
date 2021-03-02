import { makeObservable, observable, action, computed } from 'mobx';


// Init form values
export const initVechileValue = {
  modelAuto: '',
  email: '',
  mobile: '',
  city: '',
  motor: 'benzin',
  producerId: '',
  sellDate: new Date(),
  isLoan: true,
};


// init value u listVehicle
const listVehicleInit = [
  {
    id: 0,
    modelAuto: 'X5',
    email: 'email',
    mobile: 11111111,
    city: 'Sesvete',
    motor: 'diesel',
    producer: "BMV",
    producerId: '1',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 1,
    modelAuto: 'Ford',
    email: 'email@yahoo.com',
    mobile: 222222222,
    city: 'Zagreb',
    motor: 'benzin',
    producer: "FORD",
    producerId: '2',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
];


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
  setVechileValue(name, valueForm) {
    //set value form
        this.vechileFormValue ={
          ...this.vechileFormValue,
        [name]:valueForm
      }

      // for conosle.table() !
      const stateValueFormEdit = {
        id: this.vechileFormValue.id,
        modelAuto: this.vechileFormValue.modelAuto,
        email: this.vechileFormValue.email,
        mobile: this.vechileFormValue.mobile,
        city: this.vechileFormValue.city,
        motor: this.vechileFormValue.motor,
        producer: this.vechileFormValue.producer,
        producerId: this.vechileFormValue.producerId,
        sellDate: this.vechileFormValue.sellDate,
        isLoan: this.vechileFormValue.isLoan,
      }
      console.table(stateValueFormEdit);
  }

  // 
  // PUT - add value to Vehicle list
  listVehiclePut(data) {
    console.log(data);
    
    this.listVehicle.push(data)
    // Nakon unosa vrijednosti resetiramo formu
    this.vechileFormValue = initVechileValue

    console.log(this.listVehicle);
  }

  // 
  // GET - pull data from Vehicle list
  get listVehicleGet() {
    const listVehicle = this.listVehicle.map(data=>{
      	const dataVehicle = {
          id: data.id,
          modelAuto: data.modelAuto,
          email: data.email,
          mobile: data.mobile,
          city: data.city,
          motor: data.motor,
          producer: data.producer,
          producerId: data.producerId,
          sellDate: data.sellDate,
          isLoan: data.isLoan,
        }
      return dataVehicle
    })
 
    return listVehicle
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
