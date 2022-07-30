import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Form",
    component: () => import("./views/Form.vue"), // 동적 import
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("./views/Search.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
