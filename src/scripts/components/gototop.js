jQuery.noConflict();
jQuery(document).ready(($) => {
  const $window = $(window);
  const $goToTopEl = $('#gototop');
  $goToTopEl.click(() => {
    $('body, html').stop(true).animate({
      scrollTop: 0,
    });
    return false;
  });
  $window.on('scroll', () => {
    if ($window.scrollTop() > 450) {
      $goToTopEl.fadeIn();
    } else {
      $goToTopEl.fadeOut();
    }
  });
  if ($window.scrollTop() > 450) {
    $goToTopEl.fadeIn();
  }
});
