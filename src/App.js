import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import birdsData from './birdsData';
import victorySound from './media/correct.mp3';
import loseSound from './media/wrong.mp3';
import hiddenBirdImage from './media/hiddenBirdImage.jpg';

import {
    TOPICS,
    THEME
} from './consts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            score: 0,
            modalOpen: false,
            answered: false,
        }
    }

    addScore = (amount) => {
        const {
            score,
        } = this.state;
        this.setState({
            score: score + amount,
            answered: true,
        });
    }

    restart = () => {
        this.setState({
            stage: 0,
            score: 0,
            modalOpen: false,
            answered: false,
        });
    }

    nextStage = () => {
        const { stage } = this.state;
        if (stage === birdsData.length - 1) {
            this.setState({
                modalOpen: true,
            });
        } else {
            this.setState({
                stage: stage + 1,
                answered: false,
            });
        }
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        const {
            stage,
            score,
            answered,
            modalOpen,
        } = this.state;
        const maxScorePerAnswer = 5;
        const maxScore = maxScorePerAnswer * birdsData.length;
        const absoluteVictory = score === maxScore;
        const currentQuestion = birdsData[stage];
        return (
            <React.Fragment>
                <Header
                    current={stage}
                    topics={TOPICS}
                    score={score}
                >
                    <Breadcrumb>
                        <Breadcrumb.Item as='h1'>songbird</Breadcrumb.Item>
                        <Breadcrumb.Item as='h2'>очки: {score}</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Main
                    dataBirds={currentQuestion}
                    hiddenBirdImage={hiddenBirdImage}
                    theme={THEME}
                    addScore={this.addScore}
                    stage={stage}
                    vSound={victorySound}
                    lSound={loseSound}
                />
                <Footer>
                    <Button
                        onClick={this.nextStage}
                        size='lg'
                        variant={THEME}
                        block
                        disabled={!answered}
                    >
                        дальше
                    </Button>
                </Footer>
                <Modal show={modalOpen} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Игра окончена</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            absoluteVictory ?
                                <p>
                                    Поздравляем! Вы узнали всех птиц и набрали максимально возможное количество очков!
                                </p>
                                :
                                <p>
                                    Вы набрали: {score} очков из {maxScore} возможных! Постарайтесь еще!
                                </p>
                        }
                    </Modal.Body>
                    {
                        !absoluteVictory &&
                        <Modal.Footer>
                            <Button
                                onClick={this.restart}
                                variant={THEME}
                            >
                                Начать заново
                            </Button>
                        </Modal.Footer>
                    }
                </Modal>
            </React.Fragment>
        )
    }
}
