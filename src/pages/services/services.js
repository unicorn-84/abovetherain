// Vendors
import 'bootstrap.scss';
import 'collapse';
import Lazy from 'lazy';
// Common
import '../../styles/main.scss';

import '../../scripts/components/icons';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
// Local
import './services.scss';

jQuery.noConflict();
jQuery(document).ready(($) => {
  $('.lazy').Lazy();
});
