
import list from '../util/descriptorList';
import globals from '../config.globals';

const selectList = Object.keys(list).map((m) => list[m]).reduce((c, arr) => c.concat(arr));

function range(x) {
  const arr = [];
  for (let i = 0; i < x; i += 1) {
    arr.push(0);
  }
  return arr;
}

/* disable-eslint */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function genLabel() {
  const selector = getRandomIntInclusive(1, selectList.length);
  return selectList[selector];
}

function labelSelect(x) {
  const collection = [];
  for (let i = 0, l = x.length; i < l; i += 1) {
    const label = genLabel();
    if (collection.indexOf(label) === -1) {
      collection.push(label);
    }
  }
  return collection;
}

function statsFactory() {
  /*
    Labels: the axis the main emotional blob is growing on
      we want between four and seven axis from the list
      when you have an experience, it moves your data set along one of those five points

      There are two data sets: you as you ARE and you as you WANT TO BE
 */

  const numberOfAxes = range(globals.difficulty[0]); // start off at difficulty 0, TODO: hook to higher difficulty

  const labels = labelSelect(numberOfAxes);
  const optimalSetData = numberOfAxes.map(() => getRandomIntInclusive(5, 10));
  const playerSetData = numberOfAxes.map(() => getRandomIntInclusive(1, 5));

  globals.labels = labels; // pass over to player.labels ?

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

/*
  data: {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
      label: 'Emotional State',
      data: [20, 10, 4, 2],
      backgroundColor: 'rgba(0, 0, 255, 0.4)',
      borderColor: 'rgba(0, 0, 255, 0.4)',
      pointBackgroundColor: 'rgba(0, 0, 255, 0.7)',
      pointBorderColor: 'rgba(0, 0, 255, 0.5)'
    }]
  }
 */
