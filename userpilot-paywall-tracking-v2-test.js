/**
 * Userpilot Paywall Tracking Script v2 (Test Mode)
 * GTM Tag 3: Record Paywall Hit
 * Trigger: Window Loaded (All Pages)
 */
(function() {
  'use strict';
  
  console.log('Userpilot Paywall Tracker (v2-Test): Script initialised.');

  if (typeof Drupal === 'undefined' || !Drupal.settings) {
    console.warn('Userpilot Paywall Tracker (v2-Test): Drupal or Drupal.settings not found.');
    return;
  }

  var s = Drupal.settings;
  
  // 1. Paywall Detection
  var isPaywall = !!(s.is_paywall || (s.cchonline_access && s.cchonline_access.is_paywall));

  if (!isPaywall) {
    console.log('Userpilot Paywall Tracker (v2-Test): No paywall detected. (checked s.is_paywall and s.cchonline_access.is_paywall).');
    return;
  }

  console.log('Userpilot Paywall Tracker (v2-Test): Paywall detected!');

  var userpilot = window.userpilot;
  if (!userpilot) {
    console.warn('Userpilot Paywall Tracker (v2-Test): userpilot object not found on window.');
  }

  // 2. Data Extraction
  var email = (s.cchonline && s.cchonline.email) || (s.croner_user_analytics && s.croner_user_analytics.email) || "";
  var uid = (s.cchonline && s.cchonline.uid) || (s.croner_user_analytics && s.croner_user_analytics.uid) || "0";
  var nid = (s.cchonline && s.cchonline.nid) || (s.croner_content && s.croner_content.nid) || null;
  
  // Enhanced Metadata: Section & Breadcrumb
  var section = (s.croner_content && s.croner_content.section) || 
                (s.cchonline && s.cchonline.section) || 
                (s.cchonline_practice_areas && s.cchonline_practice_areas.pa_titles && s.cchonline_practice_areas.pa_titles[0]) || 
                "Unknown";
  
  var breadcrumb = (s.croner_content && s.croner_content.breadcrumb) || 
                   (s.cchonline && s.cchonline.breadcrumb) || "";
  
  // DOM Fallback
  if (!breadcrumb) {
    var bcElem = document.querySelector('.breadcrumb');
    if (bcElem) {
      breadcrumb = bcElem.innerText.replace(/\s+/g, ' ').trim();
      console.log('Userpilot Paywall Tracker (v2-Test): Breadcrumb found via DOM fallback:', breadcrumb);
    }
  }

  var org = 'Unknown';
  if (s.cchonline_user_analytics && s.cchonline_user_analytics.organisation) {
    org = s.cchonline_user_analytics.organisation;
  } else if (s.croner_user_analytics && s.croner_user_analytics.organisation) {
    org = s.croner_user_analytics.organisation;
  }

  var isLoggedIn = (uid !== "0" && uid !== 0 && uid !== "" && email !== "");

  var eventProps = {
    nid: nid,
    url: window.location.href,
    title: document.title,
    is_logged_in: isLoggedIn,
    is_paywall: isPaywall,
    email: email,
    organisation: org,
    primary_section: section,
    breadcrumb: breadcrumb
  };

  console.log('Userpilot Paywall Tracker (v2-Test): Final event properties:', eventProps);

  // 3. Execution
  if (userpilot && typeof userpilot.track === 'function') {
    console.log('Userpilot Paywall Tracker (v2-Test): Sending event via userpilot.track()...');
    userpilot.track('paywall_hit', eventProps);
  } else if (userpilot && typeof userpilot.push === 'function') {
    console.log('Userpilot Paywall Tracker (v2-Test): Sending event via userpilot.push()...');
    userpilot.push(['track', 'paywall_hit', eventProps]);
  } else {
    console.error('Userpilot Paywall Tracker (v2-Test): No valid Userpilot tracking method found.');
  }
})();
