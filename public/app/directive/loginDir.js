(function() {
    'use strict';

    angular.module('cowApp').directive('loginDir', ecsLoginFormDir);
    ecsLoginFormDir.$inject = [];

    function ecsLoginFormDir() {
        return {
            restrict: 'EA',
            templateUrl: 'app/directive/template/loginTml.html',
            replace: true,
            scope: {
                config: '=',
                submit : '&'
            },
            link: link,
        };

        function link(scope, element, attrs) {

            scope.validation = {
                showValidation: false,
                formSubmitted: ''
            }

            scope.input = {
                userName: '',
                password: ''
            }
            scope.createUser = function() {
                var data = {
                    username: scope.input.userName,
                    password:scope.input.password,
                    newUser: true
                }
                submitLogin(data);
            }
            function submitLogin(data){
                scope.showError = false;
                scope.submit({
                    data: data
                }).then(function (){} , function(){
                    scope.showError = true;        
                });
            }
            scope.logIn = function() {
                var data = {
                    input: scope.input,
                    newUser:false 
                }
                submitLogin(data);
            };

            if (!scope.config) {
                sanitizeConfig(scope);
            }
        }



        function sanitizeConfig(scope) {
            scope.sanitized = {};
            scope.sanitized.data = {};
            scope.sanitized.config = {
                // Error Messages
                userNameErrMsg: 'username error',
                userNameReqMsg: 'username required',
                passwordErrMsg: 'password error',
                passwordReqMsg: 'password required',

                // Regex Patterns
            };
            scope.sanitized.data.errorMsg = 'Error. Try Again';

            //override with config
            if (!scope.config) {
                return;
            }
        }

        //#end region

    }
})();