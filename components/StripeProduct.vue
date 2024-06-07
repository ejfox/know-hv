<template>
  <div class="rounded-lg  p-8">
    <!-- <pre class="max-h-96 overflow-y-auto">{{ product }}</pre> -->
    <div class="product-image-container relative shadow-lg overflow-hidden rounded-lg" v-if="product?.images">

      <div class="absolute top-1 right-1 text-gray-500 text-3xl">
        <div class="product-price text-white bg-black/90 p-4 leading-none rounded-xl" v-if="!productSold">
          <span class="">{{ unitAmountToUSD(product.price.unit_amount) }}</span> + shipping
        </div>
        <div class="product-price" v-else>
          <span class=" px-2">Sold Out</span>
        </div>
      </div>


      <!-- grayscale if sold -->
      <img :src="product.metadata.image" alt="product image"
        :class="['product-image z-10', productSold ? 'grayscale hover:grayscale-0 opacity-90' : '']" />




    </div>
    <div class="product-actions-container py-4 flex flex-row justify-between">


      <div v-if="!productSold">
        <UButton @click="buyProduct(product.id)" color="green" class="font-bold text-4xl w-full" block variant="solid"
          size="xl">
          Buy for {{ unitAmountToUSD(product.price.unit_amount) }}
        </UButton>
      </div>
      <div v-else>
        <UButton color="gray" disabled>
          Sold out
        </UButton>
      </div>

      <div class="product-description prose dark:prose-invert my-1 lg:my-2 text-lg tracking-wide">{{ product.description
        }} </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(['product']);
const stripe = useClientStripe();


const buyProduct = async (productId) => {
  const { data } = await useFetch('/api/stripe-checkout', {
    method: 'POST',
    body: JSON.stringify({
      productId,

      // success_url: 'https://ejfox.com/pottery/success',
      // cancel_url: 'https://ejfox.com/pottery',
      success_url: 'https://knowhv.com/success',
      cancel_url: 'https://knowhv.com',
    }),
  });

  const { id: sessionId, url } = data.value.body;

  navigateTo(url, { external: true });
};

// use the product ID and the stripe client API to find out if the product is sold or not
const productSold = computed(() => {
  return !product?.active
});


// unit amounts from stripe look like
//   "unit_amount": 4000,
//  but we want to display them as $40.00
//  so we need to divide by 100 and then format as currency
function unitAmountToUSD(unitAmount) {
  return (unitAmount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

/*
{
  "product": {
    "id": "prod_Q9ZzUdAjw1ih4S",
    "object": "product",
    "active": true,
    "attributes": [],
    "created": 1716390721,
    "default_price": "price_1PJGphK8xzrKBF9TpYOrIBf3",
    "description": null,
    "images": [
      "https://files.stripe.com/links/MDB8YWNjdF8xRFhjZmdLOHh6cktCRjlUfGZsX3Rlc3RfOE5SUlF6Tll4V3BMcUlpS29HbElVUUoz00nnyBshD2"
    ],
    "livemode": false,
    "marketing_features": [],
    "metadata": {
      "ceramics-type": "cup",
      "type": "ceramics"
    },
    "name": "Test Ceramic 1",
    "package_dimensions": null,
    "shippable": null,
    "statement_descriptor": null,
    "tax_code": null,
    "type": "service",
    "unit_label": null,
    "updated": 1716390987,
    "url": null
  }
}
*/

</script>

<style scoped></style>