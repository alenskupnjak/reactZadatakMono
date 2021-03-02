import { makeObservable, observable, action, computed } from 'mobx';




// Inicijalna vrijednost forme
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
    id: 1,
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
      listVehiclePut: observable,
      listVehicleGet: computed,
      listVehicleDelete: action,
      listVehicleUpdate: action,
    });
  }

  
  
  // Pocetna vrijednost FORME i podataka u listi
  vechileFormValue = initVechileValue;
  listVehicle = listVehicleInit;

  // promjena vrijednosti u formi
  setVechileValue(name, valueForm) {
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

  // PUT dodavanje zapisa na listu
  listVehiclePut(data) {
    console.log(data);
    
    this.listVehicle.push(data)
    console.log(this.listVehicle);
    this.listVehicle.forEach(data=> {
      console.table(data.id);
    })

    // Nakon unosa vrijednosti resetiramo formu
    this.vechileFormValue = initVechileValue
  }

  // 
  // GET povlacenje svih zapisa sa liste
  get listVehicleGet() {
    const listaAutomobila = this.listVehicle.map(data=>{
      	const podaci = {
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
      return podaci
    })

    console.log(listaAutomobila);    
    return listaAutomobila 
  }

  // DELETE brisanje zapisa sa liste
  listVehicleDelete(data) {
    // some code
  }

  // UPDATE promjena pojedinog zapisa zapisa na listu
  listVehicleUpdate(data) {
  //  some code
  }




}



export const store = new Store();
// export default store;
