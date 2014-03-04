'use strict';

cmnCabApp.factory('dndPocRepository', function ($http, $q) {
    return {
        getCabinet: function($scope) {
            $scope.$emit('LOAD');
            var deferred = $q.defer();
            var rootSeg = getRootUrlAppBpaf();
            $http.get(rootSeg + '/api/DragDropCabinets').success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        },

        save: function(dragdrop) {
            var deferred = $q.defer();
            var rootSeg = getRootUrlAppBpaf();
            $http.post(rootSeg + '/CmnCab/Home/DragDropSave',
            { key: dragdrop.userName + "_CmnCabRepo", dragdropData: dragdrop.data }).success(function() {
                deferred.resolve();
            }).error(function(e) {
                console.log(e);
            });
            return deferred.promise;
        },

        getPlacements: function($scope) {
            var rootSeg = getRootUrlBpaf();
            $http.get(rootSeg + 'api/DragDropPoc?orderId=123').then(function(result) {
                $scope.placements = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    var cab = result.data[i];
                    $scope.$broadcast("placement.received", cab["ContainerId"], cab["CabinetControlId"],
                        cab["CabinetControlName"], "itemType");
                }
            });
        }

};
});