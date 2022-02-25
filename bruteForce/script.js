const sleep = (ms) => new Promise(r => setTimeout(r, ms));

$('button').on('click', function() {
  const F = new Function( 'N', $('textarea').val() );
  
  const start = +$('#start').val();
  const end = +$('#end').val();

  const total = end-start+1;

  $('progress').attr('max', total);
  $('progress').attr('value', 0);

  for (let i = start; i <= end; i++) {
    if (F(i)) {
      $('output').val(i);
      $('progress').attr('value', total);
      return;
    } else {
      const p = i-start+1;
      if (total/10 <= p && p <= total/10+1) {
        $('progress').attr('value', p);
        await sleep(100);
      }
    }
  }
});
