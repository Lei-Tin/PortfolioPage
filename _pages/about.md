---
layout: home
permalink: /
title: "Home"
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

{% include base_path %}

<section class="hero hero--minimal" aria-labelledby="hero-title">
  <div class="hero__copy" data-reveal>
    <p class="eyebrow">Hi, I'm Ray <span aria-hidden="true">✦</span></p>
    <h1 id="hero-title">I build useful language and AI systems.</h1>
    <nav class="hero__socials" aria-label="Find Ray online">
      <a href="https://github.com/{{ site.author.github }}">GitHub <span aria-hidden="true">↗</span></a>
      <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}">LinkedIn <span aria-hidden="true">↗</span></a>
      <a href="{{ site.author.googlescholar }}">Google Scholar <span aria-hidden="true">↗</span></a>
      <details class="hero__others">
        <summary>Others <span aria-hidden="true">+</span></summary>
        <div class="hero__others-menu">
          {% if site.author.email %}<a href="mailto:{{ site.author.email }}">Email <span aria-hidden="true">↗</span></a>{% endif %}
          {% if site.author.orcid %}<a href="{{ site.author.orcid }}">ORCID <span aria-hidden="true">↗</span></a>{% endif %}
          {% if site.author.steam %}<a href="https://steamcommunity.com/id/{{ site.author.steam }}">Steam <span aria-hidden="true">↗</span></a>{% endif %}
          {% if site.author.twitter %}<a href="https://twitter.com/{{ site.author.twitter }}">X <span aria-hidden="true">↗</span></a>{% endif %}
        </div>
      </details>
    </nav>
  </div>

  <figure class="hero__portrait" data-reveal>
    <img src="{{ base_path }}/images/ray.jpg" alt="Shou-Yi (Ray) Hung" width="560" height="700">
  </figure>
</section>

<section class="home-section home-section--news" aria-labelledby="news-title">
  <div class="section-motif motif--pulse" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="section-heading" data-reveal>
    <p class="section-kicker">Updates</p>
    <h2 id="news-title">Latest news</h2>
  </div>
  {% assign latest_news = site.data.news | sort: "date" | reverse %}
  <ol class="news-list">
    {% for item in latest_news limit: 5 %}
      <li data-reveal>
        <time datetime="{{ item.date | date: "%Y-%m-%d" }}">{{ item.date | date: "%b %Y" }}</time>
        <p>{{ item.text }}{% if item.url %} <a href="{{ base_path }}{{ item.url }}">Details <span aria-hidden="true">↗</span></a>{% endif %}</p>
      </li>
    {% endfor %}
  </ol>
</section>

<section class="home-section home-section--focus" aria-labelledby="focus-title">
  <div class="section-motif motif--dots" aria-hidden="true"><span></span><span></span><span></span></div>
  <div class="section-heading" data-reveal>
    <p class="section-kicker">Focus</p>
    <h2 id="focus-title">What I work on</h2>
  </div>
  <div class="focus-grid">
    <article class="focus-card" data-reveal>
      <span class="focus-card__number">01</span>
      <h3>Efficient intelligence</h3>
      <p>Model sparsity, quantization, training, and inference techniques that make capable models more practical.</p>
    </article>
    <article class="focus-card" data-reveal>
      <span class="focus-card__number">02</span>
      <h3>Language systems</h3>
      <p>Multilingual NLP, synthetic data, evaluation, and the behavior of modern language models.</p>
    </article>
    <article class="focus-card" data-reveal>
      <span class="focus-card__number">03</span>
      <h3>Applied engineering</h3>
      <p>Reliable software and useful AI products shaped by real constraints and clear interfaces.</p>
    </article>
  </div>
</section>

<section class="home-section journey" aria-labelledby="journey-title">
  <div class="section-motif motif--orbit" aria-hidden="true"></div>
  <div class="section-heading" data-reveal>
    <p class="section-kicker">Path</p>
    <h2 id="journey-title">Where I've been</h2>
  </div>
  <div class="journey__grid">
    <div class="journey__intro" data-reveal>
      <p>I grew up across Taiwan and China, studied computer science in Toronto, and am heading to Stanford for an MS in Computer Science.</p>
    </div>
    <ol class="timeline" data-reveal>
      <li><span class="timeline__year">2026</span><div><strong>Stanford University</strong><span>MS in Computer Science</span></div></li>
      <li><span class="timeline__year">2025</span><div><strong>Amazon Web Services</strong><span>Software Development Engineer Intern · EventBridge</span></div></li>
      <li><span class="timeline__year">2021–26</span><div><strong>University of Toronto</strong><span>BSc in Computer Science · NLP and systems research</span></div></li>
    </ol>
  </div>
</section>

<section class="home-section selected-work" aria-labelledby="work-title">
  <div class="section-motif motif--spark" aria-hidden="true">✦</div>
  <div class="section-heading section-heading--row" data-reveal>
    <div>
      <p class="section-kicker">Projects</p>
      <h2 id="work-title">Selected projects</h2>
    </div>
    <a class="text-link" href="{{ base_path }}/portfolio/">View all projects <span aria-hidden="true">→</span></a>
  </div>
  <div class="work-grid">
    {% assign featured_projects = site.portfolio | reverse %}
    {% for project in featured_projects limit: 3 %}
      <a class="work-card" href="{{ base_path }}{{ project.url }}" data-reveal>
        {% if project.header.teaser %}
          <div class="work-card__image">
            <img src="{{ base_path }}/images/{{ project.header.teaser }}" alt="" loading="lazy">
          </div>
        {% endif %}
        <div>
          <span class="work-card__index">0{{ forloop.index }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.excerpt | markdownify | strip_html | truncatewords: 20 }}</p>
        </div>
        <span class="work-card__arrow" aria-hidden="true">↗</span>
      </a>
    {% endfor %}
  </div>
</section>
