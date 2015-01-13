'use strict';

angular.module('mean.products').controller('ProductController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'Categories', 'Brands',
  function($scope, $stateParams, $location, Global, Products, Categories, Brands) {
    $scope.global = Global;

    $scope.hasAuthorization = function(product) {
      if (!product || !product.user) return false;
      return $scope.global.isAdmin || product.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var product = new Products({
          name: this.name,
          description: this.description,
          images: this.images,
          categories: this.categories
        });
        product.$save(function(response) {
          $location.path('products/' + response._id);
        });

        this.name = '';
        this.description = '';
        this.images = [];
        this.categories = [];
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(product) {
      if (product) {
        product.$remove(function(response) {
          for (var i in $scope.products) {
            if ($scope.products[i] === product) {
              $scope.products.splice(i, 1);
            }
          }
          $location.path('products');
        });
      } else {
        $scope.product.$remove(function(response) {
          $location.path('products');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var product = $scope.product;
        if (!product.updated) {
          product.updated = [];
        }
        product.updated.push(new Date().getTime());

        product.$update(function() {
          $location.path('products/' + product._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Products.query(function(products) {
        $scope.products = products;
      });
    };

    $scope.findOne = function() {
      Products.get({
        productId: $stateParams.productId
      }, function(product) {
        $scope.product = product;
      });
    };

    //*********************start find metadat*****************************//
    $scope.listCategories = [];
    $scope.findCategory = function() {
      Categories.query(function(categories) {
        angular.forEach(categories, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listCategories.push(value);
          }
        });
      });
    };

    $scope.listBrands = [];
    $scope.findBrands = function() {
      Brands.query(function(brands) {
        angular.forEach(brands, function(value, key) {
          if(typeof(key) === 'number' ) {
            $scope.listBrands.push(value);
          }
        });
      });
    };
    $scope.listUnits = [
      {title:'€/und'},
      {title:'€/kg'},
      {title:'€/g'},
      {title:'€/m2'}
    ];
    //*********************end find metadat*****************************//


    /**********************for the images********************************/
    $scope.images = [];
    $scope.files = [];
    $scope.package = {
        name: 'mean-upload'
    };

    $scope.images = [];

    function initLoadImages() {
      Products.get({
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
      });
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

    $scope.deleteImageSlide = function(index,event) {
      event.preventDefault();
      if($scope.images) {
        $scope.images.splice(index, 1);
        $scope.slides.splice(index, 1);
        $scope.currentIndex = 1;
        $scope.product.images = $scope.images;
      }
    };
  }
]);
