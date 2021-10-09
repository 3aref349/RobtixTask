import React ,{ Component } from 'react';
import Navbar from './shared/Navbar'
import { BrowserRouter , Route ,Switch} from 'react-router-dom';

import Dashboard from './components/Task/dashboard';
import Search from './components/search/Search';

class App extends Component{


render(){


  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
      <Route exact path='/home' component={Dashboard} />
      <Route path='/search' component={Search} />

      {/* //<Route path="/:post_id" component={Post} /> */}
      </Switch>
     

    </div>
    </BrowserRouter>
   

  );
}
}

export default App;
