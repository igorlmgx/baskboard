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
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row justify="center" align="center" class="filter-row">
          <v-col cols="8" md="2" offset-md="2">
            <v-select
              :items="attributes"
              v-model="attr1"
              return-object
              label="Attribute 1"
              solo
              flat
            >
            </v-select>
          </v-col>
          <v-col cols="8" md="2">
            <v-select
              :items="attributes"
              v-model="attr2"
              return-object
              label="Attribute 2"
              solo
              flat
            ></v-select>
          </v-col>
          <v-col cols="8" md="2">
            <v-select
              :items="attributes"
              v-model="attr3"
              return-object
              label="Attribute 3"
              solo
              flat
            ></v-select>
          </v-col>
          <v-col cols="8" md="2">
            <v-select
              :items="attributes"
              v-model="attr4"
              return-object
              label="Attribute 4"
              solo
              flat
            ></v-select>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="mt-5"
          v-for="player in team_players"
          :key="player.player_id"
        >
          <v-col cols="10">
            <PlayerCard
              :player="player"
              :attr1="attr1"
              :attr2="attr2"
              :attr3="attr3"
              :attr4="attr4"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-row justify="center" align="center" class="stat-row">
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
          <v-row justify="center" align="center" class="stat-row">
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
          <v-row justify="center" align="center" class="stat-row">
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
              class="stat-row"
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
        </v-container>
      </v-tab-item>
    </v-tabs-items>
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
      attributes: [
        "Position",
        "Minutes",
        "Field goals %",
        "Two pointers %",
        "Three pointers %",
        "Free throws %",
        "Usage rate %",
        "Player efficiency rating",
        "Offensive rebounds",
        "Defensive rebounds",
        "Rebounds",
        "Assists",
        "Steals",
        "Turnovers",
        "Points",
        "Blocked shots",
        "Personal fouls",
        "Double doubles",
        "Triple doubles",
      ],
      attr1: "Position",
      attr2: "Usage rate %",
      attr3: "Assists",
      attr4: "Field goals %",
    };
  },
  async mounted() {
    const stats_fields =
      "wins, losses, assists, blocked_shots, defensive_rebounds, double_doubles," +
      "effective_field_goals_percentage, fantasy_points, field_goals_attempted, field_goals_made," +
      "field_goals_percentage, tree_throws_attempted, free_throws_made, free_throws_percentage," +
      "games, minutes, offensive_rebounds, personal_fouls, plus_minus, points, possessions," +
      "rebounds, steals, three_pointers_attempted, three_pointers_made, three_pointers_percentage," +
      "triple_doubles, true_shooting_attempts, true_shooting_percentage, turnovers," +
      "two_pointers_attempted, two_pointers_made, two_pointers_percentage";

    let player_fields =
      "players.player_id, players.photo_url, players.height, players.weight, players.jersey, player_stats.name";

    for (let i in this.attributes) {
      player_fields +=
        ", player_stats." +
        this.attributes[i]
          .toLowerCase()
          .replace(/\ /g, "_")
          .replace(/\%/g, "percentage");
    }

    const query_data = `SELECT * FROM teams WHERE team_id = ${this.$route.params.id}`;
    const query_stats = `SELECT ${stats_fields} FROM team_stats WHERE team_id = ${this.$route.params.id}`;
    const query_players =
      `SELECT ${player_fields} FROM players, player_stats WHERE players.player_id = player_stats.player_id ` +
      `AND players.team_id = ${this.$route.params.id}`;

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
.filter-row {
  background-color: #5551;
}
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
