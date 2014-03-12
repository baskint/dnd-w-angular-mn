'use strict';

dndApp.factory('dndPocRepository', function ($http, $q) {
    return {
        getCabinet: function ($scope) {
            $scope.$emit('LOAD');
            var deferred = $q.defer();
            var rootSeg = getRootUrlAppBpaf();
            $http.get(rootSeg + '/api/DragDropCabinets').success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        },

        savePlacements: function (placedcabinets) {
            var deferred = $q.defer();
            var rootSeg = getRootUrlAppBpaf();
            $http({
                url: rootSeg + '/api/DragDropPoc',
                dataType: 'json',
                method: 'POST',
                data: placedcabinets,
                contentType: "application/json"
                //headers : {
                //    "Content-Type": "application/json"
                //}
            }).success(function() {
                    deferred.resolve();
                }).error(function(e) {
                    console.log(e);
                });
            return deferred.promise;
        },

        getPlacements: function ($scope) {
            var placedcabinet = null;
            $scope.placements = [
                {
                    "ContainerId": "L2",
                    "CabinetControlId": "EDE8B883-F11B-4D73-BD11-5E19433D073Z",
                    "CabinetControlName": "Ctl1",
                    "CabinetType": "Relay"
                },
                {
                    "ContainerId": "R3",
                    "CabinetControlId": "2D62C4C8-13C8-4FCA-AF2C-495CE03DFA52",
                    "CabinetControlName": "Ctl2",
                    "CabinetType": "Motor"
                }
            ];

            for (var i = 0; i < $scope.placements.length; i++) {
                var cab = $scope.placements[i];
                for (var key in $scope.split_placements)
                    for (var x in $scope.split_placements[key]) {
                        if ($scope.split_placements[key][x].placementId === cab["ContainerId"]) {
                            console.log($scope.split_placements[key][x].placementId);
                            $scope.split_placements[key][x].cabpresent = true;
                            $scope.split_placements[key][x].cabinetId = cab["CabinetControlId"];
                            $scope.split_placements[key][x].cabinetName = cab["CabinetControlName"];
                            $scope.split_placements[key][x].cabinetType = cab["CabinetType"];
                            placedcabinet = {
                                'containerId': cab["ContainerId"],
                                'id': cab["CabinetControlId"],
                                'name': cab["CabinetControlName"],
                                'type': cab["CabinetType"]
                            };
                            // add the placed cabinet to the main
                            $scope.placedcabinets.push(placedcabinet);
                        }
                    }
            }
        }

    };
});