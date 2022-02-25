const sleep = (ms) => new Promise(r => setTimeout(r, ms));

$('button').on('click', async function() {
  const F = new Function( 'N', $('textarea').val() );
  
  const start = +$('#start').val();
  const end = +$('#end').val();

  const total = end-start+1;

  let findCount = $('#findCount').val();

  $('progress').attr('max', total);
  $('#totalCount').text(total);

  $('progress').attr('value', 0);
  $('#resultCount').text(0);
  
  $('#result').val('');

  $('#status').text('Processing...');

  const checks = [...Array(100).keys()].map(i => total/100*i);

  for (let i = start; i <= end; i++) {
    if (F(i)) {
      if (findCount) {
        $('#result').val( $('#result').val() + ' ' + i );
        $('#resultCount').text( +$('#resultCount').text() + 1 );
        findCount--;
      } else {
        break;
      }
    } else {
      const p = i-start+1;
      if (checks[0] <= p) {
        $('progress').attr('value', p);
        checks.shift();
        await sleep(2);
      }
    }
  }
  $('progress').attr('value', total);
  $('#status').text('Done!');
});
