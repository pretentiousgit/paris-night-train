
import list from '../util/descriptorList';
import globals from '../config.globals';
import { range, getRandomIntInclusive, stringArray } from '../util/utilities';

const selectList = Object.keys(list).map((m) => list[m]).reduce((c, arr) => c.concat(arr));

function genLabel() {
  const selector = getRandomIntInclusive(1, selectList.length);
  return selectList[selector];
}

function statsFactory() {
  /*
    Labels: the axis the main emotional blob is growing on
      we want between four and seven axis from the list
      when you have an experience, it moves your data set along one of those five points

      There are two data sets: you as you ARE and you as you WANT TO BE
 */

  const numberOfAxes = range(globals.difficulty[0]); // start off at difficulty 0, TODO: hook to higher difficulty

  const labels = stringArray(numberOfAxes, genLabel);
  const optimalSetData = numberOfAxes.map(() => getRandomIntInclusive(5, 10));
  const playerSetData = numberOfAxes.map(() => getRandomIntInclusive(1, 5));

  globals.labels = labels;
  globals.playerHealth = playerSetData;

  const optimalSet = {
    label: 'best you',
    data: optimalSetData,
    backgroundColor: globals.scheme.mainPale.replace(',1)', ',0.4'),
    borderColor: globals.scheme.mainRich,
    pointBackgroundColor: globals.scheme.mainRich,
    pointBorderColor: globals.scheme.mainRich
  };

  const playerSet = {
    label: 'you',
    data: playerSetData,
    backgroundColor: globals.scheme.contrast.replace(',1)', ',0.6'),
    borderColor: globals.scheme.contrast,
    pointBackgroundColor: globals.scheme.contrast,
    pointBorderColor: globals.scheme.contrast
  };

  return {
    labels,
    datasets: [
      optimalSet,
      playerSet
    ]
  };
}

const initChart = () => ({
  type: 'radar',
  data: statsFactory(),
  options: {
    responsive: false,
    maintainAspectRatio: true,
    legend: {
      display: false
    },
    scale: {
      ticks: {
        display: false,
        backdropColor: 'rgba(0,0,0,0)',
        beginAtZero: true,
        min: 0,
        max: 10,
        stepSize: 1
      },
      pointLabels: {
        fontSize: 18
      }
    },
    tooltips: {
      callbacks: {
        label(tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    }
  }
});

export { initChart };
