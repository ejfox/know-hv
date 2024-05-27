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

    <div>
      <div class="flex flex-col items-start space-y-2 p-2 font-mono">
        <div class="uppercase">
          <div v-if="isToday" class="text-lg font-bold">Today</div>
          <div v-else-if="isTomorrow" class="text-lg font-bold">Tomorrow</div>

          <div v-else class="text-lg">{{ new Date(weatherData.time * 1000).toLocaleDateString() }}</div>
        </div>

        <div class="text-xl">{{ weatherData.summary }}</div>
        <div class="flex items-center">
          <UIcon name="i-heroicons-arrow-up" class="mr-1" />
          {{ weatherData.temperatureHigh }}°F
        </div>
        <div class="flex items-center">
          <UIcon name="i-heroicons-arrow-down" class="mr-1" />
          {{ weatherData.temperatureLow }}°F
        </div>

        <div v-if="+weatherData.windSpeed > 10" class="flex items-center">
          <UIcon name="i-wi-strong-wind" class="mr-1" />
          {{ weatherData.windSpeed }} mph
        </div>

        <div v-if="+weatherData.precipProbability > 0" class="flex items-center">
          <UIcon name="i-heroicons-cloud" class="mr-1" />
          {{ weatherData.precipProbability * 100 }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  weatherData: Object
});

const isToday = computed(() => {
  const today = new Date();
  const date = new Date(props.weatherData.time * 1000);
  return today.toDateString() === date.toDateString();
});

const isTomorrow = computed(() => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(props.weatherData.time * 1000);
  return tomorrow.toDateString() === date.toDateString();
});
</script>

<style scoped></style>