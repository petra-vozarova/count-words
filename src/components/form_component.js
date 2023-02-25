import React from "react";
import './form_styles.scss';

const Form = (props) => {
    const {updateInput, inputValue, submit} = props;
    return (
        <form type='submit' id='result'>
            <label>
                Fancy some stats on your text?
            </label>
            <textarea 
            placeholder='type in the text to get some data back ... ' 
            onChange={updateInput} 
            value={inputValue}
            />
            <button onClick={submit}>Submit</button>
        </form>
    )
}

export default Form