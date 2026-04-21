/**
 * Userpilot Paywall Tracking Script (ES5) - TEST VERSION (Cross-Subdomain Compatible)
 * Implementation for Google Tag Manager (GTM)
 *
 * This version includes console.log statements for debugging and supports
 * multiple subdomain data structures (CCHOnline and Croner App).
 */
(function() {
  'use strict';
  
  console.log('Userpilot Paywall Tracker (Test): Script initialised.');

  // 1. Basic Environment Check
  if (typeof Drupal === 'undefined' || !Drupal.settings) {
    console.warn('Userpilot Paywall Tracker (Test): Drupal or Drupal.settings not found.');
    return;
  }

  var s = Drupal.settings;
  
  // 2. Paywall Detection (Supporting multiple locations)
  var isPaywall = s.is_paywall || (s.cchonline_access && s.cchonline_access.is_paywall);
  
  if (!isPaywall) {
    console.log('Userpilot Paywall Tracker (Test): No paywall detected (checked s.is_paywall and s.cchonline_access.is_paywall).');
    return;
  }

  console.log('Userpilot Paywall Tracker (Test): Paywall detected!');

  // 3. User & Content Data Extraction (Supporting multiple subdomain structures)
  var email = (s.cchonline && s.cchonline.email) || (s.croner_user_analytics && s.croner_user_analytics.email) || "";
  var uid = (s.cchonline && s.cchonline.uid) || (s.croner_user_analytics && s.croner_user_analytics.uid) || "0";
  var nid = (s.cchonline && s.cchonline.nid) || (s.croner_content && s.croner_content.nid) || null;
  
  var org = 'Unknown';
  if (s.cchonline_user_analytics && s.cchonline_user_analytics.organisation) {
    org = s.cchonline_user_analytics.organisation;
  } else if (s.croner_user_analytics && s.croner_user_analytics.organisation) {
    org = s.croner_user_analytics.organisation;
  }

  var isLoggedIn = (uid !== "0" && uid !== 0 && uid !== "" && email !== "");
  
  console.log('Userpilot Paywall Tracker (Test): Extracted Data:', {
    detected_email: email,
    detected_uid: uid,
    detected_nid: nid,
    detected_org: org,
    is_logged_in: isLoggedIn
  });

  // 4. Prepare Event Properties
  var eventProps = {
    nid: nid,
    url: window.location.href,
    title: document.title,
    is_logged_in: isLoggedIn,
    email: email,
    organisation: org
  };

  console.log('Userpilot Paywall Tracker (Test): Event properties prepared:', eventProps);

  // 5. Trigger Tracking
  var userpilot = window.userpilot;
  if (!userpilot) {
    console.warn('Userpilot Paywall Tracker (Test): userpilot object not found on window. (Is the initialisation tag working?)');
  }

  if (userpilot && typeof userpilot.track === 'function') {
    console.log('Userpilot Paywall Tracker (Test): Sending event via userpilot.track()...');
    userpilot.track('paywall_hit', eventProps);
  } else if (userpilot && typeof userpilot.push === 'function') {
    console.log('Userpilot Paywall Tracker (Test): Sending event via userpilot.push()...');
    userpilot.push(['track', 'paywall_hit', eventProps]);
  } else {
    console.error('Userpilot Paywall Tracker (Test): No valid Userpilot tracking method (track/push) found.');
  }
})();
