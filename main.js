(function($, w, d, undefined) {
  
  const DURATION_MAX = 60,
        BREAK_MAX    = 60,
        CONTROL_MIN  =  1,
        INC_VAL      =  1;
  
  var countdownID = null;
  
  $('.control').on('click', function(){
    var field = '#', max = 0;
    if ($(this).hasClass('duration')) {
      field += 'duration';
      max = DURATION_MAX;
    } else {
      field += 'break';
      max = BREAK_MAX;
    }
    
    var v = eval($(field).html() + $(this).html() + INC_VAL);
    
    if (v < CONTROL_MIN) {
      v = CONTROL_MIN;
    }
    else if (v > max) {
      v = max;
    }
    
    $(field).html( v );
    $('#countdown a')
      .html( numeral( $('#duration').html() * 60 )
      .format('00:00:00') );
  });
  
  $('#countdown a').on('click', function() {
    if (countdownID !== null) return false;
    $('button.control').prop('disabled', true);
    $('#countdown a').css('cursor', 'default');
    
    var d = '#break';
    var t = $('#duration').html() * 60;    
    countdownID = setInterval(decrement, 1000); 
    
    function decrement() {
      t -= 1;
      check();
      $('#countdown a')
        .html(numeral(t).format('00:00:00'));
      
      var beg = (t / ($('#duration').html() * 60)) * 100;
      var end = 100.0 - beg;
      var color = d === '#break' ? '#e22222' : '#5d6d85';
      
      $('#pentagram').css('background', 'linear-gradient(to bottom, black ' + beg + '%, ' + color + ' ' + end + '%)');
    }    

    function check() {
      if (t < 0) {
        clearInterval(countdownID);
        switchCountdown();
      }
    }
    
    function switchCountdown() {
      t = $(d).html() * 60;
      d = d === '#break' ? '#duration' : '#break';      
      $('#countdown a')
        .html(numeral(d).format('00:00:00'));
      countdownID = setInterval(decrement, 1000);
    }
  });
  
  $('#reset').on('click', function() {
    clearInterval(countdownID);
    countdownID = null;
    $('#countdown a')
      .html( numeral( $('#duration').html() * 60 )
      .format('00:00:00') );
    $('button.control').prop('disabled', false);
    $('#pentagram').css('background', 'black');
    $('#countdown a').css('cursor', 'pointer');
  });
  
})($, window, document);
