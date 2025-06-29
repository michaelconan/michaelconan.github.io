---
# layout: post
title: '🔒 Digital Toolbox: Security'
description: 'Using technology and behaviours to improve the security of my digital footprint'
categories: tech
tags: security
---

I spend my days advising companies on their use of technology and data, and I have increasingly applied similar principles in my personal life.

Since I started this blog over 18 months ago, my posts have focused on our lives in Ireland and travel around Europe. Separately, I I have written about data and AI on my work blog, which you are welcome to check out on [Substack](https://consultthedata.substack.com/). This post will be different from anything I have shared before, focused instead on personal technology use and online security.

With a day job consulting for companies on technology and data, I try to find ways to implement the same advice in my own life. We advise businesses daily on using systems and information for two general purposes:

1. Protect their investments
2. Achieve their objectives

While the investments I protect and objectives I pursue in my personal life differ significantly from those of a business, many of the same technology principles apply.

## Personal Digital Security

In this post, I will focus on protection through personal digital security. This requires a combination of tools and behaviours to reduce vulnerability to severe risks like identity theft and nuisances like targeted advertising and spam.

For my personal digital security, I employ the following strategies:

1. Reduce my online presence and information
    1. Minimise the number of online accounts I hold
    2. Minimise the personal information stored in any account or provided to any service
2. Secure the online accounts I maintain
    1. Leverage secure authentication methods when available
    2. Maintain and regularly rotate credentials to reduce risk of exposure

## Active Management

As I was growing up, the internet was just getting started. I did not necessarily know better and certainly was not overly concerned with online security. Until recently—more recently than I would like to admit—I had no idea how many online accounts I had, but had no trouble accessing them because they all shared the same minimally secure password.

After years of security training at work and thankfully without any dramatic or costly wake-up call, I finally changed my approach. The turning point came when my employer encouraged me to use a password management application at work and offered a free personal account as a bonus.

Password managers are not perfect and do not fix everything. If not properly secured, they simply provide a single location for a bad actor to access all your accounts. When used properly, password managers can provide a central system to manage, monitor, and secure your digital exposure.

## Reduce Exposure

The most secure way to use the internet is not to use it at all. For most of us, this is not a realistic option, so we need to find the right balance of access to online services without unnecessary exposure of information that can be stolen and/or misused.

When reviewing my full inventory of online accounts (nearly 200 😳), my first consideration is whether I still need the account. Even when I might use the service in the future, if it is not within the next year, I generally prefer to deactivate or delete the account. In practice, I have discovered that *actually* removing my accounts in quite a pain and often requires contacting customer support—it is quite clear most services do not want you to leave!

While removing accounts is ideal, the reality is that I use most of my accounts regularly and find value in most of the online services I am registered with. The next best approach for me is to remove (or never provide) identifiable information whenever possible. Many services ask for a physical address, birthday, or contact information when it is unnecessary for my use of their service. When allowed, I opt not to provide this information. If required, I sometimes provide incorrect information, though I would advise caution in using this strategy. While I believe this is generally legal, providing false profile information may violate terms of the service, particularly if it has regulatory compliance implications (e.g., misrepresenting age or country of residence). Increasingly popular platforms and newer services are offering tools to generate masked or single-use emails, phone nubmers, and financial payment information to reduce exposure risk.

## Enforce Security

For the accounts that I maintain, particularly those of special sensitivity (e.g., financial accounts), I enable and enforce any additional security features available. When possible, I use Single Sign On (SSO) options rathher than creating a service-specific password. While this, like a password manager, can create a single point of failure, it provides the benefit of centralized control and allows me to focus on securing my primary SSO account. During one recent security purge, I ran through every authorised application against my core SSO accounts (and revoked many of them) - it was frightening to see how many services still had access to some of my information because I had clicked "sign in with" years ago.

The first thing I did after setting up my password manager was to onboard all of my accounts and change every password to something unique and complex. This was a good start, but with the prevalence of data breaches and increasing sophistication of bad actors, it is good security practice to regularly rotate these passwords as well. To support this process, I have added custom fields in my password manager to track rotation dates and use tags to determine the target cadence for rotation (more often for more sensitive accounts). As a bit of a programmer, I have even written a handful of [scripts](https://github.com/michaelconan/1password-review-scripts) to interact with my password manager and support the process of maintaining these fields, identifying items to rotate, and generating new passwords.

To mitigate the central failure point of a password manager and single sign-on account, I use multi-factor authentication (MFA) on nearly every account and—crucially—do *not* store the MFA credentials within the same password manager. Instead, I use separate authenticator applications or phone/email as a fallback. Segregating the various credentials and keys required to access accounts may add a small inconvenience during the login process, but should signficantly improve the security of the account itself.

In addition to securing my accounts, I use a VPN to improve security and privacy of web browsing, and have a few services (mostly work-sponsored) to monitor identity, credit, dark web exposure and more.

## Other Tools

I hope this review of my security toolbox and playbook has been helpful and intereesting. In a future post I will cover how I use other digital tools to help track and achieve goals in my personal life!
