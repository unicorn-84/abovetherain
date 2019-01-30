// TODO: 'Удалить генератор'
// TODO: 'Удалить custom select'
// TODO: 'Добавить ссылки с фильтрацией по направлению'
// TODO: 'Исправить смещение массива directions'
// TODO: 'Генерировать стили'
// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import _ from 'underscore';
import '../../styles/main.scss';

import '../../scripts/components/icons';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
// Local
import { directions, coaches } from '../../data';
// SCSS
import './schedule.scss';
// Inline

const days = [
  'all',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
const data = {};
(function makeData() {
  data.direction = ['all'];
  _.each(directions, (direction) => {
    if (_.has(direction, 'schedule')) {
      data.direction.push(direction.name);
    }
  });
  data.coach = ['all'];
  _.each(coaches, (coach) => {
    if (_.has(coach, 'schedule')) {
      data.coach.push(coach.name);
    }
  });
  data.day = days;
}());
const stateObject = {
  direction: 'all',
  coach: 'all',
  day: 'all',
};
function makeQuery(object) {
  return Object.keys(object).map(i => [i, object[i]].join('=')).join('&');
}
function makeStateObject(object) {
  if (!object) {
    return stateObject;
  }
  return object;
}
function checkQuery() {
  const queryElements = window.location.search.substring(1).split('&');
  if (queryElements.length === 3) {
    const parameters = queryElements.map((element) => {
      const parameterString = element.split('=');
      return { [parameterString[0]]: parameterString[1] };
    });
    for (let i = 0; i < parameters.length; i += 1) {
      switch (Object.keys(parameters[i])[0]) {
        case 'direction':
          if (data.direction.indexOf(parameters[i].direction) < 0) {
            return false;
          }
          stateObject.direction = parameters[i].direction;
          break;
        case 'coach':
          if (data.coach.indexOf(parameters[i].coach) < 0) {
            return false;
          }
          stateObject.coach = parameters[i].coach;
          break;
        case 'day':
          if (data.day.indexOf(parameters[i].day) < 0) {
            return false;
          }
          stateObject.day = parameters[i].day;
          break;
        default:
          return false;
      }
    }
    return true;
  }
  return false;
}
function replaceQuery(object) {
  window.history.replaceState(object, '', `/schedule.html?${makeQuery(makeStateObject(object))}`);
}
function setSelects(...selects) {
  _.each(selects, (item) => {
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
  tables.forEach((table) => {
    const item = table;
    if (stateObject.direction !== 'all') {
      item.dataset.selected = stateObject.direction;
    } else {
      item.dataset.selected = stateObject.coach;
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.schedule-table');
  const selects = document.querySelectorAll('.schedule-filter select');
  const directionSelect = document.querySelector('select#direction-select');
  const coachSelect = document.querySelector('select#coach-select');
  const daySelect = document.querySelector('select#day-select');
  _.each(selects, (item) => {
    const select = item;
    select.onchange = (e) => {
      _.each(tables, (i) => {
        const table = i;
        table.dataset.selected = e.target.options[e.target.options.selectedIndex].getAttribute('value');
      });
      const object = {
        direction: 'all',
        coach: 'all',
        day: 'all',
      };
      object[select.id.split('-')[0]] = data[select.id.split('-')[0]][select.options.selectedIndex];
      replaceQuery(object);
    };
  });
  if (checkQuery()) {
    stateObject.day = 'all';
    replaceQuery(stateObject);
    setSelects(directionSelect, coachSelect, daySelect);
    sortTable(tables);
  } else {
    replaceQuery(stateObject);
  }
});
