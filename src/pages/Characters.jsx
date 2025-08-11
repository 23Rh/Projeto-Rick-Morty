import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCharacters } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        setLoading(true);
        const data = await getCharacters(currentPage);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar personagens');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharactersData();
  }, [currentPage]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Morto';
      default: return 'Desconhecido';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Personagens</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link key={character.id} to={`/character/${character.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="p-0">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-1">
                  {character.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}></div>
                    <span className="text-sm">{getStatusText(character.status)}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {character.species}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <strong>Localização:</strong> {character.location.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Characters;

