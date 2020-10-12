<template>
  <v-row
    no-gutters
    :style="
      'background-color: #' +
      team.primary_color +
      '; border-left: 1rem solid #' +
      team.secondary_color
    "
    class="team-row"
    align="center"
  >
    <v-col cols="12" md="1">
      <v-img
        height="110px"
        style="background-color: #fff"
        contain
        :src="team.wikipedia_logo_url"
      ></v-img>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <h2>{{ team.city }}</h2>
      <h2>{{ team.name }}</h2>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <h2>{{ team[attr1.value] }}</h2>
      <h4>{{ attr1.text }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <h2>{{ team[attr2.value] }}</h2>
      <h4>{{ attr2.text }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <h2>{{ team[attr3.value] }}</h2>
      <h4>{{ attr3.text }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="text-center">
      <h2>{{ team[attr4.value] }}</h2>
      <h4>{{ attr4.text }}</h4>
    </v-col>
    <v-col cols="12" md="1" class="btn-details">
      <v-btn :to="'/teams/' + team.team_id" nuxt fab light small>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    team: Object,
    attr1: Object,
    attr2: Object,
    attr3: Object,
    attr4: Object,
  },
};
</script>

<style>
.team-row {
  border-radius: 0.5rem;
}
.btn-details {
  text-align: center;
}
@media (max-width: 959px) {
  .btn-details {
    text-align: right;
  }
  .team-row .v-btn {
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>