
angular.module('objectsPane', [])
        .controller('todoController', function($scope) {
            $scope.tasks = [];
            $scope.add = function() {
                $scope.tasks.push($scope.title);
            }
            $scope.delete = function() {
                $scope.tasks.splice(this.$index, 1);
            }

            // at the bottom of your controller
        var init = function () {
            // check if there is query in url
            // and fire search in case its value is not empty
            for(i=0 ; i<=5 ; i++){
                $scope.tasks.push('Button ' + i);
            }
            

            };
        // and fire it after definition
        init();

})