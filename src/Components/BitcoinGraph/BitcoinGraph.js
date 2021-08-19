import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {LineChart} from '../Common/lineChart';
import './BitcoinGraph.css';

const BitcoinGraph = () => {
  const nowDate = new Date();
  const days = 86400000;
  const [startDate, setStartDate] = useState(new Date(nowDate - 10 * days));
  const [endDate, setEndDate] = useState(new Date());
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    const currentStartDate = startDate.toISOString().slice(0, 10);
    const currentEndDate = endDate.toISOString().slice(0, 10);
    const currentData = await axios.get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${currentStartDate}&end=${currentEndDate}`
    );
    setApiData(currentData.data.bpi);
  };

  return (
    <>
      <div className='DatePicker-wrapper'>
        <div>
          <DatePicker
            dateFormat='yyyy-MM-dd'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <DatePicker
            dateFormat='yyyy-MM-dd'
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div>
          <button className='Render-btn' onClick={() => handleClick()}>
            Render
          </button>
        </div>
      </div>
      <div className='BtcGraph-wrapper'>
        <LineChart apiData={apiData} />
      </div>
    </>
  );
};

export {BitcoinGraph};
