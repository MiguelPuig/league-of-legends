<template>
  <div>

  <div v-if="champName && chart" id="chart" class="grafic">
    <apexchart type="radar" height="200" :options="options" :series="series" />
  </div>
    <!-- <div>{{ this.name }}: {{ this.stat }}</div> -->
  </div>
</template>

<script>
export default {
  name: "stats",
  props: {
    stat: Number,
    name: String,
    champName: null,
    chart:null
  },
   data: function() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [this.chart[this.name]]
        }
      },
      series: [
        {
          name: "series-1",
          data: [
            this.chart[this.stat]
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
