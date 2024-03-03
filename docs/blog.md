---
layout: default
title: Blog
---

## Blog Posts
Sharing about travel, life and projects! Just for fun and on no defined schedule.

<div>
{% for category in site.categories %}
  <div>
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h3>{{ category_name }}</h3>
    <ul>
    {% for post in site.categories[category_name] %}
      <li>
        <h3><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}} | {{ post.date | date: "%d %b %Y" }}</a></h3>
        <p>{{post.excerpt}}</p>
      </li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>


### Subscribe

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfdIcwi-4-jpWPz4mZ2jnFxgVJ6rP2vkp-ZXjoBrSlkE03A9A/viewform?embedded=true" width="640" height="450" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
