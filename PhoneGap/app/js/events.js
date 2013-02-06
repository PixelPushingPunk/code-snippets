$(function() {
    // Call onDeviceReady when Cordova is loaded.
    //
    // At this point, the document has loaded but cordova-2.3.0.js has not.
    // When Cordova is loaded and talking with the native device,
    // it will call the event `deviceready`.
    //
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // alert dismissed
    function alertDismissed() {
        // nothing really happens here, but I'm going to do a console log
        console.log("alert dismissed");
    }

    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReady() {
        // Now safe to use the Cordova API
        navigator.notification.alert('Hello World!', alertDismissed, 'Hi There', 'Continue');
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("batterystatus", onBatteryStatus, false);
        document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
        $('.check-connection').click(checkConnection);
        $('.show-alert').click(showAlert);
        $('.play-beep').click(playBeep);
        $('.vibrate').click(vibrate);
        $('.show-confirm').click(showConfirm);
    }

    function onOnline() {
        console.log("online");
    }

    function onOffline() {
        console.log("offline");
    }

    function onBatteryStatus(info) {
        // Handle the online event
        console.log("Level: " + info.level + " isPlugged: " + info.isPlugged); 
    }

    function onVolumeDownKeyDown() {
        // Handle the volume down button
        $('body').css({'backgroundColor' : 'blue'});
    }

    function onVolumeUpKeyDown() {
        // Handle the volume down button
        $('body').css({'backgroundColor' : 'red'});
    }

    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    }

    // Show a custom alertDismissed
    //
    function showAlert() {
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }

    function playBeep() {
        navigator.notification.beep(3);
    }

    // Vibrate for 2 seconds
    //
    function vibrate() {
        navigator.notification.vibrate(2000);
    }

    // process the confirmation dialog result
    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }

    // Show a custom confirmation dialog
    //
    function showConfirm() {
        navigator.notification.confirm(
            'You are the winner!',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Game Over',            // title
            'Restart,Exit'          // buttonLabels
        );
    }

    onLoad();
});