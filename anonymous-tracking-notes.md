# Anonymous vs. Identified Tracking in Userpilot

This document explains how the current implementation handles different types of users and how the data is grouped in reports.

## 1. Anonymous Users
Even if a user is not logged in, Userpilot tracks them using a persistent browser cookie.
- **Trigger**: The `paywall_hit` event fires regardless of login status.
- **Identification**: Userpilot assigns an internal ID (e.g., `user_abc123`) to the cookie.
- **Reporting**: You can filter reports using the `is_logged_in: false` property to see hits from non-logged-in users.

## 2. Grouping & Uniqueness
Userpilot automatically manages the difference between "Total Events" and "Unique Users."
- **Unique Users**: If the same anonymous user hits the paywall 10 times over 3 days, Userpilot identifies them as **one unique user** (as long as they don't clear their cookies).
- **Total Hits**: You can also report on the total number of hits to see the absolute frequency of paywall encounters.

## 3. Comparison Summary

| User Type | Identification Method | Grouping Logic | Reporting Value |
| :--- | :--- | :--- | :--- |
| **Logged In** | Email Address | Linked across devices/sessions via Email. | High-value leads; group by Company for upgrade reports. |
| **Anonymous** | Browser Cookie | Linked to the specific browser. | General demand; helps identify "pre-login" friction. |

## 4. Analysis Recommendation
When generating your "Subscription Limit" report in the Userpilot Dashboard:
1. **Focus on Identified Users**: Group by `company.name` to see which existing clients are most frequently hitting the limit.
2. **Review High Frequency**: Sort by "Unique Users" vs "Total Hits" to distinguish between one frustrated staff member and a widespread company-wide issue.
