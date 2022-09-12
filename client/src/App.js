import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';



import { Header, About, Footer } from './components/pages/pageMarkup.js';
import Listen from './components/pages/listen.js';
import Upload from './components/pages/upload.js';
import Detail from './components/pages/detail.js';


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

        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to='/listen'/>
          )}/>
          
          <Route path="/listen" component={ Listen }/>
          <Route path="/upload" component={ Upload }/>
          <Route path='/clip/:id' component={ Detail }/>
          <Route path='*' render={() => ( 

            <div className='not-found'>
              <h3>Page not found</h3>
              <i className="fa fa-bug" aria-hidden="true"></i>
            </div>

          )}/>
        </Switch>

      </div>

      <About/>
      <Footer/>

    </div>
  </Router>

);


export default App;