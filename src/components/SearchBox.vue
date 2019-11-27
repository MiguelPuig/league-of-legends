<template>
  <v-form>
    <v-text-field class="searchbox" placeholder="Search Champion" v-model="search"></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      search: ""
    };
  },
  watch: {
    search: function() {
      this.searchFunction();
    }
  },
  methods: {
    searchFunction() {
      this.$emit("search", this.search);
    }
  }
};
</script>

<style>
.searchbox {
  margin-top: 12px !important;
}
</style>