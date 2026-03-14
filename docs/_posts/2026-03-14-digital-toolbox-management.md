---
# layout: post
title: '💻 Digital Toolbox: Management'
description: "How I use Jira, HubSpot, and Notion to stay organised across work and life — and what I'm building on top of them."
categories: tech
tags: tech agents
---

As I grow in life and career, I have come to appreciate the value of productivity and management applications — not just at work, but across every area of life.

As a consultant, I work across multiple clients, frequently needing to quickly learn and adapt to their curated portfolio of technologies. While some tools have clear advantages over others, in most cases it is knowledge and experience that determine how much value you actually get out of any given one. By adopting a suite of these tools for my own personal use, I aim to improve organisation, increase productivity, and become a more effective user of technology in both work and life.

## Management Toolbox

My set of tools has grown and shifted over time, and has settled — for now — on the following selection.

### Personal Project Management

For years, my tasks and to-dos were scattered across a mix of digital and physical mediums. They would often get lost or left behind, and I struggled to consistently prioritise and schedule work over time.

In consulting programmes, we typically organise work into task hierarchies and execute them across sprint cycles. While I rarely dedicate enough personal time to my own projects to run strict 1–2 week sprints, I have adopted a monthly rhythm for tracking and completing recurring, seasonal, and ad-hoc tasks.

For more collaborative and structured project tracking, the tools I have used across various roles span a few categories:

- **Spreadsheets:** A natural starting point, but not my preference. There is always a trade-off between keeping things simple in Excel and leveraging the features of a purpose-built application — a balance worth considering carefully. Ultimately, the most important factor is not the tool itself, but how you use it.
- **Structured List Applications:** There are many lightweight options for structured lists available within tools like SharePoint and Slack. More dedicated options in this category — such as Asana or Microsoft Planner — can strike a useful balance: enough structure and reporting functionality to be meaningful, without the overhead of a full project suite.
- **Full-Featured Project Suites:** For larger, more complex projects, a proper project suite makes a significant difference. I have the most experience with Azure Boards and GitHub Projects, both of which are particularly well-suited to technical and software work. My current employer has also developed their own agile project tool, designed around our consulting methodologies and integrated across our internal applications.

For my own personal projects, I chose Jira Cloud — a widely-used tool with a generous free tier and a functional mobile app. I break work down into stories, tasks, and subtasks, linking them to epics that support my broader goals for the year.

### Community Relationship Management

In work and life, maintaining relationships can become genuinely challenging, and many naturally ebb and flow with distance and time. Businesses address this with customer relationships through CRM systems, used to track contacts, companies, deals, meetings, and more. Reflecting on this — particularly after moving a significant distance from most of my lifelong friends and family — I realised a similar approach could help me be more intentional about staying connected.

HubSpot offers a free tier, and I began adapting its features for personal use:

- **Contacts:** As a first step, I imported a number of my personal and professional connections using Google Contact sync with a tag filter, then mapped them to "companies" based on the community circles I maintain — setting goals around how frequently I want to connect with individuals in each.
- **Engagements:** The feature I use most is engagement logging — recording meetings, calls, and other interactions. This helps me track progress against my connection targets and maintain notes on conversations to follow up on or add to my prayer list.
- **Tickets and Deals:** I have also adapted some of HubSpot's other functionality for personal use: tickets to track ongoing situations where I am supporting someone, and deals to manage planning around joint travel and upcoming visits with friends and family.

It can feel a little clinical to track personal relationships in a CRM. In practice, though, I have found it genuinely helpful for being more intentional and staying meaningfully connected with those I care about.

### Knowledge, Habits, and… Anything

Like my tasks, I have historically kept notes and documents scattered across many different systems, most of which offered limited structure or discoverability.

Over the past couple of years, I have adopted Notion — and found it to be an excellent blend of document repository, structured data store, and general knowledge base.

I currently use it in a few key ways:

- **Habit Tracking:** One of my first Notion use cases was building databases to track daily, weekly, and monthly habits. Much of the native automation is limited or paywalled, but the API is well-documented and easy to work with.
- **Knowledge Management:** Keeping track of technology, finances, training, and ongoing learning has often been a challenge, leading to note sprawl across various apps. Notion's page hierarchy has allowed me to centralise and organise this information in a way that is easy to search and navigate.
- **Structured Lists:** Notion's databases are flexible and extensible. I use them to capture trips and related bookings, training courses, recurring purchases, and even the blogs I write. They are easy to sort and filter for regular use, though built-in reporting is somewhat limited — more on that shortly.

The flexibility and structure of Notion as a workspace tool has made it remarkably useful across many areas of my life. The team has also been expanding the product to include Calendar and Email features, which are still early in development but already offer a number of helpful touches.

## Connected Tools

Much of the value in adopting modern cloud-based tools — particularly given my focus on data and AI — exists not within the applications themselves, but in the analytics and AI layer built on top of them.

### Integration and Reporting

Over the past year or so, I have been building a [personal data warehouse](https://github.com/michaelconan/personal-reporting-pipelines) on top of this tool suite using a combination of open-source and affordable cloud technologies. I am currently refining the process of ingesting data from each tool's API into Google BigQuery using dlt (data load tool), then transforming it with dbt (data build tool). Once that is in place, I plan to build a Streamlit dashboard to visualise the data and track progress against my personal goals.

### AI Agents

Beyond reporting, I have found that modern AI applications — like Perplexity and Claude — can integrate directly with these tools to automate steps in my workflow. A few recent examples:

- Adding booking details to Notion databases from email confirmations
- Updating HubSpot deal status and notes
- Adding Jira tasks to an active sprint

Most of what I have delegated to agents so far has been relatively small in scope, but a quick voice prompt has consistently saved a meaningful amount of manual clicking and typing. I plan to experiment further with more complex, multi-step workflows across applications.

## Reflections

In an increasingly digital world, it is easy to get swept up in the ever-growing list of tools promising to save you time and simplify your life. My recommendation is to explore and adopt them — but to do so deliberately. Take the time to define clearly how you intend to use each tool and what benefit you expect to get from it. The right tool, used with purpose, can make a real difference; the wrong one, adopted without intention, just adds noise.
