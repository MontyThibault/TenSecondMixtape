import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';


import { Header, About, Footer } from './pageMarkup.js';
import Listen from './listen.js';
import Upload from './upload.js';
import History from './history.js';
import Detail from './detail.js';


const App = () => (

  <Router>
    <div>

      <Header/>

      <div className='main'>
         <div className='shaders'>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <Route exact path="/" render={() => (
          <Redirect to='/listen'/>
        )}/>
        
        <Route path="/listen" component={ Listen }/>
        <Route path="/upload" component={ Upload }/>
        <Route path="/history" component={ History }/>
        <Route path='/clip/:id' component={ Detail }/>

      </div>

      <About/>
      <Footer/>

    </div>
  </Router>

);


// class App extends Component {
//   state = {users: []}

//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({ users }));
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}</div>
//         )}
//       </div>
//     );
//   }
// }


export default App;