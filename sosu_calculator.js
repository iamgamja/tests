let a = 1;
let b = 3; // b가 나누는 수. 항상 b로 나눈다.

let finishied = false;

// let data = {
//   // 1: 2
//   // 나머지가 0일때 b로 나누고 나면 나머지가 2가 된다.
// }

let last_namugi = 1;

onmessage = function(event) {
  a = parseInt(event.data[0]);
  b = parseInt(event.data[1]);
  finishied = false;
//   data = {};
  postMessage(`${D(a, b)}.`); // 초기화, ex) '0.'
  last_namugi = d(a,b)
}

function D(a, b) {  return parseInt(a/b)  }
function d(a, b) {  return a%b  }

// while (!finishied) {
//   postMessage(D(last_namugi, b));
//   last_namugi = d(last_namugi, b);
// }

let timer = setInterval(function() {
  postMessage(D(last_namugi, b));
  last_namugi = d(last_namugi, b);
}, 100);


// let timer = setInterval(function() {
//   postMessage(a/b);
// }, 1000);
