import { makeObservable, observable, action, computed } from 'mobx';


// Init form values
export const initVechileValue = {
  modelAuto: '',
  email: '',
  mobile: '',
  city: '',
  motor: 'benzin',
  producer: '',
  sellDate: new Date(),
  isLoan: true,
};


// init value u listVehicle
const listVehicleInit = [
  {
    id: 1254789134,
    modelAuto: 'm7',
    email: 'email',
    mobile: 11111111,
    city: 'Sesvete',
    motor: 'diesel',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
  {
    id: 7589325488,
    modelAuto: 'm8',
    email: 'email@yahoo.com',
    mobile: 222222222,
    city: 'Zagreb',
    motor: 'benzin',
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
  setVechileValue(name, value) {
    //set value form
        this.vechileFormValue ={
          ...this.vechileFormValue,
        [name]:value,
      }

      // for conosle.table() !
      const stateValueFormEdit = {
        id: this.vechileFormValue.id,
        modelAuto: this.vechileFormValue.modelAuto,
        email: this.vechileFormValue.email,
        mobile: this.vechileFormValue.mobile,
        city: this.vechileFormValue.city,
        motor: this.vechileFormValue.motor,
        // producer: this.vechileFormValue.producer,
        // producerId: this.vechileFormValue.producerId,
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
          // producer: data.producer,
          // producerId: data.producerId,
          sellDate: data.sellDate,
          isLoan: data.isLoan,
        }
      return dataVehicle
    })
       console.log(listVehicle);
       
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
