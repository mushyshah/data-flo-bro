
var app = angular.module('objectsPane',[]);


app.controller('widgetContainer', function($scope) {
            $scope.items = [];
            $scope.$gg=[];
            $scope.$scaleFactor = 1;
            $scope.$dimensions = {};
            $scope.$gridDistance = 50;
            $scope.$max={ 
                    "x": 0,
                    "y": 0
            };

            // at the bottom of your controller
        var init = function () {
            // and fire search in case its value is not empty
            for(i=0 ; i<=5 ; i++){
                $scope.items.push('Button ' + i);
            }
            
        };
        // and fire it after definition
        init();

})

app.controller('widgets', function($scope,$timeout) {
    
    //Initializing empty widgets data model
    $scope.widgets=[];

    //Default Style for draggable buttons
    $scope.bStyle = {
        "color" : "white",
        "background-color" : "white",
        "font-size" : "60px",
        "position" : "absolute",
        "left" : "600px",
        "right": "600px",
        "height": "50px",
        "width": "50px",
        "border-style": "round",
        "border-radius": "10px"
    };

    //Handler function for when element drag begins
    $scope.dragStart = function(event){
        this.style.opacity = '0.4';

        //$scope.bStyle=this.style;

        //Temporarily hold mouse offset in style
        $scope.bStyle.left = event.offsetX;
        $scope.bStyle.top = event.offsetY;

        //Find dimensions of source element, store globally (ew)
        $scope.bStyle.height = event.srcElement.offsetHeight + 'px';
        $scope.bStyle.width = event.srcElement.offsetWidth + 'px';

    };

    //Handler function for when element is 'dropped'
    $scope.dragEnd = function(event){
        event.preventDefault();
        this.style.opacity = '1';    

        //Get the element's ID
        var id = event.srcElement.id;
        var dropZone = document.getElementById($scope.dropZone);
        
        //Compute final (absolute) value for resultant element 
        //$scope.bStyle.left = (event.pageX - $scope.bStyle.left) + 'px';
        //$scope.bStyle.top = (event.pageY - $scope.bStyle.top) + 'px';

        $scope.bStyle.left = dropZone.style.left;
        $scope.bStyle.top = dropZone.style.top;
        //console.log($scope.bStyle);
        var w = {};
        w.draggable = "true";
        w.style = $scope.bStyle;

        //If this is a new widget (no id), create a new one
        if (id == ""){
            //Add widget based on style and dimensions found. Apply
            $scope.$apply(function(){
                $scope.widgets.push(w);
            });
        } 
        
        //Otherwise find out what widget this is and move it
        else{
            var element = document.getElementById(id);

            element.style.left=dropZone.style.left;
            element.style.top=dropZone.style.top;
        }

    };

    $scope.dragOver = function (event) {
        event.preventDefault(); // Necessary. Allows us to drop.
        event.dataTransfer.dropEffect = 'move';
        $scope.dropZone
        this.style.background = 'coral';
        $scope.dropZone = this.id; 
        
        return false;
    };

    $scope.dragLeave = function (event) {
        event.preventDefault(); // Necessary. Allows us to drop.
        event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        this.style.background = ''; 
        
        return false;
    };

    $scope.dragDrop = function (event) {
        event.preventDefault(); // Necessary. Allows us to drop.
        event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        this.style.background = ''; 
        
        return false;
    };

    $scope.gridPoints=[];
    drawGrid = function() {  
        for(i=0 ; i<$scope.$gg.length ; i++){
                
            var cellStyle = {
                    "color" : "white",
                    "font-size" : "60px",
                    "position" : "absolute",                        
                    "left" : "600px",
                    "height": "50px",
                    "width": "50px",
                    "border-style": "round"
            };

                // console.log('i = '+i); 
                var top = $scope.$gg[i].y    
                var left = $scope.$gg[i].x                  
                cellStyle.left = $scope.$gg[i].x + 'px';
                cellStyle.top = $scope.$gg[i].y + 'px';
                //cellStyle.height = $scope.$gridDistance + 'px';
                //cellStyle.width = $scope.$gridDistance + 'px';


                if((top < $scope.$max.y) && (left < $scope.$max.x))
                    $scope.gridPoints.push(cellStyle);
                    
        }
                
    }

    window.addEventListener('resize', resizeGrid);
    
    function resizeGrid(event) {  
        $timeout(function(){
            for(i=0 ; i<$scope.gridPoints.length ; i++){

                    //var scale = Math/max(scaleFactor.y,scaleFactor.x);

                    var gridElement = document.getElementById('gridPoint-'+i);

                    gridElement.style.left=$scope.$gg[i].x + 'px';
                    gridElement.style.top=$scope.$gg[i].y + 'px';
                    gridElement.style.height=(window.innerWidth/30) + 'px';
                    gridElement.style.width=(window.innerWidth/30) + 'px';
   
                    console.log(gridElement.style.left);     
            }
        },500);
                
    }
    
    
        $timeout(drawGrid,500);
    
})