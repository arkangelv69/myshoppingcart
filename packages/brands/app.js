'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Brands = new Module('brands');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Brands.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Brands.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Brands.menus.add({
    'roles': ['authenticated'],
    'title': 'Brands',
    'link': 'brands',
    path: 'main'
  });
  Brands.menus.add({
    'roles': ['authenticated'],
    'title': 'List of Brands',
    'link': 'All brands',
    path: 'main/brands'
  });
  Brands.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Brand',
    'link': 'Create brand',
    path: 'main/brands'
  });  

  //Brands.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Brands.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Brands.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Brands.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Brands.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Brands.aggregateAsset('css', 'brands.css');

  return Brands;
});
