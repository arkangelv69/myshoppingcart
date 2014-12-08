'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Categories = new Module('categories');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Categories.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Categories.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Categories.menus.add({
    'roles': ['authenticated'],
    'title': 'Categories',
    'link': 'categories',
    path: 'main'
  });
  Categories.menus.add({
    'roles': ['authenticated'],
    'title': 'List of Categories',
    'link': 'All categories',
    path: 'main/categories'
  });
  Categories.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Category',
    'link': 'Create category',
    path: 'main/categories'
  });  

  //Categories.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Categories.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Categories.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Categories.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Categories.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Categories.aggregateAsset('css', 'categories.css');

  return Categories;
});
