// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import 'style.scss';
import '../../scripts/components/sticky';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
// Local
import './events.scss';
// Inline

library.add(faInstagram, faVk, faFacebook, faBars);
dom.i2svg();
