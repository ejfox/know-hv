<template>
  <section>
    <h1>Hello world!</h1>
    <div v-for="item in data" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
      <NuxtLink :to="item.path">Read more</NuxtLink>
    </div>
  </section>
</template>

<script setup>
/*
// Use the global state in this component
const store = useAppStore()
// Access the state variables and functions
const { activeItem, itemList, setActiveItem, addItem, removeItem } = store
*/

// query all of the locations 
const { data } = await useAsyncData('content', () => queryContent('').find())

</script>

<style></style>
