'using strict';

dndApp.controller('DnDPocController', [
    '$scope', 'dndPocRepository', 'uuid', function ($scope, dndPocRepository, uuid) {

        // TODO - back end call for population of the left-hand side controls, can leave blank also
        $scope.cabinets =
            [
                { 'id': '89D4C446-80B9-4476-B1E3-9485ECDC7ABD', 'name': 't1', 'type': 'VFI' },
                { 'id': '31D2029-D392-4349-AAF0-F255870F2798', 'name': 't2', 'type': 'Relay' },
                { 'id': 'BCAD3CF7-4589-425D-AF22-6F879051DB5F', 'name': 't3', 'type': 'Motor' }
            ];

        // dynamic layout of the initial placement grid - used with ng-repeat. don't mess with!
        $scope.split_placements = [
            [
                { 'placementId': 'L1', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'L3', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'R1', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'R3', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false }
            ],
            [
                { 'placementId': 'L2', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'L4', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'R2', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
                { 'placementId': 'R4', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false }
            ]
        ];

        // candidates for app's default values. shove them into scope as available.
        $scope.cabinetTypeOptions = ["VFI", "Relay", "Motor", "Motor w/ Relay"];
        $scope.cabinetType = "VFI";
        $scope.orderId = '123';

        // initialization of scope values
        $scope.baseCabName = "";
        $scope.selectedCabinetId = -1;
        $scope.placedcabinets = [];

        // event handling - raised from the directive
        $scope.$on("cabinet.clicked", function (e, cabinetId) {
            $scope.selectedCabinetId = cabinetId;
        });

        // event handling - raised from the directive
        $scope.$on("cabinet.placed", function (e, placedcabinet) {
            updatePlacedCabinets(placedcabinet);
        });

        function updatePlacedCabinets(placedcabinet) {
            var indexToRemove = -1;
            for (var i = 0; i < $scope.placedcabinets.length; i++) {
                if ($scope.placedcabinets[i].id === placedcabinet.id) {
                    indexToRemove = i;
                }
            }
            // check if this element is already in placed cabinet array
            if (indexToRemove > -1)
                $scope.placedcabinets.splice(indexToRemove, 1); //simply remove it -- works w/ ng-binding

            // after that, put it back with the new containerId (part of the object construct)
            $scope.placedcabinets.push(placedcabinet);
        };

        $scope.dropped = function (dragEl, dropEl) {
            var drag = angular.element(dragEl);
            var drop = angular.element(dropEl);
            if (dropEl.children.length === 0) {
                removePlacedCabinet(dragEl.children[0].id);
                var cabinet = {
                    'id': dragEl.children[0].id,
                    'name': dragEl.children[0].innerHTML.trim(),
                    'type': dragEl.children[1].value
                };
                // TODO: further testing to see if the below line makes sense
                // $scope.cabinets.push(cabinet);
                dropEl.appendChild(dragEl);
            }
            drop.removeClass("lvl-over");

        };

        function removePlacedCabinet(idToRemove) {
            var indexToRemove = -1;
            for (var i = 0; i < $scope.placedcabinets.length; i++) {
                if ($scope.placedcabinets[i].id === idToRemove) {
                    indexToRemove = i;
                }
            }
            // check if this element is already in placed cabinet array
            if (indexToRemove > -1)
                $scope.placedcabinets.splice(indexToRemove, 1); //simply remove it -- works w/ ng-binding
        }

        // OUT-OF-SCOPE : keep it for future reference, no one should fire this event now
        $scope.$on("cabinet.removed", function (e, removedcabinet) {
            // TODO : remove cabinet from the object array
        });


        $scope.numberOfCabinets = function () {
            return $scope.cabinets.length;
        };

        // turns on the class whether the cabinet is clicked or not
        $scope.cabinetClicked = function (cabinetId) {
            $scope.selectedCabinetId = cabinetId;
        };

        // handles the addControl method call from the modal class -
        $scope.addControl = function (baseCabName, cabinetType) {
            var nextId = $scope.numberOfCabinets() + 1;
            var cabinet = { 'id': nextId, 'name': baseCabName, 'type': cabinetType };
            $scope.cabinets.push(cabinet);  // works nicely with ng-repeat
            $scope.modalShown = !$scope.modalShown; // hide the modal box, done!
        };

        // Modal view show / hide scripts
        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };


        // handles the (-) button click event
        $scope.removeCabinet = function () {
            var indexToRemove = -1;     // only works  once, need to reset it as the user messes in the UI
            if ($scope.selectedCabinetId === -1) {
                alert("Please select a cabinet to remove");
            } else {

                for (var i = 0; i < $scope.cabinets.length; i++) {
                    if ($scope.cabinets[i].id === $scope.selectedCabinetId) {
                        indexToRemove = i;
                    }
                }
                if (indexToRemove > -1)
                    $scope.cabinets.splice(indexToRemove, 1);

                //  TODO: does not play nicely with ng-bind, hand remove HACK
                // remove the manually placed control - this came from the saved state
                var cabControl = document.getElementById($scope.selectedCabinetId).parentElement;

                if (cabControl !== null) {
                    var dropContainer = document.getElementById(cabControl.id).parentElement;
                    dropContainer.removeChild(cabControl);
                }
            };
        };

        // save the placements in the repository
        $scope.save = function () {
            dndPocRepository.savePlacements($scope.placedcabinets);
        };

        // refresh (aka. Reset) main placements area
        $scope.refresh = function () {
            clearDropZone();    // major hack
            $scope.placedcabinets = [];
            dndPocRepository.getPlacements($scope);
        };

        function clearDropZone() {
            var zoneName = null;
            for (var key in $scope.split_placements) {
                for (var x in $scope.split_placements[key]) {
                    // does not play nicely with ng-repeat. tried turning off the elements via their properties, but no updates in the UI
                    // must be missing something or it is a limitation of the framework
                    zoneName = $scope.split_placements[key][x].placementId;
                    $scope.split_placements[key][x].cabpresent = false;
                    // HACK is to fire an event to be handled in the directive
                    $scope.$broadcast('placement.clearZone', zoneName);
                }
            }
        }
    }]);

