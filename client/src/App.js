import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer.js';


import { Header, About, Footer } from './pageMarkup.js';
import Listen from './listen.js';
import Upload from './upload.js';
import History from './history.js';
import Detail from './detail.js';

import './ws.js';



const store = createStore(reducer);



const App = () => (

  <Router>
    <Provider store={ store }>
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
          <Route path="/history" component={ History }/>
          <Route path='/clip/:id' component={ Detail }/>
          <Route path='*' render={() => ( 

            <div className='not-found'>
              <h3>Page not found</h3>
              <i class="fa fa-bug" aria-hidden="true"></i>
            </div>

          )}/>
        </Switch>

      </div>

      <About/>
      <Footer/>

      </div>
    </Provider>
  </Router>

);


export default App;