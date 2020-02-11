import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class SoundPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioRef: React.createRef(),
            playing: false,
            volume: 0.5,
        }
    }
    
    render() {
        const {
            src,
        } = this.props;
        const {
            volume,
            audioRef,
        } = this.state;
        return (
            <div className='controls'>
                <audio
                    volume={volume}
                    ref={audioRef}
                    src={src}
                >
                </audio>
                <button onClick={() => {
                    audioRef.current.play();
                }}>
                    play
                </button>
            </div>
        )
    }
}