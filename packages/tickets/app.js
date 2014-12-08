'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tickets = new Module('tickets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tickets.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Tickets.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Tickets.menus.add({
    'roles': ['authenticated'],
    'title': 'Tickets',
    'link': 'tickets',
    path: 'main'
  });
  Tickets.menus.add({
    'roles': ['authenticated'],
    'title': 'List of Tickets',
    'link': 'All tickets',
    path: 'main/tickets'
  });
  Tickets.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Ticket',
    'link': 'Create ticket',
    path: 'main/tickets'
  });  

  //Tickets.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Tickets.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tickets.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tickets.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Tickets.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Tickets.aggregateAsset('css', 'tickets.css');

  return Tickets;
});
