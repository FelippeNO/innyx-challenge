<template>
  <div class="container">
    <h1 class="my-4">Checkout</h1>
    <div v-if="cart.length === 0" class="alert alert-info">
      Seu carrinho está vazio.
    </div>
    <div v-else>
      <ul class="list-group mb-4">
        <li v-for="item in cart" :key="item.product.id"
          class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ item.product.name }}</h5>
            <p>{{ item.product.description }}</p>
            <p>{{ formatCurrency(item.product.price) }} x {{ item.quantity }}</p>
          </div>
          <div>
            <p class="fw-bold">{{ formatCurrency(item.product.price * item.quantity) }}</p>
            <button @click="removeFromCart(item.product.id)" class="btn btn-danger">Remover</button>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-between">
        <h4>Total: {{ formatCurrency(totalAmount) }}</h4>
        <button @click="clearCart" class="btn btn-primary">Limpar Carrinho</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../store/ProductsStore';

const productStore = useProductStore();

const cart = computed(() => productStore.cart);
const totalAmount = computed(() => cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0));

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const removeFromCart = (productId: number) => {
  productStore.removeFromCart(productId);
};

const clearCart = () => {
  productStore.clearCart();
};
</script>

<style scoped></style>
