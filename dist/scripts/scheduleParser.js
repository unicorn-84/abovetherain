const schedule = require('../data/schedule');
const coaches = require('../data/coaches');
const directions = require('../data/directions');

const days = [
  '',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const events = [];
for (let key in schedule) {
  for (let i = 0; i < schedule[key].length; i += 1)
  if (schedule[key].direction) {
    events.push({
      time: schedule[key].slot,
      directionClass: (function () {
        for (let j = 0; j < directions.length; j += 1) {
          if (schedule[i].direction === directions[j].title) {
            return directions[j].name;
          }
        }
        return '';
      }()),
      direction: schedule[i].direction,
      coachClass: (function () {
        for (let j = 0; j < coaches.length; j += 1) {
          if (schedule[i].coach === coaches[j].title) {
            return coaches[j].name;
          }
        }
        return '';
      }()),
      coach: schedule[i].coach,
      start: schedule[i].start,
      finish: schedule[i].finish,
      dayClass: (function () {
        for (let j = 0; j < days.length; j += 1) {
          if (schedule[i].day === days[j]) {
            return `day-${j}`;
          }
        }
        return '';
      }()),
      rowspan: (function () {
        const start = schedule[i].start.replace(':', '.');
        const finish = schedule[i].finish.replace(':', '.');
        return (parseFloat(finish) - parseFloat(start)) > 1 ? 3 : 2;
      }()),
    });
  } else {
    events.push({
      slot: schedule[i].slot,
    });
  }
}

module.exports = events;
