<template>
  <div class="container">
    <h1 class="my-4">Produtos</h1>
    <div class="mb-4">
      <input v-model="searchQuery" @input="filterProducts" type="text" class="form-control"
        placeholder="Buscar por nome ou descrição">
    </div>
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="filteredProducts.length === 0" class="alert alert-info">
        Nenhum produto encontrado.
      </div>
      <div v-else class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="product in paginatedProducts" :key="product.id" class="col">
          <div class="card h-100">
            <img :src="product.image" class="card-img-top" alt="Imagem do Produto" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text fw-bold">{{ formatCurrency(product.price) }}</p>
              <button @click="addToCart(product)" class="btn btn-primary w-100 mb-2">Adicionar ao Carrinho</button>
              <button v-if="isAdmin" @click="navigateToEdit(product.id)"
                class="btn btn-secondary w-100 mb-2">Editar</button>
              <button v-if="isAdmin" @click="deleteProduct(product.id)" class="btn btn-danger w-100">Deletar</button>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="page in totalFilteredPages" :key="page" class="page-item"
            :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalFilteredPages }">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/AuthStore';
import { useProductStore } from '../store/ProductsStore';

const store = useProductStore();
const authStore = useAuthStore();
const router = useRouter();
const loading = ref(true);
const searchQuery = ref('');
const products = ref([]);
const filteredProducts = ref([]);
const currentPage = ref(1);

const isAdmin = computed(() => authStore.isAdmin);
const totalPages = computed(() => Math.ceil(store.totalProducts / store.productsPerPage));
const totalFilteredPages = computed(() => Math.ceil(filteredProducts.value.length / store.productsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * store.productsPerPage;
  const end = start + store.productsPerPage;
  return filteredProducts.value.slice(start, end);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const loadProducts = async () => {
  loading.value = true;
  await store.loadProducts();
  products.value = store.products;
  filterProducts();
  loading.value = false;
};

const changePage = (page: number) => {
  if (page < 1 || page > totalFilteredPages.value) return;
  currentPage.value = page;
};

const filterProducts = () => {
  const query = searchQuery.value.toLowerCase();
  filteredProducts.value = products.value.filter(product =>
    product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
  );
  currentPage.value = 1;
};

onMounted(() => {
  loadProducts();
});

const addToCart = (product) => {
  store.addToCart(product);
};

const navigateToEdit = (productId) => {
  router.push(`/edit-product/${productId}`);
};

const deleteProduct = (productId) => {
  store.deleteProduct(productId);
  products.value = products.value.filter(product => product.id !== productId);
  filterProducts();
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
