import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';
const options = [
  { key: 'flareTemp', text: 'FlareTemp', value: 'flareTemp' },
  { key: 'njvalueOpen', text: 'NjvalueOpen', value: 'njvalueOpen' },
  { key: 'oilTemp', text: 'OilTemp', value: 'oilTemp' },
  { key: 'tubbingPressure', text: 'TubbingPressure', value: 'tubbingPressure' },
  { key: 'waterTemp', text: 'WaterTemp', value: 'waterTemp' },
];

const Selector = (props) => {

  const optionHandler = (e, data) => {
    props.selectOption(data.value)
  }

  return (
    <Fragment>
      <Dropdown onChange={optionHandler} style={{ width: '600px' }} placeholder="Select" multiple selection options={options} fluid />
    </Fragment>
  );
}

export default Selector;