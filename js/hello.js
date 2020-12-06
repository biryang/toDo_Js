const helloForm = document.querySelector('.js-todoHello'),
  input = helloForm.querySelector('input'),
  greeting = document.querySelector('.js-hello');

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintHello(text) {
  helloForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleHelloSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintHello(currentValue);
  saveName(currentValue);
  helloForm.removeChild(input)
}

function askForName() {
  helloForm.addEventListener('submit', handleHelloSubmit);
}

function helloInit() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintHello(currentUser)
  }
}

helloInit();