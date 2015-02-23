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
  });
