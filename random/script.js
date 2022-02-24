/**
 * 최솟값과 최댓값 사이의 랜덤한 정수를 반환하는 함수입니다.
 * @param {number} min - 최솟값.
 * @param {number} max - 최댓값.
 * @param {boolean} ismin - 최솟값을 포함할지 여부
 * @param {boolean} ismax - 최댓값을 포함할지 여부
 * @returns {number} 
 */
function randInt(min, max, ismin, ismax) {
  min = Math.ceil(min);
  if (!ismin) min++; // 만약 최솟값이 포함되서는 안된다면, 최솟값++으로 제외.
  max = Math.floor(max);
  if (!ismax) min--; // 만약 최댓값이 포함되서는 안된다면, 최댓값--으로 제외.
  return Math.floor(Math.random() * (max - min + 1)) + min; // 최댓값도 포함, 최솟값도 포함
}

$('#b1').on('click', function() {
  const r = randInt(
    $('#i1-l').val(),
    $('#i1-r').val(),
    $('#c1-l').is(':checked'),
    $('#c1-r').is(':checked'),
  );

  $('#o1').val(r);
});

$('#b2').on('click', function() {
  const r = randInt(
    1,
    100,
    true,
    true,
  );

  const result = $('#i2').val() >= r;

  $('#o1').val(result);
});