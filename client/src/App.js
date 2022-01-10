import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Container from './components/Layout/Container';
import RestrictedAccess from './pages/RestrictedAccess/RestrictedAccess';
import AccessMatrix from './pages/AccessMatrix/AccessMatrix';
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route exact path="/restricted-content" element={<RestrictedAccess />} />
          <Route exact path="/access-matrix" element={<AccessMatrix />} />
          <Route path="*" render={() => <Navigate to="/restricted-content" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
