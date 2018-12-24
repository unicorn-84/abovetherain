// Vendor
import 'bootstrap/scss/bootstrap.scss';
// Common
import '../../styles/style.scss';
// Local
import '../../scripts/components/select/select.scss';
import './schedule.scss';
// Inline
import './inline/inlineSchedule';
import './inline/inlineSchedule.scss';

import createSelect from '../../scripts/components/select/select';
import { directions, coaches } from '../../data';

const data = {
  day: [
    'all',
    'day-1',
    'day-2',
    'day-3',
    'day-4',
    'day-5',
    'day-6',
    'day-7',
  ],
};
const direction = ['all'];
directions.forEach((item) => {
  direction.push(item.name);
});
const coach = ['all'];
coaches.forEach((item) => {
  coach.push(item.name);
});
data.coach = coach;
data.direction = direction;
const { day } = data;
let stateObject = {
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
          if (direction.indexOf(parameters[i].direction) < 0) {
            return false;
          }
          stateObject.direction = parameters[i].direction;
          break;
        case 'coach':
          if (coach.indexOf(parameters[i].coach) < 0) {
            return false;
          }
          stateObject.coach = parameters[i].coach;
          break;
        case 'day':
          if (day.indexOf(parameters[i].day) < 0) {
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
  window.history.replaceState(object, '', `?${makeQuery(makeStateObject(object))}`);
}
function setSelects(...selects) {
  for (const select of selects) {
    for (let i = 0; i < select.options.length; i += 1) {
      if (select.options[i].value === stateObject[select.id.split('-')[0]]) {
        select.options.selectedIndex = i;
        break;
      }
    }
  }
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
  const nativeSelects = document.querySelectorAll('select[data-select]');
  const directionSelect = document.querySelector('select#direction-select');
  const coachSelect = document.querySelector('select#coach-select');
  const daySelect = document.querySelector('select#day-select');
  nativeSelects.forEach((nativeSelect) => {
    const item = nativeSelect;
    item.onchange = () => {
      stateObject = {
        direction: 'all',
        coach: 'all',
        day: 'all',
      };
      stateObject[item.id.split('-')[0]] = data[item.id.split('-')[0]][item.options.selectedIndex];
      replaceQuery(stateObject);
    };
  });
  if (checkQuery()) {
    stateObject.direction = 'all';
    stateObject.day = 'all';
    replaceQuery(stateObject);
    setSelects(directionSelect, coachSelect, daySelect);
    sortTable(tables);
  } else {
    replaceQuery(stateObject);
  }
  createSelect();
  const customOptions = document.querySelectorAll('.select-list > li');
  if (customOptions.length > 0) {
    customOptions.forEach((customOption) => {
      customOption.addEventListener('click', ({ target }) => {
        tables.forEach((table) => {
          const item = table;
          item.dataset.selected = target.getAttribute('value');
        });
        target.closest('.select').querySelector('select[data-select]').onchange();
      });
    });
  }
});
