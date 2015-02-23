'use strict';

/**
 * @ngdoc function
 * @name abrickApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abrickApp
 */
angular.module('abrickApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    // create an init reference to the db
    var ref = new Firebase('https://abrick.firebaseio.com/');

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object

    $scope.data = sync.$asObject();
    console.log($scope.data);
    // syncObject.$bindTo($scope, 'data');

    /**
     * Setup Video Elements
     */
    var videoElement = document.querySelector('video');
    var audioSelect = document.querySelector('select#audioSource');
    var videoSelect = document.querySelector('select#videoSource');
    // var startButton = document.querySelector('button#start');

    /**
     * Canvas for showing captured image
     */
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;

    var videoSourceValues = [];
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    /**
     * Display available capturing hardware on the device
     */
    function gotSources(sourceInfos) {
      for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audio') {
          option.text = sourceInfo.label || 'microphone ' + (audioSelect.length + 1);
          audioSelect.appendChild(option);
        } else if (sourceInfo.kind === 'video') {
          option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
          videoSelect.appendChild(option);
          videoSourceValues.push(option.value);
        } else {
          console.log('Some other kind of source: ', sourceInfo);
        }
      }
    }

    /**
     * Start streaming video data when ready
     */
    function successCallback(stream) {
      window.stream = stream; // make stream available to console
      videoElement.src = window.URL.createObjectURL(stream);
      videoElement.play();
    }

    function errorCallback(error){
      console.log('navigator.getUserMedia error: ', error);
    }

    /**
     * Start video with selected input constraints
     */
    function start(){
      if (!!window.stream) {
        videoElement.src = null;
        window.stream.stop();
      }
      var audioSource = audioSelect.value;
      // var videoSource = videoSelect.value;

      var constraints = {
        audio: {
          optional: [{sourceId: audioSource}]
        },
        video: {
          optional: [{sourceId: '8b6a72a827ae65cad932467abb4157101f8a494c970755c5feaf9eeacc12f2c2'}]
        }
      };
      navigator.getUserMedia(constraints, successCallback, errorCallback);
    }

    /**
     * Start video capturing if hardware supports it
     */
    function checkDeviceHardwareAndStartCapturing() {
      if (typeof MediaStreamTrack === 'undefined'){
        console.log('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
      } else {
        MediaStreamTrack.getSources(gotSources);
      }
    }

    checkDeviceHardwareAndStartCapturing();
    start();

    var video = document.querySelector('video');
    localMediaStream = null;

    function snapshot() {
      if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
        // 'image/webp' works in Chrome.
        // Other browsers will fall back to image/png.
        document.querySelector('img').src = canvas.toDataURL('image/webp');
      }
    }

    document.getElementById('capture-photo-btn').onclick = function fun() {
      snapshot();
    };

    // Not showing vendor prefixes or code that works cross-browser.
    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, errorCallback);


    var syncObject = sync.$asObject();

    //binds the scope.data to the database as so: 
    //$firebase(new Firebase(url).$asObject().$bindTo($scope, 'data'))
    syncObject.$bindTo($scope, 'data');

  });
