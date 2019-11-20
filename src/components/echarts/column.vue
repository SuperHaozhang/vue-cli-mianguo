<template>
    <div :id="id" :style="{width,height}"></div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "column",
        props:['width','height','id'],
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.id));
            // 绘制图表
            myChart.setOption({
                title: {
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '鞋子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 22 ]
                }]
            });
        },
    }
</script>

<style scoped>

</style>