import { useState, useEffect } from 
  'react'
;
import { Link } from 'react-router-dom';
import { getLocations } from '../services/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        setLoading(true);
        const data = await getLocations(currentPage);
        setLocations(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar localizações');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocationsData();
  }, [currentPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Localizações</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Link key={location.id} to={`/location/${location.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {location.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">Tipo: </span>
                    <Badge variant="secondary">{location.type}</Badge>
                  </div>
                  <div>
                    <span className="font-semibold">Dimensão: </span>
                    <span className="text-sm">{location.dimension}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Residentes: </span>
                    <span className="text-sm">{location.residents.length}</span>
                  </div>
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

export default Locations;

