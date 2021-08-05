import axios from "axios";

export async function getMarkers() {
  const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
  const markers = locations.map((l) => ({
    id: l.id,
    position: {
      lat: l.latitude,
      lng: l.longitude,
    },
    name: l.name,
    gas: {
      unleaded: l.unleaded,
      midgrade: l.midgrade,
      premium: l.premium,
    },
    phone: l.phone,
    siteType: l.sitetype,
    amenities: l.amenities,
    restaurants: l.restaurants,
    state: l.state,
    city: l.city,
  }));
  return markers;
}
