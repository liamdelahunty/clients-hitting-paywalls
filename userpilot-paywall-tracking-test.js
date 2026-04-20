/**
 * Userpilot Paywall Tracking Script (ES5) - TEST VERSION
 * Implementation for Google Tag Manager (GTM)
 *
 * This version includes console.log statements for debugging.
 */
(function() {
  'use strict';
  
  console.log('Userpilot Paywall Tracker: Script initialized.');

  // Check if Drupal settings and the paywall flag are present
  if (typeof Drupal !== 'undefined' && Drupal.settings) {
    var settings = Drupal.settings;
    
    if (settings.is_paywall) {
      console.log('Userpilot Paywall Tracker: Paywall detected (Drupal.settings.is_paywall === true).');
      
      // Ensure userpilot is available on the window object
      var userpilot = window.userpilot;
      if (!userpilot) {
        console.warn('Userpilot Paywall Tracker: userpilot object not found on window.');
      }

      // Determine if the user is logged in based on the UID
      var uid = settings.cchonline ? settings.cchonline.uid : "0";
      var isLoggedIn = uid !== "0" && uid !== 0 && uid !== "";
      console.log('Userpilot Paywall Tracker: User logged in status:', isLoggedIn, '(UID: ' + uid + ')');

      // Prepare event properties
      var eventProperties = {
        nid: settings.cchonline ? settings.cchonline.nid : null,
        is_logged_in: isLoggedIn,
        url: window.location.href,
        title: document.title
      };

      // If logged in, add user-specific data to help with company reporting
      if (isLoggedIn) {
        eventProperties.uid = uid;
        eventProperties.email = settings.cchonline.email;
        
        // Extract organisation if available in the analytics settings
        if (settings.cchonline_user_analytics && settings.cchonline_user_analytics.organisation) {
          eventProperties.organisation = settings.cchonline_user_analytics.organisation;
        }
      }

      console.log('Userpilot Paywall Tracker: Event properties prepared:', eventProperties);

      // Trigger the Userpilot track event
      if (userpilot && typeof userpilot.track === 'function') {
        console.log('Userpilot Paywall Tracker: Sending event via userpilot.track()...');
        userpilot.track('paywall_hit', eventProperties);
      } else if (userpilot && typeof userpilot.push === 'function') {
        console.log('Userpilot Paywall Tracker: Sending event via userpilot.push()...');
        userpilot.push(['track', 'paywall_hit', eventProperties]);
      } else {
        console.error('Userpilot Paywall Tracker: Could not find a valid Userpilot tracking method (track or push).');
      }
    } else {
      console.log('Userpilot Paywall Tracker: No paywall detected on this page.');
    }
  } else {
    console.log('Userpilot Paywall Tracker: Drupal or Drupal.settings not found.');
  }
})();
