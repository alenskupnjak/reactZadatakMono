import { makeObservable, observable, action } from 'mobx';

class Notification {
  constructor() {
    makeObservable(this, {
      notify: observable,
      setNotify: action,
    });
  }

  notify = { isOpen: false, msg: '', type: '' };

  setNotify(isOpen, msg, type) {
    // console.log(isOpen, msg, type);
    this.notify = { isOpen: isOpen, msg: msg, type: type };
  }
}

export const storeNotification = new Notification();
