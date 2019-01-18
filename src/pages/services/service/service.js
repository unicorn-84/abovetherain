// Vendors
// TODO: 'Добавить dynamic import Bootstrap carousel.js для rent.html'
import 'bootstrap.scss';
import 'carousel';
import 'collapse';
// Common
import 'style.scss';
import '../../../scripts/components/sticky';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faCopyright } from '@fortawesome/free-regular-svg-icons/faCopyright';
// Local
import './service.scss';
// Inline

library.add(faInstagram, faVk, faFacebook, faBars, faPhone, faCopyright);
dom.i2svg();
