import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import ShopperComponent from '../src/ShopperComponent';
import renderer from 'react-test-renderer';

it('ShopperComponent something', () => {

  const shopperComponent = TestUtils.renderIntoDocument(
    <ShopperComponent name='Emma' gender='female' />
  );

  let tree = ShopperComponent.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseEnter();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  tree.props.onMouseLeave();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
