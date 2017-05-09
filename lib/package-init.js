'use babel';

import { CompositeDisposable } from 'atom';
import provider from './provider';

export default {

  atomPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    console.log('Appxpress autocomplete activated');
  },

  provide(){
    return provider;
  }
};
