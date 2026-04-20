/**
 * Userpilot Paywall Tracking Script (ES5)
 * GTM Tag 3: Record Paywall Hit
 * Trigger: Window Loaded (All Pages)
 */
(function() {
  'use strict';
  if (typeof Drupal !== 'undefined' && Drupal.settings) {
    var s = Drupal.settings;
    
    // Check for paywall flag (supporting different possible locations)
    var isPaywall = s.is_paywall || (s.cchonline_access && s.cchonline_access.is_paywall);

    if (isPaywall) {
      var userpilot = window.userpilot;
      
      // Support multiple subdomain data structures for properties
      var uid = (s.cchonline && s.cchonline.uid) || (s.croner_user_analytics && s.croner_user_analytics.uid) || "0";
      var nid = (s.cchonline && s.cchonline.nid) || (s.croner_content && s.croner_content.nid) || null;

      var eventProps = {
        nid: nid,
        url: window.location.href,
        is_logged_in: (uid !== "0" && uid !== 0 && uid !== "")
      };

      if (userpilot && typeof userpilot.track === 'function') {
        userpilot.track('paywall_hit', eventProps);
      } else if (userpilot && typeof userpilot.push === 'function') {
        userpilot.push(['track', 'paywall_hit', eventProps]);
      }
    }
  }
})();
