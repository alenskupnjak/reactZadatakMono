import { makeObservable, observable, action, computed } from 'mobx';
import { listVehicleInit, initVechileValue } from './VehicleService';
import { storeProducers } from './StoreProducers';
import { storeNotification } from './StoreNotification';

//
// MAIN MAIN MAIN
class Store {
  constructor() {
    makeObservable(this, {
      vechileFormValue: observable,
      setVechileValue: action,
      listVehicle: observable,
      listVehiclePut: action,
      listVehicleGet: computed,
      listVehicleDelete: action,
      listVehicleUpdate: action,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      // setFilterFn: action,

      handleSearch: action,

      confirmDialog: observable,
      setConfirmDialog: action,

      disableSubmitButton: observable,
      setDisableSubmitButton: action,

      errors: observable,
      setErrors: action,

      handleInputChange: action,
      validationForm: action,
      handleSubmit: action,
      generateId: action,
      resetForm: action,
      findProducerVehicle: action,
    });
  }

  // Init value
  vechileFormValue = initVechileValue;
  listVehicle = listVehicleInit;
  openCustomDialog = false;
  addOrUpdate = 'addFormValueToList';

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

  // Change value in form
  setVechileValue(name, value) {
    //set value form
    this.vechileFormValue = {
      ...this.vechileFormValue,
      [name]: value,
    };

    // for conosle.table() !
    // const stateValueFormEdit = {
    //   id: this.vechileFormValue.id,
    //   modelAuto: this.vechileFormValue.modelAuto,
    //   email: this.vechileFormValue.email,
    //   mobile: this.vechileFormValue.mobile,
    //   city: this.vechileFormValue.city,
    //   motor: this.vechileFormValue.motor,
    //   sellDate: this.vechileFormValue.sellDate,
    //   isLoan: this.vechileFormValue.isLoan,
    // };
    // console.table(stateValueFormEdit);
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
      const model = storeProducers.listModelGet.find((dataModel) => {
        // console.log(dataModelAuto, data.id);
        return dataModel.id === data.modelAuto;
      });
      // console.log('model', model);

      const prod = storeProducers.listProducerGet.find((dataProd) => {
        return dataProd.id === model.producerId;
      });
      // console.log({prod, model});

      const dataVehicle = {
        id: data.id,
        modelAuto: data.modelAuto,
        model: model.model,
        producer: prod.producer,
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
  listVehicleDelete(id) {
    const index = this.listVehicle.findIndex((data) => {
      return data.id === id;
    });
    // delete record from list
    this.listVehicle.splice(index, 1);
    console.table(this.listVehicleGet);
  }

  //
  // UPDATE - change one record in Vehicle list
  listVehicleUpdate(updateData) {
    const index = this.listVehicle.findIndex((data) => {
      return data.id === updateData.id;
    });

    //  replace (UPDATE) value
    this.listVehicle.splice(index, 1, updateData);
  }

  //  Open/Close dialog
  setOpenCustomDialog(data) {
    this.openCustomDialog = data;
  }

  //  Open/Close dialog
  setAddOrUpdate(data) {
    this.addOrUpdate = data;
  }

  setFilterFn() {
    this.filterFn = {
      fn: (items) => {
        return items;
      },
    };
  }

  //
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
    // console.log(isOpen, title, subTitle, onConfirm);
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

  handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'modelAuto') {
      const modelData = storeProducers.listModelGet.find((data) => {
        return data.id === value;
      });

      // console.log('list.modelget-',storeProducers.listModelGet);
      // console.log('list.modelget-',storeProducers.listProducerGet);

      const dataVechileProducer = storeProducers.listProducerGet.find(
        (data) => {
          return data.id === modelData.producerId;
        },
      );

      this.setVechileValue('producer', dataVechileProducer.producer);
      this.setVechileValue('modelAuto', modelData.id);
    } else {
      // save record to store validation
      this.setVechileValue(name, value);
    }

    // validate form
    this.validationForm();
  }

  validationForm() {
    // console.table(storeProducers.listModelGet);
    // console.table(storeProducers.listProducerGet);

    // eslint-disable-next-line no-useless-escape
    const regexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    // SET error
    const tempError = {};
    tempError.modelAuto =
      store.vechileFormValue.modelAuto !== '' ? '' : 'Invalid model ';
    tempError.email = /@/.test(store.vechileFormValue.email)
      ? ''
      : 'Invalid emali';
    tempError.mobile = regexPhone.test(store.vechileFormValue.mobile)
      ? ''
      : 'Invalid character';

    // define error
    this.setErrors({
      ...tempError,
    });

    // if validation all fields is TRUE, make enable button SUBMIT
    if (Object.values(tempError).every((x) => x === '')) {
      this.setDisableSubmitButton(false);
    } else {
      this.setDisableSubmitButton(true);
    }

    // check tempError, if all values ="" => NO error  =>  set validationForm=TRUE
    return Object.values(tempError).every((x) => x === '');
  }

  handleSubmit(e) {
    e.preventDefault();

    // check input fields
    this.validationForm();

    //  IF FORM is valid  => save data in mobX
    if (this.validationForm()) {
      if (store.addOrUpdate === 'addFormValueToList') {
        // ADD ADD ADD
        // Generate fake ID
        store.vechileFormValue.id = this.generateId();

        // const modelSave = storeProducers.listModelGet.find((data) => {
        //   return data.id === store.vechileFormValue.modelAuto;
        // });

        // prepare field for sorting
        // this.vechileFormValue.model = modelSave.model;

        // save record to listVehicle
        this.listVehiclePut(store.vechileFormValue);

        // Display info on screen
        storeNotification.setNotify({
          isOpen: true,
          msg: 'Add Vechile',
          type: 'success',
        });
      } else {
        // UPDATE
        // find model producer to store in model record
        const modelVeh = storeProducers.listModelGet.find((data) => {
          return data.id === store.vechileFormValue.modelAuto;
        });

        const dataVehicle = {
          id: store.vechileFormValue.id,
          modelAuto: store.vechileFormValue.modelAuto,
          model: modelVeh.model,
          producer: store.vechileFormValue.producer,
          email: store.vechileFormValue.email,
          mobile: store.vechileFormValue.mobile.toString(),
          city: store.vechileFormValue.city,
          motor: store.vechileFormValue.motor,
          sellDate: store.vechileFormValue.sellDate,
          isLoan: store.vechileFormValue.isLoan,
        };
        this.listVehicleUpdate(dataVehicle);
        // Display info on screen
        storeNotification.setNotify({
          isOpen: true,
          msg: 'Update Vechile',
          type: 'warning',
        });

        this.setAddOrUpdate('addFormValueToList');
      }
    }

    this.setOpenCustomDialog(false);
  }

  // Generate fake ID
  generateId() {
    return 'idx' + Date.now().toString();
  }

  resetForm(e) {
    this.vechileFormValue = initVechileValue;
    this.setDisableSubmitButton(true);
  }

  // for populating table
  findProducerVehicle(dataModelAuto) {
    // console.log('list.modelget-',storeProducers.listModelGet);
    // console.log('list.istProducerGet-',storeProducers.listProducerGet);
    console.log('store.listVehicleGet-', store.listVehicleGet);
    // console.log('store.listVehicleGet-',data);
    const model = storeProducers.listModelGet.find((data) => {
      // console.log(dataModelAuto, data.id);

      return data.id === dataModelAuto;
    });

    console.log('model', model);

    const prod = storeProducers.listProducerGet.find((data) => {
      return data.id === model.producerId;
    });
    console.log(prod);

    // data.producer = prod.producer
    return prod.producer;
  }
}

export const store = new Store();
