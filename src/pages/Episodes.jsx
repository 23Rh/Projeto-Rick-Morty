import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEpisodes } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      try {
        setLoading(true);
        const data = await getEpisodes(currentPage);
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar episódios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodesData();
  }, [currentPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Episódios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <Link key={episode.id} to={`/episode/${episode.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {episode.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Episódio:</strong> {episode.episode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Data de Estreia:</strong> {episode.air_date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Personagens:</strong> {episode.characters.length}
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

export default Episodes;

