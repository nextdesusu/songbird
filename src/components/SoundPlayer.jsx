import React from 'react';

export default function SoundPlayer(props) {
    const {
        src,
    } = props;
    return (
        <div className='controls'>
            <audio style={{ width: '100%' }} src={src} controls />
        </div>
    )
}
