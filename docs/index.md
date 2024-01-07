---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Clan Conan
---

## About Me
I'm Michael Conan - born and raised in Portland, Oregon and now living in Dublin, Ireland with my wife Marisa. 

I currently work as a technology consultant for PricewaterhouseCoopers (PwC) in the Dublin Data & Analytics practice and she works at Intel (remote) in IoT Business Operations.

<!-- May bring this in later
[Profile](/profile){: .my-button} 
-->

## Blog Posts
{% for post in site.posts %}
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  <p>{{ post.excerpt }}</p>
{% endfor %}

### Subscribe
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfdIcwi-4-jpWPz4mZ2jnFxgVJ6rP2vkp-ZXjoBrSlkE03A9A/viewform?embedded=true" width="640" height="850" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>