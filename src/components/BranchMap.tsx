import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Branch {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  district: string;
  province: string;
}

interface BranchMapProps {
  branches: Branch[];
  selectedBranch?: Branch | null;
  onMarkerClick?: (branch: Branch) => void;
}

const BranchMap = ({ branches, selectedBranch, onMarkerClick }: BranchMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [7.8731, 80.7718], // Center of Sri Lanka
      zoom: 8,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when branches change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const defaultIcon = L.divIcon({
      className: "branch-marker",
      html: `<div style="
        width: 28px; height: 28px; border-radius: 50%;
        background: hsl(205, 80%, 20%);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      "><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    branches.forEach((branch) => {
      const marker = L.marker([branch.lat, branch.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: 'DM Sans', sans-serif; min-width: 200px;">
            <h3 style="font-weight: 700; font-size: 14px; margin: 0 0 8px; color: #1a1a2e;">${branch.name}</h3>
            <p style="font-size: 12px; color: #666; margin: 0 0 4px;">📍 ${branch.address}</p>
            <p style="font-size: 12px; color: #666; margin: 0 0 4px;">📞 ${branch.phone}</p>
            <p style="font-size: 12px; color: #666; margin: 0 0 8px;">🕐 ${branch.hours}</p>
            <a href="https://maps.google.com/?q=${branch.lat},${branch.lng}" target="_blank" rel="noopener noreferrer"
              style="display: inline-block; font-size: 12px; font-weight: 600; color: hsl(355, 78%, 56%); text-decoration: none;">
              Get Directions →
            </a>
          </div>`,
          { closeButton: true, maxWidth: 280 }
        );

      marker.on("click", () => {
        onMarkerClick?.(branch);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds if branches exist
    if (branches.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [branches, onMarkerClick]);

  // Fly to selected branch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedBranch) return;

    map.flyTo([selectedBranch.lat, selectedBranch.lng], 14, { duration: 1 });

    // Open the matching marker's popup
    markersRef.current.forEach((marker) => {
      const latlng = marker.getLatLng();
      if (
        Math.abs(latlng.lat - selectedBranch.lat) < 0.001 &&
        Math.abs(latlng.lng - selectedBranch.lng) < 0.001
      ) {
        marker.openPopup();
      }
    });
  }, [selectedBranch]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl"
      style={{ minHeight: "400px" }}
    />
  );
};

export default BranchMap;
