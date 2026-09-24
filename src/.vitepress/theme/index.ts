import DefaultTheme from "vitepress/theme";
import { defineClientComponent, type Theme } from "vitepress";
import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import DoubleNumber from "./components/DoubleNumber.vue";
import DXCC from "./components/DXCC.vue";
import Exam from "./components/Exam.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("DoubleNumber", DoubleNumber);
    app.component("DXCC", DXCC);
    app.component("Exam", Exam);
    // Map components depend on mapbox-gl, which only runs in the browser
    app.component("LHFA", defineClientComponent(() => import("./components/LHFA.vue")));
    app.component("QTH", defineClientComponent(() => import("./components/QTH.vue")));
    app.component("WAL", defineClientComponent(() => import("./components/WAL.vue")));
  },
} satisfies Theme;
