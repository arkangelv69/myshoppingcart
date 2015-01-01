'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Inventories = new Module('inventories');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Inventories.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Inventories.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Inventories.menus.add({
    'roles': ['authenticated'],
    'title': 'Inventory',
    'link': 'inventories',
    path: 'main'
  });
  Inventories.menus.add({
    'roles': ['authenticated'],
    'title': 'Inventory of bought',
    'link': 'All inventories',
    path: 'main/inventories'
  });  

  //Inventories.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Inventories.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Inventories.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Inventories.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Inventories.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Inventories.aggregateAsset('css', 'inventories.css');

  return Inventories;
});
