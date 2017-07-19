var app = angular.module('lunchSociety');

var resMealsCtrl = function ($scope,commonService, mealService, modalService) {

  var restaurant = commonService.getRestaurantID();

  $scope.meals = [];
  $scope.meal = {}

  mealService
    .getMeals({ restaurant_id: restaurant, changeDefaultMeal: true })
    .success(function(data, status, headers, config) {
      $scope.meals = data;
      $scope.meal = $scope.meals[0]
    })
    .error(function(data, status, headers, config) {
      // Handle login errors here
      $scope.message = 'Error: Something Went Wrong';
    });

  $scope.changeDefaultMeal = (meal) => {
    let promise = modalService.open('status', {})

    mealService
      .editMeal({
        id: meal.id,
        default_meal: true,
        restaurant_id: restaurant,
    })
    .success((data, status, headers, config) => {
      modalService.resolve()

      promise.then(function handleResolve(response) {
        promise = modalService.open(
          'alert', {
            message: `Your new default meal is now ${data.name}`
          }
        )
        promise.then(function handleResolve(response) {
          $scope.meal = data
        }, function handleReject(error) {})
      }, function handleReject(error) {
        console.log('Why is it rejected?')
      })
    })
  }

};

resMealsCtrl.inject = ['$scope','commonService', 'mealService', 'modalService'];

app.controller('resMealsCtrl', resMealsCtrl);
