# Userpilot Reporting Strategies for Paywall Integration

This guide outlines how to build reports in Userpilot to identify account-level upgrade opportunities among your logged-in users.

## 1. Top Account Upgrade Opportunities (Company Level)
**Goal**: Identify which client companies have the highest frequency of staff members hitting the paywall.
- **Event**: `paywall_hit`
- **Metric**: Unique Users (to see how many *people* in the company are affected).
- **Group By**: `organisation` or `company.name`.
- **Action**: Sort by the highest number of unique users. These are your "hottest" upsell candidates.

## 2. Content Demand by Business Area (Primary Section)
**Goal**: Understand which high-level service areas (e.g., Tax vs. HR) are driving the most friction.
- **Event**: `paywall_hit`
- **Metric**: Total Occurrences.
- **Group By**: `primary_section`.
- **Action**: Use this to determine which product teams should focus on "Free to Paid" conversion paths or where new content bundles should be created.

## 3. Specific Content Demand (NID & Title)
**Goal**: Understand which individual articles are most popular with your current subscribers.
- **Event**: `paywall_hit`
- **Metric**: Total Occurrences.
- **Group By**: `nid` or `title` (Page Title).
- **Action**: Identify content clusters (e.g., "Tax Law" articles) that are consistently triggering paywall hits for active clients.

## 4. High-Frequency Individual Leads
**Goal**: Identify specific "Power Users" within a client account who are outgrowing their plan.
- **Event**: `paywall_hit`
- **Metric**: Total Occurrences.
- **Group By**: `email`.
- **Action**: These users can be targeted for a trial of a higher tier or used as internal advocates for a company-wide upgrade.

## 4. Paywall Friction Velocity (Time-Series)
**Goal**: Measure if the "pain" of the paywall is increasing for your customer base over time.
- **Event**: `paywall_hit`
- **Chart Type**: Line Chart (Grouped by Day/Week).
- **Action**: Spikes in this chart after a major product launch or regulatory change indicate that your content has become more essential, making it a great time for a price or tier adjustment.

---

## Future Reporting (Once Anonymous Tracking is Enabled)
Once the "All Pages" initiation is enabled in GTM, you can also run:
- **Market Demand Report**: Filter by `is_logged_in: false` to see hits from prospects.
- **Conversion Pathing**: See which anonymous users eventually sign up after hitting a paywall.

## Summary of Event Properties for Filtering (v2):
| Property | Use Case |
| :--- | :--- |
| `primary_section` | Identifying high-level business areas (Tax, HR, Audit). |
| `breadcrumb` | Understanding the hierarchical location of the content. |
| `is_paywall` | Filtering for explicit paywall triggers. |
| `organisation` | Grouping users by their employer (Company). |
| `email` | Identifying the specific lead for contact. |
| `nid` | Mapping hits back to specific Drupal content ID. |
| `title` | Human-readable article name. |
| `url` | Identifying which site sections are most popular. |
| `is_logged_in` | Distinguishing between customers and leads. |
