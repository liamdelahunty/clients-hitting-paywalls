# Future Feature: Anonymous Paywall Tracking

This document outlines how to enable tracking for non-logged-in (anonymous) users in the future. The current scripts are already built to support this; only GTM configuration changes are required.

## Why track anonymous users?
It allows you to measure the total demand for your locked content from potential leads and prospects, not just existing customers.

## How to enable:

### 1. Change the GTM Initiation Trigger
In Google Tag Manager, change the Trigger for the **Userpilot Initiation Tag** (Tag 1):
- **Current**: Logged In Users
- **New**: **All Pages** (excluding Admin and Staging).

### 2. Update Identification Logic (Optional)
The `userpilot-identification.js` script will naturally skip anonymous users because it checks for a valid UID. No code change is needed.

### 3. Verify Event Data
Once enabled, anonymous `paywall_hit` events will appear in Userpilot with:
- `is_logged_in: false`
- `email: ""`
- `organisation: "Unknown"`

### 4. Reporting in Userpilot
You will be able to create a report filtered by `is_logged_in: false` to see "Prospect Content Demand."
