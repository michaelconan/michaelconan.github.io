---
layout: default
title: Projects
---

## Projects
Programming projects developed for personal productivity, training, or generic corporate tasks.

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
