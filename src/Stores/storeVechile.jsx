import { makeObservable, observable, action } from 'mobx';




// Inicijalna vrijednost forme
export const initVechileValue = {
  id: 0,
  modelAuto: '',
  email: '',
  mobile: '',
  city: '',
  motor: 'benzin',
  producerId: '',
  sellDate: new Date(),
  isLoan: true,
};


// pocetne vrijednosti u listi automobila
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
    id: 0,
    modelAuto: 'Ford',
    email: 'email@yahoo.com',
    mobile: 222222222,
    city: 'Zagreb',
    motor: 'benzin',
    producer: "FORD",
    producerId: '1',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: false,
  },
];


// 
// Glavna store funkcija
class Store {
  constructor() {
    makeObservable(this, {
      vechileFormValue: observable,
      setVechileValue: action,
      listVehicle: observable,
      listVehiclePut: action,
    });
  }

  
  
  // Pocetna vrijednost FORME i podataka u listi
  vechileFormValue = initVechileValue;
  listVehicle = listVehicleInit;

  // promjena vrijednosti u formi
  setVechileValue(name, valueForm) {
    console.log(name, valueForm);

    // setiramo vrijednost forme
        this.vechileFormValue ={
          ...this.vechileFormValue,
        [name]:valueForm
      }

      // SLUZI za ispis u conosle.table()
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

  //  dodavanje zapisa na listu
  listVehiclePut(data) {
    this.listVehicle.push(data)
  }




}



export const store = new Store();
// export default store;
