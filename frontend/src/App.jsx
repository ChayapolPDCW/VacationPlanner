import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './app/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; 