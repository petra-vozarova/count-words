import React, { useEffect, useState } from 'react';
import './App.css';

var text;
var stats=[];
var word_dictionary = []; 

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

  componentWillUnmount(){
    const controller = new AbortController();
    const { signal } = controller;
    controller.abort();
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
  
    fetch('https://vozarova-word-counter.herokuapp.com/',{
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
    ).catch(e => console.log('error' + e))  
  }

  showDictionary(){
    if (word_dictionary.length >= 1) {
      document.getElementById('dictionary').setAttribute("style","opacity:1")
    }
  }

  render(){
    if(typeof text !== 'undefined'){
      if (text.hasOwnProperty('Dictionary')){
        var dictionary = text['Dictionary'];
        delete text['Dictionary'];
        var make_dictionary = Object.keys(dictionary).map(function(key,index){
          word_dictionary.push([key + ': ', ' ' + dictionary[key]])
        });
        word_dictionary.unshift(['List of Words: ', ' frequency']);
        //console.log(word_dictionary+ 'dictionary');
        document.getElementById('returnedStats').setAttribute("style","opacity:1");
      }
      var keyList = Object.keys(text).map(function(key, index){
        stats.push([key, text[key]]);
      });
    }

  return (
    <div className="App">
      <h1>Word Counter</h1>
      <div>
        <label>
          Fancy some stats on your text?
          </label>
          <form onSubmit={this.submit}>
            <textarea placeholder=' Get the counter started ... ' onChange={this.updateInput} value={this.state.input}></textarea>
            <button onClick={this.submit}>Submit</button>
          </form>

      </div>
      <div className='flaskResponse' id='returnedStats'>
        <div value={this.state.text}>{this.state.text}
        </div>
        <div className='stats' id='result'>
          {
            stats.map((item)=>(
            <li>{item}</li>
          ))
          }
        </div>
        <button onClick={this.showDictionary}>List of Words</button>
        <div  className='stats' id='dictionary'>
        {
          word_dictionary.map((item)=>(
          <li>{item}</li>
          ))
        } 
        </div>
      </div>
    </div>
  );
}
}


export default App;
