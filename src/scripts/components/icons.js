import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSquare } from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faCopyright } from '@fortawesome/free-regular-svg-icons/faCopyright';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleUp';

library.add(faPhoneSquare, faBars, faInstagram, faVk, faFacebook, faPhone,
  faCopyright, faInfo, faCalendarAlt, faEnvelope, faMapMarkerAlt, faArrowAltCircleUp);
dom.i2svg();
