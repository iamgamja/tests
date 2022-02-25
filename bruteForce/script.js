$('button').on('click', function() {
  const F = new Function( 'N', $('textarea').val() );
  
  for (let i = +$('#start').val(); i <= +$('end').val(); i++) {
    if (F(i)) {
      $('output').val(i);
      return;
    }
  }
});
