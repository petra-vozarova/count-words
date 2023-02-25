import React from "react";

import { word_dictionary } from "../App";

import './dictionary_styles.scss';

const Dictionary = () => {
    const title = word_dictionary.shift();
    return (
        <div id='dictionary'>
            <li>Word: no. of occurance in the text</li>
            {
                word_dictionary.map((item, index) => {
                return ( <li key={index}>{item}</li>)
                })
            }  
        </div>
    )

}

export default Dictionary