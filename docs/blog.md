---
layout: default
title: Blog
description: 'Updates on our life, travels and work'
---

## Blog Posts

Sharing about travel, life and projects — just for fun and on no defined schedule.

Personal posts will be shared here, while work-specific articles will be posted on Substack. [Subscribe to either or both at the bottom of this page.](#subscribe){: target="_top" }

<div class="post-list">
{% for category in site.categories %}
  <div class="post-category">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h3>{{ category_name }}</h3>
    <ul>
    {% for post in site.categories[category_name] %}
      <li class="post-item">
        <a href="{{ site.baseurl }}{{ post.url }}" target="_top">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%d %b %Y" }}</span>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>

---

### Subscribe {#subscribe}

Subscribe to personal posts (via email):

<div class="iframe-wrapper">
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfdIcwi-4-jpWPz4mZ2jnFxgVJ6rP2vkp-ZXjoBrSlkE03A9A/viewform?embedded=true" width="640" height="450" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
</div>

Subscribe to work-specific blog (via Substack):

<div class="iframe-wrapper">
<iframe src="https://consultthedata.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
</div>
