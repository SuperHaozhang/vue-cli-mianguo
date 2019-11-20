import myheader1 from "./myheader.vue";
import left1 from './Left.vue'
import bread1 from './bread'

export var chartscolumn = () => import('./echarts/column.vue')
export var chartsline = () => import('./echarts/line.vue')
export var chartspie = () => import('./echarts/pie.vue')
export var editor = () => import('./quill-editor/ue.vue');

export var myheader =myheader1;
export var left = left1;
export var bread = bread1;
