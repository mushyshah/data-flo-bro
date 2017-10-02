var app = angular.module('dashBoard',[]);

app.controller('global', function($scope) {
            
            //Define some global variables on the scope (ew)
            $scope.$gridPoints=[];
            $scope.$gridPointsMeta = {};
            $scope.boxes = [];
            
            //Initialize 5 boxes for me (WIP)
            var init = function () {

                //Create array of default behaviors
                var animations=[];
                animations.push('color-blinker');
                animations.push('opacity-blinker');
                animations.push('counter (non functional)');
                animations.push('text-box (non functional)');

                //Create widget object to push
                var w = {};
                w.ping = 0;
                w.animation='';

                //Link the widget to the grid item it's being dropped on
                w.bindsTo = $scope.dropZone;
                    for(i=0 ; i<animations.length ; i++){
                    $scope.boxes.push(animations[i]);
                }
            
        };

        //Initialize
        init();

})