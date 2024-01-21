<template>
  <div>
    <div class="min-w-96 min-h-96 bg-black/10 dark:bg-white rounded shadow-lg" ref="mapContainer">
      <h1>{{ props.range }}</h1>
    </div>

  </div>
</template>

<script setup>
import { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useColorMode } from '@vueuse/core';
import * as turf from '@turf/turf';

const colorMode = useColorMode()
const mapContainer = ref(null);
const libreMap = ref(null);

const props = defineProps({
  range: {
    type: Number,
    default: 10
  }
})

onMounted(() => {
  libreMap.value = new Map({
    container: mapContainer.value,
    // style: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    style: colorMode === 'light' ? 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG' : 'https://api.maptiler.com/maps/toner-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    center: [-74, 41],
    zoom: 8,
    // maxZoom: 16,
    // minZoom: 8,
  });

  // make a big red circle at the center, sized by the range
  libreMap.value.on('load', () => {

    libreMap.value.addSource('center', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74, 41],
        },
      },
    });

    libreMap.value.addLayer({
      id: 'center',
      type: 'circle',
      source: 'center',
      paint: {
        'circle-color': '#f00',
        'circle-radius': +props.range,
      },
    });
  })
});

// watch the range and update the map circle
watch(() => {
  return props.range
}, (newRange) => {
  // use turf to make a point with the new range
  const circle = turf.circle([-74, 41], newRange, {
    units: 'miles'
  });
  // libreMap.value.setPaintProperty('center', 'circle-radius', +newRange);
  libreMap.value.getSource('center').setData(circle);

})
</script>

<style scoped></style>