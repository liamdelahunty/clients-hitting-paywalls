/**
 * Userpilot Initiation Script (ES5)
 * GTM Tag 1: Load Library
 * Trigger: All Pages
 * 
 * Note: Initialisation is now handled by the environment.
 */
(function() {
  'use strict';
  window.userpilotSettings = { token: 'NX-fa1f3a40' };
  var script = document.createElement('script');
  script.src = 'https://js.userpilot.io/sdk/latest.js';
  script.async = true;
  document.head.appendChild(script);
})();
