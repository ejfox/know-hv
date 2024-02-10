<template>
  <div>
    <h1 class="text-3xl text-red-500">Weather</h1>
    <div class="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <WeatherDay v-for="day in weatherData.daily.data" :key="day.time" :weatherData="day" class="p-2" />
    </div>
  </div>
</template>

<script setup>
const { data: weatherData } = await useFetch('/api/getWeather', {
  lat: 41.3,
  lon: -74.2,
});
</script>

<style scoped></style>