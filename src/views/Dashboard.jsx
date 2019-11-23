/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col , Table} from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  thArray, tdArray
} from "variables/Variables.jsx";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
const url = 'http://newfdapp.ap-southeast-1.elasticbeanstalk.com/';
class Dashboard extends Component {
  
  constructor() {
    super();
    this.state = ({
      scoreboard:[],
      pieChartData: [],
      ymdBarData:[],
      ywdBarData:[],
      hoursChanted:'',
      ranking: '',

      hoursInput: '',
      obj: window.sessionStorage.getItem('user'),
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reload = this.reload.bind(this);
  }
  componentDidMount() {
    this.reload();
  }

  reload() {
    const user = JSON.parse(this.state.obj);
    axios.get(url+"loadBillboard")
    .then(response => {
      let results = response.data;
      this.setState({
        scoreboard: results
      })
    })

    axios.get(url+"loadPieChart")
    .then(response => {
      let results = response.data;
      this.setState({
        pieChartData: results
      })
    })

    axios.get(url + "loadYmdData")
    .then(response => {
      let results = response.data;
      this.setState({
        ymdBarData: results
      })
    })

    axios.get(url + "loadYwdData")
    .then(response => {
      let results = response.data;
      this.setState({
        ywdBarData: results
      })
    })

    axios.get(url + "loadUserRanking/"+user.username)
    .then(response => {
      let results = response.data;
      this.setState({
        ranking: results
      })
    })

    axios.get(url + "loadHoursChanted/"+user.username)
    .then(response => {
      let results = response.data;
      this.setState({
        hoursChanted: results
      })
    })
  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      if(i == 3) {
        legend.push(<i className={type} key={i} style={{color:'#9368E9'}}/>);
      } else if (i == 5) {
        legend.push(<i className={type} key={i} style={{color:'#1b8dff'}}/>);
      } else if (i == 6) {
        legend.push(<i className={type} key={i} style={{color:'#5e5e5e'}}/>);
      } else if (i == 7) {
        legend.push(<i className={type} key={i} style={{color:'#FB404B'}}/>);
      } else if (i == 1) {
        legend.push(<i className={type} key={i} style={{color:'#EE2D20'}}/>);
      }
      else {
        legend.push(<i className={type} key={i} />);
      }
      
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  handleChange(e) {
    console.log(e.target.value);
    let input = e.target.value;
   this.setState({
     hoursInput: input
   })

  }

  handleSubmit(e) {
    //e.preventDefault();
    let user = JSON.parse(this.state.obj);
    
    console.log(this.state.hoursInput);
    let v = this.state.hoursInput;
    var RegExp = /^\d*\.?\d*$/; 

    if(RegExp.test(v) && v !== '' && v !== undefined) {
      axios.get(url+"updateDaimoku?hours="+v+"&id="+user.id).then(response => {
      console.log(response);
      })
      alert("Daimoku hours has been updated");
      this.reload();

    } else {
      alert("Please enter a valid number");
    }
    
  }
  render() {
    let pieLegend = {
      labels: this.state.pieChartData,
      series: this.state.pieChartData
    }

    let barLegend = {
      labels: [
        "R1",
        "R2",
        "R3",
        "R4",
        "R5",
        "R6",
        "R7",
        "R8",
        
      ],
      series: [ this.state.ymdBarData, this.state.ywdBarData]
    }
    let a = moment([2019, 11, 21]);
    let b = moment(new Date);
    let c = a.diff(b, 'days') + 1;
    if (c < 0) {
      c = 0;
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className="pe-7s-star text-warning" />}
                statsText="Ranking"
                statsValue={this.state.ranking}
                statsIcon={<i className="fa fa-thumbs-up"/>}
                statsIconText="Good job, keep it up"
              />
            </Col>
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className="pe-7s-diamond text-success" />}
                statsText="Daimoku"
                statsValue={this.state.hoursChanted + " mins"}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Number of mins chanted"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col> */}
            <Col lg={4} sm={8}>
              <StatsCard
                bigIcon={<i className="pe-7s-timer text-info" />}
                statsText="Countdown"
                statsValue={c} 
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="day(s) to kenshu"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <Card
                id="chartActivity"
                title="Daimoku progress"
                category="Nationwide level in YMD and YWD"
                //stats="Data information certified"
                //statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={barLegend}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
            
          </Row>

          <Row><Col md={6}>
              <Card
                // statsIcon="fa fa-clock-o"
                title="Daimoku @ Region level"
                category="Region 1 - 8"
                //stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={pieLegend} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
            <Col md={6}>
            <Card
                title="Billboard"
                category="Nationwide's Top 10"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.scoreboard.map(score =>
                        <tr>
                          <td>{score.position}</td>
                          <td>{score.username}</td>
                          <td>{score.region}</td>
                          <td>{score.hoursChanted}</td>
                        </tr>
                        
                        
                      )}
                      {/* {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })} */}
                    </tbody>
                  </Table>
                }
              />
            </Col>

           
          </Row>

          <Row>
          <Col md={6}>
              <Card
                title="Your daimoku update"
                //category="challenge it day by day"
              //  stats="Updated 3 minutes ago"
               // statsIcon="fa fa-history"
                content={
                  // <div className="table-full-width">
                  //   <table className="table">
                  //     <Tasks />
                  //   </table>
                  // </div>
                  <form onSubmit={this.handleSubmit}>
                  <FormInputs
                      ncols={["col-md-12", ]}
                      properties={[
                        {
                          label: "Number of mins chanted",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Number of mins chanted",
                          defaultValue: "",
                          onChange: this.handleChange
                        },
                       
                      ]}
                      //onChange
                    />
                     <Button bsStyle="info" pullRight fill type="submit">
                      Update
                    </Button>
                    <div className="clearfix" />
                    </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
