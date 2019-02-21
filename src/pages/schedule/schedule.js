// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import {
  each, has, without, map, extendOwn, pairs, isObject, indexOf,
} from 'underscore';
import { mobile } from '../../scripts/components/helpers';
import '../../styles/main.scss';

import '../../scripts/components/icons';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
// Local
import { directions, coaches } from '../../data';
// SCSS
import './schedule.scss';
// Inline

// Массив дней недели.
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

// Объект для хранения массивов с названиями дней, направлений и тренеров у которых есть расписание.
const data = {};

// Объекту 'data' задается три ключа: 'direction', 'coach' и 'day'. Значение каждого ключа - массив строк. В каждый массив первым значением (index = 0) вставляется строка 'all', для фильтрации по 'Все дни', 'Все направления' и 'Все тренеры'. 'Глобальные' объекты 'directions' и 'coaches' из 'data.json' фильтруются по ключу 'schedule', чтобы в 'data' не попали направления и тренеры у которых нет расписания. У объекта у которого есть ключ 'schedule' берется значение ключа 'name' и оно 'пушится' соответственно либо в 'data.direction', либо в 'data.coach'.
(function makeData() {
  data.direction = ['all'];
  each(directions, (direction) => {
    if (has(direction, 'schedule')) {
      data.direction.push(direction.name);
    }
  });
  data.coach = ['all'];
  each(coaches, (coach) => {
    if (has(coach, 'schedule')) {
      data.coach.push(coach.name);
    }
  });
  data.day = ['all'];
  data.day = data.day.concat(days);
}());

// Дефолтный 'stateObject'.
let stateObject = {};

// Проверить window.location.search. Если валидный запрос, то записать в stateObject.
(function checkQuery() {
  let queryObject;
  queryObject = window.location.search.substring(1).split('&');
  queryObject = map(queryObject, value => value.split('='));
  if (queryObject.length === 3) {
    each(queryObject, (value) => {
      const [param, paramValue] = value;
      switch (param) {
        case 'day':
          if (indexOf(data.day, paramValue) >= 0) {
            stateObject.day = paramValue;
          } else {
            stateObject.day = 'all';
          }
          break;
        case 'direction':
          if (indexOf(data.direction, paramValue) >= 0) {
            stateObject.direction = paramValue;
          } else {
            stateObject.direction = 'all';
          }
          break;
        case 'coach':
          if (indexOf(data.coach, paramValue) >= 0) {
            stateObject.coach = paramValue;
          } else {
            stateObject.coach = 'all';
          }
          break;
        default:
          break;
      }
    });
  } else {
    stateObject = {
      day: 'all',
      direction: 'all',
      coach: 'all',
    };
  }
}());

// Создать строку запроса из объекта.
function makeQuery(object) {
  if (isObject(object)) {
    let query;
    query = pairs(object); // { day: value,  direction: value, coach: value } => [['day', 'value'], ['direction', 'value'], ['coach', 'value']]
    query = map(query, value => value.join('=')); // [['day', 'value'], ['direction', 'value'], ['coach', 'value']] => ['day=value', 'direction=value', 'coach=value']
    query = query.join('&'); // ['day=value', 'direction=value', 'coach=value'] => 'day=value&direction=value&coach=value'
    return query;
  }
  return 'day=all&direction=all&coach-all';
}

// Переписать window.location
function replaceQuery() {
  const query = makeQuery(stateObject);
  window.history.replaceState(stateObject, '', `/schedule.html?${query}`);
}

function setSelects(selects) {
  each(selects, (item) => {
    const select = item;
    for (let i = 0; i < select.options.length; i += 1) {
      if (select.options[i].value === stateObject[select.id.split('-')[0]]) {
        select.options.selectedIndex = i;
        break;
      }
    }
  });
}

function sortTable(tables) {
  each(tables, (item) => {
    const table = item;
    if (stateObject.direction !== 'all') {
      table.dataset.selected = stateObject.direction;
    } else if (stateObject.coach !== 'all') {
      table.dataset.selected = stateObject.coach;
    } else if (stateObject.day !== 'all') {
      table.dataset.selected = stateObject.day;
    }
  });
}

