let N = 5;
let a = 1;
let b = 3;

onmessage = function(event) {
  let li = event.data;
  a = Number(li[0]);
  b = Number(li[1]);
}

let timer = setInterval(function() {
  postMessage(a/b);
}, 1000);
