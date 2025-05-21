export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlStrings = list.map(templateFn).join('');
  parentElement.insertAdjacentHTML(position, htmlStrings);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (parentElement) {
    parentElement.innerHTML = template;
    if (callback) callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const html = await res.text();
  return html;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  renderWithTemplate(header, document.getElementById("main-header"));
  renderWithTemplate(footer, document.getElementById("main-footer"));
}
