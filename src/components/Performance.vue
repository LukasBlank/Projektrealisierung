<template>
  <v-container style="display: flex; justify-content: space-evenly">
    <apexchart
      v-if="chartData"
      width="400"
      type="line"
      :options="chartOptions"
      :series="chartData"
    ></apexchart>
  </v-container>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 300,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          // If value of series-entry is supposed to be shown
          enabled: false,
        },
        stroke: {
          // Alternatives Line: straight, smooth, stepline
          curve: 'straight',
        },
        markers: {
          // Size of points for each series-entry
          size: 0,
        },
        title: {
          text: 'Ohne Lazy Loading',
          align: 'center',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          type: 'category',
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      },
      chartData: [
        {
          name: 'First',
          data: [
            { x: 10, y: 415 },
            { x: 100, y: 721 },
            { x: 1000, y: 2129 },
            { x: 5000, y: 7137 },
            { x: 10000, y: 11137 },
            { x: 20000, y: 21963 },
            { x: 30000, y: 31058 },
            { x: 40000, y: 41613 },
            { x: 50000, y: 66313 },
          ],
        },
      ],
    }
  },
}
</script>
