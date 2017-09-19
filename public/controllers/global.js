var app = angular.module('dashBoard',[]);

app.controller('global', function($scope) {
            
            //Define some global variables on the scope (ew)
            $scope.$gg=[];
            $scope.$dimensions = {};
            $scope.$elements = {};

            $scope.boxes = [];
            
            // Initialize 5 boxes for me (WIP)
            var init = function () {
                // and fire search in case its value is not empty
                for(i=0 ; i<=5 ; i++){
                $scope.boxes.push('Button ' + i);
            }
            
        };

        //Initialize
        init();

})