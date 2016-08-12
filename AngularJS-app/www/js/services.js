angular.module('starter.services',[])

.constant('AUTH_EVENTS', {
    invalidclient: 'invalid-client',
    invalidtoken: 'invalid-token',
    invaliduser: 'invalid-user',
    loggedin: 'logged-in'
})
.constant('USER_ROLES',{
    admin: 'admin-role',
    public: 'public'
})

.service('authService', function($q, CrowdPesaAPI, $http){
	var LOCAL_TOKEN_KEY = 'tokenKey';
        var REFRESH_TOKEN_KEY = 'refreshKey';
	var username = '';
	var isAuthenticated=false;
	var role='';
	var authToken;
//	
//    function loadUserCredentials(){
//            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
//            if(token){
//                    useCredentials(token);
//            }
//    };
//
    function storeUserCredentials(data){
            //if user wants to be kept signed in store in local storage
            //if user doesnt want to be signed in store in session storage
            //its data.data.access_token coz we are getting the full http response which has
                //{data, status, config, statusTxt}
            window.localStorage.setItem(LOCAL_TOKEN_KEY, data.data.access_token);
            window.localStorage.setItem(REFRESH_TOKEN_KEY, data.data.refresh_token);
            useCredentials(data.data.access_token);
    };
//
    function useCredentials(token){
            //username = token.split('.')[0];
            isAuthenticated = true;
            authToken = token;
            //this roles might be from the token from the server
            //this is just dummy implementation
//            if(username === 'admin'){
//                    role = USER_ROLES.admin;
//            }
//            if(username === 'user'){
//                    role = USER_ROLES.public;
//            }
            $http.defaults.headers.common['X-Auth-Token'] = authToken;
    };
//
//    function destroyUserCredentials(){
//            username = '';
//            isAuthenticated = false;
//            role='';
//            authToken;
//            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
//            $http.defaults.headers.common['X-Auth-Token'] = undefined;
//    };

    var login = function(name, pw){
        return $q(function(resolve, reject){
        CrowdPesaAPI.login(name, pw)
                .then(function(response){
                    resolve(response);
                    //Set Token into HTTP Header
                    //$http.defaults.headers.common['X-Auth-Token'] = response.data.access_token;
                    //storeUserCredentials(response);
                    //resolve("login successful");
                    
                },
                function(error){//error will be handled in controller;
                    reject(error);
                })
                
                
            ;
        });
       //FAKE LOGIN
//        return $q(function(resolve, reject){
//                            if(true){
//                                resolve("always true from provider");
//                            }
//                            else{
//                                reject("just fale from provider");
//                            }
//        });
        
        
//        return  $http.get('http://localhost:8100/valid');
//        
//        var data;     
//        $http.get('http://localhost:8100/valid').then(
//		function(result){
//			data = result;
//		}, function(error){
//			data = error;
//		});
//                return data;
//                
//                    data = CrowdPesaAPI.login(name, pw);
//                    return data;
//                        .then(function(data){
//                            //storeUserCredentials(data);
//                           return data;
//                        },
//                            function(error){
//                            return error;    
//                            });
                           
                    
//                    return $q(function(resolve, reject){
//                        
//                            if((name ==="admin" && pw==="1") || (name==="user"&&pw==="1")){                                    
//                                    resolve("login successful");
//                                     window.localStorage.removeItem(LOCAL_TOKEN_KEY);
//                                }
//                            else{
//                                    reject("login failed");
//                                }
//                    });
                
//            var deffered = $q.defer();
//            var promise = deffered.promise;
//            
//            if(name=="user" && pw == "secret"){
//                deffered.resolve("Login correct");
//            }else{
//                deffered.reject("Wrong password");
//            }
//            return promise;
        };
          


//
//    var logout = function(){
//            destroyUserCredentials();
//    };
//
//    var isAuthorized = function(authorizedRoles){
//            //convert to array if its not
//            if(!angular.isArray(authorizedRoles)){
//                    authorizedRoles = [authorizedRoles];
//            }
//            return(isAuthenticated && authorizedRoles.indexOf(role)!==-1);
//    };
//
 //  loadUserCredentials();


    return{
            login: login,
//            logout: logout,
//            isAuthorized: isAuthorized,
             isAuthenticated: function(){return isAuthenticated;}
//            username: function(){return username;},
//            role: function(){return role;}
    };	
})

//Create a data model to fetch data
    .service('ItemsModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'items/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };
    })


//This is the Auth Interceptor
.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
	return {
		responseError: function(response){
                        //var deferred = $q.defer();
			$rootScope.$broadcast({
                                400: AUTH_EVENTS.invalidclient,
				402: AUTH_EVENTS.invaliduser,
                                401: AUTH_EVENTS.invalidtoken
			}[response.status], response);
                        //deferred.resolve(response);
			//return deferred.promise;
                        return $q.reject(response);
		}
        
                
	};
    })

//This is the Base64 Endoder
.factory('Base64', function () {
    /* jshint ignore:start */
 
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
    /* jshint ignore:end */
});