import React, {Component} from 'react';
import { Button } from 'antd';
import './App.css';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

//TODO: Componentize buttons, graph display, sub-header
//TODO: Add better filters to display data

class App extends Component {

    constructor() {
      super()
      this.state = {}
    }

    componentDidMount() {
      fetch(`https://api.covidtracking.com/v2/us/daily.json`, {
          method: 'GET',
          body: JSON.stringify()
      })
      .then((response) => response.json())
      .then(data => {

        this.setState({
          daysPastModifier: 30
        })

        let dates = data.data;
        let formattedRecentDates = [];

        for (let i = 0; i <= this.state.daysPastModifier; i++) {

          //TODO: Find a more elegant way to abbreviate long numbers
          let abbreviateNumberString = String(dates[i].cases.total.value).substr(1, 5)
          let abbreviateNumber = Number(abbreviateNumberString)

          let nationwideDateObj = {
            x: i,
            y: abbreviateNumber
          }

          formattedRecentDates.push(nationwideDateObj);

        }
        this.setState({ 
          nationwideDates: formattedRecentDates
        })
      })
    }

    changeDays(days) {

      fetch(`https://api.covidtracking.com/v2/us/daily.json`, {
          method: 'GET',
          body: JSON.stringify()
      })
      .then((response) => response.json())
      .then(data => {

        this.setState({
          daysPastModifier: days
        })

        let dates = data.data;
        let formattedRecentDates = [];

        for (let i = 0; i <= this.state.daysPastModifier; i++) {

          let abbreviateNumberString = String(dates[i].cases.total.value).substr(1, 5)
          let abbreviateNumber = Number(abbreviateNumberString)

          let nationwideDateObj = {
            x: i,
            y: abbreviateNumber
          }

          formattedRecentDates.push(nationwideDateObj);

        }
        this.setState({ 
          nationwideDates: formattedRecentDates
        })
      })

    }

    render() {
      if (!this.state.nationwideDates) {
        return(<div className="loading"><h1>Loading data...</h1></div>)
      } else {

        console.log(this.state)

        return (
          
          <div className="App">

            <section>
              <h1>Total COVID-19 Cases in the U.S.</h1>
              <h2>Over the Last {this.state.daysPastModifier} Days</h2>
            </section>

            <section>
              <div>
                <div>
                <XYPlot width={800} height={400}>
                  <HorizontalGridLines />

                  {/* TODO: Y-Axis is not displaying meaningfully. Examine data type and quantity, find a better way to display */}
                  <LineSeries
                    data={ this.state.nationwideDates }/>

                  <XAxis />
                  <YAxis />
                </XYPlot>
                </div>
                <div className="horizontal">
                  <div>
                    [today]
                  </div>
                  <div>
                    [days past]
                  </div>
                </div>
              </div>
            </section>

            <section className="horizontal">
              <div>Change Recency:</div>
              <div className="button-box">
                <div className="button"><Button type="primary" onClick={e => this.changeDays(15)}>15 Days</Button></div>
                <div className="button"><Button type="primary" onClick={e => this.changeDays(30)}>30 Days</Button></div>
                <div className="button"><Button type="primary" onClick={e => this.changeDays(60)}>60 Days</Button></div>
              </div>
            </section>

          </div>
        )
      }
    }
}

export default App;