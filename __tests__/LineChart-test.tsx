import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import LineChart from '../src/LineChart';

it('LineChart renders properly', () => {

  const linechart = TestUtils.renderIntoDocument(
    <LineChart amount={67.99} gender='female' />
  );

  const chart = ReactDOM.findDOMNode(linechart);
  const heading = chart.childNodes;

  expect(heading[0].textContent).toEqual('Spending Amounts By Gender');

});
