// SCSS
import './sass/main.scss';
// JS
import 'bootstrap';
import createSchedule from './scripts/schedule';
import events from './database/schedule';

function createContent(name, day, start, end, coach) {
  return `${name}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#abovetherain__schedule')) {
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
});
