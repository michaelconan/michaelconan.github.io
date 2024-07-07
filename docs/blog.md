---
layout: default
title: Blog
description: 'Updates on our life, travels and work'
---

## Blog Posts

Sharing about travel, life and projects! Just for fun and on no defined schedule.

Personal posts will be shared here, while work-specific articles will be posted on Substack. [Subscribe to either or both at the bottom of this page.](#subscribe){: target="_top" }

<div>
{% for category in site.categories %}
  <div>
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h3>{{ category_name }}</h3>
    <ul>
    {% for post in site.categories[category_name] %}
      <li>
        <h3>
          <a href="{{ site.baseurl }}{{ post.url }}" target="_top">
            {{post.title}} | {{ post.date | date: "%d %b %Y" }}
          </a>
        </h3>
        <p>{{post.excerpt}}</p>
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>


### Subscribe

Subscribe to personal posts (via email):
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfdIcwi-4-jpWPz4mZ2jnFxgVJ6rP2vkp-ZXjoBrSlkE03A9A/viewform?embedded=true" width="640" height="450" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

Subscribe to work-specific blog (via substack):
<iframe src="https://consultthedata.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
