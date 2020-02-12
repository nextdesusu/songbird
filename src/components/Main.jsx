import React from 'react';
import AnswerTemplate from './AnswerTemplate';
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
            mSoundNode: React.createRef(),
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
            mSoundNode,
            vSoundNode,
            lSoundNode
        } = this.state;
        const currentId = Number(target.getAttribute('data-index'));
        const maxScore = 5;
        if (currentId === correctId) {
            const victorySound = vSoundNode.current;
            const mainSound = mSoundNode.current;
            victorySound.play();
            mainSound.pause();
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
            mSoundNode,
            vSoundNode,
            lSoundNode,
        } = this.state;
        const currentId = lookId === null ? answers[answers.length - 1] : lookId;
        const isAnswerCorrect = answers[answers.length - 1] === correctId;
        const correctAnswer = dataBirds[correctId];
        const currentAnswer = dataBirds[currentId];
        const correctAnswerName = `${correctAnswer.name} ${correctAnswer.species}`;
        const currentAnswerName = currentAnswer ? `${currentAnswer.name} ${currentAnswer.species}` : 'none';
        return (
            <main>
                <section>
                    <audio src={vSound} ref={vSoundNode}></audio>
                    <audio src={lSound} ref={lSoundNode}></audio>
                    <AnswerTemplate
                        name={isAnswerCorrect ? correctAnswerName : '******'}
                        text={isAnswerCorrect ? correctAnswer.description : ''}
                        imageSrc={isAnswerCorrect ? correctAnswer.image : hiddenBirdImage}
                    >
                        <div className='controls'>
                            <audio
                                ref={mSoundNode}
                                style={{ width: '100%' }}
                                src={correctAnswer.audio}
                                controls
                            />
                        </div>
                    </AnswerTemplate>
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
                                name={currentAnswerName}
                                text={currentAnswer.description}
                                imageSrc={currentAnswer.image}
                            >
                                <div className='controls'>
                                    <audio
                                        style={{ width: '100%' }}
                                        src={currentAnswer.audio}
                                        controls
                                    />
                                </div>
                            </AnswerTemplate>
                    }
                </section>
            </main>
        )
    }
}