import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import {
  TOPICS
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
      currentCorrectId: 0,
    }
  }

  render() {
    const {
      stage,
      score,
      answered,
      currentCorrectId,
    } = this.state;
    console.log(hiddenBirdImage)
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
          correctId={currentCorrectId}
        />
       <Footer>

       </Footer>
      </React.Fragment>
    )
  }
}
