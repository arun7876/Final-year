import React, { useState, useMemo, useEffect } from "react";
import { MapPin, Users, Award, Heart, Phone, Navigation } from "lucide-react";
import { CiMedicalCase } from "react-icons/ci";
import "../styles/hospital.css";

// Sample hospitals data from Tamil Nadu
const SAMPLE_HOSPITALS = [
  // Chennai
  { id: 1, name: "Apollo Hospitals (Greams Road)", city: "Chennai", lat: 13.0024, lon: 80.2316, address: "Chennai, Tamil Nadu", type: "Super Specialty" },
  { id: 2, name: "Rajiv Gandhi Government General Hospital", city: "Chennai", lat: 13.0045, lon: 80.2761, address: "Chennai, Tamil Nadu", type: "Government" },
  { id: 3, name: "Fortis Malar Hospital", city: "Chennai", lat: 13.0024, lon: 80.2316, address: "Chennai, Tamil Nadu", type: "Private" },
  
  // Coimbatore
  { id: 4, name: "Ganga Hospital", city: "Coimbatore", lat: 11.0089, lon: 76.9755, address: "Coimbatore, Tamil Nadu", type: "Super Specialty" },
  { id: 5, name: "Kovai Medical Center and Hospital (KMCH)", city: "Coimbatore", lat: 11.0058, lon: 76.9736, address: "Coimbatore, Tamil Nadu", type: "Private" },
  { id: 6, name: "PSG Hospitals", city: "Coimbatore", lat: 11.0067, lon: 76.9575, address: "Coimbatore, Tamil Nadu", type: "Private" },
  
  // Madurai
  { id: 7, name: "Meenakshi Mission Hospital", city: "Madurai", lat: 9.9252, lon: 78.1198, address: "Madurai, Tamil Nadu", type: "Super Specialty" },
  { id: 8, name: "Apollo Specialty Hospitals", city: "Madurai", lat: 9.9265, lon: 78.1150, address: "Madurai, Tamil Nadu", type: "Private" },
  { id: 9, name: "Velammal Medical College Hospital", city: "Madurai", lat: 9.9312, lon: 78.1195, address: "Madurai, Tamil Nadu", type: "Government" },
  
  // Tiruchirappalli (Trichy)
  { id: 10, name: "Kauvery Hospital", city: "Trichy", lat: 10.7905, lon: 78.7047, address: "Tiruchirappalli, Tamil Nadu", type: "Super Specialty" },
  { id: 11, name: "Apollo Specialty Hospitals", city: "Trichy", lat: 10.7912, lon: 78.7089, address: "Tiruchirappalli, Tamil Nadu", type: "Private" },
  { id: 12, name: "Mahatma Gandhi Memorial Govt Hospital", city: "Trichy", lat: 10.8016, lon: 78.6731, address: "Tiruchirappalli, Tamil Nadu", type: "Government" },
  
  // Salem
  { id: 13, name: "Manipal Hospital", city: "Salem", lat: 11.4745, lon: 78.1367, address: "Salem, Tamil Nadu", type: "Super Specialty" },
  { id: 14, name: "Vinayaka Mission's Hospital", city: "Salem", lat: 11.4658, lon: 78.1323, address: "Salem, Tamil Nadu", type: "Private" },
  { id: 15, name: "Neuro Foundation", city: "Salem", lat: 11.4734, lon: 78.1422, address: "Salem, Tamil Nadu", type: "Specialty" },
  
  // Tirunelveli
  { id: 16, name: "Shifa Hospitals", city: "Tirunelveli", lat: 8.7426, lon: 77.7310, address: "Tirunelveli, Tamil Nadu", type: "Private" },
  { id: 17, name: "Royal Hospital", city: "Tirunelveli", lat: 8.7440, lon: 77.7345, address: "Tirunelveli, Tamil Nadu", type: "Private" },
  { id: 18, name: "Tirunelveli Medical College Hospital", city: "Tirunelveli", lat: 8.7465, lon: 77.7289, address: "Tirunelveli, Tamil Nadu", type: "Government" },
  
  // Vellore
  { id: 19, name: "Christian Medical College (CMC)", city: "Vellore", lat: 12.9716, lon: 79.1304, address: "Vellore, Tamil Nadu", type: "Super Specialty" },
  { id: 20, name: "Sri Narayani Hospital & Research Centre", city: "Vellore", lat: 12.9752, lon: 79.1319, address: "Vellore, Tamil Nadu", type: "Private" },
  { id: 21, name: "Apollo KH Hospital (Melvisharam)", city: "Vellore", lat: 12.7642, lon: 79.4023, address: "Vellore District, Tamil Nadu", type: "Private" },
  
  // Erode
  { id: 22, name: "Thangam Hospital", city: "Erode", lat: 11.3411, lon: 77.7172, address: "Erode, Tamil Nadu", type: "Private" },
  { id: 23, name: "Sudha Hospitals", city: "Erode", lat: 11.3424, lon: 77.7094, address: "Erode, Tamil Nadu", type: "Private" },
  { id: 24, name: "Erode Medical Center (EMC)", city: "Erode", lat: 11.3402, lon: 77.7256, address: "Erode, Tamil Nadu", type: "Private" },
  
  // Tiruppur
  { id: 25, name: "Revathi Medical Center", city: "Tiruppur", lat: 11.1081, lon: 77.3411, address: "Tiruppur, Tamil Nadu", type: "Private" },
  { id: 26, name: "Velan Hospital", city: "Tiruppur", lat: 11.1089, lon: 77.3365, address: "Tiruppur, Tamil Nadu", type: "Private" },
  { id: 27, name: "Government Headquarters Hospital", city: "Tiruppur", lat: 11.1145, lon: 77.3544, address: "Tiruppur, Tamil Nadu", type: "Government" },
];

