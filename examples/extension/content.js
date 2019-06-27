function init(){
  // document.body.style.background = 'yellow';
  const INJECTED_ELEMENT_ID = 'scorumconnect-example-extension';

  const injectDiv = document.createElement('div');
  const shadowRoot = injectDiv.attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = // just using template string
  `
  <div id="${INJECTED_ELEMENT_ID}" style="width: 400px; position: absolute; background-color: red; top: 0; right: 0;">
    <div id="example">
      <h1>ScorumConnect Sign Example</h1>

      <div class="sign-transaction">
        <p>Operations:</p>
        <select id="operations">
          <option value="accountWitnessVote">accountWitnessVote</option>
        </select>
        <p>Params:</p>
        <textarea id="params" width="200" height="300">
{
  "account": "andrew",
  "witness": "andrew",
  "approve": true
}
        </textarea>
      </div>

      <button id="sign-btn">Sign transaction</button>
    </div>
  </div>
  `;

  document.body.appendChild(injectDiv);

  injectDiv.shadowRoot.getElementById('sign-btn').addEventListener('click', sign);
  const operationsSelect = injectDiv.shadowRoot.getElementById('operations');
  const paramsTextarea = injectDiv.shadowRoot.getElementById('params');

  function sign() {
    console.log('siiign');
    const method = operationsSelect.options[operationsSelect.selectedIndex].value;
    const params = paramsTextarea.value;

    window.postMessage({
      type: 'SC_SIGN_AND_BROADCAST',
      data: {
        method,
        params: JSON.parse(params),
      },
    }, '*');
  }
}

init();
