import { makeObservable, observable, action, computed } from 'mobx';
import {
  getListVehicleFromService,
  getInitVehicleValue,
  createListVehicleFromService,
  updateListVehicleFromService,
  deleteListVehicleFromService,
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
      listVehicleGet: computed,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      setFilterFn: observable,
      filterInputValue: observable,

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
      headCellData: computed,
      resetFormValue: action,
      onDelete: action,
      onUpdate: action,
    });
  }

  // value for Vechile TABLE header
  headCellVehicle = () => [
    { id: 'model', label: 'Model' },
    { id: 'email', label: 'Email', disabledSorting: true },
    { id: 'mobile', label: 'Mobile' },
    { id: 'city', label: 'City' },
    { id: 'motor', label: 'Motor' },
    { id: 'producer', label: 'Producer' },
    { id: 'action', label: 'Action', disabledSorting: true },
  ];

  // Init value
  vehicleFormValue = getInitVehicleValue();
  listVehicle = getListVehicleFromService();

  openCustomDialog = false;
  addOrUpdate = 'addFormValueToList';

  disableSubmitButton = true;

  // filter search init value
  filterInputValue = '';

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
  // GET - pull data from Vehicle list
  get listVehicleGet() {
    const listVehicle = this.listVehicle.map((data) => {
      // console.log(storeProducers.listModelGet);

      const model = storeProducers.listModelGet.find((dataModel) => {
        // console.log(dataModel.id, data.modelAuto);
        return dataModel.id === data.modelAuto;
      });
      // console.log('model', model);
      // console.log(storeProducers.listProducerGet);

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

  //  Open/Close dialog
  setOpenCustomDialog = (data) => {
    this.openCustomDialog = data;
  };

  //  Open/Close dialog
  setAddOrUpdate = (data) => {
    this.addOrUpdate = data;
  };

  setFilterFn(e) {
    this.filterFn = {
      fn: (items) => {
        return items;
      },
    };
  }


  //
  handleSearch(e) {
    // new input filter value
    this.filterInputValue = e.target.value;
    this.storeUseTable.setPage(0);

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
  setConfirmDialog = (isOpen, subTitle = null, onConfirm = null) => {
    this.confirmDialog = {
      isOpen: isOpen,
      title: 'Are you sure to delete this Vehicle?',
      subTitle: "You can't undo this operation."
    };
  };

  //
  setDisableSubmitButton = (data) => {
    this.disableSubmitButton = data;
  };

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

        // Display info on screen
        storeNotification.setNotify({
          isOpen: true,
          msg: 'Add Vehicle',
          type: 'success',
        });
      } else {
        // UPDATE
        const dataVehicle = {
          id: storeVehicle.vehicleFormValue.id,
          modelAuto: storeVehicle.vehicleFormValue.modelAuto,
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
      return data.id === dataModelAuto;
    });

    const prod = storeProducers.listProducerGet.find((data) => {
      return data.id === model.producerId;
    });

    // data.producer = prod.producer
    return prod.producer;
  }

  // return filtered and sorted data
  afterSortingAndFiltering = () => {
    return this.storeUseTable
      .sortTable(this.filterFn.fn(this.listVehicleGet))
      .slice()
      .splice(
        this.storeUseTable.page * this.storeUseTable.rowsPerPage,
        this.storeUseTable.rowsPerPage,
      );
  };

  get headCellData() {
    return this.headCellVehicle();
  }

  //  reset vehicle form
  resetFormValue() {
    this.vehicleFormValue = getInitVehicleValue();
  }

  onDelete = (id) => {
    storeNotification.setNotify({
      isOpen: true,
      msg: 'Delete Vehicle',
      type: 'error',
    });
    deleteListVehicleFromService(id);
    this.listVehicle = getListVehicleFromService();
  };
  onUpdate = (data) => {
    storeNotification.setNotify({
      isOpen: true,
      msg: 'Edit Vehicle',
      type: 'info',
    });
    this.vehicleFormValue = data;
  };

  storeUseTable = new UseTableSort({
    setOpenCustomDialog: this.setOpenCustomDialog,
    onUpdate: this.onUpdate,
    setAddOrUpdate: this.setAddOrUpdate,
    setDisableSubmitButton: this.setDisableSubmitButton,
    headCellData: this.headCellData,
    afterSortingAndFiltering: this.afterSortingAndFiltering,
    setConfirmDialog: this.setConfirmDialog,
    onDelete: this.onDelete,
  });
}

export const storeVehicle = new Store();
