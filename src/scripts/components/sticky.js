import { throttle } from 'lodash';

const $ = jQuery.noConflict();
let lst = $(window).scrollTop();
$(window).on('scroll', throttle(() => {
  const st = $(window).scrollTop();
  if ($(window).scrollTop() > 450 && st > lst) {
    $('#abovetherain__primary-navigation').slideUp('fast');
  } else if (st < lst) {
    $('#abovetherain__primary-navigation').slideDown('fast');
  }
  lst = st;
}, 500));
