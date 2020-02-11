import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Button from 'react-bootstrap/Button';

import {
  TOPICS,
  THEME
} from './consts';
import birdsData from './birdsData';
import hiddenBirdImage from './images/hiddenBirdImage.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      score: 0,
      answered: false,
    }
  }

  nextStage = () => {
    const { stage } = this.state;
    this.setState({ stage: stage + 1 });
  }

  isDone = () => {
    const { stage } = this.state;
    return stage === birdsData.length - 1;
  }

  render() {
    const {
      stage,
      score,
      answered,
    } = this.state;
    const currentQuestion = birdsData[stage];
    return (
      <React.Fragment>
        <Header
          current={stage}
          topics={TOPICS}
          score={score}
        >
          songbird
        </Header>
        <Main
          dataBirds={currentQuestion}
          hiddenBirdImage={hiddenBirdImage}
          theme={THEME}
        />
       <Footer>
         <Button
          onClick={this.nextStage}
          size='lg'
          variant={THEME}
          block
          disabled={!answered}
        >
          next
        </Button>
       </Footer>
      </React.Fragment>
    )
  }
}
