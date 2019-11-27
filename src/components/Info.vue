<template>
  <div v-if="champName && chart" id="chart" class="grafic">
    <apexchart type="radar" height="200" :options="options" :series="series" />
  </div>
</template>

<script>
export default {
  name: "info",
  props: {
    chart: null,
    champName: null
  },
  data: function() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: ["Attack", "Defense", "Hp", "Difficulty"]
        }
      },
      series: [
        {
          name: "series-1",
          data: [
            this.chart[this.champName].info.attack,
            this.chart[this.champName].info.defense,
            this.chart[this.champName].info.attack,
            this.chart[this.champName].info.difficulty
          ]
        }
      ]
    };
  }
};
</script>

<style>
.apexcharts-toolbar {
  display: none !important;
}
.grafic {
  width: 250px;
  height: 200px;
}
/* .graficDiv {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 335px;
  margin: auto;
  height: 200px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 20px;
} */
</style>
