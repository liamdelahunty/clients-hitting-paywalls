# GTM Implementation Guide: Userpilot Paywall Tracking

To generate reports showing which companies are hitting their subscription limits, follow these steps in Google Tag Manager.

### Step 1: Create the Initiation Tag (Load Library)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-initiation.js`
- **Trigger**: **Logged In Users** (Production). 
- **Exclusions**: Admin users and Staging/Dev environments.

### Step 2: Create the Identification Tag (Who is the user?)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-identification.js`
- **Trigger**: **Window Loaded**.
- **Tag Sequencing**: Set this to fire **after** Step 1.

### Step 3: Create the Paywall Tracking Tag (Record the limit hit)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-paywall-tracking-v2.js` (or `userpilot-paywall-tracking-v2-test.js` for testing).
- **Trigger**: **Window Loaded**.
- **Tag Sequencing**: Set this to fire **after** Step 1.

---

## Event Properties Reference (v2)

The `paywall_hit` event now includes the following properties for granular reporting:

| Property | Description |
| :--- | :--- |
| `primary_section` | High-level area (e.g., Tax, HR, Audit) derived from Drupal settings. |
| `breadcrumb` | The page's navigation path (supports DOM fallback). |
| `is_paywall` | Explicit boolean flag for easy filtering. |
| `nid` | Drupal Content ID for mapping to specific articles. |
| `organisation` | The user's company (for account-level reports). |
| `is_logged_in` | Boolean to distinguish between leads and customers. |

---

## Tag Sequencing in GTM
To ensure the scripts work correctly and don't fire before the Userpilot library is ready, you must configure **Tag Sequencing** for the Identification and Tracking tags:

1.  Open the **Identification Tag** (Step 2).
2.  Expand **Advanced Settings** > **Tag Sequencing**.
3.  Check the box: **"Fire a tag before [Identification Tag] fires"**.
4.  Select the **Initiation Tag** (Step 1) as the Setup Tag.
5.  Repeat these steps for the **Paywall Tracking Tag** (Step 3).

*This ensures the Userpilot SDK is always requested and available before any identification or tracking commands are issued.*

---

### How to generate the report in Userpilot:
1. Log in to Userpilot.
2. Go to **Analytics** > **Events**.
3. Filter by Event Name: `paywall_hit`.
4. Group by: `company.id` or `company.name`.
5. This will show you exactly which companies have the highest number of users hitting the paywall.
