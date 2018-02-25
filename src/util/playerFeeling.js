import globals from '../config.globals';
import { setFeeling } from '../redux/actions/playerActions';

function affectEvent() {
  globals.healthChart.data.datasets[1].data[2] += 2;
  globals.healthChart.update();
  // in here

  // on collision, figure out what axis is impacted
  // npcs can have a positive or negative affect on 1-max levels of affect
  // add to or delete the element as necessary
  // if character is already at max
  // bounce off the sides of the chart?

  // Death conditions:
  // -- become too well-rounded?
  // -- become too unbalanced?
  // -- become too af
}

export {
  affectEvent
};