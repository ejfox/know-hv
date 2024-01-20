<template>
  <div class="relative w-100 min-h-screen">


    <div ref="map" class="min-h-screen w-2-3 bg-gray-100" :style="{
      pointerEvents: scrollUp ? 'none' : 'auto',
      cursor: scrollUp ? 'grab' : 'auto',
    }">

    </div>

    <!-- make a floating sidebar that sits on the left of the screen -->
    <div ref="sidebar" id="sidebar" class="w-1/3 h-screen bg-white text-black fixed top-0 left-0 z-10 overflow-y-auto">
      <div class="p-4">
        <h1 class="text-2xl font-bold">Hudson Valley</h1>
        <p class="text-gray-500">A map of the Hudson Valley</p>

        <div ref="minimap" class=" w-96 h-96 bg-gray-100"></div>

        <!-- get the zoom, and lat/lng of the center of the map -->

        {{ libreMap?.getZoom() }}
        {{ libreMap?.getCenter() }}

        <UCheckbox v-model="scrollUp" label="Scroll north" color="purple" />

        <UCard v-for="place in data" class="text-white">
          <template #header>
            {{ place.title }}

            <UButton @click="libreMap.flyTo({ center: [place.longitude, place.latitude], zoom: 14 })" color="purple"
              class="ml-2" label="Go" />
          </template>
          <div class="prose dark:prose-invert">
            <ContentRenderer :value="place" />
          </div>
          <!-- <pre>{{ place }}</pre> -->
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Map, Marker } from 'maplibre-gl';
// @import '~maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
const map = ref(null);
const libreMap = shallowRef(null);
import * as turf from '@turf/turf';

// query all of the locations 
const { data } = await useAsyncData('content', () => queryContent('').find())


const minimap = shallowRef(null);
const minimapLibreMap = shallowRef(null);

const scrollUp = ref(false)

onMounted(() => {
  libreMap.value = new Map({
    container: map.value,
    style: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    center: [-74, 41],
    zoom: 12,
    maxZoom: 16,
    minZoom: 8,
    maxBounds: [
      [-74.5, 41.2],
      [-73.3, 42.2],
    ],
  });

  // now we need to make the bounds source for the minimap
  libreMap.value.on('load', () => {
    minimapLibreMap.value.addSource('bounds', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [],
        },
      },
    });

    // add a layer for the bounds
    minimapLibreMap.value.addLayer({
      id: 'bounds',
      type: 'fill',
      source: 'bounds',
      paint: {
        'fill-color': '#ff0000',
        'fill-opacity': 0.5,
      },
    });
  });

  minimapLibreMap.value = new Map({
    container: minimap.value,
    style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    center: [-74, 41],
    zoom: 8,
    maxZoom: 10,
    minZoom: 7,
    maxBounds: [
      [-74.5, 41.2],
      [-73.3, 42.2],
    ],
  });

  // keep the minimap in sync with the main map
  libreMap.value.on('move', () => {
    const center = libreMap.value.getCenter();
    const zoom = libreMap.value.getZoom() * 0.7;
    minimapLibreMap.value.setCenter(center);
    minimapLibreMap.value.setZoom(zoom);

    // we also need to draw the bounds of the main map on the minimap

    // get the bounds of the main map
    const bounds = libreMap.value.getBounds();

    // convert the bounds to a geojson polygon with turf
    const polygon = turf.bboxPolygon([bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth(), bounds.getWest()]);

    // convert the polygon to a geojson feature
    const feature = {
      type: 'Feature',
      geometry: polygon.geometry,
    };

    // add the feature to the minimap
    minimapLibreMap.value.getSource('bounds').setData(feature);

    // style the feature
    minimapLibreMap.value.setPaintProperty('bounds', 'fill-color', '#ff0000');


  });

  // slowly scroll the map south
  libreMap.value.on('load', () => {
    const interval = useIntervalFn(() => {
      if (!scrollUp.value) return;
      const center = libreMap.value.getCenter();
      libreMap.value.setCenter([center.lng, center.lat + 0.00005]);
    }, 12);

  });
})


// watch data, when it loads, add all the data as markers on the map
watchEffect(() => {
  if (!libreMap.value) return;
  data.value.forEach((place) => {
    console.log(place);
    const marker = new Marker({
      color: '#ff0000',
    })
      .setLngLat([place.longitude, place.latitude])
      .addTo(libreMap.value);

    marker.getElement().addEventListener('click', () => {
      libreMap.value.flyTo({ center: [place.longitude, place.latitude], zoom: 14 });
    });
  });
});


</script>

<style scoped></style>