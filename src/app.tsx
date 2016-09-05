declare function require(string): string;

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";

import ShopperComponent from "./ShopperComponent";
import CartComponent from "./CartComponent";
import PriceComponent from "./PriceComponent";
import LineChart from "./LineChart";


/* This is so we don't get any errors from the 'nio'
  not existing as a name. A real type declaration
  would obviously be a lot more than this. */
interface Nio {
  source: any;
  pass: any;
}

declare var nio: Nio;

const mountNode = document.getElementById('root');


const RootComponent = React.createFactory(props => {

  let sale = props;

  return (
    <section className='app-wrapper'>

      <section className='sale-wrapper'>
        <header className='sale-header'>
          Current Sale
        </header>
        <ShopperComponent name={ sale.shopper.name } gender={ sale.shopper.gender }  />
        <PriceComponent amount={sale.amount} />
        <CartComponent cart={sale.cart} />
      </section>

      <section className='stats-wrapper'>
        <header className='stats-header'>
          Analytics
        </header>
        <LineChart amount={sale.amount} gender={sale.shopper.gender} />
      </section>


    </section>
  )
});

nio.source.socketio('//brand.nioinstances.com', ['groceries'])
  .pipe(nio.pass((props =>
    ReactDOM.render(RootComponent(props), mountNode))
  ));
