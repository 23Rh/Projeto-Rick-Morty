import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Episodes from './pages/Episodes';
import EpisodeDetail from './pages/EpisodeDetail';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episode/:id" element={<EpisodeDetail />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:id" element={<LocationDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

