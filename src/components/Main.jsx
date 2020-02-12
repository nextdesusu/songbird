import React from 'react';
import AnswerTemplate from './AnswerTemplate';
import SoundPlayer from './SoundPlayer';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const getRandomInt = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const { dataBirds } = this.props;
        const options = dataBirds.map((data) => ({ name: data.name, isAnswered: false }));
        const start = 0;
        const end = dataBirds.length - 1;
        this.state = {
            currentStage: this.props.stage,
            correctId: getRandomInt(start, end),
            options,
            answers: [],
            lookId: null,
            vSoundNode: React.createRef(),
            lSoundNode: React.createRef(),
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.stage !== state.currentStage) {
            const { dataBirds } = props;
            const options = dataBirds.map((data) => ({ name: data.name, isAnswered: false }));
            const start = 0;
            const end = dataBirds.length - 1;
            return {
                currentStage: props.stage,
                correctId: getRandomInt(start, end),
                options,
                answers: [],
                lookId: null,
            };
        }
        return null;
    }

    look = (event) => {
        const { target } = event;
        const currentId = Number(target.getAttribute('data-index'));
        this.setState({ lookId: currentId });
    }

    makeAnswer = (event) => {
        const {
            addScore,
        } = this.props;
        const { target } = event;
        const {
            answers,
            options,
            correctId,
            vSoundNode,
            lSoundNode
        } = this.state;
        const currentId = Number(target.getAttribute('data-index'));
        const maxScore = 5;
        if (currentId === correctId) {
            const victorySound = vSoundNode.current;
            victorySound.play();
            addScore(maxScore - answers.length);
        } else {
            const loseSound = lSoundNode.current;
            loseSound.play();
        }
        const newOptions = [...options];
        newOptions[currentId].isAnswered = true;
        this.setState({
            answers: [...answers, currentId],
            options: newOptions,
        });
    }

    render() {
        const {
            dataBirds,
            hiddenBirdImage,
            theme,
            vSound,
            lSound,
        } = this.props;
        const {
            correctId,
            options,
            answers,
            lookId,
            vSoundNode,
            lSoundNode,
        } = this.state;
        const currentId = lookId === null ? answers[answers.length - 1] : lookId;
        console.log('correct', correctId);
        const isAnswerCorrect = answers[answers.length - 1] === correctId;
        const correctAnswer = dataBirds[correctId];
        const currentAnswer = dataBirds[currentId];
        return (
            <main>
                <section>
                    <audio src={vSound} ref={vSoundNode}></audio>
                    <audio src={lSound} ref={lSoundNode}></audio>
                    {
                        isAnswerCorrect ?
                            <AnswerTemplate
                                name={correctAnswer.name}
                                text={correctAnswer.description}
                                imageSrc={correctAnswer.image}
                            >
                                <SoundPlayer src={correctAnswer.audio} />
                            </AnswerTemplate>
                            :
                            <AnswerTemplate
                                name='******'
                                imageSrc={hiddenBirdImage}
                            >
                                <SoundPlayer src={correctAnswer.audio} />
                            </AnswerTemplate>
                    }
                </section>
                <section>
                    <ButtonGroup
                        style={{ height: '100%', width: '100%' }}
                        size='lg'
                        vertical
                        onClick={isAnswerCorrect ? this.look : this.makeAnswer}
                    >
                        {
                            options.map((option, index) => {
                                const winingButton = index === correctId;
                                const answerTheme = winingButton ? 'success' : 'danger';
                                const {
                                    name,
                                    isAnswered,
                                } = option;
                                return (
                                    <Button
                                        data-index={index}
                                        key={index}
                                        variant={isAnswered ? answerTheme : theme}
                                        disabled={isAnswered && !isAnswerCorrect}
                                    >
                                        {name}
                                    </Button>
                                )
                            })
                        }
                    </ButtonGroup>
                </section>
                <section>
                    {
                        answers.length === 0 ?
                            <AnswerTemplate
                                name={'Вы пока еще не ответили'}
                                text={'Делайте выбор'}
                            >
                            </AnswerTemplate> :
                            <AnswerTemplate
                                name={currentAnswer.name}
                                text={currentAnswer.description}
                                imageSrc={currentAnswer.image}
                            >
                                <SoundPlayer src={currentAnswer.audio} />
                            </AnswerTemplate>
                    }
                </section>
            </main>
        )
    }
}