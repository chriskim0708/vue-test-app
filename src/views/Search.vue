<template>
  <div>
    <ul>
      <li v-for="product in products" v-bind:key="product.idProduct">
        <img :src="product.imageUrl" />
        <div>
          {{ product.brand.brandTitle }}<br />{{ product.productTitle }}<br />{{
            product.price
          }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useFetch } from "@/composables/useFetch";

interface Products {
  products: ProductItem[];
}

interface ProductItem {
  idProduct: number;
  idBrand: number;
  productTitle: string;
  volume: string;
  price: number;
  productScore: number;
  ratingAvg: number;
  productRank: string;
  rankChange: string;
  rankChangeType: string;
  reviewCount: string;
  imageUrl: string;
  brand: {
    idBrand: number;
    brandTitle: string;
    imageUrl: string;
  };
}

export default defineComponent({
  name: "ProductSearch",
  setup() {
    const products = ref<ProductItem[]>([]);

    onBeforeMount(async () => {
      const { data } = await useFetch<Products>(
        "https://s3.ap-northeast-2.amazonaws.com/public.glowday.com/test/app/products.json"
      );
      products.value = data.value?.products as ProductItem[];
    });

    return { products };
  },
});
</script>

<style scoped>
li {
  list-style: none;
}
li > div {
  display: inline-block;
  font-size: 12px;
}
li > img {
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  vertical-align: top;
}
</style>
