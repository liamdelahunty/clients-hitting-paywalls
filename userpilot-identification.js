/**
 * Userpilot Identification Script (ES5)
 * GTM Tag 2: Identify User
 * Trigger: Window Loaded (All Pages)
 * 
 * Note: This is now handled by the environment.
 */
(function() {
  'use strict';
  if (typeof Drupal !== 'undefined' && Drupal.settings) {
    var s = Drupal.settings;
    
    // Support multiple subdomain data structures
    var email = (s.cchonline && s.cchonline.email) || (s.croner_user_analytics && s.croner_user_analytics.email);
    var uid = (s.cchonline && s.cchonline.uid) || (s.croner_user_analytics && s.croner_user_analytics.uid) || "0";
    
    var org = 'Unknown';
    if (s.cchonline_user_analytics && s.cchonline_user_analytics.organisation) {
      org = s.cchonline_user_analytics.organisation;
    } else if (s.croner_user_analytics && s.croner_user_analytics.organisation) {
      org = s.croner_user_analytics.organisation;
    }

    // Only identify if the user is logged in (uid is not "0")
    if (uid !== "0" && uid !== 0 && email) {
      window.userpilot = window.userpilot || [];
      var cmd = ['identify', email, {
        email: email,
        uid: uid,
        company: { id: org, name: org }
      }];
      
      if (typeof window.userpilot.identify === 'function') {
        window.userpilot.identify(cmd[1], cmd[2]);
      } else {
        window.userpilot.push(cmd);
      }
    }
  }
})();
