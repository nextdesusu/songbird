import React from 'react';
import {Howl, Howler} from 'howler';

export default function AnswerTemplate(props) {
    const {
        name,
        imageSrc,
        audioSrc,
    } = props;
    const sound = new Howl({
        src: [audioSrc]
    });
    return (
        <div>
            <h2>{name}</h2>
            <img src={imageSrc}></img>

        </div>
    )
}