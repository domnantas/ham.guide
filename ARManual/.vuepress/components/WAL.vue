<template>
  <div class="wrapper">
    <div id="map" ref="map"></div>
    <div class="style-switch">
      <button v-if="currentStyle !== 'satellite-streets-v12'" @click="setMapStyle('satellite-streets-v12')">Satellite</button>
      <button v-if="currentStyle !== 'outdoors-v12'" @click="setMapStyle('outdoors-v12')">Terrain</button>
    </div>
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
        <span>
          <b>WAL:</b>
          {{ currentWAL }}
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
      currentStyle: 'outdoors-v12',
      map: null,
    };
  },
  computed: {
    currentMaidenhead() {
      return this.calculateMaidenhead(
        this.currentLatitude,
        this.currentLongitude
      );
    },
    currentWAL() {
      return this.calculateWAL(this.currentLatitude, this.currentLongitude);
    },
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZmlzdG1lbmFydXRvIiwiYSI6ImNqeXd6bmMxeTEybzMzbXJyZG9tMjVkemgifQ.5cwA9ergt7yRmWfNAIuDHw',
      container: this.$refs.map,
      style: `mapbox://styles/mapbox/${this.currentStyle}`,
      center: [23.8813, 55.1694],
      zoom: 7,
      maxBounds: [
        [19.970833, 52.896667],
        [27.835556, 57.450278],
      ],
      pitchWithRotate: false,
      touchPitch: false
    });

    // disable map rotation using right click + drag
    this.map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    this.map.touchZoomRotate.disableRotation();

    this.addControls();

    this.map.on('load', () => {
      this.drawGrid();
    });

    this.map.on('click', (event) => {
      const latitude = parseFloat(event.lngLat.lat.toFixed(3));
      const longitude = parseFloat(event.lngLat.lng.toFixed(3));
      const popupHTML = `<div class="map-info">
          <div class="map-info-row" v-if="map.lyff">
            <div class="map-info-header">Koordinatės</div>
            <div class="map-info-data"><a href="https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}">${latitude}, ${longitude}</a></div>
            <div class="map-info-header">QTH</div>
            <div class="map-info-data">${this.calculateMaidenhead(
              latitude,
              longitude
            )}</div>
            <div class="map-info-header">WAL</div>
            <div class="map-info-data">${this.calculateWAL(
              latitude,
              longitude
            )}</div>
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
    calculateWAL(latitude, longitude) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const letter = letters.charAt(
        Math.floor(-(latitude - (56 + 30 / 60)) / (10 / 60))
      );
      const number = Math.floor((longitude - (20 + 50 / 60)) / (10 / 60));
      return `${letter}${number.toString().padStart(2, '0')}`;
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
    drawGrid() {
      let features = [];
      const validWAL = [
        'A05',
        'A06',
        'A07',
        'A08',
        'A09',
        'A10',
        'A11',
        'A12',
        'A13',
        'A14',
        'A15',
        'A16',
        'A17',
        'A18',
        'A22',
        'A23',
        'A24',
        'B02',
        'B03',
        'B04',
        'B05',
        'B06',
        'B07',
        'B08',
        'B09',
        'B10',
        'B11',
        'B12',
        'B13',
        'B14',
        'B15',
        'B16',
        'B17',
        'B18',
        'B19',
        'B20',
        'B21',
        'B22',
        'B23',
        'B24',
        'B25',
        'B26',
        'C01',
        'C02',
        'C03',
        'C04',
        'C05',
        'C06',
        'C07',
        'C08',
        'C09',
        'C10',
        'C11',
        'C12',
        'C13',
        'C14',
        'C15',
        'C16',
        'C17',
        'C18',
        'C19',
        'C20',
        'C21',
        'C22',
        'C23',
        'C24',
        'C25',
        'C26',
        'C27',
        'C28',
        'C29',
        'C30',
        'D01',
        'D02',
        'D03',
        'D04',
        'D05',
        'D06',
        'D07',
        'D08',
        'D09',
        'D10',
        'D11',
        'D12',
        'D13',
        'D14',
        'D15',
        'D16',
        'D17',
        'D18',
        'D19',
        'D20',
        'D21',
        'D22',
        'D23',
        'D24',
        'D25',
        'D26',
        'D27',
        'D28',
        'D29',
        'D30',
        'D31',
        'D32',
        'E01',
        'E02',
        'E03',
        'E04',
        'E05',
        'E06',
        'E07',
        'E08',
        'E09',
        'E10',
        'E11',
        'E12',
        'E13',
        'E14',
        'E15',
        'E16',
        'E17',
        'E18',
        'E19',
        'E20',
        'E21',
        'E22',
        'E23',
        'E24',
        'E25',
        'E26',
        'E27',
        'E28',
        'E29',
        'E30',
        'E31',
        'E32',
        'E33',
        'E34',
        'F01',
        'F02',
        'F03',
        'F04',
        'F05',
        'F06',
        'F07',
        'F08',
        'F09',
        'F10',
        'F11',
        'F12',
        'F13',
        'F14',
        'F15',
        'F16',
        'F17',
        'F18',
        'F19',
        'F20',
        'F21',
        'F22',
        'F23',
        'F24',
        'F25',
        'F26',
        'F27',
        'F28',
        'F29',
        'F30',
        'F31',
        'F32',
        'F33',
        'F34',
        'G00',
        'G01',
        'G02',
        'G03',
        'G04',
        'G05',
        'G06',
        'G07',
        'G08',
        'G09',
        'G10',
        'G11',
        'G12',
        'G13',
        'G14',
        'G15',
        'G16',
        'G17',
        'G18',
        'G19',
        'G20',
        'G21',
        'G22',
        'G23',
        'G24',
        'G25',
        'G26',
        'G27',
        'G28',
        'G29',
        'G30',
        'G31',
        'G32',
        'G33',
        'G34',
        'G35',
        'H00',
        'H01',
        'H02',
        'H03',
        'H04',
        'H05',
        'H06',
        'H07',
        'H08',
        'H09',
        'H10',
        'H11',
        'H12',
        'H13',
        'H14',
        'H15',
        'H16',
        'H17',
        'H18',
        'H19',
        'H20',
        'H21',
        'H22',
        'H23',
        'H24',
        'H25',
        'H26',
        'H27',
        'H28',
        'H29',
        'H30',
        'H31',
        'H32',
        'H33',
        'H34',
        'H35',
        'H36',
        'I05',
        'I06',
        'I07',
        'I08',
        'I09',
        'I10',
        'I11',
        'I12',
        'I13',
        'I14',
        'I15',
        'I16',
        'I17',
        'I18',
        'I19',
        'I20',
        'I21',
        'I22',
        'I23',
        'I24',
        'I25',
        'I26',
        'I27',
        'I28',
        'I29',
        'I30',
        'I31',
        'I32',
        'I33',
        'I34',
        'I35',
        'J10',
        'J11',
        'J12',
        'J13',
        'J14',
        'J15',
        'J16',
        'J17',
        'J18',
        'J19',
        'J20',
        'J21',
        'J22',
        'J23',
        'J24',
        'J25',
        'J26',
        'J27',
        'J28',
        'J29',
        'J30',
        'J31',
        'J32',
        'K11',
        'K12',
        'K13',
        'K14',
        'K15',
        'K16',
        'K17',
        'K18',
        'K19',
        'K20',
        'K21',
        'K22',
        'K23',
        'K24',
        'K25',
        'K26',
        'K27',
        'K28',
        'K29',
        'L11',
        'L12',
        'L13',
        'L14',
        'L15',
        'L16',
        'L17',
        'L18',
        'L19',
        'L20',
        'L21',
        'L22',
        'L23',
        'L24',
        'L25',
        'L26',
        'L27',
        'L28',
        'L29',
        'M11',
        'M12',
        'M13',
        'M14',
        'M15',
        'M16',
        'M17',
        'M18',
        'M19',
        'M20',
        'M21',
        'M22',
        'M23',
        'M24',
        'M25',
        'M26',
        'M27',
        'M28',
        'N13',
        'N14',
        'N15',
        'N16',
        'N17',
        'N18',
        'N19',
        'N20',
        'N21',
        'N22',
        'N23',
        'N24',
        'N25',
        'N26',
        'N27',
        'N28',
        'N29',
        'O15',
        'O16',
        'O17',
        'O18',
        'O19',
        'O20',
        'O21',
        'O22',
        'O23',
        'O24',
        'O25',
        'O28',
        'O29',
        'P15',
        'P16',
        'P17',
        'P18',
        'P19',
        'P20',
        'P21',
        'P22',
        'P23',
      ];

      for (let longitude = 20 + 50 / 60; longitude < 27; longitude += 10 / 60) {
        for (
          let latitude = 53 + 50 / 60;
          latitude < 56 + 20 / 60;
          latitude += 10 / 60
        ) {
          const box = bboxPolygon([
            longitude,
            latitude,
            longitude + 10 / 60,
            latitude + 10 / 60,
          ]);
          const WAL = this.calculateWAL(...getCoord(flip(center(box))));
          if (validWAL.includes(WAL)) {
            box.properties = { WAL };
            features.push(box);
          }
        }
      }
      const WALbboxes = featureCollection(features);
      this.map.addSource('WALbboxes', {
        type: 'geojson',
        data: WALbboxes,
      });

      const gridColorMap = {
        'satellite-streets-v12': '#FFFFFF',
        'outdoors-v12': '#647DEE'
      }

      this.map.addLayer({
        id: 'WAL-lines',
        type: 'line',
        source: 'WALbboxes',
        paint: {
          'line-color': gridColorMap[this.currentStyle],
          'line-width': 1,
        },
      });

      this.map.addLayer({
        id: 'WAL-labels',
        type: 'symbol',
        source: 'WALbboxes',
        layout: {
          'text-field': ['get', 'WAL'],
          'text-allow-overlap': true,
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7,
            13,
            20,
            250
          ]
        },
        paint: {
          'text-color': gridColorMap[this.currentStyle],
        },
      });
    },
    setMapStyle(styleId) {
      this.map.once("styledata", this.drawGrid);
      this.currentStyle = styleId;
      this.map.setStyle(`mapbox://styles/mapbox/${styleId}`);
    }
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
.style-switch {
  position: absolute;
  bottom: 40px;
  left: 10px;
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
