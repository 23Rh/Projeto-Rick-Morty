import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEpisode, getCharacterFromUrl } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetail = async () => {
      try {
        setLoading(true);
        const episodeData = await getEpisode(id);
        setEpisode(episodeData);

        const characterPromises = episodeData.characters.map(url => getCharacterFromUrl(url));
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
        
        setError(null);
      } catch (err) {
        setError('Erro ao carregar detalhes do episódio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodeDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!episode) return <div className="text-center py-8">Episódio não encontrado</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/episodes">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Episódios
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{episode.name}</h1>
        <div className="space-y-2">
          <p className="text-lg">
            <strong>Episódio:</strong> {episode.episode}
          </p>
          <p className="text-lg">
            <strong>Data de Estreia:</strong> {episode.air_date}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Personagens no Episódio</h2>
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
                  <CardTitle className="text-lg line-clamp-1">
                    {character.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {character.species}
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

export default EpisodeDetail;

