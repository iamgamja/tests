document.querySelector('input').addEventListener('change', function() {
  // audio src set
  document.querySelector('audio').setAttribute('src', URL.createObjectURL(this.files[0]));

  // main
  const audioCtx = new AudioContext();
  
  const analyser = audioCtx.createAnalyser(); // '효과'

  const audioElement = document.querySelector('audio');
  const source = audioCtx.createMediaElementSource(audioElement); // <audio>
  
  source.connect(analyser); // <audio> - '효과' 연결

  source.connect(audioCtx.destination);

  // 버튼 클릭으로 재생/정지
  document.querySelector('button').addEventListener('click', function() {
    // 컨텍스트가 연기된(suspended) 상태에 있는지 검사합니다 (자동 재생 정책)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // 상태에 따라 트랙을 재생하거나 정지합니다
    if (this.getAttribute('playing') === 'false') {
        audioElement.play();
        this.setAttribute('playing', 'true');
    } else if (this.getAttribute('plyaing') === 'true') {
        audioElement.pause();
        this.setAttribute('playing', 'false');
    }
  });

  audioElement.addEventListener('ended', function() {
    document.querySelector('button').setAttribute('playing', 'false');
  })

  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const canvas = document.querySelector('canvas');
  const canvasCtx = canvas.getContext('2d');

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  function draw() {
    const drawVisual = requestAnimationFrame(draw); // 루프

    analyser.getByteTimeDomainData(dataArray); // 오디오 정보 얻기

    // 배경 채우기
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    // 선 그리기
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    let sliceWidth = canvas.width / bufferLength; // 캔버스 길이를 데이터 길이로 나누기
    let x = 0; // 그릴 x좌표

    for(let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * canvas.height/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    // 선 끝내기
    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  }
  draw(); // 루프 시작

});
