import PageAbout from "src/pages/PageAbout.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PageHome.vue"),
        name: "Home",
      },
      {
        path: "/about",
        component: () => import("src/pages/PageAbout.vue"),
        name: "About",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
