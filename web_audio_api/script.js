$(() => {
  
  $('input').on('change', function(){
    $('audio').attr('src', URL.createObjectURL(this.files[0]));
    main();
  });
  
});


function main() {
  
  const audioCtx = new AudioContext();
  
  const analyser = audioCtx.createAnalyser(); // '효과'
  
  const source = audioCtx.createMediaElementSource(audioElement); // <audio>
  
  source.connect(analyser); // <audio> - '효과' 연결

  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);

}
