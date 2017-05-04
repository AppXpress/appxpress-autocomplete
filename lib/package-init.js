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

//  deactivate() {
//    this.modalPanel.destroy();
//    this.subscriptions.dispose();
//    this.atomPackageView.destroy();
//  },

  //serialize() {
//    return {
//      atomPackageViewState: this.atomPackageView.serialize()
//    };
//  },

  provide(){
    return provider;
  },

  //toggle() {
  //  console.log('AtomPackage was toggled!');
  //  return (
  //    this.modalPanel.isVisible() ?
  //    this.modalPanel.hide() :
  //    this.modalPanel.show()
  //  );
  //}

};
