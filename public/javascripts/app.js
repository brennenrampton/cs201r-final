angular.module('temple', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
      $scope.trips = [{
        title: "Stacy's Trip",
    	date: "Tuesday, April 12",
    	creator: "Definitely not Stacy",
   		description: "We are going to do baptisms for family names",
   		temple: "Payson Utah",
   		meeting: "Meeting on the West side of the Chapel at 5:00 PM",
   		max: 4,
   		attending: 0,
    	password: "Password123"
      }];
      $scope.create = function(trip) {
        return $http.post('/temple', trip).success(function(data) {
          $scope.trips.push(data);
          console.log(data);
        });
      };
      $scope.addTrip = function() {
        if ($scope.formContent === '') {
          return;
        }
        $scope.create({
        	title: $scope.formTitle,
    		date: $scope.formDate,
    		creator: $scope.formCreator,
    		description: $scope.formDescription,
    		temple: $scope.formTemple,
    		meeting: $scope.formMeeting,
    		max: $scope.formMax,
    		password: $scope.formPassword
        });
        //$scope.formContent = '';
        
        $scope.formTitle = '';
        $scope.formDate = '';
        $scope.formCreator = '';
        $scope.formDescription = '';
        $scope.formTemple = '';
        $scope.formMeeting = '';
        $scope.formMax = '';
        $scope.formPassword = '';
        
      };
      $scope.addPerson = function(trip) {
        return $http.put('/temple/' + trip._id + '/addPerson')
          .success(function(data) {
            console.log("add worked");
            if(trip.attending < trip.max || trip.max == 0)
            {
            	trip.attending += 1;
            }
            else
            {
            	window.alert("Sorry, the trip is already full");
            }
          });
      };
      $scope.incrementPeople = function(trip) {
        $scope.addPerson(trip);
      };
      $scope.getAll = function() {
        return $http.get('/temple').success(function(data) {
          angular.copy(data, $scope.trips);
        });
      };
      $scope.removeTrip = function(trip) {

      };
      $scope.getAll();
      
    }
  ]);
