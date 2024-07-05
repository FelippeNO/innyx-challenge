import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { createApp } from "vue";
import App from "./App.vue";
import decimalDirective from "./directives/decimal";
import router from "./router";
import pinia from "./store";
import { useProductStore } from "./store/ProductsStore";

const app = createApp(App);

app.use(router);
app.use(pinia);

app.directive("decimal", decimalDirective);

const productStore = useProductStore();
productStore.fetchProducts();

app.mount("#app");
