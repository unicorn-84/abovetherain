// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import 'style.scss';
import '../../scripts/components/sticky';
import '../../scripts/components/social';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
// Local
import './coaches.scss';
// Inline

library.add(faInfo, faCalendarAlt);
dom.i2svg();
