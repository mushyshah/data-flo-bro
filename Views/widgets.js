app.directive('draggable', function() {
    return{
        restrict: 'A',
        link: function (scope, element, attributes) {
        element[0].addEventListener('dragstart', scope.dragStart, false);
        element[0].addEventListener('dragend', scope.dragEnd, false);
        }  
    }
});