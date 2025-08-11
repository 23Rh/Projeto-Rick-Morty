import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Rick and Morty</h1>
        <p className="text-xl text-muted-foreground">
          Explore o universo de Rick and Morty através de personagens, episódios e localizações
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Personagens</CardTitle>
            <CardDescription>
              Descubra todos os personagens do universo Rick and Morty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/characters">
              <Button className="w-full">Ver Personagens</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Episódios</CardTitle>
            <CardDescription>
              Explore todos os episódios da série
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/episodes">
              <Button className="w-full">Ver Episódios</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Localizações</CardTitle>
            <CardDescription>
              Conheça as diferentes dimensões e localizações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/locations">
              <Button className="w-full">Ver Localizações</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;

