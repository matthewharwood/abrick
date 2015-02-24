'use strict';

/**
 * @ngdoc overview
 * @name abrickApp
 * @description
 * # abrickApp
 *
 * Main module of the application.
 */
angular
  .module('abrickApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          // onEnter: function(UI){
          //   UI.setButtonState = 'main'
          // }
      });

      $stateProvider
        .state('main.add', {
          url: 'add',
          // onEnter: function(UI){
          //   UI.setButtonState = 'main.add'
          // },
          // onLeave: function(){
            
          // }
      });

  });
