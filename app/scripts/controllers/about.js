'use strict';

/**
 * @ngdoc function
 * @name abrickApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the abrickApp
 */
angular.module('abrickApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
