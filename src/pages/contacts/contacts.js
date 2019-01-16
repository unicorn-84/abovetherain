// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import 'style.scss';
import '../../scripts/components/sticky';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
// Local
import './contacts.scss';
// Inline
// IMAGES
import logo from '../../images/logo/logo@2x.png';
import evacuatorLogo from '../../images/evacuator.png';

library.add(faPhone, faEnvelope, faMapMarkerAlt, faInstagram, faVk, faFacebook, faBars);
dom.i2svg();

// TODO: 'Загружать лениво'
(function createMap() {
  function init() {
    const map = new ymaps.Map('yandex-map', {
      center: [59.9636, 30.2732],
      zoom: 16,
    });
    map.behaviors.disable('scrollZoom');
    const mark = new ymaps.Placemark([59.964280, 30.273500], {},
      {
        iconLayout: 'default#image',
        iconImageHref: logo,
        iconImageSize: [80, 80],
        iconImageOffset: [-60, -40],
        cursor: 'auto',
      });
    const route1 = new ymaps.Polyline([
      [59.964280, 30.2731],
      [59.964358, 30.273876],
      [59.963719, 30.274693],
      [59.963260, 30.273519],
    ], {}, {
      strokeColor: '#8b887d',
      strokeWidth: 2,
      strokeStyle: 'dot',
    });
    const route2 = new ymaps.Polyline([
      [59.963882, 30.275045],
      [59.963763, 30.274640],
    ], {}, {
      strokeColor: '#8b887d',
      strokeWidth: 2,
      strokeStyle: 'dot',
    });
    const route3 = new ymaps.Polyline([
      [59.964196, 30.274412],
      [59.964140, 30.274154],
    ], {}, {
      strokeColor: '#8b887d',
      strokeWidth: 2,
      strokeStyle: 'dot',
    });
    const evacuator = new ymaps.Placemark([59.9625, 30.2743],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: evacuatorLogo,
        iconImageSize: [50, 30],
        iconImageOffset: [-25, -30],
        cursor: 'auto',
      });
    map.geoObjects
      .add(route1)
      .add(route2)
      .add(route3)
      .add(evacuator)
      .add(mark);
  }

  ymaps.ready(init);
}());
