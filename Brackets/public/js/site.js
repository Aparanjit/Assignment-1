var app = angular.module("app", ["ngRoute"])
    .config(function ($routeProvider) {


        $routeProvider
            .when('/home', {
                templateUrl: "templates/home.html",
                controller: "stepController"
            })
            .when('/about', {
                templateUrl: "templates/about.html"
            })
            .when('/contact', {
                templateUrl: "templates/contact.html"
            })
            .otherwise({
                redirectTo: '/home'
            });
    })
    .controller("stepController", function ($scope) {
        var emptyProject = {
            type: "",
            name: "",
            date: "",
            process: {},
            management: {
                corporate: {},
                financeAccounting: {},
                marketingSales: {},
                humanResource: {},
                itServices: {},
                warehouseDistribution: {},
                customerSupport: {}
            }
        };
        $scope.project = angular.copy(emptyProject);
        $scope.preProjects = JSON.parse(localStorage.getItem("projects") || "[]");
        $scope.step = 0;
        $scope.completedSteps = [1];
        $scope.start = function () {
            if ($scope.project.type && $scope.project.name) {
                $scope.error = "";
                $scope.step = 1;
                $scope.isSaved = false;
            } else $scope.error = "Enter required fields!"
        };
        $scope.continue = function () {
            $scope.completedSteps.push($scope.step += 1);
            if ($scope.step > 4) $scope.finalReport = angular.toJson($scope.project, true);
        };
        $scope.back = function () {
            if ($scope.step > 1) $scope.step -= 1;
        };
        $scope.newProject = function () {
            $scope.project = angular.copy(emptyProject);
            $scope.step = 0;
            $scope.completedSteps = [1];
        };
    });
