import { makeObservable, observable, action, computed } from 'mobx';
import {
  getInitProducerValue,
  // listModelVechile,
  getListModelVechileData,
  getCellHeaderProducers,
  getListProducersData
} from '../../Common/VehicleService';
import { storeNotification } from '../../Stores/StoreNotification';
import { store } from '../Vechile/StoreVechile';
import { storeUseTable } from '../../Stores/StoreUseTable';

// import UseTable from '../../Stores/StoreUseTable';

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
      generateProducerId: action,
      validationForm: action,
      handleInputChange: action,
      afterSortingAndFiltering: observable,
      headCellProducers: computed,
      // getListProducers: computed
    });
  }

  // Init value za formu
  producerFormValue = getInitProducerValue();

  // Init value for producer
  listProducer = getListProducersData();

  // Init value for models
  listModel = getListModelVechileData();

  // open dialog
  openCustomDialog = false;

  disableSubmitButton = true;

  confirmDialog = {
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: '',
  };

  filterFn = {
    fn: (items) => {
      return items;
    },
  };

  errors = {};

  //
  addOrUpdate = 'addFormValueToList';

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
      producer: '',
    };
  }

  //
  // PUT - add value to Vehicle list
  listProducerPut(data) {
    this.listProducer.push(data);
    // after save reset form
    this.producerFormValue = getInitProducerValue();
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
    let counter = 0;
    this.listModelGet.forEach((data) => {
      if (data.producer === producer) {
        counter++;
      }
    });

    // last producer deletet from list
    if (counter === 0) {
      const index = this.listProducer.findIndex((data) => {
        return data.producer === producer;
      });
      //  delete record from list
      this.listProducer.splice(index, 1);
    }
  }

  //
  // UPDATE - change one record in Producer list
  listProducerUpdate(updateData) {
    const index = this.listProducer.findIndex((data) => {
      return data.id === updateData.id;
    });
    //  replace (UPDATE) value
    this.listProducer.splice(index, 1, updateData);
  }

  //
  // GET MODEL - pull data from Vehicle list
  get listModelGet() {
    const listModel = this.listModel.map((data) => {
      const findProducerName = this.listProducer.find((dataProd) => {
        return dataProd.id === data.producerId;
      });

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
  // Open /close dialog
  setOpenCustomDialog(data) {
    this.openCustomDialog = data;
  }

  //
  // ADD or UPDATE vehicle
  setAddOrUpdate(data) {
    this.addOrUpdate = data;
  }

  //
  // init set filter function
  setFilterFn() {
    this.filterFn = {
      fn: (items) => {
        return items;
      },
    };
  }

  //
  // define filter search function
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
            data.model.toLowerCase().includes(e.target.value.toLowerCase()),
          );
        },
      };
    }
  }

  //
  setConfirmDialog(isOpen, title = null, subTitle = null, onConfirm = null) {
    this.confirmDialog = { isOpen: isOpen, title: title, subTitle: subTitle };
  }

  //
  setDisableSubmitButton(data) {
    this.disableSubmitButton = data;
  }

  //
  setErrors(data) {
    this.errors = data;
  }

  //
  resetForm(e) {
    this.setProducerValue('model', '');
    this.setProducerValue('producer', '');
    this.setErrors({});
    this.setDisableSubmitButton(true);
  }

  //
  // Generate fake ID for MODEL
  generateModelId() {
    return 'm' + Date.now().toString();
  }

  //
  // Generate fake ID for Producer
  generateProducerId() {
    return 'p' + Date.now().toString();
  }

  //
  // find duplicate value => error UI
  findDuplicateData(array, cellName) {
    let compareData = this.producerFormValue[cellName];
    // all producers data are Uppercase
    if (cellName === 'producer') {
      compareData = this.producerFormValue[cellName].toUpperCase();
    }
    //
    const findDuplicate = array.find((data) => {
      if (data[cellName] === compareData) {
        return data;
      }
      return null;
    });

    //
    if (findDuplicate) {
      this.setErrors({
        [cellName]: `Duplicate ${cellName} name!`,
      });
      return findDuplicate;
    } else {
      return null;
    }
  }

  //
  // form validation
  validationForm() {
    // SET error
    const tempError = {};

    tempError.model =
      this.producerFormValue.model.length > 2 ? '' : 'Minimum 3 character';
    tempError.producer =
      this.producerFormValue.producer.length > 0 ? '' : 'Minimum 1 character';

    // define error
    this.setErrors({ ...tempError });

    // if validation all fields is TRUE, make enable button SUBMIT
    if (Object.values(tempError).every((x) => x === '')) {
      this.setDisableSubmitButton(false);
    } else {
      this.setDisableSubmitButton(true);
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  }

  //
  // handle input
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setProducerValue(name, value);
    this.validationForm();
  }

  //
  // SUBMIT form
  handleSubmit(e) {
    e.preventDefault();
    const { model, producer } = this.producerFormValue;

    //
    //  ADD ADD ADD ADD ADD
    if (this.addOrUpdate === 'addFormValueToList') {
      // if duplicate MODEL => return
      if (this.findDuplicateData(this.listModelGet, 'model')) {
        return;
      }

      //
      if (!this.findDuplicateData(this.listProducerGet, 'producer')) {
        // add NEW producer
        const dataProducer = {
          id: this.generateProducerId(),
          producer: producer.toUpperCase(),
        };
        this.listProducerPut(dataProducer);

        const dataModel = {
          id: this.generateModelId(),
          model: model,
          producerId: dataProducer.id,
        };

        // save record to lists
        this.listModelPut(dataModel);
      } else {
        // producer already exist
        const producer = this.listProducerGet.find((data) => {
          // console.log(data.producer, this.producerFormValue.producer);
          return (
            data.producer === this.producerFormValue.producer.toUpperCase()
          );
        });

        const dataModel = {
          id: this.generateModelId(),
          model: model,
          producerId: producer.id,
        };

        // save record to lists
        this.listModelPut(dataModel);
      }
      // console.table(this.listModelGet);
      // console.table(this.listProducerGet);

      storeNotification.setNotify({
        isOpen: true,
        msg: 'Add Model',
        type: 'success',
      });
    }

    //
    //  UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
    if (this.addOrUpdate === 'updateFormValue') {
      // if duplicate MODEL => return
      const duplicateModel = this.findDuplicateData(this.listModelGet, 'model');
      // console.log(duplicateModel, this.producerFormValue.id);

      if (duplicateModel && duplicateModel.id !== this.producerFormValue.id) {
        if (this.findDuplicateData(this.listModelGet, 'model')) {
          return;
        }
      }

      const duplicateProducer = this.findDuplicateData(
        this.listProducerGet,
        'producer',
      );
      // console.log(duplicateProducer,duplicateProducer.id, this.producerFormValue.producerId);

      if (
        duplicateProducer &&
        duplicateProducer.id !== this.producerFormValue.producerId
      ) {
        if (this.findDuplicateData(this.listProducerGet, 'producer')) {
          return;
        }
      }

      // find old model to store ID in model record
      const modelProdOld = this.listModelGet.find((data) => {
        return data.id === this.producerFormValue.id;
      });

      // find old producer to store ID in producer record
      const producerOld = this.listProducerGet.find((data) => {
        return data.id === modelProdOld.producerId;
      });

      // console.log(producerOld, this.producerFormValue.producer.toUpperCase());

      const dataProducer = {
        id: producerOld.id,
        producer: this.producerFormValue.producer.toUpperCase(),
      };

      this.listProducerUpdate(dataProducer);

      const dataVehicle = {
        id: modelProdOld.id,
        model: this.producerFormValue.model,
        producerId: this.producerFormValue.producerId,
      };
      this.listModelUpdate(dataVehicle);

      // search list, UPDATE vechile list
      store.listVehicle.forEach((data) => {
        if (modelProdOld.model === data.model) {
          const dataVehicle = {
            id: data.id,
            modelAuto: data.modelAuto,
            model: this.producerFormValue.model,
            producer: this.producerFormValue.producer.toUpperCase(),
            email: data.email,
            mobile: data.mobile,
            city: data.city,
            motor: data.motor,
            sellDate: data.sellDate,
            isLoan: data.isLoan,
          };
          store.listVehicleUpdate(dataVehicle);
        }
      });

      console.table(this.listModelGet);
      console.table(this.listProducerGet);

      // Display info on screen
      storeNotification.setNotify({
        isOpen: true,
        msg: 'Update Model',
        type: 'warning',
      });
      this.setAddOrUpdate('addFormValueToList');
    }

    this.setOpenCustomDialog(false);
    this.resetFormValue();
    this.setErrors({});
  }

  //
  // return filtered and sorted data
  afterSortingAndFiltering() {
    return storeUseTable
      .sortTable(this.filterFn.fn(this.listModelGet), this.listModelGet)
      .slice()
      .splice(
        storeUseTable.page * storeUseTable.rowsPerPage,
        storeUseTable.rowsPerPage,
      );
  }

  get headCellProducers() {
    return getCellHeaderProducers()
  }

}

export const storeProducers = new Producers();
