import * as React from "react";
import Gender from "./ShopperComponent";

interface PointByGender {
  x: number;
  y: number;
  g: Gender;
}

interface LineChartProps {
  amount: number;
  gender: Gender;
}

interface LineChartState {
  height?: number;
  width?: number;
  sum: number;
  length: number;
  average: number;
  amounts?: PointByGender[];
}

class LineChart extends React.Component<LineChartProps, LineChartState> {
  constructor(props) {
    super(props);
    this.state = {
      height: 180,
      width: 500,
      sum: 0,
      length: 0,
      average: 0,
      amounts: []
    }
  }

  componentWillReceiveProps(nextProps:LineChartProps) {
    const amount = nextProps.amount;
    const sum:number = this.state.sum += amount;
    const length:number = this.state.length += 1;
    const average:number = sum / length;

    this.state.amounts.push({
      x: length,
      y: amount,
      g: this.props.gender
    });

    this.setState({
      sum: sum,
      length: length,
      average: average
    });

  }

  render() {
    function amountsToPath(amounts, gender):string {
      let d = 'M0 180';

      for (let i = 0; i < amounts.length; i++) {
        if (gender === amounts[i].g) {
          d += `L ${amounts[i].x * (500 / amounts.length)} ${180 - amounts[i].y} `;
        }
      }

      return d;
    }

    function amountsFilter(amounts, gender):any[] {
      if (amounts.length > 0) {
        amounts = amounts.filter((amount) => {
          return amount.g === gender;
        });
      } else {
        amounts = [];
      }
      return amounts;
    }

    function amountsTotal(amounts, gender):number {
      if (amountsFilter(amounts, gender).length > 0) {
        amounts = amountsFilter(amounts, gender);
        let amountsY = [];

        amounts.forEach((item, index, arr) => {
          amountsY[index] = item.y;
        });

        let total = amountsY.reduce((prev, curr) => {
          return prev + curr;
        });

        return total;
      } else {
        return 0;
      }
    }

    function amountsAverage(amounts, gender):number {
      if (amountsFilter(amounts, gender).length > 0) {
        let average = 0;

        average = amountsTotal(amounts, gender) / amountsFilter(amounts, gender).length;

        return average;
      } else {
        return 0;
      }
    }

    function convertToCurrency(number):string {
      return '$' + number.toFixed(2);
    }

    function renderYAxes(y, axes = [0, 20, 40, 60, 80, 100, 120, 140, 160]):React.ReactElement<{}>[] {

      let renderAxes = axes.map((item, index) => {
        return <text key={ index } x='0' y={y - item} fontSize='11'>${item}</text>
      });

      return renderAxes;
    }

    return (
      <section className='line-chart'>
        <svg width={this.state.width} height={this.state.height}>
          <text x='140'  y='20' stroke='#fff'>Spending Amounts by Gender</text>
          { renderYAxes(this.state.height) }
          <path transform='translate(20, 0)' className='male-amounts' d={ amountsToPath(this.state.amounts, 'male') }></path>
          <path transform='translate(20, 0)' className='female-amounts' d={ amountsToPath(this.state.amounts, 'female')}></path>
        </svg>
	      <div className='female-summary'>
          Female shoppers average <strong>{ convertToCurrency(amountsAverage(this.state.amounts, 'female')) }</strong>,
          total <strong>{ convertToCurrency(amountsTotal(this.state.amounts, 'female')) }</strong>
        </div>
	      <div className='male-summary'>
          Male shoppers average <strong>{ convertToCurrency(amountsAverage(this.state.amounts, 'male')) }</strong>,
          total <strong>{ convertToCurrency(amountsTotal(this.state.amounts, 'male')) }</strong>
        </div>
      </section>
    )
  }
}

export default LineChart;
