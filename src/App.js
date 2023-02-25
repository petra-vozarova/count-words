import React from 'react';

import TextStatistics from './components/text_statistics';
import Dictionary from './components/dictionary_component';
import Form from './components/form_component';

import './App.scss';

var text;
var stats=[];
export var word_dictionary = []; 

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input: '',
      text: '',
    }
    this.updateInput = this.updateInput.bind(this)
    this.submit = this.submit.bind(this)
    this.showDictionary = this.showDictionary.bind(this)
  }

  updateInput(e){
    this.setState({
      input: e.target.value,
    })
    document.getElementById('dictionary').setAttribute("style", "opacity:0");
    document.getElementById('returnedStats').setAttribute("style", "opacity:0");
    stats =[];
    word_dictionary=[];
  }

  submit(e){
    if (typeof text !== 'undefined'){
      for (const prop of Object.getOwnPropertyNames(text)){
        delete text[prop]
      }
    }
    
    e.preventDefault();
    stats = [];
    this.setState({
      text:'loading ...',
      input: ''
    });

    // http://3.73.161.251:5000/
    fetch('/',{
      method: "POST",
      mode:"cors",
      headers:{
        "Content-Type":"application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        'Text: ':this.state.input
      })
    })
    .then(response => response.json())
    .then(json => 
      text = json
    ).then(()=> this.setState({
      text: ''
      })
    ).catch(e => console.log('error: ' + e))  
  }

  showDictionary(){
    if (word_dictionary.length >= 1) {
      document.getElementById('dictionary').setAttribute("style","opacity:1")
    }
  }

  render(){
    console.log('rendering')
    if(typeof text !== 'undefined'){
      if (text.hasOwnProperty('Dictionary')){
        var dictionary = text['Dictionary'];
        delete text['Dictionary'];
        Object.keys(dictionary).map(function(key){
          word_dictionary.push([key + ': ', ' ' + dictionary[key]])
        });
        word_dictionary.unshift(['List of Words: ', ' frequency']);
        document.getElementById('returnedStats').setAttribute("style","opacity:1");
      }
      Object.keys(text).map(function(key){
        stats.push([key, text[key]]);
      });
    }

  return (
    <div className="App">
      <h1>Text Processing Tool</h1>

      <Form 
        submit={this.submit}
         updateInput={this.updateInput}
         inputValue={this.state.input}
      />

      <div className='flaskResponse' id='returnedStats'>
        { 
          stats.map((item, index) => {
            return (
              <TextStatistics key={index} title={item[0]} stats={item[1]}/>
            )
          })
        }
        <button className='dictionaryButton' onClick={this.showDictionary}>Show Words</button>
        <Dictionary />
      </div>

    </div>
  );
}}


export default App;
