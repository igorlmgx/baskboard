<template>
  <v-container>
    <v-row align="center" class="mx-2 mb-8" v-if="player_data">
      <v-col cols="4" md="2" xl="1">
        <v-img
          max-height="150px"
          min-height="110px"
          contain
          style="background-color: #fff; border-radius: 0.5rem"
          :src="player_data.photo_url"
        ></v-img>
      </v-col>
      <v-col cols="8" md="4">
        <h1 class="display-2">{{ player_data.first_name }}</h1>
        <h1 class="display-2">{{ player_data.last_name }}</h1>
      </v-col>
      <v-col cols="12" md="10" xl="6">
        <p class="text-justify">
          {{ player_data.first_name }} {{ player_data.last_name }} is a
          {{ calcAge(player_data.birth_date) }} years old player with
          {{ player_data.experience }} years of experience in the NBA.<br />
          <span v-if="player_data.birth_city"
            >Born in {{ player_data.birth_city }},
            {{ player_data.birth_state }}, </span
          >{{ player_data.first_name }} is currently playing on
          {{ player_data.team_name }} as a
          {{ getPosition(player_data.position) }}, jersey
          {{ player_data.jersey }}.<br />
          His currently salary is U$
          {{ player_data.salary.toLocaleString() }}.
        </p>
      </v-col>
    </v-row>
    <div v-for="(value, key, index) in this.player_stats" :key="index">
      <v-row v-if="value" justify="center" align="center" class="stat-row">
        <v-col md="4">
          <h2>
            {{ (key[0].toUpperCase() + key.substring(1)).replace(/\_/g, " ") }}
          </h2>
        </v-col>
        <v-col md="4">
          <h2>{{ value }}</h2>
        </v-col>
      </v-row>
      <v-divider v-if="value"></v-divider>
    </div>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      player_data: null,
      player_stats: null,
    };
  },
  async mounted() {
    const stats_fields =
      "player_stats.assists_percentage, player_stats.assists, player_stats.blocked_shots, player_stats.blocks_percentage, player_stats.defensive_rebounds, player_stats.double_doubles, " +
      "player_stats.effective_field_goals_percentage, player_stats.field_goals_percentage, player_stats.field_goals_attempted, player_stats.field_goals_made, " +
      "player_stats.free_throws_percentage, player_stats.free_throws_attempted, player_stats.free_throws_made, player_stats.minutes, player_stats.offensive_rebounds, " +
      "player_stats.personal_fouls, player_stats.player_efficiency_rating, player_stats.points, player_stats.Rebounds, player_stats.steals_percentage, player_stats.steals, " +
      "player_stats.three_pointers_percentage, player_stats.three_pointers_attempted, player_stats.three_pointers_made, player_stats.triple_doubles, " +
      "player_stats.true_shooting_percentage, player_stats.true_shooting_attempts, player_stats.turn_overs_percentage, player_stats.turnovers, " +
      "player_stats.two_pointers_percentage, player_stats.two_pointers_attempted, player_stats.two_pointers_made, player_stats.usage_rate_percentage, " +
      "players.injury_status, players.injury_body_part, players.injury_start_date";

    let player_fields =
      "players.first_name, players.last_name, players.position, players.jersey, players.height, players.weight, players.team, players.salary, " +
      "players.photo_url, players.birth_date, players.birth_city, players.birth_state, players.experience, team_stats.name as team_name";

    for (let i in this.attributes) {
      player_fields +=
        ", player_stats." +
        this.attributes[i]
          .toLowerCase()
          .replace(/\ /g, "_")
          .replace(/\%/g, "percentage");
    }

    const query_stats = `SELECT ${stats_fields} FROM players, player_stats WHERE player_stats.player_id = ${this.$route.params.id} AND players.player_id = player_stats.player_id`;
    const query_data = `SELECT ${player_fields} FROM players, team_stats WHERE players.team_id = team_stats.team_id AND players.player_id = ${this.$route.params.id}`;

    await axios
      .post(process.env.API_URL, query_stats)
      .then((response) => {
        this.player_stats = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .post(process.env.API_URL, query_data)
      .then((response) => {
        this.player_data = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    calcAge(date) {
      const conv_date = new Date(date.slice(5, 10) + "-" + date.slice(0, 4));
      const today = new Date();
      return Math.round((today - conv_date) / (1000 * 60 * 60 * 24 * 30 * 12));
    },
    getPosition(pos) {
      if (pos === "PG") {
        return "Point Guard";
      } else if (pos === "SG") {
        return "Shooting Guard";
      } else if (pos === "SF") {
        return "Small Foward";
      } else if (pos === "PF") {
        return "Power Foward";
      } else {
        return "Center";
      }
    },
  },
};
</script>

<style>
.stat-row {
  min-height: 5.5rem;
}
@media (max-width: 959px) {
  .stat-row h2 {
    font-size: 1.2rem !important;
    font-weight: normal;
  }
}
</style>