'use strict';

angular.module('mean.upload').controller('MeanUploadControllerProduct', ['$scope', '$stateParams', 'Global', 'MeanUpload', 'Products',
  function($scope, $stateParams, Global, MeanUpload, Products) {
    $scope.global = Global;
    $scope.images = [];
    $scope.files = [];
    $scope.package = {
        name: 'mean-upload'
    };

    $scope.images = [];

    function initLoadImages() {
      /*Products.get({
        productId: $stateParams.productId
      }, function(product) {
        $scope.product = product;
        if($scope.product && $scope.product.images && $scope.product.images.length > 0) {
          $scope.images = $scope.product.images;
          angular.forEach($scope.images, function(file, key) {
            if(typeof(key) === 'number' ) {
              $scope.addSlide(file.src);
            }
          });
        }
      });*/
    }

    $scope.initLoadImages = initLoadImages;

    $scope.uploadFileCallback = function(file) {
      if (file.type.indexOf('image') !== -1){
          $scope.images.push(file);
          $scope.addSlide(file.src);
          $scope.product.images = $scope.images;
      }
      else{
          $scope.files.push(file);
      }
    };

    $scope.uploadFinished = function(files) {
      console.log(files);
    };

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function(url) {
//           var newWidth = 600 + slides.length;
       slides.push({
         image: url
       });
    };
  }
]);
