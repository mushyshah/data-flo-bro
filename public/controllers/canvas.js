app.controller('canvas', function($scope,$timeout) {

        $scope.anchorDivision =  window.innerWidth/30;
        $scope.gridPoints = [];

        //Get HTML Canvas
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        //Add listener for window resize
        window.addEventListener('resize', reDraw);

        var slide = false;
        
        function redrawCanvas() {

                $scope.$anchorDivision = window.innerWidth/30;
                //Canvas to take full browser window
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                $scope.$scaleFactor = ((canvas.width/$scope.$dimensions.width)+(canvas.height/$scope.$dimensions.height))/2;
                console.log($scope.$scaleFactor);

                //Crappy temp loop to create grid dots
                for(i=canvas.width/60 ; i< canvas.width ; i+=(canvas.width/30)){
                        for(j=canvas.width/60; j< canvas.height ; j+=(canvas.width/30)){

                        context.fillStyle = "#8EA8C3";
                        context.beginPath();
                        context.arc(i, j, 3*$scope.$scaleFactor, 0, Math.PI * 2, true);
                        context.fill();

                        }
                }

                
        }

        redrawCanvas();

        function reDraw(){
                $scope.init();
        }

        $scope.init = function (){
                $scope.$gg.length=0;
                $scope.$dimensions.width = window.innerWidth;
                $scope.$dimensions.height = window.innerHeight;
                $scope.$gridDistance =  window.innerWidth/30;

                for(i=$scope.anchorDivision/2; i< canvas.width ; i=i+$scope.anchorDivision){
                        for(j=$scope.anchorDivision/2; j< canvas.height ; j=j+$scope.anchorDivision){
                                
                                var anchorPoint = {
                                        "x": 0,
                                        "y": 0
                                }

                                anchorPoint.x = Math.round(i);
                                anchorPoint.y = Math.round(j);


                                if (anchorPoint.x > $scope.$max.x)
                                        $scope.$max.x=anchorPoint.x;

                                if (anchorPoint.y > $scope.$max.y)
                                $scope.$max.y=anchorPoint.y;

                                $scope.$gg.push(anchorPoint);
                        }
                }
                                
                $timeout(redrawCanvas,100);
        }


        
})