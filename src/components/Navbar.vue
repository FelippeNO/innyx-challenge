<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Innyx Challenge</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Produtos</router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link class="nav-link" to="/add-product">Adicionar Produto</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item position-relative">
                        <router-link class="nav-link" to="/checkout">
                            <i class="bi bi-cart"></i>
                            <span v-if="cartItemCount > 0"
                                class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">{{
                                    cartItemCount }}</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login" v-if="!isAdmin">
                            <i class="bi bi-person"></i>
                        </router-link>
                        <a class="nav-link" href="#" @click.prevent="logout" v-else>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../store/AuthStore';
import { useProductStore } from '../store/ProductsStore';

const authStore = useAuthStore();
const productStore = useProductStore();
const isAdmin = computed(() => authStore.isAdmin);
const cartItemCount = computed(() => productStore.cart.reduce((total, item) => total + item.quantity, 0));

const logout = () => {
    authStore.logout();
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>