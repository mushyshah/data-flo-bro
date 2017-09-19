
var app = angular.module('dashBoard',[]);

// Create factory that would be used to create array of grid anchor points
app.factory('gPoints', function(){

    return {
        func:function(xTotal,yTotal,w,include,response){
        
        // Initialize points variable
        var points = [];
        points.length=0;
        
        // Set x and y division values
        var xDivision = (w.innerWidth/xTotal);
        var yDivision = (w.innerHeight/yTotal);

        // Create all anchor points
            for(i=0; i< xTotal ; i++){
                for(j=0; j< yTotal ; j++){
                    var anchorPoint = {"x": 0,"y": 0};

                    // Create point pixel values via loop and division values
                    anchorPoint.x = (xDivision/2) + Math.round(i*xDivision);
                    anchorPoint.y = (yDivision/2) + Math.round(j*yDivision);
                    
                    // To provide even padding on left/right top/down of grid
                    if(i==0)
                    anchorPoint.x = Math.round(xDivision/2);
                    if(j==0)
                    anchorPoint.y = Math.round(yDivision/2);

                        // Unnecessary calculations here, don't wanna touch, no harm.
                        // Don't include points that are on right and bottom end of screen (don't wanna draw there)
                        if(((i*xDivision)+(1.5*xDivision)<w.innerWidth) && ((j*yDivision)+(1.5*yDivision)<w.innerHeight))
                            points.push(anchorPoint);
                        // Unless specifically want to include it for the grid dots
                        else if(!include)
                        points.push(anchorPoint);
                }
            }

            //Callback function with point values
            response(points);
            
        }
    };

});


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



