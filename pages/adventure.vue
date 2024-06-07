<template>
  <div class="p-24 text-3xl space-y-8 lg:space-y-32 max-w-screen-md mx-auto">

    <img @click="place.show = !place.show" src="/svg/handdrawn__PlanYourAdventure.svg" alt="Plan your adventure"
      class="w-full h-auto inline-block px-4 dark:invert" />

    <UAlert icon="i-heroicons-command-line" color="primary" variant="solid" title="Heads up!"
      description="This page is under construction, and may not work as expected. Please check back later." />


    <div class="fixed top-4 right-4 z-50 pr-4 bg-black/80 rounded-md">
      <UVerticalNavigation :links="navigation" />
    </div>

    <div id="config" class="space-y-8 lg:space-y-32">
      <div class="config-section">
        <h2>How will you be traveling?</h2>
        <USelectMenu v-model="transportation" :options="transportationOptions">
          <template #leading>
            <UIcon v-if="transportation.icon" :name="transportation.icon" class="mr-2" />
          </template>

        </USelectMenu>
      </div>

      <div class="config-section">
        <h2>Where does your journey begin?</h2>

        <!-- <h4>We should have a little map input here</h4> -->
        <AdventureStartMap :range="timeBudget" />
      </div>

      <div class="config-section">
        <h2>How much time do you have?</h2>
        <URange v-model="timeBudget" :options="timeBudgetOptions" size="2xl" :min="timeBudgetOptions[0]" :step="1"
          :max="timeBudgetOptions[timeBudgetOptions.length - 1]" />

        <!-- label -->
        <span class="text-gray-100 bg-gray-900 dark:text-gray-900 dark:bg-gray-100 px-2 rounded-lg">{{
      animatedState.timeBudget }}
          hours</span>

        <!-- shortcut buttons for the timeBudgetOptions -->
        <UButtonGroup class="mr-2">
          <template #default>
            <UButton v-for="option in timeBudgetOptions" :key="option" :value="option"
              :class="+option == +animatedState.timeBudget.toFixed(0) ? 'font-bold' : 'opacity-50 transition-all'"
              @click="timeBudget = option">
              {{ option }}
            </UButton>
          </template>
        </UButtonGroup>




      </div>

      <div class="config-section">
        <h2>What do you want to experience?</h2>
        <div v-for="interest in interests" :key="interest" class="py-2 flex items-center">
          <!-- <UCheckbox v-model="interests" :value="interest" class="mr-4" />

          <span class="mr-4 text-2xl">
            {{ interest.label }}
            <UIcon :name="interest.icon" class="inline-block " />
          </span> -->

          <UCheckbox v-model="interests" :value="interest" class="mr-4">
            <template #label>
              <UIcon v-if="interest.icon" :name="interest.icon" class="mr-2" />
              {{ interest.label }}
            </template>
          </UCheckbox>

        </div>
      </div>

      <div class="config-section" v-if="timeBudget > 12">
        <h2>Preferences for accomodations?</h2>
        <USelectMenu v-model="accommodation" :options="accommodationOptions" size="xl" placeholder="Select an option">
          <template #leading>
            <div>
              <UIcon v-if="accommodation.icon" :name="accommodation.icon" />
            </div>
          </template>
        </USelectMenu>
      </div>

      <div class="">
        <h2>Itinerary Generation</h2>
        <UButton @click="generateItinerary" :disabled="!isFormValid" variant="solid" size="xl"
          icon="i-ic-baseline-recommend">
          Generate Itinerary
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>

import { animate, createAnimatable, stagger } from '~/anime.esm.js'
// const transportationOptions = ["Driving", "Motorcycle", "Bicycling", "Hiking"];
const transportationOptions = [{
  id: 'driving',
  label: 'Car',
  icon: 'i-ic-outline-directions-car'
}, {
  id: 'motorcycle',
  label: 'Motorcycle',
  icon: 'i-ph-motorcycle-fill',
}, {
  id: 'bicycling',
  label: 'Bicycling',
  icon: 'i-ph-bicycle-light',
},
{
  id: 'public-transit',
  label: 'Public Transit',
  icon: 'i-solar-tram-line-duotone',
}
];

// time budget in hours
const timeBudgetOptions = [2, 4, 8, 12, 24, 48, 72];
// const interests = ["Outdoor Activities", "Food & Drink", "Sightseeing", "Cultural Attractions", "Shopping"];
const interests = [
  {
    id: 'hiking',
    label: 'Hiking',
    icon: 'i-solar-hiking-linear',
  },
  {
    id: 'outdoor-activities',
    label: 'Outdoor Activities',
    icon: 'i-heroicons-moon',
  }, {
    id: 'food-drink',
    label: 'Food & Drink',
    icon: 'i-heroicons-fire'
  }, {
    id: 'sightseeing',
    label: 'Sightseeing',
    icon: 'i-heroicons-eye'
  }, {
    id: 'cultural-attractions',
    label: 'Cultural Attractions',
    icon: 'i-heroicons-musical-note'
  }, {
    id: 'shopping',
    label: 'Shopping',
    icon: 'i-heroicons-shopping-bag'
  }];
// const accommodationOptions = ["Camping", "Hotel", "B&B", "Airbnb"];
const accommodationOptions = [{
  id: 'camping',
  label: 'Camping',
  icon: 'i-solar-moon-stars-bold'
}, {
  id: 'hotel',
  label: 'Hotel',
  icon: 'i-solar-buildings-bold',
}, {
  id: 'b&b',
  label: 'B&B',
  icon: 'i-solar-home-linear',
}, {
  id: 'airbnb',
  label: 'Airbnb',
  icon: 'i-solar-home-bold',
}];


const transportation = ref(transportationOptions[0]);
const accommodation = ref(accommodationOptions[0]);


const timeBudget = ref(4);
// const isFormValid = computed(() => transportation.value && timeBudget.value && accommodation.value);
const isFormValid = computed(() => transportation.value && timeBudget.value);


const animatedState = reactive({
  transportation: false,
  timeBudget: 2,
  accommodation: false,
  interests: false,
});

watch(timeBudget, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (!animatedState) return;
    if (!animatedState.timeBudget) return;
    animatedState.timeBudget = newValue;
  }
}, { immediate: true })

const generateItinerary = () => {
  console.log("Generating itinerary...");
};
const navigation = computed(() => [
  {
    label: 'Transportation Method',
    icon: 'i-ic-outline-directions-car',
    id: 'transportation',
  },
  {
    label: 'Starting Location',
    icon: 'i-material-symbols-home-pin',
    id: 'starting-location',
  },
  {
    label: 'Time Budget',
    icon: 'i-material-symbols-more-time-rounded',
    id: 'time-budget',
    badge: timeBudget.value,
  },
  {
    label: 'Interests',
    icon: 'i-iconoir-binocular',
    id: 'interests',
  },
  {
    label: 'Accommodation',
    icon: 'i-solar-buildings-bold',
    id: 'accommodation',
  },
  {
    label: 'Generate Itinerary',
    icon: 'i-ic-baseline-recommend',
    id: 'generate-itinerary',
  },
]);


</script>

<style scoped></style>