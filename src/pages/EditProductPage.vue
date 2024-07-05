<template>
  <div class="container mt-4">
    <h2>Editar Produto</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Nome:</label>
        <input type="text" v-model="name" id="name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descrição:</label>
        <textarea v-model="description" id="description" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Preço:</label>
        <input type="number" v-model="price" id="price" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Imagem:</label>
        <input type="file" @change="onFileChange" id="image" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary w-100">Salvar Alterações</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../store/ProductsStore';

const store = useProductStore();
const route = useRoute();
const router = useRouter();
const productId = parseInt(route.params.id as string);

const name = ref('');
const description = ref('');
const price = ref(0);
const image = ref<File | null>(null);
const existingImage = ref('');

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

const onSubmit = () => {
  if (name.value && description.value && price.value) {
    const updatedProduct = {
      id: productId,
      name: name.value,
      description: description.value,
      price: price.value,
      image: image.value ? URL.createObjectURL(image.value) : existingImage.value,
    };
    store.editProduct(updatedProduct);
    router.push('/products');
  }
};

onMounted(() => {
  const product = store.products.find(p => p.id === productId);
  if (product) {
    name.value = product.name;
    description.value = product.description;
    price.value = product.price;
    existingImage.value = product.image;
  }
});
</script>

<style scoped></style>
