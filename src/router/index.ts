import { createRouter, createWebHistory } from "vue-router";
import VideoBrowserView from "@/views/VideoBrowserView.vue";
import HistoryView from "@/views/HistoryView.vue";
import ConfigView from "@/views/ConfigView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: VideoBrowserView
        },
        {
            path: "/history",
            name: "history",
            component: HistoryView
        },
        {
            path: "/config",
            name: "config",
            component: ConfigView
        }
    ]
});

export default router;
