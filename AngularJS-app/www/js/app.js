// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js 
angular.module('starter', ['ionic', 'ionic-material','ngCordova','ngMessages','starter.services','starter.controllers','starter.providers'])

.run(function($ionicPlatform, $rootScope,  $state, $ionicPopup, authService, AUTH_EVENTS ) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    
    // simulate a real backend 
//  $httpBackend.whenGET('http://localhost:8100/valid')
//        .respond({message: 'This is my valid response!'});
//  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
//        .respond(401, {message: "Not Authenticated"});
//  $httpBackend.whenGET('http://localhost:8100/notauthorized')
//        .respond(403, {message: "Not Authorized"});
//
//     $httpBackend.whenGET(/templates\/\w+.*/).passThrough();

//Observe all changes to the states, if isAuthenticated is not true, redirect to the login page
//    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
//        if(!authService.isAuthenticated()){
//            if(toState.name !== 'start'){
//                event.preventDefault();
//                $state.go('start');
//            }
//            
//        }
//    });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, CrowdPesaAPIProvider ) { 
  $stateProvider
    .state('app',{
           url:'/app',
           abstract: true,
           templateUrl: 'templates/menu.html'
//           controller: 'MenuCtrl'
       })

    .state('start', {
    url: '/start',
   // abstract: true, cannot be abstract since there is a view
    //templateUrl: 'templates/menu.html',
    templateUrl: 'templates/start.html',
    controller: 'LoginCtrl'
  })
   
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'FileTransferController'
      }
    }
  })

  .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('app.borrow', {
      url: '/borrow',
      views: {
        'menuContent': {
          templateUrl: 'templates/borrow.html',
          controller: 'BorrowCtrl'
        }
      }
    })
    .state('app.lend', {
      url: '/lend',
      views: {
        'menuContent': {
          templateUrl: 'templates/lend.html',
          controller: 'LendCtrl'
        }
      }
    })
//    .state('app.start', {
//      url: '/start',
//      views: {
//        'menuContent': {
//          templateUrl: 'templates/start.html',
//          controller: 'startCtrl'
//        }
//      }
//    })

  .state('app.reserve', {
    url: '/borrow/:loanId',
    views: {
      'menuContent': {
        templateUrl: 'templates/reserve.html'
//        controller: 'reserveCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');  

  //prevent chrome from sendin preflight OPTIONS request to by pass CORS
//  $httpProvider.defaults.headers.common = { };
//  $httpProvider.defaults.headers.post = { };
//    $httpProvider.defaults.headers.get = { };
//  $httpProvider.defaults.headers.put = { };
//  $httpProvider.defaults.headers.patch = { };
  

  //configure httpBackend
  $httpProvider.interceptors.push('AuthInterceptor');
  
  //configure CrowdPesaApi
  var settings = {
      appname:"testclient", 
      apiurl:"http://ketnnosacco.co.ke/ci/index.php/api",
      appsecret:"testpass"};
  CrowdPesaAPIProvider.configure(settings);
  

});
//.service('authService',function($q){
//    return {
//        login: function(name, pw){
//            var deffered = $q.defer();
//            var promise = deffered.promise;
//            
//            if(name=="user" && pw == "secret"){
//                deffered.resolve("Login correct");
//            }else{
//                deffered.reject("Wrong password");
//            }
//            return promise;
//        }
//    };
//    
//})    

//
//        //Simulate a login delay. Remove this and replace with your login
//        //code if using a login system
////        $timeout(function() {
////          $scope.closeLogin();
////        }, 1000);
//      

//var alertPopup = $ionicPopup.show({
//                title: 'Login incorrect!',
//                scope: $scope,
//                templateUrl: 'popup-template.html',
//                buttons: [
//                    { text: 'Cancel',
//                      onTap: function(e) {                       
//                        return 'cancel button'
//                      }
//                    },
//                    {
//                      text: '<b>Ok</b>',
//                      type: 'button-positive',
//                      onTap: function(e) {
//                        return 'ok button';
//                      }
//                    }
//                ]
//            });
//        alertPopup.then(function(res){
//            alert("you tapped: "+res); 
//        });
