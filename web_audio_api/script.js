$(() => {
  
  $('input').on('change', function(){
    $('audio').attr('src', URL.createObjectURL(this.files[0]));
    main();
  });
  
});


function main() {
  
  const audioCtx = new AudioContext();
  
  const analyser = audioCtx.createAnalyser(); // '효과'

  const audioElement = document.querySelector('audio');
  const source = audioCtx.createMediaElementSource(audioElement); // <audio>
  
  source.connect(analyser); // <audio> - '효과' 연결

  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  // analyser.getByteTimeDomainData(dataArray);

  let canvas = document.querySelector('canvas');
  let canvasCtx = canvas.getContext('2d');

  const WIDTH = 300;
  const HEIGHT = 150;

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw() {
    const drawVisual = requestAnimationFrame(draw); // 루프

    analyser.getByteTimeDomainData(dataArray); // 오디오 정보 얻기

    // 배경 채우기
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // 선 그리기
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    let sliceWidth = WIDTH / bufferLength; // 캔버스 길이를 데이터 길이로 나누기
    let x = 0; // 그릴 x좌표

    for(let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    // 선 끝내기
    canvasCtx.lineTo(WIDTH, HEIGHT/2);
    canvasCtx.stroke();
  }
  draw(); // 루프 시작

}
