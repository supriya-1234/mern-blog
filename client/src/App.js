import React from 'react';
import axios from 'axios';
import './index.css';

class App extends React.Component {

  state={
    title : "",
    body :  "",
    posts :[]
  }
componentDidMount = () =>{
  this.getBlogPost();
}
// fn to fetch the data from api
getBlogPost = () =>{
  axios.get('/api')
     .then((response) =>{
       const data = response.data;
       this.setState({
         posts : data
       });
       console.log("data has been received ");
     })
     .catch(() => {
       console.log('error in receiving data !!')
     });
}

 handleChange =({target}) =>{
   const { name, value} = target;
   this.setState({
     [name] : value
   })
 }

 handleSubmit = (event) =>{
   event.preventDefault();
   const payload = {
     title : this.state.title,
     body : this.state.body
   }
   
   axios({
     url :'/api/save',
     method : 'POST',
     data : payload
   }).then(() => {
     console.log("data has been send to the server ");
     this.resetInput();
     this.getBlogPost();
    })
    .catch( () => console.log('error sending data  to the server '));
  }

 resetInput =() =>{
  this.setState({
    title : "",
    body : ""
  })
}

displayBlogPost = (posts) =>{
 if(!posts.length) return null;

 return  posts.map((post, index) =>(
   <div key={index}>
    <h3>{post.title}</h3>
    <p>{post.body}</p> 
   </div>
 ))
}
  render(){
    return (
         <div className="App">
         <form   onSubmit ={this.handleSubmit}>
           <div className='form-input-title'>
            <input 
            type='text' 
            name='title'
            placeholder='title' 
            value={this.state.title} 
            onChange={this.handleChange} 
            />
           </div>

           <div className ='form-input-text'>
           <textarea 
           placeholder='body' 
           cols='30' 
           rows='10' 
           name="body"
           value={this.state.body}
           onChange={this.handleChange} 
           />
           </div>
           <button>Submit</button>
         </form>
         <div className="blog">
          {this.displayBlogPost(this.state.posts)}
        </div>
         
         </div>
    )
  }
}

export default App;


