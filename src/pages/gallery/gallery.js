// Vendors
import Lazy from 'lazy';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.css';
// Local
import './gallery.scss';

jQuery.noConflict();
jQuery(document).ready(($) => {
  $('.lazy').Lazy();
  $('a.lightbox').simpleLightbox({
    closeBtnCaption: 'Закрыть',
    nextBtnCaption: 'Вперед',
    prevBtnCaption: 'Назад',
    loadingCaption: 'Загрузка...',
  });
});
