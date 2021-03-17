import { makeObservable, observable, action, computed } from 'mobx';
import {
  initProducerValue,
  listProducers,
  listModelVechile,
} from './VehicleService';

//
// MAIN MAIN MAIN
class Producers {
  constructor() {
    makeObservable(this, {
      producerFormValue: observable,
      setProducerValue: action,
      resetFormValue: action,
      listProducer: observable,
      listProducerPut: action,
      listProducerGet: computed,
      listProducerDelete: action,
      listProducerUpdate: action,

      // Models
      listModel: observable,
      listModelGet: computed,
      listModelPut: action,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      setFilterFn: action,

      confirmDialog: observable,
      setConfirmDialog: action,

      disableSubmitButton: observable,
      setDisableSubmitButton: action,

      errors: observable,
      setErrors: action,

      resetForm: action,
      generateModelId: action,
      generateProducerId: action
    });
  }

  // Init value za formu
  producerFormValue = initProducerValue;

  // Init value for producer
  listProducer = listProducers;

  // Init value for models
  listModel = listModelVechile;

  openCustomDialog = false;

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

  // 
  addOrUpdate = 'addFormValueToList'

  // 
  // Change value in form
  setProducerValue(name, value) {
    //set value form
    this.producerFormValue = {
      ...this.producerFormValue,
      [name]: value,
    };
  }

  // 
  // RESET producer form
  resetFormValue() {
    this.producerFormValue = {
      ...this.producerFormValue,
      id: '',
      model: '',
      producerId: '',
      producer: ''
    };
  }

  //
  // PUT - add value to Vehicle list
  listProducerPut(data) {
    this.listProducer.push(data);
    // after save reset form
    // this.producerFormValue = initProducerValue;
  }

  //
  // GET PRODUCER - pull data from Vehicle list
  get listProducerGet() {
    const listProducer = this.listProducer.map((data) => {
      const dataProducer = {
        id: data.id,
        producer: data.producer,
      };
      return dataProducer;
    });
    return listProducer;
  }

  //
  // DELETE - delete one record from Producer list
  listProducerDelete(producer) {
    // console.log('listProducerDelete=', producer);
    let counter = 0;
    this.listModelGet.forEach(data => {
      if (data.producer === producer) {
        counter++
      }
    })

    // last producer deletet from list
    if (counter === 0) {
      const index = this.listProducer.findIndex((data) => {
        return data.producer === producer;
      });
      // // delete record from list
      this.listProducer.splice(index, 1);
      // console.log(this.listProducerGet);
    }
  }

  //
  // UPDATE - change one record in Producer list
  listProducerUpdate(updateData) {
    // console.log(updateData);

    const index = this.listProducer.findIndex((data) => {
      return data.id === updateData.id;
    });
    //  replace (UPDATE) value
    this.listProducer.splice(index, 1, updateData);
  }

  //
  // GET MODEL - pull data from Vehicle list
  get listModelGet() {
    // console.log(this.listModel);
    const listModel = this.listModel.map((data) => {
      // console.log('listModel', data.id);

      const findProducerName = this.listProducer.find(dataProd => {
        return dataProd.id === data.producerId
      })

      const dataModel = {
        id: data.id,
        model: data.model,
        producerId: data.producerId,
        producer: findProducerName.producer,
      };

      return dataModel;
    });
    return listModel;
  }

  //
  // PUT - add value to ModelVehicle list
  listModelPut(data) {
    this.listModel.push(data);
  }

  //
  // DELETE - delete one record from Vehicle list
  listModelDelete(id) {
    const index = this.listModel.findIndex((data) => {
      return data.id === id;
    });
    // delete record from list
    this.listModel.splice(index, 1);
  }

  //
  // UPDATE - change one record in Model list
  listModelUpdate(updateData) {
    const index = this.listModel.findIndex((data) => {
      return data.id === updateData.id;
    });

    this.listModel.splice(index, 1, updateData);
  }

  // 
  setOpenCustomDialog(data) {
    this.openCustomDialog = data;
  }

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

  setConfirmDialog(isOpen, title = null, subTitle = null, onConfirm = null) {
    // console.log(isOpen,title, subTitle, onConfirm);
    this.confirmDialog = { isOpen: isOpen, title: title, subTitle: subTitle }
  }

  setDisableSubmitButton(data) {
    this.disableSubmitButton = data;
  }

  setErrors(data) {
    this.errors = data;
  }

  resetForm(e) {
    this.setProducerValue('model', '');
    this.setProducerValue('producer', '');
    this.setErrors({});
    this.setDisableSubmitButton(true);
  }

  // Generate fake ID for MODEL
  generateModelId() {
    return 'm' + Date.now().toString();
  };

  
  // Generate fake ID for Producer
  generateProducerId () {
    return 'p' + Date.now().toString();
  };

}

export const storeProducers = new Producers();
