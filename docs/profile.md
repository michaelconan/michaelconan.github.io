---
layout: default
title: Profile
---

## Background

After studying accounting and finance, I started my career in the audit practice at PwC. After 3 years, I transferred to consulting specializing in automation and analytics.

## Experience

During my years in consulting, I have worked on projects for large clients delivering services across the automation and analytics spectrum.

#### Machine Learning

Before the current popularity of AI, I led teams to deliver solutions for information extraction, intelligent forecasting, and anomaly detection using Python on Databricks and in custom microservices.

#### Data Engineering

The largest projects I have worked on have been cloud data platform implementations and developments, primarily leveraging Microsoft Azure and Snowflake.

#### Automation

Earlier in my consulting career I delivered many projects leveraging process automation technologies to streamline processes, primarily in the finance space.

### Profile Links

Check out my other profiles and certifications:

{% for entry in site.data.me.profiles %}
  <div class="profile-icon">
  <a href="{{ entry.href }}{{ entry.id }}" title="{{ entry.title }}">
    <i class="{{ entry.icon }}"></i>
  </a>
  </div>
{% endfor %}

### Skills and Technologies

An quick list of some things I've learned through my career and education.

- Languages
  - Python
  - JavaScript
  - SQL
  - Robotic Process Automation (RPA)
- Technologies
  - Cloud Computing
    - Microsoft Azure
    - Google Cloud Platform
  - Data Engineering
    - Databricks
    - Snowflake
    - SQL Server
  - Automation
    - Google Apps Script
    - UiPath
    - Microsoft Power Automate
  - Analytics
    - Alteryx
    - Microsoft Power BI
    - Tableau
    - Microsoft Excel
