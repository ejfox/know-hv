<template>
  <div>
    <!-- <pre class=" text-xs overflow-auto">{{ weatherData }}</pre> -->

    <!-- {
  "time": 1707588000,
  "icon": "clear-day",
  "summary": "Clear",
  "sunriseTime": 1707617184,
  "sunsetTime": 1707654636,
  "moonPhase": 0.06,
  "precipIntensity": 0,
  "precipIntensityMax": 0,
  "precipIntensityMaxTime": 1707588000,
  "precipProbability": 0,
  "precipAccumulation": 0,
  "precipType": "none",
  "temperatureHigh": 20.73,
  "temperatureHighTime": 1707642000,
  "temperatureLow": 5.2,
  "temperatureLowTime": 1707688800,
  "apparentTemperatureHigh": 15.81,
  "apparentTemperatureHighTime": 1707645600,
  "apparentTemperatureLow": 0.96,
  "apparentTemperatureLowTime": 1707688800,
  "dewPoint": 2.15,
  "humidity": 0.68,
  "pressure": 727.7,
  "windSpeed": 3.05,
  "windGust": 5.33,
  "windGustTime": 1707656400,
  "windBearing": 197,
  "cloudCover": 0.35,
  "uvIndex": 5.07,
  "uvIndexTime": 1707638400,
  "visibility": 10,
  "temperatureMin": 7.5,
  "temperatureMinTime": 1707606000,
  "temperatureMax": 20.73,
  "temperatureMaxTime": 1707642000,
  "apparentTemperatureMin": 0.96,
  "apparentTemperatureMinTime": 1707606000,
  "apparentTemperatureMax": 15.81,
  "apparentTemperatureMaxTime": 1707645600
} -->

    <div class="flex flex-col items-start">
      <div class="">{{ new Date(weatherData.time * 1000).toLocaleDateString() }}</div>
      <div class="">{{ weatherData.summary }}</div>
      <div class="">
        <UIcon name="i-heroicons-arrow-up" />
        {{ toFahrenheit(weatherData.temperatureHigh) }}°
      </div>
      <div class="">
        <UIcon name="i-heroicons-arrow-down" />
        {{ toFahrenheit(weatherData.temperatureLow) }}°
      </div>

      <div v-if="+weatherData.windSpeed > 10">
        <UIcon name="i-wi-strong-wind" />
        {{ weatherData.windSpeed }} mph
      </div>

      <div v-if="+weatherData.precipProbability > 0">
        <UIcon name="i-heroicons-cloud" />
        {{ weatherData.precipProbability * 100 }}%
      </div>
    </div>


  </div>
</template>

<script setup>
import { toFahrenheit } from 'celsius'
const props = defineProps({
  weatherData: Object
});
</script>

<style scoped></style>