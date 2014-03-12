'using strict';

dndApp.directive('cpsDndPlacement', function () {

    return {
        restrict: 'E',
        scope: {
            placement: '=',
            placedcabinet: '=',
            onplacementreceived: '=',
            selectedCabinetIndex: '=',
            addplacedcabinet: '&',
            upvote: '&'
        },

        link: function (scope, element, attrs) {

            scope.dropped = function (dragEl, placement) {
                // this is your application logic, do whatever makes sense
                var drag = angular.element(dragEl);
                var dropEl = document.getElementById(placement.placementId);
                var dragElParent = dragEl.parentNode;
                var dropElChild = dropEl.firstChild;
                var drop = angular.element(dropEl);
                var placedcabinet = null;

                // scope.placement.cabpresent = placement.cabpresent;

                if (scope.placement.cabpresent === false) {
                    dropEl.appendChild(dragEl);
                    // scope.placement.cabpresent = true;
                    //scope.placement.cabpresent = true;
                    dropEl.childNodes[2].class = "";
                    dragElParent.classList.add("pcabToggle");
                    placedcabinet = extractDraggedCabinet(dragEl);
                    placedcabinet.containerId = placement.placementId;
                    scope.$emit("cabinet.placed", placedcabinet);

                } else {
                    if (dropEl.children.length === 0 || dropEl.childNodes[2].classList.contains('pcabToggle')) {
                        if (dropEl.children.length < 2) {
                            dropEl.appendChild(dragEl);
                            placedcabinet = extractDraggedCabinet(dragEl);
                            placedcabinet.containerId = placement.placementId;
                            scope.$emit("cabinet.placed", placedcabinet);
                        }
                    }
                }

                console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");
                drop.removeClass('lvl-over');
            };

            scope.dirCabSelected = false;

            scope.cabinetClicked = function (cabSelected) {
                if (scope.dirCabSelected === false) {
                    scope.dirCabSelected = true;
                    console.log(scope.selectedCabinetIndex);
                    // scope.selectedCabinetIndex = scope.placement.cabinetId;
                } else
                    scope.dirCabSelected = false;
            };

            // inline function to extract the cabinet details from the dragged element
            function extractDraggedCabinet(dragEl) {
                var draggedItem = new Object();
                draggedItem.id = dragEl.children[0].id;
                console.log(draggedItem.id);
                draggedItem.name = dragEl.children[0].innerHTML.trim();
                draggedItem.type = dragEl.children[1].value;
                return draggedItem;
            }
        },

        templateUrl: '/assets/templates/_PlacementContainer.html'
    };
});