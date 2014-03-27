'using strict';

describe('Controller: DnDPocController', function () {

    // load the controller's module
    beforeEach(module('dndApp'));

    var DndPocController, scope, DndPocRepositoryMock;

    beforeEach(function () {
        DndPocRepositoryMock = {
            getPlacements: function () {

            },
            savePlacements: function () {

            }
        };
    });

    // initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.orderId = "123";

        // define the controller
        DndPocController = $controller('DnDPocController', {
            $scope: scope, dndPocRepository: DndPocRepositoryMock
        });

    }));

    it('should attach a list of cabinets to the scope', function () {
        expect(scope.cabinets.length).toBe(3);
    });

    it('should have split placements with two members', function () {
        expect(scope.split_placements.length).toBe(2);
    });

    it('should have split placements each member to have members', function () {
        expect(scope.split_placements[0].length).toBe(4);
        // dump(scope.split_placements[1][2].placementId);
        expect(scope.split_placements[1].length).toBe(4);
    });

    it('should call getPlacements DndPocRepository method', function () {
        spyOn(DndPocRepositoryMock, 'getPlacements');
        scope.refresh();
        expect(DndPocRepositoryMock.getPlacements).toHaveBeenCalled();
    });
});

/* THIS Directive can be enabled when a backend call is functional
describe('Repository: DndPocRepository', function () {
    var repo, $httpBackend, $scope, $rootScope, DndPocController;

    beforeEach(module('dndApp'));

    beforeEach(inject(function ($injector, $controller) {

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $scope.orderId = '123';

        // inject the mock for the http backend
        inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        });

        // define the controller
        DndPocController = $controller('DnDPocController', {
            $scope: $scope
        });

        // inject the service to be tested
        inject(function (dndPocRepository) {
            repo = dndPocRepository;
        });
    }));

    it("should make an GET AJAX call to api/DragDropPoc", function () {
        $httpBackend.whenGET("api/DragDropPoc?orderId=" + $scope.orderId).respond([{
            ContainerId: "L2",
            Id: "21EFE842-D17F-4908-B07F-A018F06FE016",
            Name: "Ctrl1",
            Type: "Motor"
        }, {}]);

        repo.getPlacements($scope); // stick one cabinet in
        $httpBackend.flush();

       // expect($scope.placedcabinets.length).toEqual(1);
    });

    it("should make a POST ajax call to /api/DragDropPoc with a downed service", function () {

        $httpBackend.expectPOST("/api/DragDropPoc").respond(500, '');

        var placedcabinets = [];
        var placedcabinet = {
            OrderId: "123",
            ContainerId: "L2",
            Id: "21EFE842-D17F-4908-B07F-A018F06FE016",
            Name: "Ctrl1",
            Type: "Motor"
        };
        placedcabinets.push(placedcabinet);

        var promise = repo.savePlacements(placedcabinets),
            errobj;

        promise.then(function () {
            // simple post - all is good
        }, function (e) {
            errobj = e;
        });

        $httpBackend.flush();
        //dump(errobj);
      //  expect(errobj).toBe('Server Error!');
    });

});
*/

describe('Directive: DndPocDirective', function () {

    beforeEach(module('dndApp'));
    // beforeEach(angular.mock.module('templates'));
    beforeEach(module('app/assets/templates/_PlacementContainer.html'));

    var element, template, label;
    var $compile, $scope;

    var placement = { 'placementId': 'L2', 'cabinetId': '', 'cabinetName': '', 'cabinetType': '', 'cabpresent': false };

    beforeEach(inject(function (_$compile_, $rootScope, $templateCache) {

        $scope = $rootScope.$new();

        // ground-breaking
        // http://www.portlandwebworks.com/blog/testing-angularjs-directives-handling-external-templates
        template = $templateCache.get('app/assets/templates/_PlacementContainer.html');
        $templateCache.put('app/assets/templates/_PlacementContainer.html', template);

        $compile = _$compile_;

        // $compile(template)($scope);

        // $scope.$digest();
    }));

    it("should render the label as passed in by the $scope", inject(function() {
        $scope.placement = placement;
        $scope.placement.placementId = "L3";

        element = $compile(template)($scope);

        $scope.$digest();

        label = element[0];
        dump(label);
        expect(element.length).toEqual(3);
        // expect().toContain("L3"); not quite working

    }));
});