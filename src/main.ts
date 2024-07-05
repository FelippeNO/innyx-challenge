import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
