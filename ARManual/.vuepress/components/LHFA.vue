<template>
  <div class="wrapper">
    <div id="map" ref="map"></div>
  </div>
  <!-- <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :minZoom="7"
    :center="[23.8813, 55.1694]"
    :maxBounds="[
      [20.970833, 53.896667],
      [26.835556, 56.450278]
    ]"
  >
    <MglNavigationControl :showCompass="false" />
    <MglGeolocateControl />
    <MglFullscreenControl position="bottom-right" />
    <MglMarker
      v-for="hill in lhfaData"
      :key="`${hill.category}-${hill.id}`"
      :ref="`${hill.category}-${hill.id}`"
      :coordinates="[hill.coordinates.longitude, hill.coordinates.latitude]"
      :color="colorMap[hill.category]"
    >
      <MglPopup>
        <div class="hill-info">
          <div class="hill-info-row">
            <div class="hill-info-header">LHFA</div>
            <div class="hill-info-data">{{ hill.category }}-{{ hill.id }}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">Miestas</div>
            <div class="hill-info-data">{{ hill.city }}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">Savivaldybė</div>
            <div class="hill-info-data">{{ hill.municipality }}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">QTH</div>
            <div class="hill-info-data">{{ hill.qth }}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">WAL</div>
            <div class="hill-info-data">{{ hill.wal }}</div>
          </div>
          <div class="hill-info-row" v-if="hill.lyff">
            <div class="hill-info-header">LYFF</div>
            <div class="hill-info-data">{{ hill.lyff }}</div>
          </div>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap> -->
</template>

<script>
import lhfaData from '../data/lhfa.json';
import mapboxgl from 'mapbox-gl';
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglFullscreenControl,
  MglMarker,
  MglPopup
} from 'vue-mapbox';
import { point, featureCollection } from '@turf/turf';

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglFullscreenControl,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      map: null,
      colorMap: {
        AL: '#BA68C8',
        KA: '#F06292',
        KL: '#64B5F6',
        MA: '#DCE775',
        PA: '#81C784',
        SI: '#A1887F',
        TA: '#4DB6AC',
        TE: '#FFD54F',
        UT: '#FF8A65',
        VI: '#7986CB'
      }
    };
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
      this.markHills();
    });
  },
  methods: {
    addControls() {
      this.map.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true })
      );
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
    },
    markHills() {
      const pointTest = point([-75.343, 39.984]);
      const allPoints = featureCollection([pointTest]);
      this.map.addSource('test', {
        type: 'geojson',
        data: allPoints
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
</style>

<style lang="stylus">
@import url("https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css");

.fullscreen
  .theme-default-content
    padding 0
    max-width none

  .page-edit, .page-nav
    display none

  .mapboxgl-marker
    cursor pointer

  .page
    padding-bottom: 0
</style>
