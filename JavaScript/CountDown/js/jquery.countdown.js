$(function() {
  var formatLength = function(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
  }
  var theDaysBox  = $("#numdays");
	var theHoursBox = $("#numhours");
	var theMinsBox  = $("#nummins");
	var theSecsBox  = $("#numsecs");
	
	var refreshId = setInterval(function() {
	  var currentSeconds = theSecsBox.text();
	  var currentMins    = theMinsBox.text();
	  var currentHours   = theHoursBox.text();
	  var currentDays    = theDaysBox.text();
	  
	  if(currentSeconds == 0 && currentMins == 0 && currentHours == 0 && currentDays == 0) {
	  	// if everything runs out our timer is done!!
	  	// do some exciting code in here when your countdown timer finishes
	  	return;
	  } else if(currentSeconds == 0 && currentMins == 0 && currentHours == 0) {
	  	// if the seconds and minutes and hours run out we subtract 1 day
	  	theDaysBox.html(currentDays-1);
	  	theHoursBox.html("23");
	  	theMinsBox.html("59");
	  	theSecsBox.html("59");
	  } else if(currentSeconds == 0 && currentMins == 0) {
	  	// if the seconds and minutes run out we need to subtract 1 hour
      var newHours = formatLength(currentHours-1, 2);
	  	theHoursBox.html(newHours);
	  	theMinsBox.html("59");
	  	theSecsBox.html("59");
	  } else if(currentSeconds == 0) {
	  	// if the seconds run out we need to subtract 1 minute
      var newMins = formatLength(currentMins-1, 2);
	  	theMinsBox.html(newMins);
	  	theSecsBox.html("59");
	  } else {
        var newSecs = formatLength(currentSeconds-1, 2);
      	theSecsBox.html(newSecs );
      }
   }, 1000);
});