import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MapPin, Palette, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPin {
  id: string;
  name: string;
  description: string;
  image: string;
  coordinates: [number, number];
  city: string;
  type: 'artist' | 'museum';
}

interface InteractiveMapProps {
  type: 'artists' | 'museums';
  data: MapPin[];
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ type, data }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.2973, 4.5709], // Colombia center
      zoom: 5.5,
      pitch: 20,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add pins
      data.forEach((pin) => {
        if (!map.current) return;

        // Create marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.innerHTML = `
          <div class="w-8 h-8 bg-gradient-card rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-transform hover:scale-110">
            ${type === 'artists' 
              ? '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
              : '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>'
            }
          </div>
        `;

        // Add click event
        markerEl.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedPin(pin);
        });

        // Create marker
        new mapboxgl.Marker(markerEl)
          .setLngLat(pin.coordinates)
          .addTo(map.current!);
      });
    });

    // Close popup when clicking on map
    map.current.on('click', () => {
      setSelectedPin(null);
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card className="border-none shadow-artistic">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <div className="flex justify-center">
                {type === 'artists' ? (
                  <Palette className="h-16 w-16 text-primary" />
                ) : (
                  <Building className="h-16 w-16 text-primary" />
                )}
              </div>
              <h3 className="text-2xl font-bold">Mapa Interactivo de Colombia</h3>
              <p className="text-muted-foreground">
                {type === 'artists' ? 'Descubre artistas' : 'Explora museos'} por toda Colombia
              </p>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="space-y-2">
                <label htmlFor="mapbox-token" className="text-sm font-medium">
                  Token de Mapbox
                </label>
                <input
                  id="mapbox-token"
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1IjoiLi4uLi4..."
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Obtén tu token gratuito en{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
                Cargar Mapa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Card className="border-none shadow-artistic overflow-hidden">
        <CardContent className="p-0">
          <div ref={mapContainer} className="h-96 w-full" />
        </CardContent>
      </Card>

      {/* Pin Details Popup */}
      {selectedPin && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Card className="max-w-md mx-4 animate-scale-in">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={`https://images.unsplash.com/${selectedPin.image}?w=400&h=200&fit=crop`}
                  alt={selectedPin.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPin(null)}
                  className="absolute top-2 right-2 w-8 h-8 p-0 bg-background/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{selectedPin.city}</span>
                  </div>
                  <h3 className="text-xl font-bold">{selectedPin.name}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedPin.description}
                </p>
                
                <Button className="w-full" onClick={() => setSelectedPin(null)}>
                  {type === 'artists' ? 'Ver Portafolio' : 'Más Información'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;