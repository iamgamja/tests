let a = 1;
let b = 3; // b가 나누는 수. 항상 b로 나눈다.

let finishied = false;

let data = {
  // 1: '3' 
  // 나머지가 1일때 b로 나누고 나면 '3'이 반복된다.
}

let last_namugi = 1;

onmessage = function(event) {
  a = parseInt(event.data[0]);
  b = parseInt(event.data[1]);
  finishied = false;
  data = {};
  postMessage(`${parseInt(a/b)}.`); // 초기화, ex) '0.'
  last_namugi = div(a,b)
}

function Div(a, b) {
  if (data[a] === undefined) {
    data[a] = '';
    for (i in data) {
      data[i] += String(parseInt(a/b));
    }
  } else {
    finishied = true;
    postMessage(data[a] + '~');
  }
  return parseInt(a/b);
}
function div(a, b) {
  return a%b;
}

// while (!finishied) {
//   postMessage(Div(last_namugi, b));
//   last_namugi = div(last_namugi, b);
// }

let timer = setInterval(function() {
  if (!finishied) {
    last_namugi *= 10;
    postMessage(Div(last_namugi, b));
    last_namugi = div(last_namugi, b)
  }
}, 100);


// let timer = setInterval(function() {
//   postMessage(a/b);
// }, 1000);
