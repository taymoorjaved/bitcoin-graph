import React from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = (props) => {
  const streamLineData = {
    labels: Object.keys(props.apiData),
    datasets: [
      {
        label: 'Bitcoin Price in USD',
        data: Object.values(props.apiData),
        fill: false,
        backgroundColor: '#489fe4',
        borderColor: '#216ba5',
      },
    ],
  };

  return (
    <div className='chart-container'>
      <Line type='line' data={streamLineData} />
    </div>
  );
};

export {LineChart};
