'using strict';

dndApp.directive('cpsDndPlacement', function () {
    var rootSeg = getRootUrlAppBpaf();

    return {
        restrict: 'E',
        scope: {
            placement: '=',
            selectedCabinetId: '=',
            orderId: '='
        },
        link: function (scope, element, attrs) {

            scope.dropped = function (dragEl, placement) {
                // this is your application logic, do whatever makes sense
                var drag = angular.element(dragEl);
                var dropEl = document.getElementById(placement.placementId);
                var dragElParent = dragEl.parentNode;
                var drop = angular.element(dropEl);
                var placedcabinet = null;

                if (scope.placement.cabpresent === false && dropEl.children.length === 0) {

                    // replace the contents
                    dropEl.appendChild(dragEl);
                    // TODO : test below
                    dropEl.childNodes[2].class = "";
                    // this class is added to the parent of the dragEl so that it could be keyed upon (see below else)
                    dragElParent.classList.add("pcabToggle");

                    // extract the JSON object from the DOM's dragEl
                    placedcabinet = extractDraggedCabinet(dragEl);
                    // assign two more properties
                    placedcabinet.containerId = placement.placementId;
                    placedcabinet.orderId = scope.orderId;

                    // emit the event to be handled in controller
                    scope.$emit("cabinet.placed", placedcabinet);
                    // DOES NOT PLAY nicely with ng-bind and repeat. further research & understanding is required.
                    // would have been much easier below constructs have worked
                    //appendPlacedCabinet(placedcabinet);
                    // below line should tell that i have no clue what it does.
                    //attrs.$observe("ngIf", function (newValue) {
                    //    element.text(newValue);
                    //});
                } else {
                    if (dropEl.children.length === 0 || dropEl.childNodes[2].classList.contains('pcabToggle')) {
                        if (dropEl.children.length < 2) {
                            dropEl.appendChild(dragEl);
                            placedcabinet = extractDraggedCabinet(dragEl);
                            //  appendPlacedCabinet(placedcabinet);       <-- does not play nicely with ng-bind
                            placedcabinet.containerId = placement.placementId;
                            placedcabinet.orderId = scope.orderId;

                            // emit the event to be handled in controller
                            scope.$emit("cabinet.placed", placedcabinet);
                        }
                    }
                }

                console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");
                drop.removeClass('lvl-over');
            };

            // event handling fired from the controller - another hack so that we can clear the individual containers
            scope.$on('placement.clearZone', function(e, name) {
                if (name === scope.placement.placementId) {
                    var dropNode = document.getElementById(name);
                    if (dropNode.firstChild.nextElementSibling !== null) {
                        // removing the section without touching ng-if comment section - if you do, nothing works!
                        dropNode.removeChild(dropNode.firstChild.nextElementSibling);
                    }
                }
            });

            // sends an event to the controller
            scope.cabinetClicked = function (cabinetId) {
                scope.$emit('cabinet.clicked', cabinetId);
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

            // NOT IN USE - could not get the directive's property's change on the UI, something
            // is not in sync with the template, perhaps need the $compile construct, more advanced right now.
            function appendPlacedCabinet(placedcabinet) {
                scope.placement.cabpresent = true;
                scope.placement.placementId = placedcabinet.id;
                scope.placement.cabinetName = placedcabinet.name;
                scope.placement.cabinetType = placedcabinet.type;
            }
        },

        templateUrl: rootSeg + 'assets/templates/_PlacementContainer.html'
    };
});