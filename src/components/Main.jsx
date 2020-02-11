import React from 'react';
import AnswerTemplate from './AnswerTemplate';
import SoundPlayer from './SoundPlayer';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const getRandomInt = (a, b) => {
    return b;
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const { dataBirds } = this.props;
        const options = dataBirds.map((data) => ({name: data.name, isAnswered: false}));
        const start = 0;
        const end = dataBirds.length - 1;
        this.state = {
            correctId: getRandomInt(start, end),
            options,
            currentId: null,
        };
    }

    render() {
        const {
            dataBirds,
            hiddenBirdImage,
            theme,
        } = this.props;
        const {
            correctId,
            options,
            currentId,
        } = this.state;
        const correctAnswer = dataBirds[correctId];
        const currentAnswer = dataBirds[currentId];
        return (
            <main>
                <section>
                    {
                        currentId === correctId ?
                        <AnswerTemplate
                            name={correctAnswer.name}
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
                    <ButtonGroup style={{height: '100%', width: '100%'}} size='lg' vertical>
                        {
                            options.map((option, index) => {
                                return (
                                    <Button
                                        key={index}
                                        variant={theme}
                                        disabled={option.isAnswered}
                                    >
                                        {option.name}
                                    </Button>
                                )
                            })
                        }
                    </ButtonGroup>
                </section>
                <section>
                    {
                        currentId === null ?
                        <AnswerTemplate
                                name={'Вы пока еще не ответили'}
                                text={'Делайте выбор'}   
                            >
                            </AnswerTemplate> : 
                            <AnswerTemplate
                                name={currentAnswer.name}
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