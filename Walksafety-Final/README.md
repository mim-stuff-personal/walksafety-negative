#### Technical Details

* **Basemap:** Mapbox Style Tileset (via Mapbox Studio)

* **Feature Layers:**
 1. Prediction Points Layer - GeoJSON 
 2. Small Sized Layers (Intersection / Pedestrian Crossing / Safety Zones) - GeoJSON converted to MBTiles via Tippecanoe, then uploaded directly to Mapbox Studio
 3. Large Sized Layers (Building / Road Network) - GeoJSON converted to MBTiles via Tippecanoe, then uploaded via Tilesets CLI to Mapbox Studio due to file size limits
 
* **Chart Library:** chart.js
 
* **Tippecanoe:** An open source command line tool for creating Mapbox Vector Tiles

   `https://github.com/mapbox/tippecanoe`
* **Tilesets CLI:** Used to create a tileset source, a tileset and to publish on Mapbox Studio

   `https://github.com/mapbox/tilesets-cli`
