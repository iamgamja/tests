const sleep = (ms) => new Promise(r => setTimeout(r, ms));

$('button').on('click', async function() {
  const F = new Function( 'N', $('textarea').val() );
  
  const start = +$('#start').val();
  const end = +$('#end').val();

  const total = end-start+1;

  $('progress').attr('max', total);
  $('progress').attr('value', 0);

  const checks = [...Array(100).keys()].map(i => total/100*i);

  for (let i = start; i <= end; i++) {
    if (F(i)) {
      $('output').val(i);
      return;
    } else {
      const p = i-start+1;
      if (checks[0] <= p) {
        $('progress').attr('value', p);
        checks.shift();
        await sleep(2);
      }
    }
  }
  $('output').val("Can't find.");
});
