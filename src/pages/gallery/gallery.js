// Vendors
import Lazy from 'lazy';
import SimpleLightbox from 'simple-lightbox';
import 'simple-lightbox/dist/simpleLightbox.css';
// Common
import '../../styles/main.scss';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
import '../../scripts/components/icons';
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
