# GTM Implementation Guide: Userpilot Paywall Tracking

To generate reports showing which companies are hitting their subscription limits, follow these steps in Google Tag Manager.

### Step 1: Create the Initiation Tag (Load Library)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-initiation.js`
- **Trigger**: "All Pages"
- **Purpose**: Downloads the Userpilot SDK to the browser.

### Step 2: Create the Identification Tag (Who is the user?)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-identification.js`
- **Trigger**: "Window Loaded"
- **Tag Sequencing**: Set this to fire **after** Step 1.
- **Purpose**: This is **critical** for your goal. It tells Userpilot the user's Email and Company (Organisation). Without this, your "Paywall Hit" report will only show anonymous data, and you won't know which company to contact for an upgrade.

### Step 3: Create the Paywall Tracking Tag (Record the limit hit)
- **Tag Type**: Custom HTML
- **HTML**: Copy contents of `userpilot-paywall-tracking.js`
- **Trigger**: "Window Loaded"
- **Tag Sequencing**: Set this to fire **after** Step 2.
- **Purpose**: Records a `paywall_hit` event whenever `is_paywall` is true.

---

### How to generate the report in Userpilot:
1. Log in to Userpilot.
2. Go to **Analytics** > **Events**.
3. Filter by Event Name: `paywall_hit`.
4. Group by: `company.id` or `company.name`.
5. This will show you exactly which companies have the highest number of users hitting the paywall.
