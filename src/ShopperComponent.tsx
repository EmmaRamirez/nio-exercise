import * as React from "react";


type Gender = "male" | "female" | "other";

interface ShopperProps {
  name: string;
  gender: Gender;
}

interface ShopperState {
  tooltip: string;
}

const status = {
  hidden: 'none',
  visible: 'block'
};

class ShopperComponent extends React.Component<ShopperProps, ShopperState> {
  constructor() {
    super();

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      tooltip: status.hidden
    };
  }

  _onMouseEnter() {
    this.setState({
      tooltip: status.visible
    });
  }

  _onMouseLeave() {
    this.setState({
      tooltip: status.hidden
    });
  }

  renderGender(gender):React.ReactElement<{}> {
    switch (gender) {
      case 'male':
        return <i className='fa fa-mars'></i>;
      case 'female':
        return <i className='fa fa-venus'></i>;
      default:
        return <i className='fa fa-neuter'></i>;
      }
  }

  render() {
    return (
      <section
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className='shopper'>
        <div className='tooltip' data-visibility={this.state.tooltip}>{this.props.gender} shopper</div>
        <i className='shopper-icon fa fa-user'></i>
        <span className='shopper-name'>{this.props.name}</span>
        <span className='shopper-gender' data-gender={this.props.gender}>{this.renderGender(this.props.gender)}</span>
      </section>
    )
  }
};

export default ShopperComponent;