app.controller('widgets', function($scope, $timeout, gPoints) {

    //Scope variables
    $scope.gridPoints=[];
    
    //Initializing empty widgets data model
    $scope.widgets=[];

    //Default Style for draggable buttons
    $scope.bStyle = {
        "background-color" : "white",
        "position" : "absolute",
        "border-style": "round",
        "border-radius": "10px",
    };

    //Handler function for when element drag begins
    $scope.dragStart = function(event){
        this.style.opacity = '0.4';

        //Find dimensions of source element, temporarily store as value globally (ew)
        $scope.bStyle.height = event.srcElement.offsetHeight;
        $scope.bStyle.width = event.srcElement.offsetWidth;

    };

    //Handler function for when element is 'dropped'
    $scope.dragEnd = function(event){
        
        //This is needed for some reason
        event.preventDefault();
        this.style.opacity = '1';
        
        var wDivision = (window.innerWidth/$scope.$elements.x);
        var hDivision = (window.innerHeight/$scope.$elements.y);

        //Get the element's ID
        var id = event.srcElement.id;

        //Get the element on which it's being dropped on. ID set via dragOver function
        var dropZone = document.getElementById($scope.dropZone);
        
        //Set default style's left and top to that of the dropzone
        $scope.bStyle.left = dropZone.style.left;
        $scope.bStyle.top = dropZone.style.top;

        //Compute vertical and horizontal scale. Compute height and wifth 
        var hScale = Math.round($scope.bStyle.height/hDivision)
        var wScale = Math.round($scope.bStyle.width/wDivision)
        $scope.bStyle.height = hDivision*hScale + 'px';
        $scope.bStyle.width = wDivision*wScale + 'px';

        //Create widget object to push
        var w = {};
        w.draggable = "true";
        w.style = $scope.bStyle;

        //Link the widget to the grid item it's being dropped on
        w.bindsTo = $scope.dropZone;

        //Assign relative scale (to created grid)
        w.scale = {x: wScale, y: hScale};

        //If this is a new widget (no id), create a new one
        if (id == ""){
            //Add widget based on style and dimensions found. Apply
            $scope.$apply(function(){
                $scope.widgets.push(w);
            });
        } 
        
        //Otherwise find out what widget this is and move it
        else{

            //Ensure that the existing widget's grid binding is updated
            $scope.$apply(function(){
            $scope.widgets[id.split("-")[1]].bindsTo=$scope.dropZone;
            });

            //Get the existing widget's ID. Align it to the dropzone
            var element = document.getElementById(id);
            element.style.left=dropZone.style.left;
            element.style.top=dropZone.style.top;
        }

    };

    //Element dragover function
    $scope.dragOver = function (event) {
        event.preventDefault(); // Still don't know what this is for
        event.dataTransfer.dropEffect = 'move';

        //Make the grid area orange when highlighted
        this.style.background = 'coral';
        //Set scope dropzone (for dragend function) when highlighted
        $scope.dropZone = this.id; 
        
        return false;
    };

    //Element dragleave function
    $scope.dragLeave = function (event) {
        event.preventDefault(); // ??????????????????????
        event.dataTransfer.dropEffect = 'move';
        //Revert orange back to canvas color
        this.style.background = '';
        
        return false;
    };

    //Element dragdrop function
    $scope.dragDrop = function (event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

        //Revert color back when dropped over this
        this.style.background = ''; 
        
        return false;
    };

    
    drawGrid = function() { 
        
        //Update division
        $scope.gridDivision = (window.innerWidth/30);

        //Iterate through initial grid positions
        for(i=0 ; i<$scope.$gg.length ; i++){
                
            //Default style for grid areas
            var cellStyle = {
                    "position" : "absolute",                        
                    "left" : "600px",
                    "height": "50px",
                    "width": "50px",
                    "border-style": "round",
                    // "background": "coral",
                    "border-radius":"10px"
            };

            //Initialize grid sections
            var g = {};
            g.links = '';

            //Set styles of grid sections to default above
            g.style = cellStyle;

            //Set grid positions to initialized positions
            var top = $scope.$gg[i].y    
            var left = $scope.$gg[i].x                  
            cellStyle.left = $scope.$gg[i].x + 'px';
            cellStyle.top = $scope.$gg[i].y + 'px';

            //Initial grid size is square
            cellStyle.height = $scope.gridDivision + 'px';
            cellStyle.width = $scope.gridDivision + 'px';

            //Push grid object
            $scope.gridPoints.push(g);
                    
        }
                
    }

    //Add resizeGrid to event handler for window resizes
    window.addEventListener('resize', resizeGrid);
    
    //Function to reposition existing widgets after resize, called by resizeGrid below 
    function repositionWidgets(wDivision,hDivision){

        //Loop through all existing widgets
        for(i=0 ; i<$scope.widgets.length ; i++){

            //Get grid section/element that widget binds to
            var gridElement = document.getElementById($scope.widgets[i].bindsTo);
            //Get widget by id/index
            var buttonElement = document.getElementById('object-'+i);

            //Set position and dimensions of widget
            buttonElement.style.left = gridElement.style.left;
            buttonElement.style.top = gridElement.style.top;

            //Size is dependent on each individual widget's 'scale'
            buttonElement.style.height = hDivision*$scope.widgets[i].scale.y + 'px';
            buttonElement.style.width = wDivision*$scope.widgets[i].scale.x + 'px';

        }

    }

    function resizeGrid() {  

        //Update grid division
        $scope.gridDivision = (window.innerWidth/30);

        //Update vertical and horizontal divisions
        var wDivision = (window.innerWidth/$scope.$elements.x);
        var hDivision = (window.innerHeight/$scope.$elements.y);

        $timeout(function(){
        //Call factory function to create new gridpoints
        gPoints.func($scope.$elements.x,$scope.$elements.y,window,true,function(response){ 

            //For all gridpoints returned
            for(i=0 ; i<response.length ; i++){
                    var gridElement = document.getElementById('gridPoint-'+i);

                        //Set dimensions and position of grid element
                        gridElement.style.left = response[i].x + 'px';
                        gridElement.style.top = response[i].y + 'px';
                        gridElement.style.height = hDivision + 'px';
                        gridElement.style.width = wDivision + 'px';
   
            }
        });

        //Call reposition widgets function after grid is redrawn
        repositionWidgets(wDivision,hDivision);

        //Closing of timeout function = 5ms
        },5);
                
    }
    
    //Drawgrid 50ms after instantiation
    $timeout(drawGrid,50);
    
})