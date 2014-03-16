'use strict';

dndApp.factory('dndPocRepository', function ($http, $q) {
    return {
        getPlacements: function ($scope) {
            var placedcabinet = null;
            $scope.placements = [
                {
                    "ContainerId": "L2",
                    "CabinetControlId": "EDE8B883-F11B-4D73-BD11-5E19433D073G",
                    "Name": "Ctl1",
                    "Type": "Relay"
                },
                {
                    "ContainerId": "R3",
                    "CabinetControlId": "2D62C4C8-13C8-4FCA-AF2C-495CE03DFA52",
                    "Name": "Ctl2",
                    "Type": "Motor"
                }
            ];

            for (var i = 0; i < $scope.placements.length; i++) {
                var cab = $scope.placements[i];
                for (var key in $scope.split_placements) {
                    var cab = $scope.placements[i];
                    for (var key in $scope.split_placements)
                        for (var x in $scope.split_placements[key]) {
                            if ($scope.split_placements[key][x].placementId === cab["ContainerId"]) {
                                // console.log($scope.split_placements[key][x].placementId);
                                $scope.split_placements[key][x].cabpresent = true;
                                $scope.split_placements[key][x].cabinetId = cab["Id"];
                                $scope.split_placements[key][x].cabinetName = cab["Name"];
                                $scope.split_placements[key][x].cabinetType = cab["Type"];
                                placedcabinet = {
                                    'orderId': $scope.orderId,
                                    'containerId': cab["ContainerId"],
                                    'id': cab["Id"],
                                    'name': cab["Name"],
                                    'type': cab["Type"]
                                };
                                // add the placed cabinet to the main scope
                                $scope.placedcabinets.push(placedcabinet);
                            }
                        }
                }
            }
        },
        savePlacements: function (placedcabinets) {
            console.log("insert save logic here")
//            var deferred = $q.defer();
//            var rootSeg = getRootUrlAppBpaf();
//            $http({
//                url: rootSeg + '/api/DragDropPoc',
//                dataType: 'json',
//                method: 'POST',
//                data: placedcabinets,
//                contentType: "application/json"
//            }).success(function () {
//                    deferred.resolve();
//                }).error(function (e) {
//                    console.log(e);
//                });
//            return deferred.promise;
        }

    };
});