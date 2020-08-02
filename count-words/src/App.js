import React, { useEffect, useState } from 'react';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      input: '',
      text: '',
      message: {'name':'petra'}
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
    this.setState({
      text:this.state.input,
    })
    console.log('fetching');
      fetch('/result',{
        method: 'GET',
        cache: "no-cache",
        mode: 'cors',
        headers: { 
          'Content-Type': 'text/plain'
        },
        body:'ahoj'
      }
      )
      .then(response => {
        this.setState({
          text: response
        })
      })
      // .then(json =>{
      //   this.setState({
      //     text: json
      //   })
      // })


  }
  render(){
  return (
    <div className="App">
      <h1>Word Counter</h1>
      <div>
        <label>
          Words
          <form onSubmit={this.submit} action="http://localhost:5000/result" method="get">
            <input onChange={this.updateInput} value={this.state.input}>
            </input>
          </form>
        </label>
      </div>
        <div value={this.state.text}>{this.state.text}
        </div>
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
