app.directive('draggable', function() {
    return{
        restrict: 'A',
        link: function (scope, element, attributes) {
        element[0].addEventListener('dragstart', scope.dragStart, false);
        element[0].addEventListener('dragend', scope.dragEnd, false);
        }  
    }
});

app.directive('droppable', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].addEventListener('drop', scope.dragDrop, false);
        element[0].addEventListener('dragover', scope.dragOver, false);
        element[0].addEventListener('dragleave', scope.dragLeave, false);  
        }
    }

});