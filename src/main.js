import WebFont from 'webfontloader';
import each from 'lodash/each';
import 'bootstrap';
import createSchedule from './scripts/schedule';
import events from './database/schedule';
import logo from './images/logo/logo.png';
import evacuatorLogo from './images/icons/evacuator.png';
import mobile from './scripts/helpers';
import indexMobileFon from './images/fon/mobile-index-fon.jpg';
import indexFon from './images/fon/index-fon.jpg';
import commonMobileFon from './images/fon/mobile-common-fon.jpg';
import commonFon from './images/fon/common-fon.jpg';
import './sass/main.scss';

function yandexMapInit() {
  const map = new window.ymaps.Map('yandex-map', {
    center: [59.9636, 30.2732],
    zoom: 16,
  });
  map.behaviors.disable('scrollZoom');
  const mark = new window.ymaps.Placemark([59.964280, 30.273500], {},
    {
      iconLayout: 'default#image',
      iconImageHref: logo,
      iconImageSize: [80, 80],
      iconImageOffset: [-60, -40],
      cursor: 'auto',
    });
  const route1 = new window.ymaps.Polyline([
    [59.964280, 30.2731],
    [59.964358, 30.273876],
    [59.963719, 30.274693],
    [59.963260, 30.273519],
  ], {}, {
    strokeColor: '#8b887d',
    strokeWidth: 2,
    strokeStyle: 'dot',
  });
  const route2 = new window.ymaps.Polyline([
    [59.963882, 30.275045],
    [59.963763, 30.274640],
  ], {}, {
    strokeColor: '#8b887d',
    strokeWidth: 2,
    strokeStyle: 'dot',
  });
  const route3 = new window.ymaps.Polyline([
    [59.964196, 30.274412],
    [59.964140, 30.274154],
  ], {}, {
    strokeColor: '#8b887d',
    strokeWidth: 2,
    strokeStyle: 'dot',
  });
  const evacuator = new window.ymaps.Placemark([59.9625, 30.2743],
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

function createContent(name, day, start, end, coach) {
  return `${name}`;
}

function fonLoad() {
  if (mobile.matches) {
    const img = new Image();
    img.src = commonMobileFon;
    img.onload = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
    img.onerror = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
  }
  if (!mobile.matches) {
    const img = new Image();
    img.src = commonFon;
    img.onload = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
    img.onerror = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
  }
}

function indexFonLoad() {
  if (mobile.matches) {
    const img = new Image();
    img.src = indexMobileFon;
    img.onload = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
    img.onerror = () => {
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
    };
  }
  if (!mobile.matches) {
    const img = new Image();
    img.src = indexFon;
    img.onload = () => {
      const spans = document.querySelectorAll('.caption h1 div span');
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
      each(spans, (span) => {
        setTimeout(() => {
          span.classList.add('in-up-animation');
        }, 0);
      });
    };
    img.onerror = () => {
      const spans = document.querySelectorAll('.caption h1 div span');
      setTimeout(() => {
        document.documentElement.classList.add('fon-loaded');
      }, 0);
      each(spans, (span) => {
        setTimeout(() => {
          span.classList.add('in-up-animation');
        }, 0);
      });
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const pages = {
    index: document.documentElement.id === 'abovetherain__index',
    services: document.documentElement.id === 'abovetherain__services',
    schedule: document.documentElement.id === 'abovetherain__schedule',
    events: document.documentElement.id === 'abovetherain__events',
    coaches: document.documentElement.id === 'abovetherain__events',
    gallery: document.documentElement.id === 'abovetherain__gallery',
    contacts: document.documentElement.id === 'abovetherain__contacts',
  };

  if (pages.index) {
    WebFont.load({
      custom: {
        families: ['hercules_modern'],
      },
    });
    mobile.addListener(indexFonLoad);
    indexFonLoad();
  } else {
    mobile.addListener(fonLoad);
    fonLoad();
  }

  if (pages.schedule) {
    const options = {
      breakpoint: '991px',
      container: 'abovetherain__schedule-table',
      table: {
        attributes: {
          class: 'table table-sm table-bordered table-dark border border-rhino schedule-table text-center',
        },
        thead: {
          td: {
            attributes: {
              class: 'font-weight-bold align-middle',
            },
          },
        },
        tbody: {
          td: {
            attributes: {
              class: 'font-weight-bold align-middle',
            },
          },
        },
      },
      rows: {
        sort: true,
      },
      disableEmptyTable: true,
      disableEmptyMobileTable: true,
      disableEmptyMobileRow: true,
      disableFirstMobileColumn: true,
    };
    options.events = events.map((x, i) => (
      {
        column: events[i].day,
        row: events[i].start,
        content: createContent(events[i].name, events[i].day, events[i].start, events[i].end, events[i].coach),
      }
    ));
    window.scheduler(options);
    createSchedule();
  }

  if (pages.contacts) {
    window.ymaps.ready(yandexMapInit);
  }
});
