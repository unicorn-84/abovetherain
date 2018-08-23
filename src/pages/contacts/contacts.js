// SCSS
import 'bootstrap/scss/bootstrap.scss';
import '../../styles/style.scss';
import './contacts.scss';
// JS
import abovetherain from '../../scripts/init';
import '../../scripts/components/modal/modal';
// IMAGES
import logo from '../../images/logo/logo-dark.png';
import evacuatorLogo from '../../images/evacuator.png';

document.addEventListener('DOMContentLoaded', () => {
  abovetherain.initialize();
});

(function createMap() {
  function init() {
    const map = new ymaps.Map('yandex-map', {
      center: [59.9636, 30.2732],
      zoom: 16,
    });
    map.behaviors.disable('scrollZoom');
    const mark = new ymaps.Placemark([59.964280, 30.272800], {},
      {
        iconLayout: 'default#image',
        iconImageHref: logo,
        iconImageSize: [60, 80],
        iconImageOffset: [-60, -40],
        cursor: 'auto',
      });
    const route1 = new ymaps.Polyline([
      [59.964280, 30.272800],
      [59.964358, 30.273876],
      [59.963719, 30.274693],
      [59.963260, 30.273519],
    ], {}, {
      strokeColor: '#002137',
      strokeWidth: 2,
      strokeStyle: 'dot',
    });
    const route2 = new ymaps.Polyline([
      [59.963882, 30.275045],
      [59.963763, 30.274640],
    ], {}, {
      strokeColor: '#002137',
      strokeWidth: 2,
      strokeStyle: 'dot',
    });
    const route3 = new ymaps.Polyline([
      [59.964196, 30.274412],
      [59.964140, 30.274154],
    ], {}, {
      strokeColor: '#002137',
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
      .add(mark)
      .add(route1)
      .add(route2)
      .add(route3)
      .add(evacuator);
  }
  ymaps.ready(init);
}());
