import '@babel/polyfill';

import { h, render } from 'preact';
import { Provider } from 'redux-zero/preact';

import { preparedStore } from './ui/store/store';
import { Popup as PopupUI } from './ui/Popup';
import { launchUi } from './popup-core';

launchUi(async ({ extensionStore }) => {
  const localStore = await extensionStore.get();
  const store = preparedStore(localStore);

  const mountNode = document.getElementById('app');
  render(
    <Provider store={store}>
      <PopupUI />
    </Provider>,
    mountNode,
    mountNode.lastChild
  );
}).catch(console.error);
