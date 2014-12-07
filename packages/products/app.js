'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Products = new Module('products');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Products.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Products.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Products.menus.add({
    'roles': ['authenticated'],
    'title': 'Products',
    'link': 'products',
    path: 'main'
  });
  Products.menus.add({
    'roles': ['authenticated'],
    'title': 'List of Products',
    'link': 'All products',
    path: 'main/products'
  });
  Products.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Product',
    'link': 'Create product',
    path: 'main/products'
  });
  Products.menus.add({
    'roles': ['authenticated'],
    'title': 'List Categories for Products',
    'link': 'List cactegories product',
    path: 'main/products'
  });
  Products.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Category Product',
    'link': 'Create cactegory product',
    path: 'main/products'
  });

  //Products.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Products.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Products.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Products.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Products.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Products.aggregateAsset('css', 'products.css');

  return Products;
});
