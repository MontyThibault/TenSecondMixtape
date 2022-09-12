import React from 'react';
import './App.css';


class App extends React.Component {

  render() {

    return (

      <div>

        <h1>CollaborativeRadio vinnie is 21</h1>
        <button>About</button>
        <button>Share</button>

        <div>
          <p>Main player area</p>
          <button>Upload</button>
        </div>

        <div>
          <p>History</p>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
          </ol>
        </div>


        <div>
          <p>Statistics</p>

          <span>Active users: 0</span>
          <span>Current users (past 24h): 0</span>
        </div>

      </div>

    );

  }

}


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