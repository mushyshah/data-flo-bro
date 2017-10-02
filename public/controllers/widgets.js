
app.controller('widgets', function($scope, $timeout, gPoints, socket) {

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
        "color": "black",
        "text-align": "center",
        "font-size": "10pt"
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
        
        var xDivision = (window.innerWidth/$scope.$gridPointsMeta.xTotal);
        var yDivision = (window.innerHeight/$scope.$gridPointsMeta.yTotal);

        //Get the element's ID
        var id = event.srcElement.id;

        //Get the element on which it's being dropped on. ID set via dragOver function
        var dropZone = document.getElementById($scope.dropZone);
        
        //Set default style's left and top to that of the dropzone
        $scope.bStyle.left = dropZone.style.left;
        $scope.bStyle.top = dropZone.style.top;

        //Compute vertical and horizontal scale. Compute height and wifth 
        var hScale = Math.round($scope.bStyle.height/yDivision)
        var wScale = Math.round($scope.bStyle.width/xDivision)
        $scope.bStyle.height = yDivision*hScale + 'px';
        $scope.bStyle.width = xDivision*wScale + 'px';

        //Create widget object to push
        var w = {};
        w.draggable = "true";
        w.style = $scope.bStyle;
        w.ping = 0;
        w.animate='';
        w.animation=event.srcElement.innerText;

        //Link the widget to the grid item it's being dropped on
        w.bindsTo = $scope.dropZone;

        //Assign relative scale (to created grid)
        w.scale = {x: wScale, y: hScale};

        //If this is a new widget (no id), create a new one
        if (id == ''){

            console.log(event);
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
        for(i=0 ; i<$scope.$gridPoints.length ; i++){
                
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
            var top = $scope.$gridPoints[i].y    
            var left = $scope.$gridPoints[i].x                  
            cellStyle.left = $scope.$gridPoints[i].x + 'px';
            cellStyle.top = $scope.$gridPoints[i].y + 'px';

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
    function repositionWidgets(xDivision,yDivision){

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
            buttonElement.style.height = yDivision*$scope.widgets[i].scale.y + 'px';
            buttonElement.style.width = xDivision*$scope.widgets[i].scale.x + 'px';

        }

    }

    function resizeGrid() {  

        //Update grid division
        $scope.gridDivision = (window.innerWidth/30);

        //Update vertical and horizontal divisions
        var xDivision = (window.innerWidth/$scope.$gridPointsMeta.xTotal);
        var yDivision = (window.innerHeight/$scope.$gridPointsMeta.yTotal);

        $timeout(function(){
        //Call factory function to create new gridpoints
        gPoints.func($scope.$gridPointsMeta.xTotal,$scope.$gridPointsMeta.yTotal,window,true,function(response){ 

            //For all gridpoints returned
            for(i=0 ; i<response.length ; i++){
                    var gridElement = document.getElementById('gridPoint-'+i);
                        
                        //Set dimensions and position of grid element
                        gridElement.style.left = response[i].x + 'px';
                        gridElement.style.top = response[i].y + 'px';
                        gridElement.style.height = yDivision + 'px';
                        gridElement.style.width = xDivision + 'px';
   
            }
        });

        //Call reposition widgets function after grid is redrawn
        repositionWidgets(xDivision,yDivision);

        //Closing of timeout function = 5ms
        },5);
                
    }
    
    //Drawgrid 50ms after instantiation
    $timeout(drawGrid,50);

    socket.on('ping', function (data) {

        $timeout(function(){
            
            var found = false;
            //If the ping received is not undefined
            if(data!=undefined){
                //Loop through all existing widgets
                for(i=0 ; i<$scope.widgets.length ; i++){
                    //If ping matches current widget, change it to coral
                    if($scope.widgets[i].bindsTo==data.widget){
                        found=true;
                        $scope.widgets[i].animate=$scope.widgets[i].animation;
                        var buttonElement = document.getElementById('object-'+i);

                        //Let the server know the ping was succesful - widget was found
                        socket.emit('pingResponse','Ping to widget '+ $scope.widgets[i].bindsTo + ' was successful!');
                    }
                }
                
                if(!found)
                socket.emit('pingResponse','Widget '+ data.widget + ' not found :('); 
            }
        },10);

    });

    $scope.$watch("value",function(newValue,oldValue){
        // your code goes here...
        

    });
    
})