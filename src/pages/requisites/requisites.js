// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import '../../styles/main.scss';
import '../../scripts/components/sticky';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faCopyright } from '@fortawesome/free-regular-svg-icons/faCopyright';
// Local
import './requisites.scss';
// Inline

library.add(faInstagram, faVk, faFacebook, faBars, faPhone, faCopyright);
dom.i2svg();