// Distance calculation: Use Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(2);
}

function Hospital() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHospitals = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = parseFloat(pos.coords.latitude);
      const lng = parseFloat(pos.coords.longitude);
      setUserLocation({ lat, lng });
      loadSampleHospitals(lat, lng);
    }, (err) => {
      console.error("Geolocation error:", err);
      // Use sample hospitals even without location
      loadSampleHospitals(null, null);
    });
  };

  const loadSampleHospitals = (userLat, userLng) => {
    try {
      const mappedData = SAMPLE_HOSPITALS.map((h, idx) => {
        const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
        const distance = userLat && userLng ? parseFloat(getDistance(userLat, userLng, h.lat, h.lon)) : null;
        
        return {
          ...h,
          rating: rating,
          reviews: Math.floor(Math.random() * 300) + 50,
          beds: Math.floor(Math.random() * 500) + 50,
          specialties: [h.type],
          location: h.city,
          ambulance: Math.random() > 0.5,
          image: "🏥",
          phone: "(555) " + Math.floor(100 + Math.random() * 900) + "-" + Math.floor(1000 + Math.random() * 9000),
          emergency: Math.random() > 0.3 ? "Yes" : "Limited",
          distance: distance
        };
      });

      // If user location available, filter by distance and sort
      let finalData = mappedData;
      if (userLat && userLng) {
        finalData = mappedData
          .filter(h => h.distance <= 50) // Show hospitals within 50km
          .sort((a, b) => a.distance - b.distance);
      } else {
        // Without location, just show all hospitals
        finalData = mappedData.sort((a, b) => a.city.localeCompare(b.city));
      }
      
      setHospitals(finalData);
    } catch (err) {
      console.error("Failed to load hospitals:", err);
      setError("Failed to load hospitals data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  // Get unique locations
  const locations = ["All Locations", ...new Set(hospitals.map((h) => h.location))];

  // Filter hospitals based on location and search
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        hospital.location === selectedLocation;

      const matchesSearch =
        searchTerm === "" ||
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesLocation && matchesSearch;
    });
  }, [hospitals, selectedLocation, searchTerm]);

  return (
    <div className="hospital-container">
      {/* Header */}
      <div className="hospital-header">
        <h1>Find Hospitals Near You</h1>
        <p>Discover top-rated hospitals and medical centers in your area</p>
      </div>

      {/* Search & Filter Section */}
      <div className="search-filter-box">
        <div className="search-filter-grid">
          {/* Search by Name/Specialty */}
          <div>
            <label>🔍 Search Hospital or Specialty</label>
            <input
              type="text"
              placeholder="e.g., Cardiology, Heart Hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Location */}
          <div>
            <label>📍 Filter by Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location === "All Locations" ? "" : location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>
            {loading ? "Loading hospital data..." : `Found ${filteredHospitals.length} hospital(s)`}
          </p>
          {!loading && (
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              📝 Sample data from Tamil Nadu - Future updates will include real-time availability and booking features
            </p>
          )}
        </div>
      </div>

      {/* Hospitals Grid */}
      {loading ? (
        <div className="no-results" style={{ padding: "40px" }}>
          <h2>Locating nearby hospitals...</h2>
          <p>Please allow location access if prompted.</p>
        </div>
      ) : error ? (
        <div className="no-results" style={{ padding: "40px" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : filteredHospitals.length > 0 ? (
        <div className="hospitals-grid">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="hospital-card">
              {/* Card Header with Gradient */}
              <div className="hospital-card-header">
                <div className="hospital-card-icon">{hospital.image}</div>
                <div className="hospital-card-rating">
                  <div className="hospital-card-rating-score">
                    ⭐ {hospital.rating}
                  </div>
                  <div className="hospital-card-rating-count">
                    ({hospital.reviews} reviews)
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="hospital-card-body">
                {/* Hospital Name */}
                <h3 className="hospital-name">{hospital.name}</h3>

                {/* Location */}
                <div className="location-info">
                  <MapPin className="location-icon" size={20} />
                  <div className="location-details">
                    <p style={{ color: '#3498db', fontWeight: 'bold' }}>
                      {userLocation ? `${hospital.distance} km away` : hospital.location}
                    </p>
                    <p>{hospital.address}</p>
                  </div>
                </div>

                {/* Hospital Stats */}
                <div className="hospital-stats">
                  <div className="stat-item">
                    <CiMedicalCase className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Medical</div>
                      <div className="stat-label">Emergency: {hospital.emergency}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Users className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Beds</div>
                      <div className="stat-value">{hospital.beds}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Heart className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Ambulance</div>
                      <div className="stat-value">
                        {hospital.ambulance ? "✓ Yes" : "✗ No"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="specialties-section">
                  <span className="specialties-label">Specialties</span>
                  <div className="specialties-tags">
                    {hospital.specialties.map((specialty, idx) => (
                      <span key={idx} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <a href={`tel:${hospital.phone}`} className="btn btn-call">
                    <Phone size={16} />
                    Call
                  </a>
                  {/* 2. Fix Google Maps link */}
                  <button className="btn btn-directions" onClick={() => {
                    console.log(`Opening map for ${hospital.name} at q=${hospital.lat},${hospital.lon}`);
                    window.open(`https://www.google.com/maps?q=${hospital.lat},${hospital.lon}`);
                  }}>
                    <Navigation size={16} />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Results */
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No hospitals found</h2>
          <p>Try adjusting your search keywords or location filters.</p>
        </div>
      )}
    </div>
  );
}

export default Hospital;
