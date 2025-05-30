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


export async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}


export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `
    <span>${message}</span>
    <span class="alert-close" role="button" aria-label="close">✖</span>
  `;

  alert.addEventListener("click", function (e) {
    if (e.target.classList.contains("alert-close") || e.target.innerText === "✖") {
      alert.remove();
    }
  });

  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

