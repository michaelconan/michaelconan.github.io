---
layout: default
title: Projects
---

## Projects
Programming projects developed for personal productivity, training, or generic corporate tasks.

{% for repository in site.github.public_repositories %}
  {% if repository.fork == false %} 
  - [{{ repository.name }}]({{ repository.html_url }}) :
  {{ repository.description }}
  {% endif %}
{% endfor %}
