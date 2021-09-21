import { BrowserRouter, Route, Switch }  from "react-router-dom";
import Home from './components/Home';
import EventCalendar from './components/EventCalendar';
import Navbars from './components/Navbars';
import Admin from './components/Admin';
import Programs from './components/Programs'
import Contact from './components/Contact'

function App() {
  return (
    <BrowserRouter >
      <Navbars sticky="top"/>
      <Switch>
        <Route component={Home} path='/' exact/>
        <Route component={Programs} path='/program' exact/>
        <Route component={EventCalendar} path='/calendar' exact/>
        <Route component={Admin} path='/admin' exact/>
        <Route component={Contact} path='/contact' exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
