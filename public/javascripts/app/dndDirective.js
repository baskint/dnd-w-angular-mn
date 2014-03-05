'using strict';

dndApp.directive('cpsDndPlacementL2',  function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.l2present = false;
          scope.$on('placement.received', function(e, cabinetId, itemId, itemName, itemType) {
                if (element[0].id === cabinetId) {
                    console.log(cabinetId + " " + itemId + " " + itemType);
                    scope.l2present = true;
                    scope.cabinetId = itemId;
                    scope.cabinetName = itemName;
                    scope.cabinetType = itemType;

                } 
            }); 
        },

        templateUrl: '/templates/_PlacementContainerL2.html'
    };

}).directive('cpsDndPlacementR3', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.r3present = false;
            scope.$on('placement.received', function (e, cabinetId, itemId, itemName, itemType) {
                if (element[0].id === cabinetId) {
                    console.log(cabinetId + " " + itemId + " " + itemType);
                    scope.r3present = true;
                    scope.l2present = true;
                    scope.cabinetId = itemId;
                    scope.cabinetName = itemName;
                    scope.cabinetType = itemType;
                }
            });
        },

        templateUrl: '/templates/_PlacementContainerR3.html'
    };

})