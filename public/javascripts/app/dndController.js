'using strict';

dndApp.controller('DnDPocController', ['$scope', 'dndPocRepository', 'uuid', function ($scope, dndPocRepository, uuid) {

    // TODO - this should come back from a DB back-end HTTP GET.
    $scope.cabinets =
        [
            { 'id': '89D4C446-80B9-4476-B1E3-9485ECDC7ABD', 'name': 't1', 'type': 'VFI' },
            { 'id': '31D2029-D392-4349-AAF0-F255870F2798', 'name': 't2', 'type': 'Relay' },
            { 'id': '2D62C4C8-13C8-4FCA-AF2C-495CE03DFA52', 'name': 't3', 'type': 'Motor' }
        ];

    // dynamic layout of the initial placement grid
    $scope.split_placements = [
        [{ 'placementId': 'L1', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false },
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

    // http://stackoverflow.com/questions/17928487/angular-js-how-to-change-an-elements-css-class-on-click-and-to-remove-all-others
    $scope.selectedCabinetIndex = -1;

    // object array of placed cabinets is set to empty array
    $scope.placedcabinets = [];

    $scope.$on("cabinet.placed", function (e, placedcabinet) {
        // console.log(placedcabinet.name);
        updatedPlacedCabinets(placedcabinet);
        // $scope.placedcabinets.push(placedcabinet);
    });

    function updatedPlacedCabinets(placedcabinet) {
        var indexToRemove = -1;
        for (var i = 0; i < $scope.placedcabinets.length; i++) {
            if ($scope.placedcabinets[i].id === placedcabinet.id) {
                indexToRemove = i;
            }
        }
        // check if this element is already in placed ca binet array
        if (indexToRemove > -1)
            $scope.placedcabinets.splice(indexToRemove, 1);     //simply remove it

        // then put it back with the new containerId (part of the object construct)
        $scope.placedcabinets.push(placedcabinet);
    };

    $scope.$on("cabinet.removed", function (e, removedcabinet) {
        // TODO : remove cabinet from the object array
    });

    $scope.numberOfCabinets = function () {
        return $scope.cabinets.length;
    };

    $scope.cabinetClicked = function ($index) {
        if ($scope.selectedCabinetIndex === -1)
            $scope.selectedCabinetIndex = $index;
        else
            $scope.selectedCabinetIndex = -1;
    };

    $scope.baseCabName = "";
    $scope.addControl = function (baseCabName) {
        var nextId = $scope.numberOfCabinets() + 1;
        var cabinet = { 'id': nextId, 'name': baseCabName, 'type': 'random1' };
        $scope.cabinets.push(cabinet);
        $scope.modalShown = !$scope.modalShown;
    };

    // TODO: require testing and cross pollenation with the directive's droopped function
    $scope.dropped = function (dragEl, dropEl) {
        // this is your application logic, do whatever makes sense
        var drag = angular.element(dragEl);
        var drop = angular.element(dropEl);

        if (dropEl.children.length === 0) {
            if (drop.hasClass("cabinetType") === false) {
                dragEl.removeAttribute('ng-click');
                dropEl.appendChild(dragEl);
                //dropEl.removeAttribute("x-lvl-drop-target");
                dropEl.removeAttribute("x-on-drop");
                //drop.removeClass("ng-isolate-scope");
                var spanx = angular.element(dragEl.children[0]);


                console.log("The element " + drag.attr('id') + " has been dropped on " + drop.attr("id") + "!");
            }
        } else {
            drop.removeClass("lvl-over");
            // dropEl.firstChild.className = "source-container";
        }

    };

    // Modal view show / hide scripts
    $scope.modalShown = false;
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    $scope.addCabinet = function () {
        var nextId = uuid.new();
        var cabinet = { 'id': nextId, 'name': 't' + nextId, 'type': 'Relay' };
        $scope.cabinets.push(cabinet);
    };

    $scope.removeCabinet = function () {
        if ($scope.selectedCabinetIndex === -1) {
            alert("Please select a cabinet to remove");
        } else {
            $scope.cabinets.splice($scope.selectedCabinetIndex, 1);
        };
    };


    $scope.save = function () {
        dndPocRepository.savePlacements($scope.placedcabinets);
    };

    $scope.refresh = function () {

        dndPocRepository.getPlacements($scope);
    };

}]);

