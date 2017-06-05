'use babel';

import AtomReactSnippetsView from './atom-react-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomReactSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomReactSnippetsView = new AtomReactSnippetsView(state.atomReactSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomReactSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-react-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomReactSnippetsView.destroy();
  },

  serialize() {
    return {
      atomReactSnippetsViewState: this.atomReactSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomReactSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
