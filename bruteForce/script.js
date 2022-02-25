$('button').on('click', function() {
  const F = new Function( 'N', $('textarea').val() );
  
  const start = +$('#start').val();
  const end = +$('#end').val();

  $('progress').attr('max', end-start+1);

  for (let i = start; i <= end; i++) {
    if (F(i)) {
      $('output').val(i);
      return;
    } else {
      $('progress').attr('value', (i-start+1) / (end-start+1));
    }
  }
});
