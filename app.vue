<template>
  <div>
    <UHorizontalNavigation :links="nav" class="font-sans w-full px-10 md:px-20 py-5" />
    <NuxtPage />
  </div>
</template>
<script setup>

const nav = [{
  label: 'Home',
  to: '/'
}, {
  label: 'Adventure Designer',
  to: '/adventure',
  icon: 'i-material-symbols-hiking-rounded'
},
{
  label: 'Itinerary',
  badge: 2,
  icon: 'i-material-symbols-list-alt-rounded',
  to: '/itinerary'
}]


</script>
<style>
/* use Figtree font for everything */
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
