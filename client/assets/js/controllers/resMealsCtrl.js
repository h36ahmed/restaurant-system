var app = angular.module('lunchSociety');

var resMealsCtrl = function ($scope,commonService, mealService, modalService) {

  var restaurant = commonService.getRestaurantID();

  $scope.meals = [];
  $scope.defaultMealForm = {}

  mealService
    .getMeals({ restaurant_id: restaurant })
    .success(function(data, status, headers, config) {
      $scope.meals = data;
      $scope.defaultMealForm.meals = $scope.meals[0]
    })
    .error(function(data, status, headers, config) {
      // Handle login errors here
      $scope.message = 'Error: Something Went Wrong';
    });

  $scope.changeDefaultMeal = (meal) => {
    console.log('meal', meal)
  }

};

resMealsCtrl.inject = ['$scope','commonService', 'mealService', 'modalService'];

app.controller('resMealsCtrl', resMealsCtrl);
