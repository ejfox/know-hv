<template>
  <div class="md:relative w-100 md:min-h-screen">

    <div ref="map" class="min-h-screen w-100 bg-gray-100" :style="{
      pointerEvents: scrollUp ? 'none' : 'auto',
      cursor: scrollUp ? 'grab' : 'auto',
    }">
    </div>

    <!-- make a floating sidebar that sits on the left of the screen -->
    <div ref="sidebar" id="sidebar"
      class="block w-full md:w-2/5 lg:w-1/3 lg:h-screen fixed bottom-0 md:top-0 left-0 z-10 overflow-y-auto dark:bg-neutral-950/80 bg-neutral-100/80 backdrop-blur-sm max-h-96 md:max-h-screen p-2">


      <div class="">
        <!-- <div ref="minimap" class="hidden md:visible md:w-100 md:h-96 bg-gray-100 rounded-lg shadow-lg"></div> -->

        <h1 class="leading-loose tracking-widest font-light text-lg md:text-4xl p-2 md:py-4 text-gray-100 text-center">
          <img src="/handdrawn__KnowHV3.svg" class="w-full h-auto dark:invert md:p-8" />
        </h1>

        <WeatherWidget />

        <!-- get the zoom, and lat/lng of the center of the map -->
        <div v-if="libreMap">
          {{ libreMap?.getZoom() }}
          {{ libreMap?.getCenter() }}
        </div>

        <!-- <UCheckbox v-model="scrollUp" label="Scroll north" color="purple" class="my-4" /> -->

        <div v-for="(place, i) in places" class="dark:text-white mb-4 p-2">
          <div class="text-3xl uppercase leading-none mb-1">
            {{ place.title }}
          </div>

          <!-- <img @click="place.show = !place.show" src="/handdrawn__More.svg"
            class="w-1/4 h-auto dark:invert inline-block mr-4" /> -->

          <!-- <UButton @click="libreMap.flyTo({ center: [place.longitude, place.latitude], zoom: 14 })" color="purple"
            variant="outline" class="ml-2" label="Go" /> -->

          <NuxtLink :to="place._path">
            <img src="/handdrawn__Go.svg" class="w-1/4 h-auto dark:invert inline-block" />
          </NuxtLink>

          <div class="prose dark:prose-invert p-2 text-xl tracking-wide" v-show="place.show">
            <ContentRenderer :value="place" />
          </div>
          <!-- <pre>{{ place }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { animate, createAnimatable, stagger } from '~/anime.esm.js'
import { Map, Marker } from 'maplibre-gl';
// @import '~maplibre-gl/dist/maplibre-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
const map = ref(null);
const libreMap = shallowRef(null);
import * as turf from '@turf/turf';

// query all of the locations 
const { data } = await useAsyncData('content', () => queryContent().find())

// store the hide/show of the various places in the data
const places = ref(data.value.map((place) => ({ ...place, show: false })));

import { useColorMode } from '@vueuse/core';

const colorMode = useColorMode()

const minimap = shallowRef(null);
const minimapLibreMap = shallowRef(null);

const scrollUp = ref(false)

onMounted(() => {
  libreMap.value = new Map({
    container: map.value,
    style: 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    // style: colorMode === 'light' ? 'https://api.maptiler.com/maps/outdoor-v2/style.json?key=9risEBlLsABm8DwIZLKG' : 'https://api.maptiler.com/maps/toner-v2/style.json?key=9risEBlLsABm8DwIZLKG',
    center: [-74, 41],
    zoom: 12,
    maxZoom: 16,
    minZoom: 8,
    // maxBounds: [
    //   [-74.5, 41.2],
    //   [-73.3, 42.2],
    // ],
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
    if (!place.longitude) return
    if (!place.latitude) return
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