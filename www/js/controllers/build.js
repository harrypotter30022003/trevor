angular.module('controller.build', [])

.controller('BuildCtrl', function($scope, $stateParams, $window, AccountsService, LoadingService, RequestService) {

    var buildId = $stateParams.buildid;
    $scope.pro = AccountsService.getPro();

    LoadingService.show();

    $scope.fetch = function() {

        RequestService
            .request("GET", '/builds/' + buildId, true)

            .then(function(data) {

                console.log("Success-Build with Id!");
                $scope.build = data.build;
                $scope.commit = data.commit;
                $scope.jobs = data.jobs;

                LoadingService.hide();

            }, function(data) {

                // Failure
                alert("Failure-Build.");
                console.log(data);
                LoadingService.hide();

            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

    };

    $scope.fetch();

    $scope.openCompare = function() {
        var compareWindow = $window.open($scope.commit.compare_url, '_system', '');
    };

});