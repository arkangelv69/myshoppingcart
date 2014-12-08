'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Markets = new Module('markets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Markets.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Markets.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Markets.menus.add({
    'roles': ['authenticated'],
    'title': 'Markets',
    'link': 'markets',
    path: 'main'
  });
  Markets.menus.add({
    'roles': ['authenticated'],
    'title': 'List of Markets',
    'link': 'All markets',
    path: 'main/markets'
  });
  Markets.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Market',
    'link': 'Create market',
    path: 'main/markets'
  });  

  //Markets.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Markets.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Markets.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Markets.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Markets.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Markets.aggregateAsset('css', 'markets.css');

  return Markets;
});
