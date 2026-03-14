---
layout: default
title: Projects
description: 'Summary of programming work I have completed and published'
---

## Projects

Open-source projects developed for personal productivity, skills training, and reusable corporate tooling. Organized by technology.

View all on [GitHub](https://github.com/michaelconan){: target="_blank" }.

{% for topic in site.data.me.projects.topics %}
#### {{ topic }}

  {% for repository in site.github.public_repositories %}
    {% if repository.topics contains topic %}
      {% if repository.fork == false %} 

- [{{ repository.name }}]({{ repository.html_url }}) : {{ repository.description }}

      {% endif %}
    {% endif %}
  {% endfor %}
{% endfor %}
