<template>
  <div>
    <div class="checkbox">
      <v-layout justify-space-around>
        <v-btn color="#132f46">
          <label class="test avatars" for="tank">
            <v-checkbox
              class="tag-input"
              value="Tank"
              v-model="tags"
              v-on:change="tagsFunction"
              id="tank"
            />
            <img class="role" src="../assets/Tank_icon.png" />
          </label>
        </v-btn>
        <v-btn color="#132f46">
          <label class="test avatars" for="support">
            <v-checkbox
              class="tag-input"
              value="Support"
              v-model="tags"
              v-on:change="tagsFunction"
              id="support"
            />
            <img class="role" src="../assets/Support_icon.png" />
          </label>
        </v-btn>
        <v-btn color="#132f46">
          <label class="test avatars" for="mage">
            <v-checkbox
              class="tag-input"
              value="Mage"
              v-model="tags"
              @change="tagsFunction"
              id="mage"
            />
            <img class="role" src="../assets/Mage_icon.png" />
          </label>
        </v-btn>
        <v-btn color="#132f46">
          <label class="test avatars" for="fighter">
            <v-checkbox
              class="tag-input"
              value="Fighter"
              v-model="tags"
              v-on:change="tagsFunction"
              id="fighter"
            />
            <img class="role" src="../assets/Fighter_icon.png" />
          </label>
        </v-btn>
        <v-btn color="#132f46">
          <label class="test avatars" for="marksman">
            <v-checkbox
              class="tag-input"
              value="Marksman"
              v-model="tags"
              v-on:change="tagsFunction"
              id="marksman"
            />
            <img class="role" src="../assets/Marksman_icon.png" />
          </label>
        </v-btn>
        <v-btn color="#132f46">
          <label class="test avatars" for="assassin">
            <v-checkbox
              class="tag-input"
              value="Assassin"
              v-model="tags"
              v-on:change="tagsFunction"
              id="assassin"
            />
            <img class="role" src="../assets/Assassin_icon.png" />
          </label>
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tags",
  data() {
    return {
      tags: []
    };
  },
  methods: {
    tagsFunction() {
      this.$emit("tags", this.tags);
    }
  }
};
</script>

<style>
.tag-input {
  display: none !important;
}

.role {
  height: 23px;
}

.v-btn:not(.v-btn--round).v-size--default {
  min-width: 0px !important;
}

.test > .accent--text + img {
  box-sizing: content-box;
  border-bottom: 6px dotted rgb(158, 120, 25);
}
</style>