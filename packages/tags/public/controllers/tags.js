'use strict';

angular.module('mean.tags').controller('TagController', ['$scope', '$stateParams', '$location', 'Global', 'Tags',
  function($scope, $stateParams, $location, Global, Tags) {
    $scope.global = Global;

    $scope.hasAuthorization = function(tag) {
      if (!tag || !tag.user) return false;
      return $scope.global.isAdmin || tag.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var tag = new Tags({
          title: this.title,
          content: this.content
        });
        tag.$save(function(response) {
          $location.path('tags/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(tag) {
      if (tag) {
        tag.$remove(function(response) {
          for (var i in $scope.tags) {
            if ($scope.tags[i] === tag) {
              $scope.tags.splice(i, 1);
            }
          }
          $location.path('tags');
        });
      } else {
        $scope.tag.$remove(function(response) {
          $location.path('tags');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var tag = $scope.tag;
        if (!tag.updated) {
          tag.updated = [];
        }
        tag.updated.push(new Date().getTime());

        tag.$update(function() {
          $location.path('tags/' + tag._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Tags.query(function(tags) {
        $scope.tags = tags;
      });
    };

    $scope.findOne = function() {
      Tags.get({
        tagId: $stateParams.tagId
      }, function(tag) {
        $scope.tag = tag;
      });
    };
  }
]);
