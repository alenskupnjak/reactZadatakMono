import { makeObservable, observable, action, computed } from 'mobx';
import {
  getInitProducerValue,
  getListModelFromService,
  getListProducersData,
  createListModelFromService,
  updateListModelFromService,
  deleteListVehicleFromService,
  getListVehicleFromService,
  deleteListModelFromService,
} from '../../Common/VehicleService';
import { storeNotification } from '../../Stores/StoreNotification';
import UseTableSort from '../../Stores/StoreUseTable';
import { storeVehicle } from '../../Pages/Vechile/VehicleStore';

//
// MAIN MAIN MAIN
class Producers {
  constructor() {
    makeObservable(this, {
      storeUseTable: observable,
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
      // listModelPut: action,

      openCustomDialog: observable,
      setOpenCustomDialog: action,

      addOrUpdate: observable,
      setAddOrUpdate: action,

      filterFn: observable,
      setFilterFn: observable,
      filterInputValue: observable,
      setFilterInputValue: action,

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
      headCellData: computed,
      onDelete: action,
      onUpdate: action,
    });
  }

  // value for MODELS table header
  headCellProducer = () => [
    { id: 'model', label: 'Model' },
    { id: 'producer', label: 'Producer' },
    { id: 'action', label: 'Action', disabledSorting: true },
  ];

  // Init value za formu
  producerFormValue = getInitProducerValue();

  // Init value for producer
  listProducer = getListProducersData();

  // Init value for models
  listModel = getListModelFromService();

  // open dialog
  openCustomDialog = false;

  disableSubmitButton = true;

  // set filter init value
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


  setFilterInputValue(eTargetValue) {
    this.filterInputValue = eTargetValue;
  }

  // errors for form input value
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
  // Open /close dialog
  setOpenCustomDialog = (data) => {
    this.openCustomDialog = data;
  };

  //
  // ADD or UPDATE vehicle
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
  // define filter search function
  handleSearch(e) {
    // new input filter value
    this.setFilterInputValue(e.target.value);
    // set page ro first
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
      title: 'Are you sure to delete this Model?',
      subTitle: "You can't undo this operation.",
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
      this.producerFormValue.producer.length > 0 ? '' : 'Select producer';

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

      const producerData = this.listProducerGet.find((data) => {
        return data.producer === producer;
      });

      const dataModel = {
        id: this.generateModelId(),
        model: model,
        producerId: producerData.id,
      };

      // ADD Model =>server
      createListModelFromService(dataModel);
      this.listModel = getListModelFromService();

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

      // find old model to store ID in model record
      const modelProdOld = this.listModelGet.find((data) => {
        return data.id === this.producerFormValue.id;
      });

      // find old producer to store ID in producer record
      const producerNew = this.listProducerGet.find((data) => {
        return data.producer === producer;
      });

      const dataVehicle = {
        id: modelProdOld.id,
        model: this.producerFormValue.model,
        producerId: producerNew.id,
      };

      // UPDATE from server
      updateListModelFromService(dataVehicle);
      this.listModel = getListModelFromService();

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
  afterSortingAndFiltering = () => {
    return this.storeUseTable
      .sortTable(this.filterFn.fn(this.listModelGet))
      .slice()
      .splice(
        this.storeUseTable.page * this.storeUseTable.rowsPerPage,
        this.storeUseTable.rowsPerPage,
      );
  };

  get headCellData() {
    return this.headCellProducer();
  }

  onDelete = (id) => {
    storeNotification.setNotify({
      isOpen: true,
      msg: 'Delete Model',
      type: 'error',
    });

    storeVehicle.listVehicleGet.forEach((dataVechile) => {


      if (id === dataVechile.modelAuto) {
        deleteListVehicleFromService(dataVechile.id);
        storeVehicle.listVehicle = getListVehicleFromService();
      }
    });
    deleteListModelFromService(id);
    storeProducers.listModel = getListModelFromService();
  };

  onUpdate = (data) => {
    storeNotification.setNotify({
      isOpen: true,
      msg: 'Edit Model',
      type: 'info',
    });
    this.producerFormValue = data;
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

export const storeProducers = new Producers();
