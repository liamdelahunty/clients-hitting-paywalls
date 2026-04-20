# Userpilot Reporting Strategies for Paywall Integration

This guide outlines the specific reports you should create in the Userpilot dashboard to identify upsell opportunities and analyze content demand.

## 1. The "Upsell Candidate" Report (Account-Based)
**Goal**: Identify which companies have the highest number of staff members hitting the paywall.
- **Event**: `paywall_hit`
- **Metric**: Unique Users
- **Group By**: `company.name` (or `organisation`)
- **Action**: Use this as your primary list for the Sales team. Any company with high unique user counts is a prime candidate for a "site-wide" or "tier-up" subscription.

## 2. The "Hot Content" Report (Content Performance)
**Goal**: Identify which specific articles or content sections are driving the most paywall friction.
- **Event**: `paywall_hit`
- **Metric**: Total Occurrences
- **Group By**: `nid` (Node ID) or `url`
- **Action**: Use this to understand what your most valuable "premium" content is. This helps in marketing and determining what content should remain behind the paywall.

## 3. High-Intent Individual Leads
**Goal**: Identify specific users who are hitting the paywall repeatedly (indicating high frustration or high need).
- **Event**: `paywall_hit`
- **Metric**: Total Occurrences
- **Filter**: `is_logged_in: true`
- **Group By**: `email`
- **Action**: Identify "Power Users" who are limited by their current plan. These individuals can often become internal champions for an upgrade within their company.

## 4. Market Demand Analysis (Anonymous Users)
**Goal**: Measure how much external (non-customer) traffic is interested in your locked content.
- **Event**: `paywall_hit`
- **Metric**: Unique Users
- **Filter**: `is_logged_in: false`
- **Action**: This quantifies the "shadow demand." If anonymous hits are spiking, it indicates a successful external marketing campaign or a trending topic that you should be capturing via lead-gen forms.

## 5. Paywall Friction Trend (Weekly Velocity)
**Goal**: Determine if paywall hits are increasing over time.
- **Event**: `paywall_hit`
- **Chart Type**: Line Chart (Time Series)
- **Action**: If you see a steady increase in hits, it suggests your content is becoming more essential to users' daily workflows, strengthening the case for a price increase or tier restructuring.

## Summary of Event Properties for Filtering:
| Property | Use Case |
| :--- | :--- |
| `organisation` | Grouping users by their employer. |
| `email` | Identifying the specific lead for contact. |
| `nid` | Mapping hits back to specific Drupal content. |
| `is_logged_in` | Separating current customers from prospects. |
| `url` | Identifying which site sections (e.g., /news vs /tax) are most popular. |
