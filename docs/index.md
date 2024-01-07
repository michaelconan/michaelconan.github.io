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