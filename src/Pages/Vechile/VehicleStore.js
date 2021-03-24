import { makeObservable, observable, action, computed } from 'mobx';
import {
  getListVehicleFromService,
  getInitVehicleValue,
  getHeadCellVechileData,
  createListVehicleFromService,
  updateListVehicleFromService,
} from '../../Common/VehicleService';
import { storeProducers } from '../Producers/ProducersStore';
import { storeNotification } from '../../Stores/StoreNotification';
import UseTableSort from '../../Stores/StoreUseTable';

//
// MAIN MAIN MAIN
class Store {
  constructor() {
    makeObservable(this, {
      storeUseTable: observable,
      vehicleFormValue: observable,
      setVehicleValue: action,
      listVehicle: observable,
      // listVehiclePut: action,
      listVehicleGet: computed,
      // listVehicleDelete: action,
      // listVehicleUpdate: action,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      setFilterFn: observable,
      filterInputValue: observable,
      filterRecordLength: observable,
      setFilterRecordLength: action,

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
      afterSortingAndFiltering: observable,
      headCellVechileData: computed,
      resetFormValue: action,
    });
  }

  storeUseTable = new UseTableSort();

  // Init value
  vehicleFormValue = getInitVehicleValue();
  listVehicle = getListVehicleFromService();
  openCustomDialog = false;
  addOrUpdate = 'addFormValueToList';

  disableSubmitButton = true;

  // filter search init value
  filterInputValue = '';

  filterRecordLength = 0;

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

  // errors for form input value
  errors = {};

  // Change value in form
  setVehicleValue(name, value) {
    //set value form
    this.vehicleFormValue = {
      ...this.vehicleFormValue,
      [name]: value,
    };
  }

  //
  // // PUT - add value to Vehicle list
  // listVehiclePut(data) {
  //   this.listVehicle.push(data);
  //   // after save reset form
  //   this.vehicleFormValue = getInitVehicleValue();
  // }

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
  // // DELETE - delete one record from Vehicle list
  // listVehicleDelete(id) {
  //   const index = this.listVehicle.findIndex((data) => {
  //     return data.id === id;
  //   });
  //   // delete record from list
  //   this.listVehicle.splice(index, 1);
  //   console.table(this.listVehicleGet);
  // }

  //
  // UPDATE - change one record in Vehicle list
  // listVehicleUpdate(updateData) {
  //   const index = this.listVehicle.findIndex((data) => {
  //     return data.id === updateData.id;
  //   });

  //   //  replace (UPDATE) value
  //   this.listVehicle.splice(index, 1, updateData);
  // }

  //  Open/Close dialog
  setOpenCustomDialog(data) {
    this.openCustomDialog = data;
  }

  //  Open/Close dialog
  setAddOrUpdate(data) {
    this.addOrUpdate = data;
  }

  setFilterFn(e) {
    this.filterFn = {
      fn: (items) => {
        this.setFilterRecordLength(0);
        return items;
      },
    };
  }

  setFilterRecordLength(length) {
    this.filterRecordLength = length;
  }

