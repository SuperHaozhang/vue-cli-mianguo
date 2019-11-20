<template>
    <div :id="id" :style="{width,height}"></div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "line1",
        props:['width','height','id'],
        mounted() {
            //var echarts = require('echarts');
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.id));

            var option = {
                xAxis: {
                    type:'category',
                    data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                },
                yAxis:{
                    type:'value'
                },
                series:[{
                    data:[110,112,115,140,150,160,170],
                    type:'line'
                }]
            };
            // 绘制图表
            myChart.setOption(option);
        },
    }
</script>

<style scoped>

</style>