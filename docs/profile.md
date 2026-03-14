---
layout: default
title: Profile
description: 'Overview of my work experience and skills'
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

## Skills and Technologies

**Languages**

<div class="skill-tags">
  <span class="skill-tag">Python</span>
  <span class="skill-tag">JavaScript</span>
  <span class="skill-tag">SQL</span>
  <span class="skill-tag">RPA</span>
</div>

**Cloud & Data Engineering**

<div class="skill-tags">
  <span class="skill-tag">Microsoft Azure</span>
  <span class="skill-tag">Google Cloud Platform</span>
  <span class="skill-tag">Databricks</span>
  <span class="skill-tag">Snowflake</span>
  <span class="skill-tag">SQL Server</span>
</div>

**Automation**

<div class="skill-tags">
  <span class="skill-tag">Google Apps Script</span>
  <span class="skill-tag">UiPath</span>
  <span class="skill-tag">Microsoft Power Automate</span>
</div>

**Analytics**

<div class="skill-tags">
  <span class="skill-tag">Alteryx</span>
  <span class="skill-tag">Microsoft Power BI</span>
  <span class="skill-tag">Tableau</span>
  <span class="skill-tag">Microsoft Excel</span>
</div>

## Profiles & Certifications

<div class="profile-icons">
{% for entry in site.data.me.profiles %}
  <a class="profile-icon" href="{{ entry.href }}{{ entry.id }}" title="{{ entry.title }}" target="_blank" rel="noopener">
    <i class="{{ entry.icon }}"></i>
  </a>
{% endfor %}
</div>
