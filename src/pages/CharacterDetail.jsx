import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter, getEpisodeFromUrl } from '../services/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        const characterData = await getCharacter(id);
        setCharacter(characterData);

        const episodePromises = characterData.episode.map(url => getEpisodeFromUrl(url));
        const episodeData = await Promise.all(episodePromises);
        setEpisodes(episodeData);
        
        setError(null);
      } catch (err) {
        setError('Erro ao carregar detalhes do personagem');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterDetail();
  }, [id]);

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
  if (!character) return <div className="text-center py-8">Personagem não encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/characters">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Personagens
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={character.image}
            alt={character.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(character.status)}`}></div>
                <span className="text-lg">{getStatusText(character.status)}</span>
              </div>
              
              <div>
                <span className="font-semibold">Espécie: </span>
                <Badge variant="secondary" className="ml-2">
                  {character.species}
                </Badge>
              </div>
              
              {character.type && (
                <div>
                  <span className="font-semibold">Tipo: </span>
                  <span>{character.type}</span>
                </div>
              )}
              
              <div>
                <span className="font-semibold">Gênero: </span>
                <span>{character.gender}</span>
              </div>
              
              <div>
                <span className="font-semibold">Localização: </span>
                <span>{character.location.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Episódios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map((episode) => (
            <Link key={episode.id} to={`/episode/${episode.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{episode.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    <strong>Episódio:</strong> {episode.episode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Data:</strong> {episode.air_date}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

