app.controller('grid', function($scope,$timeout) {
    
    //var points = $scope.$anchorPoints;
                       //console.log(points[0]);
                       //console.log(points[3]);

        $scope.gridPoints=[];

        drawGrid = function() {  

                for(i=0 ; i<$scope.$gg.length ; i++){

                    var cellStyle = {
                        "color" : "white",
                        "background" : "coral",
                        "font-size" : "60px",
                        "position" : "absolute",
                        "left" : "600px",
                        "height": "50px",
                        "width": "50px",
                        "border-style": "round",
                        "border-radius": "10px"
                    };

                    // console.log('i = '+i);
                    var top = $scope.$gg[i].y    
                    var left = $scope.$gg[i].x                  
                    cellStyle.left = $scope.$gg[i].x + 'px';
                    cellStyle.top = $scope.$gg[i].y + 'px';
                    
        
                    
                    //g.draggable = "true";
                    //g.style.left = cellStyle.left;
                    //g.style.top = cellStyle.top;
                    //console.log(g.style);
                    console.log(cellStyle.top);
                    console.log(cellStyle);

                    if((top < $scope.$max.y) && (left < $scope.$max.x))
                        $scope.gridPoints.push(cellStyle);
        
                    //$scope.gridPoints = points;
                    //console.log(points[i].x+','+points[i].y+i);
        
                    
                    //t.push(cellStyle);
                    //cellStyle=0;
                    
                }
                
                //$scope.gridPoints = points;
        }

        $timeout(drawGrid,500);


      
})