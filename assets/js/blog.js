(function () {
  'use strict';

  var blog = document.querySelector('[data-blog]');
  if (!blog) return;

  var controls = blog.querySelector('[data-blog-controls]');
  if (!controls) return;

  var filters = Array.from(blog.querySelectorAll('[data-blog-filter]'));
  var search = blog.querySelector('[data-blog-search]');
  var sort = blog.querySelector('[data-blog-sort]');
  var count = blog.querySelector('[data-blog-count]');
  var clear = blog.querySelector('[data-blog-clear]');
  var years = blog.querySelector('[data-blog-years]');
  var groups = Array.from(years.querySelectorAll('[data-blog-year]'));
  var noResults = blog.querySelector('[data-blog-no-results]');
  var posts = Array.from(blog.querySelectorAll('[data-blog-post]')).map(function (post) {
    return {
      element: post,
      tags: JSON.parse(post.getAttribute('data-blog-tags')),
      date: Number(post.getAttribute('data-blog-date')),
      text: post.textContent.toLocaleLowerCase()
    };
  });
  var selectedTag = '';

  function postCount(value) {
    return value + (value === 1 ? ' post' : ' posts');
  }

  function update(revealMatches) {
    var query = search.value.trim().toLocaleLowerCase();
    var terms = query.split(/\s+/).filter(Boolean);
    var direction = sort.value === 'oldest' ? 1 : -1;
    var total = 0;

    posts.forEach(function (post) {
      var matches = (!selectedTag || post.tags.indexOf(selectedTag) !== -1) && terms.every(function (term) {
        return post.text.indexOf(term) !== -1;
      });
      post.element.hidden = !matches;
      if (matches) total += 1;
    });

    groups.sort(function (a, b) {
      return direction * (Number(a.getAttribute('data-blog-year')) - Number(b.getAttribute('data-blog-year')));
    }).forEach(function (group) {
      var list = group.querySelector('[data-blog-year-posts]');
      var yearPosts = posts.filter(function (post) { return post.element.parentNode === list; });
      yearPosts.sort(function (a, b) { return direction * (a.date - b.date); });
      yearPosts.forEach(function (post) { list.appendChild(post.element); });
      var visible = yearPosts.filter(function (post) { return !post.element.hidden; }).length;
      group.hidden = visible === 0;
      group.querySelector('[data-blog-year-count]').textContent = postCount(visible);
      if (revealMatches && visible > 0) group.open = true;
      years.appendChild(group);
    });

    filters.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-blog-filter') === selectedTag));
    });
    count.textContent = postCount(total) + (selectedTag ? ' · ' + selectedTag : '');
    clear.hidden = !selectedTag && !search.value;
    noResults.hidden = total > 0;
  }

  function saveState() {
    var url = new URL(window.location.href);
    if (selectedTag) url.searchParams.set('tag', selectedTag);
    else url.searchParams.delete('tag');
    if (search.value.trim()) url.searchParams.set('q', search.value.trim());
    else url.searchParams.delete('q');
    if (sort.value === 'oldest') url.searchParams.set('sort', 'oldest');
    else url.searchParams.delete('sort');
    // Filtering remains available when history changes are restricted.
    try { window.history.replaceState(null, '', url.href); }
    catch (error) { /* Keep the current in-page filter state. */ }
  }

  function restoreState() {
    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag') || '';
    selectedTag = filters.some(function (button) {
      return button.getAttribute('data-blog-filter') === tag;
    }) ? tag : '';
    search.value = params.get('q') || '';
    sort.value = params.get('sort') === 'oldest' ? 'oldest' : 'newest';
    update(true);
  }

  blog.addEventListener('click', function (event) {
    var button = event.target.closest('[data-blog-filter]');
    var tagLink = event.target.closest('a[data-blog-tag]');
    if (tagLink && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    if (!button && !tagLink) return;
    event.preventDefault();
    selectedTag = (button || tagLink).getAttribute(button ? 'data-blog-filter' : 'data-blog-tag');
    update(true);
    saveState();
    // A tag on a post can disappear from the results; retain keyboard focus.
    if (tagLink) {
      filters.find(function (filter) { return filter.getAttribute('data-blog-filter') === selectedTag; }).focus({ preventScroll: true });
    }
  });

  search.addEventListener('input', function () { update(true); saveState(); });
  sort.addEventListener('change', function () { update(false); saveState(); });
  clear.addEventListener('click', function () {
    selectedTag = '';
    search.value = '';
    update(true);
    saveState();
    search.focus();
  });
  window.addEventListener('popstate', restoreState);
  // Browsers can restore form values after returning from a post.
  window.addEventListener('pageshow', restoreState);

  restoreState();
  controls.hidden = false;
}());
