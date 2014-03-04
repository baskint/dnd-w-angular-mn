'using strict';

cmnCabApp.directive('cpsDndPlacementL2',  function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.$on('placement.received', function(e, cabinetId, itemId, itemName, itemType) {
                if (element[0].id === cabinetId) {
                    console.log(cabinetId + " " + itemId + " " + itemType);
                    scope.cabpresent = true;
                    // var el= $compile('<div class="source-container"><span id="' + itemId + '" class="cabinetToggle"' + itemName + '</span></div>');
                    // console.log(el);
                    // element.append(el);
                    // scope.controlmarkup = '<div class="source-container"><span id="' + itemId + '" class="cabinetToggle"' + itemName + '</span></div>';
                } 
            }); 
        },

        template: '<div ng-if="cabpresent"><p>hey</p></div>'
    };

}).directive('cpsDndPlacementR3', function ($compile) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            scope.cabpresent = false;
            scope.$on('placement.received', function (e, cabinetId, itemId, itemName, itemType) {
                if (element[0].id === cabinetId) {
                    console.log(cabinetId + " " + itemId + " " + itemType);
                    scope.cabpresent = true;
                    // var el= $compile('<div class="source-container"><span id="' + itemId + '" class="cabinetToggle"' + itemName + '</span></div>');
                    // console.log(el);
                    // element.append(el);
                    // scope.controlmarkup = '<div class="source-container"><span id="' + itemId + '" class="cabinetToggle"' + itemName + '</span></div>';
                }
            });
        },

        template: '<div ng-if="cabpresent"><p>hey</p></div>'
    };

})