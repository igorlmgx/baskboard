<template>
  <div>
    <v-parallax :src="require('@/assets/images/team_bg.jpg')">
      <v-row class="parallax-text" align="center" justify="center">
        <v-col class="text-center" cols="12">
          <v-img
            v-if="this.team_data[0]"
            height="200px"
            contain
            :src="this.team_data[0].wikipedia_logo_url"
          ></v-img>
          <h1 v-if="this.team_data[0]" class="display-3 font-weight-bold mb-2">
            {{ this.team_data[0].city }}
          </h1>
          <h1 v-if="this.team_data[0]" class="display-3 font-weight-bold">
            {{ this.team_data[0].name }}
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-tabs v-model="tab" center-active dark grow>
      <v-tab>Players</v-tab>
      <v-tab>Stats</v-tab>
    </v-tabs>
    <v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item> </v-tab-item>
        <v-tab-item>
          <v-row justify="center" align="center" style="height: 5.5rem">
            <v-col md="4">
              <h2>Team</h2>
            </v-col>
            <v-col md="4">
              <h2 v-if="this.team_data[0]">
                {{ this.team_data[0].city }} {{ this.team_data[0].name }} ({{
                  this.team_data[0].key
                }})
              </h2>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" align="center" style="height: 5.5rem">
            <v-col md="4">
              <h2>Conference</h2>
            </v-col>
            <v-col md="4">
              <h2 v-if="this.team_data[0]">
                {{ this.team_data[0].conference }}
              </h2>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" align="center" style="height: 5.5rem">
            <v-col md="4">
              <h2>Division</h2>
            </v-col>
            <v-col md="4">
              <h2 v-if="this.team_data[0]">{{ this.team_data[0].division }}</h2>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div v-for="(value, key, index) in this.team_stats[0]" :key="index">
            <v-row
              v-if="value"
              justify="center"
              align="center"
              style="height: 5.5rem"
            >
              <v-col md="4">
                <h2>
                  {{
                    (key[0].toUpperCase() + key.substring(1)).replace(
                      /\_/g,
                      " "
                    )
                  }}
                </h2>
              </v-col>
              <v-col md="4">
                <h2>{{ value }}</h2>
              </v-col>
            </v-row>
            <v-divider v-if="value"></v-divider>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      team_data: [],
      team_stats: [],
      team_players: [],
      tab: {},
    };
  },
  async mounted() {
    const stats_fields =
      "wins, losses, possessions, games, fantasy_points, minutes, field_goals_made, field_goals_attempted, " +
      "field_goals_percentage, effective_field_goals_percentage, two_pointers_made, two_pointers_attempted, two_pointers_percentage, " +
      "three_pointers_made, three_pointers_attempted, three_pointers_percentage, free_throws_made, free_throws_attempted, free_throws_percentage, " +
      "offensive_rebounds, defensive_rebounds, rebounds, assists, steals, blocked_shots, turnovers, personal_fouls, points, true_shooting_attempts, " +
      "true_shooting_percentage, plus_minus, double_doubles, triple_doubles";

    const query_data = `SELECT * FROM teams WHERE team_id = ${this.$route.params.id}`;
    const query_stats = `SELECT ${stats_fields} FROM team_stats WHERE team_id = ${this.$route.params.id}`;
    const query_players = `SELECT * FROM players WHERE team_id = ${this.$route.params.id}`;

    await axios
      .post(process.env.API_URL, query_data)
      .then((response) => {
        this.team_data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .post(process.env.API_URL, query_stats)
      .then((response) => {
        this.team_stats = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .post(process.env.API_URL, query_players)
      .then((response) => {
        this.team_players = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.parallax-text {
  background-color: #0004;
}
.v-parallax__content {
  padding: 0 !important;
}
.v-parallax__image {
  -webkit-filter: blur(6px);
  -moz-filter: blur(6px);
  -o-filter: blur(6px);
  -ms-filter: blur(6px);
  filter: blur(6px);
}
</style>
