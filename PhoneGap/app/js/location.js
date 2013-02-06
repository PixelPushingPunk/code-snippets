$(function() {

    function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

    function getCurrentAcceleration() {
      navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onAccelerationError);
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onAccelerationSuccess(acceleration) {
        var element = document.getElementById('acceleration');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '\n' +
              'Acceleration Y: ' + acceleration.y + '\n' +
              'Acceleration Z: ' + acceleration.z + '\n' +
              'Timestamp: '      + acceleration.timestamp + '\n';
        $('#location').trigger('create');
    }

    function startWatch() {
        // Update acceleration every 3 seconds
        var options = { frequency: 3000 };

        watchID = navigator.accelerometer.watchAcceleration(onWatchSuccess, onError, options);

    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    //
    function onWatchSuccess(acceleration) {
        var element = document.getElementById('watch-acceleration');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
    }

    // onError: Failed to get the acceleration
    //
    function onAccelerationError() {
        alert('onError!');
    }
    $('.geolocation').click(function() {
      getCurrentLocation();
    });

    $('.acceleration').click(function() {
      getCurrentAcceleration();
    });

    $('.watch-acceleration').click(function() {
      startWatch();
    });

    $('.clear-acceleration').click(function() {
      stopWatch();
    });
});