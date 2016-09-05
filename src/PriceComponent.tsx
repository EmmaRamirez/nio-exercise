import * as React from "react";

interface PriceProps {
  amount: number;
}

class PriceComponent extends React.Component<PriceProps, {}> {
  render() {
    return (
      <section className='total-amount'>
        <div className='price-tag'>
          <strong className='total-label'>total:  </strong>
          ${this.props.amount}
        </div>
      </section>
    )
  }
}

export default PriceComponent;