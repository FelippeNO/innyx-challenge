import { createRouter, createWebHistory } from "vue-router";
import AddProductPage from "../pages/AddProductPage.vue";
import AdminHomePage from "../pages/AdminHomePage.vue";
import CheckoutPage from "../pages/CheckoutPage.vue";
import EditProductPage from "../pages/EditProductPage.vue";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ProductsPage from "../pages/ProductsPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/admin-home", component: AdminHomePage },
  { path: "/login", component: LoginPage },
  { path: "/products", component: ProductsPage },
  { path: "/checkout", component: CheckoutPage },
  { path: "/add-product", component: AddProductPage },
  { path: "/edit-product/:id", component: EditProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
