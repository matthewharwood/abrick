'use strict';

/**
 * @ngdoc service
 * @name abrickApp.UI
 * @description
 * # UI
 * Factory in the abrickApp.
 */
angular.module('abrickApp')
  .factory('UI', function () {
    // Service logic
    // ...
    var buttonState = false;
    

    // Public API here
    return {
      setButtonState: function (val) {
        buttonState = val;
        return buttonState;
      }
    };
  });
