import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocation, getCharacterFromUrl } from '../services/api';
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

const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationDetail = async () => {
      try {
        setLoading(true);
        const locationData = await getLocation(id);
        setLocation(locationData);

        if (locationData.residents.length > 0) {
          const residentPromises = locationData.residents.map((url) =>
            getCharacterFromUrl(url)
          );
          const residentData = await Promise.all(residentPromises);
          setResidents(residentData);
        }

        setError(null);
      } catch (err) {
        setError('Erro ao carregar detalhes da localização');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocationDetail();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!location) return <div className="text-center py-8">Localização não encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/locations">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Localizações
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">{location.name}</h1>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-lg">Tipo: </span>
            <Badge variant="secondary" className="text-base">
              {location.type}
            </Badge>
          </div>
          <div>
            <span className="font-semibold text-lg">Dimensão: </span>
            <span className="text-lg">{location.dimension}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">
          Residentes ({residents.length})
        </h2>

        {residents.length === 0 ? (
          <p className="text-muted-foreground">Nenhum residente conhecido nesta localização.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {residents.map((resident) => (
              <Link key={resident.id} to={`/character/${resident.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="p-0">
                    <img
                      src={resident.image}
                      alt={resident.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg line-clamp-1">
                      {resident.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {resident.species}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetail;

