'use strict';

/**
 * @ngdoc directive
 * @name abrickApp.directive:rtcCamera
 * @description
 * # rtcCamera
 */
angular.module('abrickApp')
  .directive('rtcCamera', function () {

    function postLink(scope, element) {
        console.log(scope, element);
    }

    return {
      restrict: 'E',
      link: postLink()
    };
  });
