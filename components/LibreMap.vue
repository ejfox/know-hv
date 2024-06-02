<template>
  <div ref="map" class="min-h-screen-50 w-100 bg-gray-100" :style="{
  }">
  </div>
</template>

<script setup>
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import * as turf from '@turf/turf';

const map = ref(null);
const libreMap = shallowRef(null);
const scrollUp = ref(false);

// make a prop, that can be null, of the default center and zoom so we can use the map for single points
const props = defineProps({
  center: {
    type: Array,
    default: null,
  },
  zoom: {
    type: Number,
    default: null,
  },
});

// query all of the locations
const { data } = await useAsyncData('content', () => queryContent().find());

onMounted(async () => {
  await nextTick();

  libreMap.value = new Map({
    container: map.value,
    style: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    center: [-74, 41],
    zoom: 10,
    // maxZoom: 16,
    minZoom: 8,
    // disable scroll zoom
    scrollZoom: false,
  });

  // libreMap.value.addControl(new maplibregl.NavigationControl(), 'top-right');
  libreMap.value.addControl(new NavigationControl(), 'top-right');

  // on map load, set the center / zoom to the props
  libreMap.value.on('load', () => {
    if (props.center) {
      libreMap.value.setCenter(props.center);
    }
    if (props.zoom) {
      libreMap.value.setZoom(props.zoom);
    }
  });
});




watchEffect(() => {
  if (!libreMap.value) return;
  data.value.forEach((place) => {
    if (!place.longitude || !place.latitude) return;
    const marker = new Marker({ color: '#ff0000' })
      .setLngLat([place.longitude, place.latitude])
      .addTo(libreMap.value);
    marker.getElement().addEventListener('click', () => {
      // libreMap.value.flyTo({ center: [place.longitude, place.latitude], zoom: 14 });
      navigateTo(place._path);
    });
  });

  // use turf to make a bounding box of the data and zoom to it
  const placesWithLocations = data.value.filter((place) => place.longitude && place.latitude);
  // const bbox = turf.bbox(turf.featureCollection(data.value.map((place) => turf.point([place.longitude, place.latitude]))));

  if (!props.center) {
    const bbox = turf.bbox(turf.featureCollection(placesWithLocations.map((place) => turf.point([place.longitude, place.latitude]))));
    libreMap.value.fitBounds(bbox, { padding: 100 });
  } else if (!props.zoom) {
    libreMap.value.setCenter(props.center);
    libreMap.value.setZoom(props.zoom);
  }


});
</script>

<style scoped>
.min-h-screen-50 {
  min-height: 50vh;
}
</style>
