import React, { useEffect, useState } from 'react';
import './App.css';
var message ='ahoj';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input: '',
      text: '',
      message: message
    }
    this.updateInput = this.updateInput.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateInput(e){
    this.setState({
      input: e.target.value
    })
  }

  submit(e){
    e.preventDefault();
    this.setState({
      text:this.state.input,
    })
    console.log('fetching');
      // fetch('http://127.0.0.1:5000/',{
      //   method: 'GET',
      //   // cache: "no-cache",
      //   // mode: 'cors',
      //   // headers: { 
      //   //   'Content-Type': 'application/json'
      //   // },
      //   // body:{
      //   //   'name':'petra'
      //   // }
      // }
      // )
      // .then(response => {
      //   response.json()
      //   console.log('ahoj')
      // })
      //  .then(json =>{
      //   this.setState({
      //     text: json
      //   })
      // })
    //   var payload = {
    //     name: 1,
    //     b: 2
    // };
    
    // var data = new FormData();
    // data.append( "json", JSON.stringify( payload ) );
    fetch('/',{
      method: "POST",
      mode:"cors",
      headers:{
         "Content-Type":"application/json",
        "Accept": "application/json",
         "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        name:this.state.input
      })
    })
    .then(response => response.json())
    .then(json => console.log(json)
    // //   this.setState({
    // //   message: json.name
    // // })
    )
    .catch(e => console.log('error' + e))

  }
  render(){
  return (
    <div className="App">
      <h1>Word Counter</h1>
      <div>
        <label>
          Words
          <form onSubmit={this.submit}>
            <input onChange={this.updateInput} value={this.state.input}>
            </input>
          </form>
        </label>
      </div>
        <div value={this.state.text}>{this.state.text}
        </div>
        <div>{this.state.message}</div>
        {/* <Flusk/> */}
    </div>
  );
}
}

// function Flusk(){
//   const [name, setName] = useState([])
//   useEffect(()=>{
//     fetch('/result',{
//       method: "POST",
//       cache: "no-cache",
//       headers:{
//         "content_type": "application/json"
//       },
//       body:JSON.stringify(this.state.value)
//     }
//     )
//     .then(response => {
//       return response.json()
//     })
//     }, []);
//     console.log(name)

//   return <div>name</div>;
// }

export default App;
