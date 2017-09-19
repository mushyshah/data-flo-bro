app.controller('canvas', function($scope,$timeout,gPoints) {

        $scope.anchorDivision =  window.innerWidth/30;
        $scope.gridPoints = [];

        //Get HTML Canvas
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        //Add listener for window resize
        window.addEventListener('resize', reDraw);

        var slide = false;
        
        function drawCanvas() {

                $scope.$anchorDivision = window.innerWidth/30;
                //Canvas to take full browser window
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                $scope.$scaleFactor = ((canvas.width/$scope.$dimensions.width)+(canvas.height/$scope.$dimensions.height))/2;
                //console.log($scope.$scaleFactor);

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
        //$scope.init();
        drawCanvas();

        function reDraw(){
                redrawCanvas();
        }

        function redrawCanvas(event) {  
                
                        $scope.gridDivision = (window.innerWidth/30);
                
                        $timeout(function(){

                        gPoints.func($scope.$elements.x,$scope.$elements.y,window,false,function(response){ 
                            canvas.width = window.innerWidth;
                            canvas.height = window.innerHeight;
                            for(i=0 ; i<response.length ; i++){
                                    console.log('yo');
                                    var gridElement = document.getElementById('gridPoint-'+i);
                
                                        context.fillStyle = "#8EA8C3";
                                        context.beginPath();
                                        context.arc(response[i].x, response[i].y, 3*$scope.$scaleFactor, 0, Math.PI * 2, true);
                                        context.fill();
                
                            }
                        });
                
                        },50);
                                
        }       



        $scope.init = function (){

                $scope.$gg.length=0;
                $scope.$dimensions.width = window.innerWidth;
                $scope.$dimensions.height = window.innerHeight;
                $scope.$gridDistance =  window.innerWidth/30;
                $scope.$hDivision = window.innerWidth/30;
                $scope.$wDivision = window.innerWidth/30;

                var h=0;
                var v=0;

                for(i=$scope.anchorDivision/2; i< canvas.width ; i=i+$scope.anchorDivision){
                v=0;
                        for(j=$scope.anchorDivision/2; j< canvas.height ; j=j+$scope.anchorDivision){
                                
                                var anchorPoint = {
                                        "x": 0,
                                        "y": 0
                                }

                                anchorPoint.x = Math.round(i);
                                anchorPoint.y = Math.round(j);

                                if((i+$scope.$gridDistance<window.innerWidth) && (j+$scope.$gridDistance<window.innerHeight))
                                $scope.$gg.push(anchorPoint);


                        v++;      
                        }
                        
                h++;
                }

                $scope.$elements.x=h;
                $scope.$elements.y=v;
                                
                $timeout(drawCanvas,50);
        }


        
})