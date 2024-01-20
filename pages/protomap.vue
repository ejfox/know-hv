<template>
  <div>
    <div id="sidebar" class="w-1/3 h-screen"></div>
    <div id="map-container" ref="mapContainer" class="w-2/3 h-screen"></div>

  </div>
</template>

<script setup>
import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import layers from "protomaps-themes-base";

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

onMounted(() => {
  const myMap = new maplibregl.Map({
    container: "map-container",
    style: {
      version: 8,
      glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
      sources: {
        protomaps: {
          type: "vector",
          url: `pmtiles://https://pmtiles.ejfox.com/hudsonvalley`,
          attribution:
            '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
        },
      },
      layers: layers("protomaps", "light"),
    },
  });
  myMap.on("load", () => {
    const myBounds = myMap.getSource("protomaps").bounds;
    myMap.setMaxBounds(myBounds);
  });
});
</script>

<style scoped></style>