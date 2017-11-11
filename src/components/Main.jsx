import React from 'react';
import ReactSignalsPlot from 'react-signals-plot';

const series = {
  data: [
    {
      id: 'EX',
      values: [
        { x: 1, y: 5 },
        { x: 2, y: 10 },
        { x: 3, y: 1 },
        { x: 4, y: 3 },
        { x: 5, y: 7 }
      ]
    },
    {
      id: 'EY',
      values: [
        { x: 1, y: 2 },
        { x: 2, y: 0 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
        { x: 5, y: 7 }
      ]
    }
  ],
  labels: {
    x: 'X, seconds',
    y: 'Y, volts'
  }
};

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <div>Component Example:</div>
        <ReactSignalsPlot
          style={ { width: '100%', height: 450 } }
          data={ series.data }
          samplesLimit={ 300 }
          labels={ series.labels }
          interactive
        />
      </div>
    );
  }
}
