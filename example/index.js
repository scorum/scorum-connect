document.getElementById('sign-btn').addEventListener('click', sign);
const operationsSelect = document.getElementById('operations');
const paramsTextarea = document.getElementById('params');

function sign() {
  const method = operationsSelect.options[operationsSelect.selectedIndex].value;
  const params = paramsTextarea.value;

  window.postMessage({
    type: "SC_SIGN_AND_BROADCAST",
    data: {
      method: method,
      params: JSON.parse(params),
    },
  }, "*");
}
