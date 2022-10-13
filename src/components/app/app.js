import React from 'react';
import 'antd/dist/antd.min.css';
import { Button, Row, Col, Card } from 'antd';

import './app.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      data: null,
    }

    this.renderCards = () => {

      const { data } = this.state;
      return data.map((movie) => {
        return (
          <Col>
          <Card>
            <h1>{movie.original_title}</h1>
          </Card>
        </Col>
        )
      })
    }

    this.getResources  = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie/?query=result&api_key=2f155ce3e1b51e0739a7c8e01279b635`)
        if(!res.ok) {
          throw new Error(res.status)
        }
        const body = await res.json();
        this.setState({ data: body.results, status: 'success' })
      }
      this.getResources()
  }
  
  render () {

    const { status} = this.state;

    if(status === 'loading') {
      return (
        <div className="App">
        <Button type="primary">Button</Button>
        <Row>
        </Row>
      </div>
      );
    } else if(status === 'success') {}
    return (
      <div className="App">
      <Button type="primary">Button</Button>
      <Row>
        {this.renderCards()}
      </Row>
    </div>
    );
  }
};
