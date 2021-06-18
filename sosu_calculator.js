let N = 5;
let a = 10;
let b = 2;

onmessage = function(event) {
  let li = event.data;
  a = li[0];
  b = li[1];
}

// search: while (true) {
// //   n += 1;
// //   for (var i = 2; i <= Math.sqrt(n); i += 1) {
// //     if (n % i == 0) {
// //       continue search;
// //     }
// //     postMessage(n);
// //   }
  
//   for (let i=0; i<N; i++) {
//     postMessage(i);
//   }
// }
  
let timer = setInterval(function() {
  postMessage(a, b);
}, 1000);
