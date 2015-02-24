'use strict';

angular.module('abrickApp')
  .factory('Speech', function () {
    var Speech = {};
    Speech.voices = [];
    Speech.messages = [];
    Speech.init = function(){
      Speech.voices = SpeechSynthesis.getVoices();
    };
    Speech.setMsg = function (msg, gender) {
      if (!Speech.voices.length){
        Speech.init();
      }
      if (!SpeechSynthesisUtterance) {
        throw new Error("Speech Synthesis API not available");
      } else {
        var _msg = new SpeechSynthesisUtterance(msg);
        _msg = Speech.setParams(_msg, gender);
        Speech.messages.push({data: _msg, msg: msg, gender: gender, birthday: Date.now()});
        return _msg;
      }
    };
    Speech.getMessages = function (start, end) {
      if (!arguments.length) {
        return Speech.messages;
      }
      if (start === "last"){
        return Speech.messages[Speech.messages.length-1]
      }
      return arguments.length === 1 ? Speech.messages[start] : Speech.messages.slice(start, end);
    };
    Speech.setParams = function(_msg, gender){
      if (gender !== "male" || gender !== "female"){
        throw new Error("gender not recognized, choose male or female");
      }
      for (var param in Speech.Speech[gender]){
        if (_msg.hasOwnProperty(param)){
          _msg[param] = Speech.Speech[gender][param]
        }
      }
      return _msg;
    };

    Speech.speak = function (msg) {
      SpeechSynthesis.speak(msg);
    };

    Speech.params = {
      male: {
        voice: Speech.voices[1] //Google UK English Male
      },
      female: {
        voice: Speech.voices[2] //Google UK English Female
      }
    };
    return Speech;

  });
