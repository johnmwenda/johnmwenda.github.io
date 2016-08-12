angular.module('starter.providers',[])

.provider('CrowdPesaAPI', function(){
   var appname = '';
   var apiurl = '';
   var appsecret = '';
   return{
       configure: function(settings){
           appname = settings.appname;
           apiurl = settings.apiurl;
           appsecret = settings.appsecret;
       },
       $get: function($http, Base64){
           return{
               showSettings: function (){
                   return appname +'-'+apiurl +'-'+appsecret;
               },
               login: function(username, password){
                   var authdata = Base64.encode(appname+':'+appsecret);
                   var data = {
                    username: username,
                    password: password,
                    grant_type: 'password'
                    };   
                    
                    var headers = {
                       'Authorization': 'Basic ' + authdata,
                       'Accept': 'application/json; charset=utf-8',
                       'Content-Type': 'application/json;'                          
                        };
                        
                    return $http({
                        method: "POST",
                        url: apiurl + '/token',
                        responseType: "json",
                        headers: headers,
                        data: data                    
                    });
                       
                 
                    
//                  return $http.post(apiurl + '/token.php',data, config );
//                      return $http.get('http://localhost:8100/notauthenticated');
                      
               },
               logout: function(){
                   
               },
               getApiUrl: function(){
                   return apiUrl;
               },
               getFeaturedLoans: function(){
                   
               }
           };
       }
   }; 
});

