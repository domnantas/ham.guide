<template>
  <div class="wrapper">
    <div id="map" ref="map"></div>
  </div>
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
      categories: {
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
        [19.970833, 52.896667],
        [27.835556, 57.450278]
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
      const lhfaFeatures = Object.entries(this.categories).flatMap(
        ([category, color]) => {
          const categoryPoints = lhfaData.filter(
            lhfaPoint => lhfaPoint.category === category
          );

          return categoryPoints.map(lhfaPoint =>
            point(
              [lhfaPoint.coordinates.longitude, lhfaPoint.coordinates.latitude],
              { color, ...lhfaPoint }
            )
          );
        }
      );

      this.map.addSource('lhfa', {
        type: 'geojson',
        data: featureCollection(lhfaFeatures)
      });

      this.map.addLayer({
        id: 'lhfa',
        type: 'circle',
        source: 'lhfa',
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': 12,
          'circle-opacity': 0.8,
          'circle-pitch-alignment': 'map'
        }
      });

      this.map.on('click', 'lhfa', event => {
        const clickedFeature = event.features[0];

        const {
          category,
          id,
          city,
          municipality,
          qth,
          wal,
          lyff
        } = clickedFeature.properties;

        const latitude = clickedFeature.geometry.coordinates[1].toFixed(3);
        const longitude = clickedFeature.geometry.coordinates[0].toFixed(3);

        const popupHTML = `<div class="hill-info">
          <div class="hill-info-row">
            <div class="hill-info-header">LHFA</div>
            <div class="hill-info-data">${category}-${id}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">Miestas</div>
            <div class="hill-info-data">${city}</div>
          </div>
           <div class="hill-info-row">
            <div class="hill-info-header">Savivaldybė</div>
            <div class="hill-info-data">${municipality}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">QTH</div>
            <div class="hill-info-data">${qth}</div>
          </div>
          <div class="hill-info-row">
            <div class="hill-info-header">WAL</div>
            <div class="hill-info-data">${wal}</div>
          </div>
          <div class="hill-info-row" v-if="hill.lyff">
            <div class="hill-info-header">LYFF</div>
            <div class="hill-info-data">${lyff}</div>
          </div>
          <div class="hill-info-row" v-if="hill.lyff">
            <div class="hill-info-header">Koordinatės</div>
            <div class="hill-info-data"><a href="https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}">${latitude}, ${longitude}</a></div>
          </div>
        </div>`;

        new mapboxgl.Popup()
          .setLngLat(clickedFeature.geometry.coordinates)
          .setHTML(popupHTML)
          .addTo(this.map);
      });

      this.map.on('mouseenter', 'lhfa', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', 'lhfa', () => {
        this.map.getCanvas().style.cursor = '';
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

.hill-info-row
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-gap 10px
.hill-info-header
  font-weight bold

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