// Reset всех селектов в 'selectedIndex = 0', т.е. в 'Все тренеры', 'Все нправления' или 'Все дни' соответственно, кроме активного, на котором был вызван 'onchange'.
function closeAllSelect(target, selects) {
  each(selects, (item) => {
    const select = item;
    if (target !== select) {
      select.selectedIndex = 0;
    }
  }, selects);
}

function genStyles() {
  const css = document.createElement('style');
  css.type = 'text/css';

  // Стили для разних групп селекторов
  const styles = {
    schema1: '{ pointer-events: auto; }',
    schema2: '{ border: 1px solid #777; background-color: rgba(0, 0, 0, 0.5); opacity: 1;}',
    schema3: '{ display: table-row; }',
  };

  // Создаем группы селекторов для стилей из 'styles'
  // Проходим по объекту 'styles'
  each(styles, (style, index) => {
    // Для каждого правила стилей своя схема создания селекторов
    switch (index) {
      case 'schema1':
        (function makeCssGroup1() {
          let group = [];

          // Проходим по объекту 'data'
          each(data, (element, i) => {
            let item = element;

            // Удаляем 'all'
            item = without(item, 'all');

            // Создаем группу css cелекторов'
            item = map(item, value => `.schedule-table[data-selected='${value}'] .schedule-event[data-${i}='${value}'] > *`);
            group = group.concat(item);
          });

          // Соединяем селекторы и стиль
          const rule = group.join(',') + style;

          // Добавляем в 'css'
          css.appendChild(document.createTextNode(rule));
        }());
        break;
      case 'schema2':
        (function makeCssGroup2() {
          let group = [];

          // Проходим по объекту 'data'
          each(data, (element, i) => {
            let item = element;

            // Удаляем 'all'
            item = without(item, 'all');

            // Создаем группу css cелекторов'
            item = map(item, value => `.schedule-table[data-selected='${value}'] .schedule-event[data-${i}='${value}']`);
            group = group.concat(item);
          });

          // Соединяем селекторы и стиль
          const rule = group.join(',') + style;

          // Добавляем в 'css'
          css.appendChild(document.createTextNode(rule));
        }());
        break;
      case 'schema3':
        (function makeCssGroup3() {
          let group = [];

          // Проходим по объекту 'data'
          each(data, (element) => {
            let item = element;

            // Удаляем 'all'
            item = without(item, 'all');

            // Создаем группу css cелекторов'
            item = map(item, value => `.schedule-table.mobile[data-selected='${value}'] tr[class~='${value}']`);
            group = group.concat(item);
          });

          // Соединяем селекторы и стиль
          const rule = group.join(',') + style;

          // Добавляем в 'css'
          css.appendChild(document.createTextNode(rule));
        }());
        break;
      default:
        break;
    }
  });
  document.getElementsByTagName('head')[0].appendChild(css);
}

document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.schedule-table');
  const selects = document.querySelectorAll('.schedule-filter select');
  // Вставить в 'head' стили в соответствии с 'data'.
  if (selects.length > 0) {
    genStyles();
  }

  // Програмно задать селектам значения в соответствии с значениями в строке запроса.
  setSelects(selects);

  // Присвоить 'value' выбранного селекта атрибуту 'data-select' у всех таблиц расписания.
  sortTable(tables);

  // Проверка строки запроса
  replaceQuery();
  // Назначение обработчика на 'onchange' всем селектам для фильтрации расписания.
  each(selects, (select) => {
    select.onchange = ({ target }) => {
      // Присвоить 'value' выбранного селекта атрибуту 'data-select' у всех таблиц расписания
      each(tables, (table) => {
        const option = target.options[target.options.selectedIndex];
        table.dataset.selected = option.getAttribute('value');
      });
      stateObject = extendOwn({
        day: 'all',
        direction: 'all',
        coach: 'all',
      }, { [target.id.split('-')[0]]: target.options[target.options.selectedIndex].getAttribute('value') });
      replaceQuery();

      // Сбросить все селекты, кроме выбранного
      closeAllSelect(target, selects);
    };
  });
});

// Включать, отключать фильтр по дням недели в соответствии с медиа запросом
mobile.addListener(() => {
  if (!mobile.matches) {
    document.querySelector('select#day-select').setAttribute('disabled', 'disabled');
  } else {
    document.querySelector('select#day-select').removeAttribute('disabled');
  }
});
