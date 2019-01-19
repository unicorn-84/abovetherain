// Vendors
import 'bootstrap.scss';
import 'collapse';
import Glightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
// Common
import '../../styles/main.scss';
import '../../scripts/components/sticky';
import '../../scripts/components/icons';
import '../../scripts/components/gototop';
// Local
import './gallery.scss';

jQuery.noConflict();
jQuery(document).ready(() => {
  Glightbox({
    selector: 'glightbox',
  });
});
