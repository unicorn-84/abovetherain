// TODO: 'Генерировать стили'
// Vendors
import 'bootstrap.scss';
import 'collapse';
// Common
import { each, has } from 'underscore';
import '../../styles/main.scss';

import '../../scripts/components/icons';
import '../../scripts/components/fon';
import '../../scripts/components/logo';
// Local
import { directions, coaches } from '../../data';
// SCSS
import './schedule.scss';
// Inline

// Массив дней недели. Задается в скрипте.
const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
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
const stateObject = {
  direction: 'all',
  coach: 'all',
  day: 'all',
};
// Создать строку запроса из объекта.
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
  each(tables, (table) => {
    const item = table;
    if (stateObject.direction !== 'all') {
      item.dataset.selected = stateObject.direction;
    } else {
      item.dataset.selected = stateObject.coach;
    }
  });
}
// Reset всех селектов в 'selectedIndex = 0', т.е. в 'Все тренеры', 'Все нправления' или 'Все дни' соответственно, кроме активного. Т.е. на котором был вызван 'onchange'.
function closeAllSelect(target, selects) {
  each(selects, (item) => {
    const select = item;
    if (target !== select) {
      select.selectedIndex = 0;
    }
  }, selects);
}
document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('.schedule-table');
  const selects = document.querySelectorAll('.schedule-filter select');
  // Проверка строки запроса
  if (checkQuery()) {
    // При загрузке страницы всегда присваивать параметру 'day' значение 'all', т.к. запрос с фильтрацией по дням не используется.
    stateObject.day = 'all';
    // Переписать строку запроса.
    replaceQuery(stateObject);
    // Програмно задать селектам значения в соответствии с значениями в строке запроса.
    setSelects(selects);
    // Присвоить 'value' выбранного селекта атрибуту 'data-select' у всех таблиц расписания.
    sortTable(tables);
    // Назначение обработчика на 'onchange' всем селектам для фильтрации расписания.
    each(selects, (item) => {
      const select = item;
      select.onchange = ({ target }) => {
        // Присвоить 'value' выбранного селекта атрибуту 'data-select' у всех таблиц расписания
        each(tables, (i) => {
          const table = i;
          table.dataset.selected = target.options[target.options.selectedIndex].getAttribute('value');
        });
        // Дефолтный 'stateObject' для обнудения строки запроса
        const object = {
          direction: 'all',
          coach: 'all',
          day: 'all',
        };
        // Определить 'id' выбранного селекта. Взять первую его часть. Найти в объекте 'data' по 'id' селекта и 'selectedIndex' строчное значение. Присвоить это значение соответствующему ключу в 'object'.
        object[select.id.split('-')[0]] = data[select.id.split('-')[0]][select.options.selectedIndex];
        // Переписать строку запроса
        replaceQuery(object);
        // Сбросить все селекты, кроме выбранного
        closeAllSelect(target, selects);
      };
    });
  } else {
    // Если пришел запрос с невалидными параметрами, задать дефолтные значения.
    replaceQuery(stateObject);
  }
});
