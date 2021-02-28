import { makeObservable, observable, action, computed } from 'mobx';




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


// pocetne vrijednosti u listi autompbila
const listVehicle = [
  {
    id: 0,
    modelAuto: 'X5',
    email: 'email',
    mobile: 12345679998,
    city: 'Sesvete',
    motor: 'diesel',
    producer: "BMV",
    producerId: '1',
    sellDate: '2021-02-26T10:51:22.509Z',
    isLoan: true,
  },
];


// 
// Glavna store funkcija
class Store {
  constructor() {
    makeObservable(this, {
      vechileFormValue: observable,
      setVechileValue: action,
    });
  }

  
  
  // Pocetna vrijednost FORME
  vechileFormValue = initVechileValue;

  // promjena vrijednosti u formi
  setVechileValue(name, valueForm) {
    console.log(name, valueForm);

      const vrijednost ={
        ...this.vechileFormValue,
        [name]:valueForm
      }
      this.vechileFormValue = vrijednost
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
      // return this.setVechileValue
  }


}



export const store = new Store();
// export default store;
