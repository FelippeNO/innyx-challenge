<template>
    <div class="container mt-4">
        <h2>Adicionar Produto</h2>
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
                <input type="text" v-model="price" id="price" class="form-control" v-decimal required />
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Imagem:</label>
                <input type="file" @change="onFileChange" id="image" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Adicionar Produto</button>
        </form>
        <button @click="addRandomProduct" class="btn btn-secondary w-100 mt-3">Adicionar Produto Aleatório</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useProductStore } from '../store/ProductsStore';

const store = useProductStore();

const name = ref('');
const description = ref('');
const price = ref(0);
const image = ref<File | null>(null);

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        image.value = target.files[0];
    }
};

const onSubmit = () => {
    if (name.value && description.value && price.value && image.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target && e.target.result) {
                const newProduct = {
                    id: Date.now(),
                    name: name.value,
                    description: description.value,
                    price: price.value,
                    image: e.target.result as string,
                };
                store.addProduct(newProduct);

            }
        };
        reader.readAsDataURL(image.value);
        router.push('/products');
    }

};

const addRandomProduct = () => {
    store.addRandomProduct();
    router.push('/products');
};
</script>

<style scoped></style>