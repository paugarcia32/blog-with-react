import './App.css';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Post from './Post';
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={LoginPage}/>
      </Route>
    </Routes>


  );
}

export default App;
