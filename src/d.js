// const data = require('./data');
const services = require('./data/services');
const team = require('./data/team');
const directions = require('./data/directions');

module.exports = {
  services: 'ff',
  team: (function getDirectionsName() {
    for (const item of team) {
      item.directions = item.directions.map(direction => directions[direction].name);
    }
    return team;
  }()),
};
