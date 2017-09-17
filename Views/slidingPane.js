
var app = angular.module('objectsPane',[]);


app.controller('widgetContainer', function($scope) {
            $scope.items = [];

            // at the bottom of your controller
        var init = function () {
            // check if there is query in url
            // and fire search in case its value is not empty
            for(i=0 ; i<=5 ; i++){
                $scope.items.push('Button ' + i);
            }
            
        };
        // and fire it after definition
        init();

})

app.controller('widgets', function($scope) {
    
    //Initializing empty widgets data model
    $scope.widgets=[];

    //Default Style for draggable buttons
    $scope.bStyle = {
        "color" : "white",
        "background-color" : "coral",
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

        //Temporarily hold mouse offset in style
        $scope.bStyle.left = event.offsetX;
        $scope.bStyle.top = event.offsetY;

        //Find dimensions of source element, store globally (ew)
        $scope.bStyle.height = event.srcElement.offsetHeight + 'px';
        $scope.bStyle.width = event.srcElement.offsetWidth + 'px';

        console.log(event);

    };

    //Handler function for when element is 'dropped'
    $scope.dragEnd = function(event){
        event.preventDefault();
        this.style.opacity = '1';    

        //Get the element's ID
        var id = event.srcElement.id;

        //Compute final (absolute) value for resultant element 
        $scope.bStyle.left = (event.pageX - $scope.bStyle.left) + 'px';
        $scope.bStyle.top = (event.pageY - $scope.bStyle.top) + 'px';

        //console.log($scope.bStyle);
        var w = {};
        w.draggable = "true";
        w.style = $scope.bStyle;

        console.log(w);

        if(id == ""){
            //Add widget based on style and dimensions found. Apply
            $scope.$apply(function(){
                $scope.widgets.push(w);
            });
        }
        


    };

})