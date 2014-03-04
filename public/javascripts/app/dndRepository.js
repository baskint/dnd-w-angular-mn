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

        save: function (dragdrop) {
            var deferred = $q.defer();
            var rootSeg = getRootUrlAppBpaf();
            $http.post(rootSeg + '/CmnCab/Home/DragDropSave',
                { key: dragdrop.userName + "_CmnCabRepo", dragdropData: dragdrop.data }).success(function () {
                    deferred.resolve();
                }).error(function (e) {
                    console.log(e);
                });
            return deferred.promise;
        },

        getPlacements: function ($scope) {

            $scope.placements = [
                {"ContainerId": "L2", "CabinetControlId": "EDE8B883-F11B-4D73-BD11-5E19433D073F", "CabinetControlName": "Control1"},
                {"ContainerId": "R3", "CabinetControlId": "2D62C4C8-13C8-4FCA-AF2C-495CE03DFA52", "CabinetControlName": "Control2"}
            ];

            for (var i = 0; i < $scope.placements.length; i++) {
                var cab = $scope.placements[i];
                $scope.$broadcast("placement.received", cab["ContainerId"], cab["CabinetControlId"],
                    cab["CabinetControlName"], "itemType");

            }
//            var rootSeg = getRootUrlAppBpaf();
//            $http.get(rootSeg + 'api/DragDropPoc?orderId=123').then(function(result) {
//                $scope.placements = result.data;
//                for (var i = 0; i < result.data.length; i++) {
//                    var cab = result.data[i];
//                    $scope.$broadcast("placement.received", cab["ContainerId"], cab["CabinetControlId"],
//                        cab["CabinetControlName"], "itemType");
//                }
//            });
        }

    };
});