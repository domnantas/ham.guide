<template>
  <div class="wrapper">
    <div id="map" ref="map"></div>
    <div class="box" v-if="this.currentLatitude && this.currentLongitude">
      <div class="data">
        <span>
          <b>Koordinatės:</b>
          {{ currentLatitude.toFixed(4) }}, {{ currentLongitude.toFixed(4) }}
        </span>
        <span>
          <b>QTH:</b>
          {{ currentMaidenhead }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import {
  bboxPolygon,
  featureCollection,
  center,
  getCoord,
  flip,
} from '@turf/turf';

export default {
  data() {
    return {
      currentLatitude: null,
      currentLongitude: null,
      map: null,
      maidenheadFieldFeatures: null,
      maidenheadSquareFeatures: null,
    };
  },
  computed: {
    currentMaidenhead() {
      return this.calculateMaidenhead(
        this.currentLatitude,
        this.currentLongitude
      );
    },
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZmlzdG1lbmFydXRvIiwiYSI6ImNqeXd6bmMxeTEybzMzbXJyZG9tMjVkemgifQ.5cwA9ergt7yRmWfNAIuDHw',
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/outdoors-v11',
    });

    this.addControls();

    this.map.on('load', () => {
      this.map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb',
        'tileSize': 512,
        'maxzoom': 14
      });
      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      this.drawMaidenheadField();
      this.drawMaidenheadSquare();
    });

    this.map.on('click', (event) => {
      const latitude = parseFloat(event.lngLat.lat.toFixed(3));
      const longitude = parseFloat(event.lngLat.lng.toFixed(3));
      const elevation = this.map.queryTerrainElevation(event.lngLat, { exaggerated: false }).toFixed(1);
      const googleMapsNavigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

      const popupHTML = `<div class="map-info">
          <div class="map-info-row" v-if="map.lyff">
            <div class="map-info-header">Koordinatės</div>
            <div class="map-info-data"><a href="${googleMapsNavigationUrl}">${latitude}, ${longitude}</a></div>
            <div class="map-info-header">QTH</div>
            <div class="map-info-data">${this.calculateMaidenhead(latitude, longitude)}</div>
            <div class="map-info-header">Aukštis virš jūros lygio</div>
            <div class="map-info-data">${elevation} m</div>
          </div>
        </div>`;

      new mapboxgl.Popup()
        .setLngLat(event.lngLat)
        .setHTML(popupHTML)
        .addTo(this.map);
    });
  },
  methods: {
    addControls() {
      this.map.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true })
      );
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        fitBoundsOptions: {
          maxZoom: 7,
        },
        trackUserLocation: true,
      });

      this.map.addControl(geolocate);

      geolocate.on('geolocate', this.onGeolocate);
    },
    onGeolocate(e) {
      this.currentLatitude = e.coords.latitude;
      this.currentLongitude = e.coords.longitude;
    },
    calculateMaidenhead(latitude, longitude) {
      const numberToLetter = (number) => String.fromCharCode(97 + number);
      let lat = (latitude + 90.0) / 10 + 0.0000001;
      let lon = (longitude + 180.0) / 20 + 0.0000001;
      let locator =
        numberToLetter(Math.floor(lon)).toUpperCase() +
        numberToLetter(Math.floor(lat)).toUpperCase();

      for (let counter = 0; counter < 2; counter++) {
        const divisor = counter % 2 === 0 ? 10 : 24;

        lat = (lat - Math.floor(lat)) * divisor;
        lon = (lon - Math.floor(lon)) * divisor;

        if (counter % 2 == 0) {
          locator += Math.floor(lon).toString() + Math.floor(lat).toString();
        } else {
          locator +=
            numberToLetter(Math.floor(lon)) + numberToLetter(Math.floor(lat));
        }
      }
      return locator;
    },
    drawMaidenheadField() {
      const maidenheadFieldDivisions = 18;
      this.maidenheadFieldFeatures = Array(maidenheadFieldDivisions)
        .fill()
        .flatMap((_, longitudeIndex) => {
          const longitude =
            (longitudeIndex * 360) / maidenheadFieldDivisions - 180;
          return Array(maidenheadFieldDivisions)
            .fill()
            .map((_, latitudeIndex) => {
              const latitude =
                (latitudeIndex * 180) / maidenheadFieldDivisions - 90;

              const maidenheadFieldBox = bboxPolygon([
                longitude,
                latitude,
                longitude + 20,
                latitude + 10,
              ]);

              const maidenheadField = this.calculateMaidenhead(
                ...getCoord(flip(center(maidenheadFieldBox)))
              ).slice(0, 2);

              maidenheadFieldBox.properties = { maidenheadField };
              return maidenheadFieldBox;
            });
        });

      const maidenheadFieldBBoxes = featureCollection(
        this.maidenheadFieldFeatures
      );

      this.map.addSource('maidenheadFieldBBoxes', {
        type: 'geojson',
        data: maidenheadFieldBBoxes,
      });

      this.map.addLayer({
        id: 'maidenhead-field-lines',
        type: 'line',
        source: 'maidenheadFieldBBoxes',
        maxzoom: 5,
        paint: {
          'line-color': '#647DEE',
          'line-width': 1,
        },
      });

      this.map.addLayer({
        id: 'maidenhead-field-labels',
        type: 'symbol',
        source: 'maidenheadFieldBBoxes',
        maxzoom: 5,
        layout: {
          'text-field': ['get', 'maidenheadField'],
          'text-allow-overlap': true,
          'text-size': 18,
        },
        paint: {
          'text-color': '#647DEE',
        },
      });
    },
    drawMaidenheadSquare() {
      const maidenheadSquareDivisions = 10;
      this.maidenheadSquareFeatures = this.maidenheadFieldFeatures.flatMap(
        (maidenheadFieldBox) => {
          const [longitudeStart, latitudeStart] = maidenheadFieldBox.bbox;
          return Array(maidenheadSquareDivisions)
            .fill()
            .flatMap((_, longitudeIndex) => {
              const longitude = longitudeStart + longitudeIndex * 2;
              return Array(maidenheadSquareDivisions)
                .fill()
                .map((_, latitudeIndex) => {
                  const latitude = latitudeStart + latitudeIndex * 1;

                  const maidenheadSquareBox = bboxPolygon([
                    longitude,
                    latitude,
                    longitude + 2,
                    latitude + 1,
                  ]);

                  const maidenheadSquare = this.calculateMaidenhead(
                    ...getCoord(flip(center(maidenheadSquareBox)))
                  ).slice(0, 4);

                  maidenheadSquareBox.properties = { maidenheadSquare };

                  return maidenheadSquareBox;
                });
            });
        }
      );

      const maidenheadSquareBBoxes = featureCollection(
        this.maidenheadSquareFeatures
      );

      this.map.addSource('maidenheadSquareBBoxes', {
        type: 'geojson',
        data: maidenheadSquareBBoxes,
      });

      this.map.addLayer({
        id: 'maidenhead-square-lines',
        type: 'line',
        source: 'maidenheadSquareBBoxes',
        minzoom: 5,
        paint: {
          'line-color': '#647DEE',
          'line-width': 1,
        },
      });

      this.map.addLayer({
        id: 'maidenhead-square-labels',
        type: 'symbol',
        source: 'maidenheadSquareBBoxes',
        minzoom: 5,
        layout: {
          'text-field': ['get', 'maidenheadSquare'],
          'text-allow-overlap': true,
          'text-size': 18,
        },
        paint: {
          'text-color': '#647DEE',
        },
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 3.6rem);
  position: relative;
}

#map {
  height: 100%;
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  background: var(--c-bg);
}

.data {
  display: flex;
  flex-direction: column;
}
</style>

<style>
.map-info-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.map-info-header {
  font-weight: bold;
}
</style>
