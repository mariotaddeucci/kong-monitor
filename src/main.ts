import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia"; // Import

import "./assets/main.css";
import "./assets/simple-grid.css";
import "dracula-ui/styles/dracula-ui.css";

createApp(App).use(createPinia()).mount("#app");
