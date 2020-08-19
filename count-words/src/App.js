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
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    const controller = new AbortController();
    const { signal } = controller;
    controller.abort();
  }

  updateInput(e){
    this.setState({
      input: e.target.value
    })
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
    })
  
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
    )
    .catch(e => console.log('error' + e))
    
  }

  render(){
    if(typeof text !== 'undefined'){
      if (text.hasOwnProperty('Dictionary')){
        var dictionary = text['Dictionary'];
        delete text['Dictionary'];

        var make_dictionary = Object.keys(dictionary).map(function(key,index){
          word_dictionary.push([key + ': ', ' ' + dictionary[key]])
        });
        word_dictionary.unshift(['List of Words: ', ' frequency'])
        console.log(word_dictionary+ 'dictionary')
      }
      var keyList = Object.keys(text).map(function(key, index){
        stats.push([key, text[key]]);
      })

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
        <div value={this.state.text}>{this.state.text}
        </div>
        <div className='stats' id='result'>
          {
            stats.map((item)=>(
            <li>{item}</li>
          ))
          }
        </div>
        <div  className='stats' id='dictionary'>
        {
          word_dictionary.map((item)=>(
          <li>{item}</li>
          ))
        } 
        </div>
    </div>
  );
}
}


export default App;
