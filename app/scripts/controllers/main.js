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
    var syncObject = sync.$asObject();


    //binds the scope.data to the database as so: 
    //$firebase(new Firebase(url).$asObject().$bindTo($scope, 'data'))
    syncObject.$bindTo($scope, 'data');
  });
