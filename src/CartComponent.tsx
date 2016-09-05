import * as React from "react";

interface itemProps {
  name: string;
  type: string;
  quantity: number;
}

class CartItem extends React.Component<itemProps, {}> {
  render() {
    return (
      <section className='cart-item'>
        <div className='cart-item-value'>{this.props.name}</div>
        <div className='cart-item-value'>{this.props.type}</div>
        <div className='cart-item-value'>{this.props.quantity}</div>
      </section>
    )
  }
}

class CartItemHeader extends React.Component<itemProps, {}> {
  render() {
    return (
      <section className='cart-item cart-item-header'>
        <div className='cart-item-value'>
          <span>name</span>
        </div>
        <div className='cart-item-value'>
          <span>type</span>
        </div>
        <div className='cart-item-value'>
          <span>quantity</span>
        </div>
      </section>
     )
  }
}


interface CartProps {
  cart: itemProps[];
}

class CartComponent extends React.Component<CartProps, {}> {
  render() {

    let items = this.props.cart;
    let renderCartItems = items.map((item, index) => {
      return <CartItem key={ index } name={ item.name } type={ item.type } quantity={ item.quantity } />
    });

    return (
      <section className='cart-items'>
        <CartItemHeader />
        { renderCartItems }
      </section>
    );
  }
}

export default CartComponent;