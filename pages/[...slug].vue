<template>
  <ContentDoc :path="$route.path">
    <template v-slot="{ doc }">
      <h1 class="text-8xl p-2 pb-8" v-if="!doc.handtitle">{{ doc.title }}</h1>
      <h1 class="text-8xl p-2 pb-8" v-else><img :src="doc.handtitle" :alt="doc.title"
          class="w-full h-auto dark:invert p-4" />
      </h1>

      <div class="px-8 ">
        <UButton @click="addItineraryPlace(doc)" v-if="!isInItinerary(doc)" color="green" variant="outline">
          Add this place to Itinerary
        </UButton>
        <UButton @click="removeItineraryPlace(doc)" v-else color="red">
          Remove this place from Itinerary
        </UButton>
      </div>


      <div class="p-8" v-if="hasLocation(doc)">
        <LazyLibreMap :center="[doc.longitude, doc.latitude]" :zoom="12.5" class="rounded-xl shadow-xl" />
      </div>


      <main class="prose dark:prose-invert text-xl leading-8 tracking-wide ml-4 md:ml-16 lg:ml-24">




        <section class="font-serif">
          <ContentRenderer :value="doc" />
        </section>
      </main>

    </template>
    <template #not-found>
      <h1>Document not found</h1>
    </template>
  </ContentDoc>
</template>
<script setup>

// check for both latitude and longitude
// and make sure they have a value
const hasLocation = (doc) => {
  if (!doc.latitude) return false;
  if (!doc.longitude) return false;
  // make sure they're not empty strings
  if (doc.latitude === '') return false;
  if (doc.longitude === '') return false;
  return true;
}

const itinerary = useLocalStorage('itinerary', []);

function removeItineraryPlace(place) {
  itinerary.value = itinerary.value.filter(p => p._path !== place._path);
}

function isInItinerary(place) {
  return itinerary.value.some(p => p._path === place._path);
}

function addItineraryPlace(place) {
  itinerary.value = [...itinerary.value, place];
}
</script>