/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

// Measure the complete list on every resize, since responsive styles can
// change link widths and make previously recorded breakpoints inaccurate.
function updateNav() {
  $hlinks.children().appendTo($vlinks);
  $btn.addClass('hidden');

  var availableSpace = $nav.width();
  var $items = $vlinks.children('*:not(.masthead__menu-item--lg)');

  while($vlinks.width() > availableSpace && $items.length) {
    $items.last().prependTo($hlinks);
    $btn.removeClass('hidden');
    availableSpace = $nav.width() - $btn.outerWidth() - 30;
    $items = $vlinks.children('*:not(.masthead__menu-item--lg)');
  }

  if(!$hlinks.children().length) {
    $hlinks.addClass('hidden');
  }

  $btn.attr('count', $hlinks.children().length);
}

// Window listeners

$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

updateNav();