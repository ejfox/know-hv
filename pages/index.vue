<template>
  <div class="md:relative w-full">
    <h1 class="leading-loose tracking-widest font-light text-lg md:text-4xl p-2 md:py-4 text-gray-100 text-center">
      <img src="/svg/handdrawn__KnowHV7.svg" alt="KnowHV.com" class="w-full h-auto dark:invert md:p-8" />
      <img src="/svg/handdrawn__HudsonValleyNY5.svg" alt="KnowHV.com" class="w-full h-auto dark:invert md:p-8" />
    </h1>

    <div class="container mx-auto p-0.5">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div v-for="(place, i) in places" class="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
          {{ place._path }}
          <div class="flex items-center mb-4">
            <div class="text-2xl lg:text-6xl uppercase leading-none inline-block align-top">
              {{ place.title }}
            </div>
            <!-- <img v-if="isVisited(place._path)" src="/svg/handdrawn__Checkmark.svg" 
            class="max-h-4 w-auto dark:invert inline-block align-middle ml-4" /> -->

            <UIcon name="i-heroicons-check" v-if="isVisited(place._path)" class="w-4 h-4 dark:text-green-500 ml-4" />
          </div>

          <div class="prose dark:prose-invert text-lg tracking-wide mb-4 serif font-light">
            <ContentRenderer :value="place" :excerpt="true" />
          </div>

          <div class="flex justify-between items-center">
            <NuxtLink :to="place._path" class="text-blue-500 hover:text-blue-700">
              Read More
            </NuxtLink>
            <button @click="toggleItinerary(place)" class="text-green-500 hover:text-green-700">
              {{ isInItinerary(place) ? 'Remove from Itinerary' : 'Add to Itinerary' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-4 right-4">
      <button @click="openItinerary" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
        Itinerary ({{ itinerary.length }})
      </button>
    </div>

    <div v-if="isItineraryOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 class="text-2xl font-bold mb-4">Your Itinerary</h2>
        <ul>
          <li v-for="place in itinerary" class="mb-2">
            {{ place.title }}
          </li>
        </ul>
        <button @click="closeItinerary" class="mt-4 text-blue-500 hover:text-blue-700">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';

// Query all of the locations
const { data } = await useAsyncData('content', () => queryContent().find());

// Store the visited pages in localStorage
const visitedPages = useLocalStorage('visitedPages', []);

// Store the itinerary in localStorage
const itinerary = useLocalStorage('itinerary', []);

const isItineraryOpen = ref(false);

const places = ref(data.value);

function isVisited(path) {
  return visitedPages.value.includes(path);
}

function toggleItinerary(place) {
  if (isInItinerary(place)) {
    itinerary.value = itinerary.value.filter(p => p._path !== place._path);
  } else {
    itinerary.value.push(place);
  }
}

function isInItinerary(place) {
  return itinerary.value.some(p => p._path === place._path);
}

function openItinerary() {
  isItineraryOpen.value = true;
}

function closeItinerary() {
  isItineraryOpen.value = false;
}

// Mark the current page as visited when the component is mounted
onMounted(() => {
  const currentPath = useRoute().path;
  if (!visitedPages.value.includes(currentPath)) {
    visitedPages.value.push(currentPath);
  }
});
</script>

<style scoped></style>