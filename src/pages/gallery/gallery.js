// TODO: 'Сделать новую галерею'
// Vendors
import 'bootstrap.scss';
import 'collapse';
import Glightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
// Common
import '../../styles/main.scss';
import '../../scripts/components/sticky';
import '../../scripts/components/icons';
// Local
import './gallery.scss';

jQuery.noConflict();
jQuery(document).ready(() => {
  Glightbox({
    selector: 'glightbox',
  });
});
