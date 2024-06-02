<template>
  <div>

    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-8 min-w-96">
        <h2 class="text-2xl font-bold mb-4">Your Itinerary</h2>

        <span v-if="itinerary.length === 0" class="tracking-widest italic text-xl">
          Nothing is in your itinerary yet!
        </span>

        <ol class="list-decimal">
          <li v-for="place in itinerary" class="mb-2 ml-2">
            <UIcon name="i-material-symbols-location-on" class="mr-2" />
            <NuxtLink :to="place._path">{{ place.title }}</NuxtLink>

            <span @click="removeItineraryPlace(place)" class="block border-orange-500 border-solid border p-1 px-2 rounded-lg text-xs ml-4
              hover:bg-orange-500 hover:text-white hover:border-orange-700 cursor-pointer
              ">
              <UIcon name="i-material-symbols-delete" class="mr-2" />
              Remove from Itinerary
            </span>
          </li>

        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
const itinerary = useLocalStorage('itinerary', []);

function removeItineraryPlace(place) {
  itinerary.value = itinerary.value.filter(p => p._path !== place._path);
}

</script>

<style scoped></style>