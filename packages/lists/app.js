'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Lists = new Module('lists');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lists.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Lists.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Lists.menus.add({
    'roles': ['authenticated'],
    'title': 'List',
    'link': 'lists',
    path: 'main'
  });
  Lists.menus.add({
    'roles': ['authenticated'],
    'title': 'List of bought',
    'link': 'All lists',
    path: 'main/lists'
  });  

  //Lists.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Lists.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Lists.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Lists.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Lists.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Lists.aggregateAsset('css', 'lists.css');

  return Lists;
});
