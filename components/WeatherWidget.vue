<template>
  <div>
    <img src="/svg/handdrawn__weather.svg" class="w-full h-auto inline-block p-4 dark:invert"
      v-if="weatherData?.daily" />

    <div class="col-span-2 grid grid-cols-3 md:gap-4" v-if="weatherData?.daily">
      <WeatherDay v-for="day in weatherData?.daily?.data.slice(0, 3)" :key="day.time" :weatherData="day" class="p-2" />
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