import { makeObservable, observable, action, computed } from 'mobx';
import {  initProducerValue, listProducers, listModelVechile } from './VehicleService';


//
// MAIN MAIN MAIN
class Producers {
  constructor() {
    makeObservable(this, {
      producerFormValue: observable,
      setProducerValue: action,
      listProducer: observable,
      listProducerPut: action,
      listProducerGet: computed,
      listProducerDelete: action,
      listProducerUpdate: action,
      
      // Models
      listModel:observable,
      listModelGet: computed,     
      listModelPut: action,
    });
  }

  // Init value za formu
  producerFormValue = initProducerValue;

  // Init value for producer
  listProducer = listProducers ;

  // Init value for models
  listModel = listModelVechile ;


  // Change value in form
  setProducerValue(name, value) {
    console.log('Prije',this.producerFormValue);
    
    //set value form
    this.producerFormValue = {
      ...this.producerFormValue,
      [name]: value,
    };

    // for conosle.table() !
    const stateValueFormEdit = {
      id: this.producerFormValue.id,
      model: this.producerFormValue.model,
    };
    console.table(stateValueFormEdit);
  }

  //
  // PUT - add value to Vehicle list
  listProducerPut(data) {    
    this.listProducer.push(data);
    console.log(this.listProducer);
    
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
  // DELETE - delete one record from Vehicle list
  listProducerDelete(id) {
    const index = this.listProducer.findIndex(data=>{
      return data.id === id
    })

    // delete record from list
    this.listProducer.splice(index,1)
  }

  //
  // UPDATE - change one record in Vehicle list
  listProducerUpdate(updateData) {
    const index = this.listProducer.findIndex(data=>{
      return data.id === updateData.id
    })
    //  replace (UPDATE) value
    this.listProducer.splice(index,1,updateData)
  }


    //
  // GET MODEL - pull data from Vehicle list
  get listModelGet() {
    console.log(this.listModel);
    const listModel = this.listModel.map((data) => {
      const dataModel = {
        id: data.id,
        model: data.model,
        producerId: data.producerId,
      };
      return dataModel;
    });
    return listModel;
  }

  //
  // PUT - add value to ModelVehicle list
  listModelPut(data) {    
    this.listModel.push(data);
    console.log(this.listModel);
  }





}

export const storeProducers = new Producers();
