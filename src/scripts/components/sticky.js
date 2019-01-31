// TODO: 'Удалить'
import { throttle } from 'underscore';

jQuery.noConflict();
jQuery(document).ready(($) => {
  if ($(window).scrollTop() > 0) {
    $('#abovetherain__primary-navigation').addClass('sticky');
  } else {
    $('#abovetherain__primary-navigation').removeClass('sticky');
  }
  $(window).on('scroll', throttle(() => {
    if (!$('.navbar-collapse').hasClass('show')) {
      if ($(window).scrollTop() > 0) {
        $('#abovetherain__primary-navigation').addClass('sticky');
      } else {
        $('#abovetherain__primary-navigation').removeClass('sticky');
      }
    }
  }, 100));
});
