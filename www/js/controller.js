.controller('starter', function($scope, $cordovaFile) {
  document.addEventListener("deviceready", function () {
    console.log(cordova.file);
    console.log($cordovaFile);
},false);
})
