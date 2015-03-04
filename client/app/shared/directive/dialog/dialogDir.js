(function() {

    angular.module('cowApp').directive('dialogDir', dialogDir);
    dialogDir.$inject = [];

    function dialogDir() {
        return {
            link: link,
            restrict: 'EA',
            replace: false,
            templateUrl: 'app/shared/directive/dialog/dialogTml.html',
            scope: {
                data: '=',
                config: '=',
            },
        };

        function link(scope, element) {
            scope.mainArray = ['']
            scope.$watch('data', function() {
                if (!scope.data) {
                    return;
                }
                if (scope.data == 'clear') {
                    scope.mainArray = [];
                } else {
                    scope.mainArray.push(scope.data);
                }
            })
        }

        function sanitizeData(scope) {
            scope.sanitized = {}
            scope.sanitized.data = {
                
            }
        }
    }
})();
