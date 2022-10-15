import './App.css';
import Main from './components/Main/Main';
import Filter from './components/Filter/Filter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/filter'
          element={<Filter />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
