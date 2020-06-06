<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :minZoom="7"
    :center="[23.8813, 55.1694]"
    :maxBounds="[[20.970833, 53.896667], [26.835556, 56.450278]]"
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
  </MglMap>
</template>

<script>
import lhfaData from '../data/lhfa.json';

export default {
  components: {
    MglMap: () => import('vue-mapbox').then(mapbox => mapbox.MglMap),
    MglNavigationControl: () =>
      import('vue-mapbox').then(mapbox => mapbox.MglNavigationControl),
    MglGeolocateControl: () =>
      import('vue-mapbox').then(mapbox => mapbox.MglGeolocateControl),
    MglFullscreenControl: () =>
      import('vue-mapbox').then(mapbox => mapbox.MglFullscreenControl),
    MglMarker: () => import('vue-mapbox').then(mapbox => mapbox.MglMarker),
    MglPopup: () => import('vue-mapbox').then(mapbox => mapbox.MglPopup)
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoiZmlzdG1lbmFydXRvIiwiYSI6ImNqeXd6bmMxeTEybzMzbXJyZG9tMjVkemgifQ.5cwA9ergt7yRmWfNAIuDHw',
      mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
      lhfaData,
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
    // We need to set mapbox-gl library here in order to use it in template
    import('mapbox-gl').then(Mapbox => {
      this.mapbox = Mapbox;
    });
  }
};
</script>

<style lang="stylus" scoped>
.mgl-map-wrapper
  height calc(100vh - 3.6rem)

.hill-info-row
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-gap 10px

.hill-info-header
  font-weight bold
</style>

<style lang="stylus">
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