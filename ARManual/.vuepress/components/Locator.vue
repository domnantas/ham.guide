<template>
  <div class="wrapper">
    <div id="map" ref="map"></div>
    <div class="box">
      <div class="data" v-if="this.latitude && this.longitude">
        <span>
          <b>Koordinatės:</b>
          {{ longitude.toFixed(4) }}, {{ latitude.toFixed(4) }}
        </span>
        <span>
          <b>QTH:</b>
          {{ maidenhead }}
        </span>
        <span>
          <b>WAL:</b>
          {{ WAL }}
        </span>
      </div>
      <div v-else>Spauskite ikoną viršutiniame dešiniame kampe</div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import { squareGrid } from '@turf/turf';

export default {
  components: {},
  data() {
    return {
      latitude: null,
      longitude: null,
      map: null
    };
  },
  computed: {
    maidenhead() {
      const numberToLetter = number => String.fromCharCode(97 + number);
      let lat = (this.latitude + 90.0) / 10 + 0.0000001;
      let lon = (this.longitude + 180.0) / 20 + 0.0000001;
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
    WAL() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const letter = letters.charAt(
        Math.floor(((this.latitude - 56.5) * -1) / 0.1666666667)
      );
      var number = Math.floor((this.longitude - 20.8333333333) / 0.1666666667);
      return `${letter}${number.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZmlzdG1lbmFydXRvIiwiYSI6ImNqeXd6bmMxeTEybzMzbXJyZG9tMjVkemgifQ.5cwA9ergt7yRmWfNAIuDHw',
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [23.8813, 55.1694],
      zoom: 7,
      maxBounds: [
        [20.970833, 53.896667],
        [26.835556, 56.450278]
      ]
    });

    this.addControls();

    this.map.on('load', () => {
      // this.drawGrid();
    });
  },
  methods: {
    addControls() {
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions: {
          maxZoom: 7
        },
        trackUserLocation: true
      });

      this.map.addControl(geolocate);

      geolocate.on('geolocate', this.onGeolocate);
    },
    onGeolocate(e) {
      this.latitude = e.coords.latitude;
      this.longitude = e.coords.longitude;
    },
    drawGrid() {
      var bbox = [20, 53, 27, 56];
      var cellSide = 1;
      var options = { units: 'degrees' };

      var grid = squareGrid(bbox, cellSide, options);
      var wwlgrid = squareGrid([0, -8, 351, 8], cellSide, options);

      this.map.addSource('gridData', {
        type: 'geojson',
        data: grid
      });

      this.map.addLayer({
        id: 'grid',
        type: 'fill',
        source: 'gridData',
        paint: {
          'fill-color': '#0000ff',
          'fill-opacity': 0.4
        }
      });

      this.map.addSource('wwlgridData', {
        type: 'geojson',
        data: wwlgrid
      });

      this.map.addLayer({
        id: 'wwlgrid',
        type: 'fill',
        source: 'wwlgridData',
        paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.1
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  height calc(100vh - 3.6rem)
  position relative

#map
  height 100%

.box
  position absolute
  top 0
  left 0
  background-color white
  margin 10px
  padding 10px
  border-radius 10px
  font-size 14px


.data
  display flex
  flex-direction column
</style>

<style lang="stylus">
.fullscreen
  .theme-default-content
    padding 0
    max-width none

  .page-edit, .page-nav
    display none
</style>
