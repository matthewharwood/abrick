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


    var videoElement = document.querySelector("video");
    var audioSelect = document.querySelector("select#audioSource");
    var videoSelect = document.querySelector("select#videoSource");
    var startButton = document.querySelector("button#start");

    var videoSourceValues = [];

    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    function gotSources(sourceInfos) {
      for (var i = 0; i != sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        var option = document.createElement("option");
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

    if (typeof MediaStreamTrack === 'undefined'){
      alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
    } else {
      MediaStreamTrack.getSources(gotSources);
    }


    function successCallback(stream) {
      window.stream = stream; // make stream available to console
      videoElement.src = window.URL.createObjectURL(stream);
      videoElement.play();
    }

    function errorCallback(error){
      console.log("navigator.getUserMedia error: ", error);
    }

    function start(){
      if (!!window.stream) {
        videoElement.src = null;
        window.stream.stop();
      }
      var audioSource = audioSelect.value;
      var videoSource = videoSelect.value;

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

    audioSelect.onchange = start;
    videoSelect.onchange = start;

    start();

  


    var syncObject = sync.$asObject();


    //binds the scope.data to the database as so: 
    //$firebase(new Firebase(url).$asObject().$bindTo($scope, 'data'))
    syncObject.$bindTo($scope, 'data');

  });
