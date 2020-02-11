import React from 'react';
import {
    Howl,
    Howler
} from 'howler';

import AnswerTemplate from './AnswerTemplate';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const { dataBirds } = this.props;
        const options = dataBirds.map((data) => ({name: data.name, isAnswered: false}));
        this.state = {
            options,
            currentAnswerId: null,
        };
    }

    incorrectAnswerTemplate() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }

    render() {
        const {
            correctId,
            dataBirds,
            hiddenBirdImage,
        } = this.props;
        const {
            options,
            currentAnswerId,
        } = this.state;
        const correctAnswer = dataBirds[correctId];
        return (
            <main>
                <section>
                    {
                        currentAnswerId === correctId ?
                        <AnswerTemplate
                            name={correctAnswer.name}
                            imageSrc={correctAnswer.image}
                            audioSrc={correctAnswer.audio}
                        /> :
                        <AnswerTemplate
                            name='****'
                            imageSrc={hiddenBirdImage}
                            audioSrc={correctAnswer.audio}
                        />
                    }
                </section>
                <section>
                    <ul>
                        {
                            options.map((option) => {
                                return (<li>{option.isAnswered ? 'y' : 'n'}:{option.name}</li>)
                            })
                        }
                    </ul>
                </section>
                <section>
                    {
                        currentAnswerId === null ?
                            <p>Ответ не дан</p> : 
                            this.incorrectAnswerTemplate()
                    }
                </section>
            </main>
        )
    }
}