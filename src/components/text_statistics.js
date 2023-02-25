import React from 'react';
import './text-statistics.styles.scss';

const TextStatistics = (props) => {
    return (
        <div className='statsLineContainer'>
            <span className='statsTitle'>{props.title}</span>
            <span className='statsText'>{props.stats}</span>
        </div>
    )
}

export default TextStatistics