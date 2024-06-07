<template>
  <div class="p-4 lg:px-12">

    <div v-if="!products" class="flex justify-center items-center h-64">
      <UProgress />
    </div>
    <div v-for="product in products" :key="product.id" class="p-2 max-w-screen-md flex flex-col my-8">
      <!-- <pre>{{ product }}</pre> -->
      <StripeProduct :product="product" />
    </div>
  </div>
</template>

<script setup>

const products = ref(null);

const { data, error, fetch } = useFetch('/api/stripe');

watch(data, () => {
  if (!data.value) return;
  products.value = data.value.data;
});



// console.log(products);


</script>

<style scoped></style>