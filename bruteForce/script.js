$('button').on('click', function() {
  const F = new Function( 'N', $('textarea').val() );
  
  const start = +$('#start').val();
  const end = +$('#end').val();

  for (let i = start; i <= end; i++) {
    if (F(i)) {
      $('output').val(i);
      return;
    } else {
      console.log(`not ${i}`);
    }
  }
});
