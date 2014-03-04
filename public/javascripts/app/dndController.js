'using strict';

dndApp.controller('DnDPocController', ['$scope', 'dndPocRepository', 'uuid', function($scope, dndPocRepository, uuid) {
   
    // TODO - this should come back from a DB back-end HTTP GET.
    $scope.cabinets = 
        [
            { 'id': 'EDE8B883-F11B-4D73-BD11-5E19433D073F', 'name': 't1', 'type': 'VFI' },
            { 'id': '31D2029-D392-4349-AAF0-F255870F2798', 'name': 't2', 'type': 'Relay' },
            { 'id': '2D62C4C8-13C8-4FCA-AF2C-495CE03DFA52', 'name': 't3', 'type': 'Motor' }
        ];

    // http://stackoverflow.com/questions/17928487/angular-js-how-to-change-an-elements-css-class-on-click-and-to-remove-all-others
    $scope.selectedCabinetIndex = -1;

    $scope.numberOfCabinets = function() {
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
        var cabinet = { 'id': nextId, 'name': 't' + nextId, 'description': 'random1' };
        $scope.cabinets.push(cabinet);
    };

    $scope.removeCabinet = function() {
        if ($scope.selectedCabinetIndex === -1) {
            alert("Please select a cabinet to remove");
        } else {
            $scope.cabinets.splice($scope.selectedCabinetIndex, 1);
        };
    };

    $scope.save = function() {
        console.log("saving here");
    };

    $scope.refresh = function() {
        dndPocRepository.getPlacements($scope);
    };

}]);

