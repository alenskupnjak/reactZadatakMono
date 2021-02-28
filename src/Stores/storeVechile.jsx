import { makeObservable, observable, computed } from 'mobx';




// Inicijalna vrijednost forme
const initVechileValue = {
  id: 0,
  modelAuto: ' modelAuto',
  email: 'email',
  mobile: '12345679998',
  city: 'Sesvete',
  motor: 'benzin',
  //  producer: "BMV",
  producerId: '1',
  sellDate: '2021-02-26T10:51:22.509Z',
  isLoan: false,
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
      setVechileValue: observable,

    });
  }

  
  
  // Pocetna vrijednost FORME
  vechileFormValue = initVechileValue;

  // promjena vrijednosti u formi
  setVechileValue(name, valueForm) {
      this.vechileFormValue ={
        ...this.vechileFormValue,
        [name]:valueForm
      }
      console.log(this.vechileFormValue );
  }


}





//  EXPORT STORE  *** EXPORT STORE  ***  EXPORT STORE
// const store = new Store();
export default new Store();
