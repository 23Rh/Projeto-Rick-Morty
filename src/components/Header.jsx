import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Rick and Morty
          </Link>
          <nav className="flex space-x-4">
            <Link to="/characters">
              <Button 
                variant={isActive('/characters') ? 'secondary' : 'ghost'}
                className="text-primary-foreground hover:text-primary-foreground"
              >
                Personagens
              </Button>
            </Link>
            <Link to="/episodes">
              <Button 
                variant={isActive('/episodes') ? 'secondary' : 'ghost'}
                className="text-primary-foreground hover:text-primary-foreground"
              >
                Episódios
              </Button>
            </Link>
            <Link to="/locations">
              <Button 
                variant={isActive('/locations') ? 'secondary' : 'ghost'}
                className="text-primary-foreground hover:text-primary-foreground"
              >
                Localizações
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

