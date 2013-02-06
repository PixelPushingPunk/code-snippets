   /**
    * Called once a vimeo player is loaded and ready to receive
    * commands. You can add events and make api calls only after this
    * function has been called.
    *
    * @param String $player_id Ñ id of the iframe element firing the event. This is
    * useful when listening to multiple videos so you can identify which one fired
    * the event.
    */
   
   function ready(player_id) {
       // Keep a reference to Froogaloop for this player
       var player = $f(player_id),
           playButton = document.getElementById('playButton'),
           pauseButton = document.getElementById('pauseButton'),
           volumeBtn = document.getElementById('volumeButton'),
           mute = true;

       /**
        * Attach event listeners.
        *
        * If you're using a javascript framework like jQuery or Mootools
        * you'll probably use their addEvent method to add the click events.
        * Here we're just using the standard W3C addEventListener method. If
        * you need IE8 support, you'll need to use attachEvent for IE8 and
        * addEventListener for everything else (or just use jQuery or MooTools).
        */

       playButton.addEventListener('click', function() {
           player.api('play');
           $(this).parent().addClass('is_active');
       });

       pauseButton.addEventListener('click', function() {
           player.api('pause');
           $(this).parent().removeClass('is_active');
       });
       
       player.addEvent('finish', onFinish);
       
       // Call setVolume when volume button clicked
        volumeBtn.addEventListener('click', function(e) {
          var volumeVal = 1;
          if (mute == false) {
            volumeVal = 0;
            mute = true;
          } else {
            mute = false;
          }
          $(this).toggleClass('ui-icon-volume-on ui-icon-volume-off');
          
          // Call the api via froogaloop
          player.api('setVolume', volumeVal);
        });
        
        // set initial values
        player.api('setVolume', 0);
        playButton.click();
   }
   
   function onFinish() {
    $('#playButton').parent().removeClass('is_active');
   }

$(function() {
  $('body').prepend('<div class="video-wrapper"><iframe id="player" src="http://player.vimeo.com/video/56899159?api=1&player_id=player" width="" height="" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>');
  $('#page').append('<div class="ui-video-background ui-widget ui-widget-content ui-corner-all"><ul class="ui-video-background-controls"><li class="ui-video-background-play"><a class="ui-icon ui-icon-play" href="#" id="playButton">Play</a><a class="ui-icon ui-icon-pause" href="#" id="pauseButton">Pause</a></li><li class="ui-video-background-mute"><a class="ui-icon ui-icon-volume-off" href="#" id="volumeButton">Unmute</a></li></ul></div>');
  setInterval(function() { $('.video-wrapper iframe').css({height : $(window).height()}); }, 2000);
  window.addEventListener('load', function() {
    //Attach the ready event to the iframe
    $f(document.getElementById('player')).addEvent('ready', ready);
  });
});