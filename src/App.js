import './App.css';
// import Navbar from './components/Navbar';
import Home from './screens/Home';

// require('dotenv').config();

// from react-router-dom website
import {
  BrowserRouter as Router,
  Routes,
  // Switch,     => Switch is changed to Routes
  Route
} from 'react-router-dom';

import Login from './screens/Login';
import Signup from './screens/Signup.js';
// import Cart from './screens/Cart.js';
import MyOrder from './screens/MyOrder.js';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.js';

// can contain only one div element
// thus to contain multiple elements, wrap them in a div or in an empty tag

function App() {
  return (
    // make whole application global => wrap it in CartProvider
    <CartProvider>

      {/* // make the whole app a router => replace div with Router */}
      <Router>
        {/* whatever you type in other files (eg Navbar.js), it will not be visible until it is added to App.js */}
        {/* also whatever is taken make sure you import it */}
        {/* since home contains navbar => no need to import navbar individually */}
        {/* <div><Navbar/></div> */}

        <div>
          <Routes>
            {/* kaha jana hain aur kab voh yaha pe define karenge */}
            {/* remember the path given */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
        
      </Router>
    </CartProvider>

  );
}

export default App;
