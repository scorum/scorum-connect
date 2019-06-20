import '@babel/polyfill';

// import OptionsSync from 'webext-options-sync';
import { fs } from 'fs';
import { h, render } from 'preact';
import { Provider } from 'redux-zero/preact';

import { preparedStore } from './ui/store/store';
import { Content } from './ui/Content';
import { launchUi } from './content-core';

const INJECTED_ELEMENT_ID = 'scorumconnect-extension';

let contentInjected = false;

function injectApp(localStore){
  const css = fs.readFileSync(`${__dirname}/build/content.css`, 'utf8');
  const injectDiv = document.createElement('div');
  const shadowRoot = injectDiv.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = // just using template string
  `
  <style>${css}</style>
  <div id="${INJECTED_ELEMENT_ID}" />
  `;

  document.body.appendChild(injectDiv);

  const initialStore = Object.assign({}, localStore, { contentInjected: true });
  contentInjected = true;

  render(
    <Provider store={preparedStore(initialStore)}>
      <Content />
    </Provider>,
    shadowRoot.querySelector(`#${INJECTED_ELEMENT_ID}`)
  );

  console.log('inner contentInjected');
}

launchUi(async ({ extensionStore }) => {
  const localStore = await extensionStore.get();

  // const options = await new OptionsSync().getAll();
  // console.log('options', options);

  if (!contentInjected) {
    injectApp(localStore);
  }
}).catch(console.error);
