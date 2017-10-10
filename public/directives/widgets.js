app.directive('draggable', function() {
    return{
        restrict: 'A',
        link: function (scope, element, attributes) {
        element[0].addEventListener('dragstart', scope.dragStart, false);
        element[0].addEventListener('dragend', scope.dragEndHandler, false);
        element[0].addEventListener('drag', scope.dragHandler, false);
        }  
    }
});

app.directive('droppable', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].addEventListener('drop', scope.dragDrop, false);
        element[0].addEventListener('dragover', scope.dragOverHandler, false);
        element[0].addEventListener('dragleave', scope.dragLeave, false);  
        }
    }

});

app.directive('mouseenter', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].addEventListener('mouseenter', scope.hover, false);
        element[0].addEventListener('mouseleave', scope.hover, false);
        // element[0].addEventListener('mousedown', scope.hover, false);
        }
    }

});