  //
  handleSearch(e) {
    // new input filter value
    this.filterInputValue = e.target.value;
    this.storeUseTable.setPage(0);

    if (e.target.value === '') {
      this.filterFn = {
        fn: (items) => {
          this.setFilterRecordLength(0);
          return items;
        },
      };
    } else {
      this.filterFn = {
        fn: (items) => {
          this.setFilterRecordLength(
            items.filter((data) =>
              data.model.toLowerCase().includes(e.target.value.toLowerCase()),
            ).length,
          );
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

      this.setVehicleValue('producer', dataVechileProducer.producer);
      this.setVehicleValue('modelAuto', modelData.id);
    } else {
      // save record to store validation
      this.setVehicleValue(name, value);
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
      storeVehicle.vehicleFormValue.modelAuto !== '' ? '' : 'Invalid model ';
    tempError.email = /@/.test(storeVehicle.vehicleFormValue.email)
      ? ''
      : 'Invalid emali';
    tempError.mobile = regexPhone.test(storeVehicle.vehicleFormValue.mobile)
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
      if (storeVehicle.addOrUpdate === 'addFormValueToList') {
        // ADD ADD ADD
        // Generate fake ID
        storeVehicle.vehicleFormValue.id = this.generateId();

        // const modelSave = storeProducers.listModelGet.find((data) => {
        //   return data.id === store.vehicleFormValue.modelAuto;
        // });

        // prepare field for sorting
        // this.vehicleFormValue.model = modelSave.model;

        // save record to BACKEND
        const prepareDataForBackend = {
          id: storeVehicle.vehicleFormValue.id,
          modelAuto: storeVehicle.vehicleFormValue.modelAuto,
          email: storeVehicle.vehicleFormValue.email,
          mobile: storeVehicle.vehicleFormValue.mobile,
          city: storeVehicle.vehicleFormValue.city,
          motor: storeVehicle.vehicleFormValue.motor,
          sellDate: storeVehicle.vehicleFormValue.sellDate,
          isLoan: storeVehicle.vehicleFormValue.isLoan,
        };

        //  FROM Backend  SERVICE
        createListVehicleFromService(prepareDataForBackend);
        this.listVehicle = getListVehicleFromService();

        // // save record to listVehicle
        // this.listVehiclePut(storeVehicle.vehicleFormValue);

        // Display info on screen
        storeNotification.setNotify({
          isOpen: true,
          msg: 'Add Vehicle',
          type: 'success',
        });
      } else {
        // UPDATE
        // // find model producer to store in model record
        // const modelVeh = storeProducers.listModelGet.find((data) => {
        //   return data.id === storeVehicle.vehicleFormValue.modelAuto;
        // });
        console.log(storeVehicle.vehicleFormValue.sellDate);

        const dataVehicle = {
          id: storeVehicle.vehicleFormValue.id,
          modelAuto: storeVehicle.vehicleFormValue.modelAuto,
          // model: modelVeh.model,
          // producer: storeVehicle.vehicleFormValue.producer,
          email: storeVehicle.vehicleFormValue.email,
          mobile: storeVehicle.vehicleFormValue.mobile.toString(),
          city: storeVehicle.vehicleFormValue.city,
          motor: storeVehicle.vehicleFormValue.motor,
          sellDate: storeVehicle.vehicleFormValue.sellDate,
          isLoan: storeVehicle.vehicleFormValue.isLoan,
        };

        //  FROM Backend  SERVICE
        updateListVehicleFromService(dataVehicle);
        this.listVehicle = getListVehicleFromService();

        // this.listVehicleUpdate(dataVehicle);

        // Display info on screen
        storeNotification.setNotify({
          isOpen: true,
          msg: 'Update Vehicle',
          type: 'warning',
        });

        this.setAddOrUpdate('addFormValueToList');
      }
    }

    this.setOpenCustomDialog(false);
    this.resetFormValue();
  }

  // Generate fake ID
  generateId() {
    return 'idx' + Date.now().toString();
  }

  resetForm(e) {
    this.vehicleFormValue = getInitVehicleValue();
    this.setDisableSubmitButton(true);
  }

  // for populating table
  findProducerVehicle(dataModelAuto) {
    // console.log('list.modelget-',storeProducers.listModelGet);
    // console.log('list.istProducerGet-',storeProducers.listProducerGet);
    console.log('storeVehicle.listVehicleGet-', storeVehicle.listVehicleGet);
    // console.log('store.listVehicleGet-',data);
    const model = storeProducers.listModelGet.find((data) => {
      // console.log(dataModelAuto, data.id);

      return data.id === dataModelAuto;
    });

    const prod = storeProducers.listProducerGet.find((data) => {
      return data.id === model.producerId;
    });
    console.log(prod);

    // data.producer = prod.producer
    return prod.producer;
  }

  // return filtered and sorted data
  afterSortingAndFiltering() {
    return this.storeUseTable
      .sortTable(this.filterFn.fn(this.listVehicleGet), this.filterRecordLength)
      .slice()
      .splice(
        this.storeUseTable.page * this.storeUseTable.rowsPerPage,
        this.storeUseTable.rowsPerPage,
      );
  }

  get headCellVechileData() {
    return getHeadCellVechileData();
  }

  //  reset vehicle form
  resetFormValue() {
    this.vehicleFormValue = getInitVehicleValue();
  }
}

export const storeVehicle = new Store();
