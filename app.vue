<template>
  <div>
    <UHorizontalNavigation :links="nav" class="font-sans w-full md:px-10 lg:px-20 py-2 md:py-4 lg:py-6 z-50" />
    <NuxtPage />
  </div>
</template>
<script setup>

const itinerary = useLocalStorage('itinerary', []);


const itineraryCount = computed(() => +itinerary.value.length);

const nav = computed(() => {

  return [{
    label: 'Home',
    to: '/',
    icon: 'i-material-symbols-home-rounded'
  },
  {

    label: 'Adventure Designer',
    to: '/adventure',
    icon: 'i-material-symbols-hiking-rounded'
  },
  {
    label: 'Your Itinerary',
    badge: itineraryCount.value,
    icon: 'i-material-symbols-list-alt-rounded',
    to: '/itinerary'
  },
  {
    label: 'Stickers',
    icon: 'i-solar-sticker-circle-bold',
    to: '/stickers'
  },
  {
    label: 'Map',
    icon: 'i-material-symbols-map-rounded',
    to: '/map'
  },
  ]
})
</script>
<style>
body {
  /* font-family: 'Figtree', sans-serif; */
  font-family: "Delicious Handrawn", cursive;
  font-weight: 400;
}

.font-serif {
  font-family: 'Garamond', serif;
}

.sans-serif {
  font-family: Inter, system-ui, --apple-system;
}

.serif {
  font-family: "Gelasio", Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>
