<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="10" md="5" xl="4">
          <div v-show="!player1">
            <h1 class="display-3 mb-12">Pick a team</h1>
            <v-autocomplete
              class="mb-12"
              v-model="team1"
              :items="teams"
              :item-text="
                (teams) =>
                  teams.city + ' ' + teams.name + ' (' + teams.key + ')'
              "
              @change="updateTeam1"
              return-object
              clearable
              solo
              label="Team's name"
            ></v-autocomplete>
          </div>
          <div v-show="!team1">
            <h1 class="display-3 mb-12">Or a player</h1>
            <v-autocomplete
              v-model="player1"
              :items="players"
              :item-text="
                (players) =>
                  players.first_name +
                  ' ' +
                  players.last_name +
                  ' (' +
                  players.team +
                  ')'
              "
              @change="updatePlayer1"
              return-object
              clearable
              solo
              label="Players's name"
            ></v-autocomplete>
          </div>
        </v-col>
        <v-col cols="10" offset-md="1" md="5" xl="4">
          <div v-show="team1 || player1">
            <h1 class="display-3 mb-12">And it's rival</h1>
            <v-autocomplete
              v-show="team1"
              v-model="team2"
              :items="teams"
              :item-text="
                (teams) =>
                  teams.city + ' ' + teams.name + ' (' + teams.key + ')'
              "
              @change="updateTeam2"
              return-object
              clearable
              solo
              label="Team's name"
            ></v-autocomplete>
            <v-autocomplete
              v-show="player1"
              v-model="player2"
              :items="players"
              :item-text="
                (players) =>
                  players.first_name +
                  ' ' +
                  players.last_name +
                  ' (' +
                  players.team +
                  ')'
              "
              @change="updatePlayer2"
              return-object
              clearable
              solo
              label="Players's name"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="team1"
        justify="center"
        align="center"
        style="background-color: #fff1"
      >
        <v-col cols="10" md="3" xl="2">
          <v-img height="220px" contain :src="team1.wikipedia_logo_url"></v-img>
          <h1 v-if="team1_stats" class="text-center display-1 mt-3">
            W {{ team1_stats.wins }} / {{ team1_stats.losses }} L
          </h1>
        </v-col>
        <v-col cols="10" md="2" xl="3">
          <h1 class="display-4 text-center">VS</h1>
        </v-col>
        <v-col cols="10" md="3" xl="2">
          <div v-if="team2 && team2_stats">
            <v-img
              height="220px"
              contain
              :src="team2.wikipedia_logo_url"
            ></v-img>
            <h1 class="text-center display-1 mt-3">
              W {{ team2_stats.wins }} / {{ team2_stats.losses }} L
            </h1>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="player1"
        justify="center"
        align="center"
        style="background-color: #fff1"
      >
        <v-col cols="10" md="3">
          <v-img height="150px" contain :src="player1.photo_url"></v-img>
          <h1 class="text-center display-1 mt-3">
            {{ player1.first_name }} {{ player1.last_name }}
          </h1>
        </v-col>
        <v-col cols="10" md="2">
          <h1 class="display-4 text-center">VS</h1>
        </v-col>
        <v-col cols="10" md="3">
          <div v-if="player2">
            <v-img height="150px" contain :src="player2.photo_url"></v-img>
            <h1 class="text-center display-1 mt-3">
              {{ player2.first_name }} {{ player2.last_name }}
            </h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="team1_stats && team2_stats" class="mt-5">
      <div v-for="(value, key, index) in this.team1_stats" :key="index">
        <v-row align="center" justify="center" class="text-center my-3">
          <v-col cols="4">
            <p
              :class="parseFloat(team1_stats[key]) > parseFloat(team2_stats[key]) ? 'higher' : ''"
              class="mb-0"
            >
              {{ team1_stats[key] }}
            </p>
          </v-col>
          <v-col cols="4">
            <p class="mb-0">
              {{
                (key[0].toUpperCase() + key.substring(1)).replace(/\_/g, " ")
              }}
            </p>
          </v-col>
          <v-col cols="4">
            <p
              :class="parseFloat(team2_stats[key]) > parseFloat(team1_stats[key]) ? 'higher' : ''"
              class="mb-0"
            >
              {{ team2_stats[key] }}
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-container>
    <v-container v-if="player1_stats && player2_stats" class="mt-5">
      <div v-for="(value, key, index) in this.player1_stats" :key="index">
        <v-row align="center" justify="center" class="text-center my-3">
          <v-col cols="4">
            <p
              :class="parseFloat(player1_stats[key]) > parseFloat(player2_stats[key]) ? 'higher' : ''"
              class="mb-0"
            >
              {{ player1_stats[key] }}
            </p>
          </v-col>
          <v-col cols="4">
            <p class="mb-0">
              {{
                (key[0].toUpperCase() + key.substring(1)).replace(/\_/g, " ")
              }}
            </p>
          </v-col>
          <v-col cols="4">
            <p
              :class="parseFloat(player2_stats[key]) > parseFloat(player1_stats[key]) ? 'higher' : ''"
              class="mb-0"
            >
              {{ player2_stats[key] }}
            </p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.higher {
  color: #00c853;
}
</style>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      players: [],
      player1: null,
      player1_stats: null,
      player2: null,
      player2_stats: null,
      teams: [],
      team1: null,
      team1_stats: null,
      team2: null,
      team2_stats: null,
    };
  },
  async mounted() {
    const players_query =
      "SELECT player_id, first_name, last_name, team, photo_url FROM players";
    const teams_query =
      "SELECT team_id, city, name, key, conference, division, wikipedia_logo_url FROM teams";

    await axios
      .post(process.env.API_URL, players_query)
      .then((response) => {
        this.players = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .post(process.env.API_URL, teams_query)
      .then((response) => {
        this.teams = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    async updateTeam1(value) {
      if (value) {
        const team_stats =
          "wins, losses, assists, blocked_shots, defensive_rebounds, double_doubles, " +
          "effective_field_goals_percentage, fantasy_points, field_goals_attempted, field_goals_made, " +
          "field_goals_percentage, free_throws_attempted, free_throws_made, free_throws_percentage, " +
          "games, minutes, offensive_rebounds, personal_fouls, plus_minus, points, possessions, " +
          "rebounds, steals, three_pointers_attempted, three_pointers_made, three_pointers_percentage, " +
          "triple_doubles, true_shooting_attempts, true_shooting_percentage, turnovers," +
          "two_pointers_attempted, two_pointers_made, two_pointers_percentage";

        const team_query = `SELECT ${team_stats} FROM team_stats WHERE team_stats.team_id = ${this.team1.team_id}`;

        await axios
          .post(process.env.API_URL, team_query)
          .then((response) => {
            this.team1_stats = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.team1 = null;
        this.team1_stats = null;
        this.team2 = null;
        this.team2_stats = null;
      }
    },
    async updateTeam2(value) {
      if (value) {
        const team_stats =
          "wins, losses, assists, blocked_shots, defensive_rebounds, double_doubles, " +
          "effective_field_goals_percentage, fantasy_points, field_goals_attempted, field_goals_made, " +
          "field_goals_percentage, free_throws_attempted, free_throws_made, free_throws_percentage, " +
          "games, minutes, offensive_rebounds, personal_fouls, plus_minus, points, possessions, " +
          "rebounds, steals, three_pointers_attempted, three_pointers_made, three_pointers_percentage, " +
          "triple_doubles, true_shooting_attempts, true_shooting_percentage, turnovers," +
          "two_pointers_attempted, two_pointers_made, two_pointers_percentage";

        const team_query = `SELECT ${team_stats} FROM team_stats WHERE team_stats.team_id = ${this.team2.team_id}`;

        await axios
          .post(process.env.API_URL, team_query)
          .then((response) => {
            this.team2_stats = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.team2 = null;
        this.team2_stats = null;
      }
    },
    async updatePlayer1(value) {
      if (value) {
        const player_stats =
          "players.height, players.weight, player_stats.games, player_stats.assists_percentage, player_stats.assists, player_stats.blocked_shots, player_stats.blocks_percentage, player_stats.defensive_rebounds, player_stats.double_doubles, " +
          "player_stats.effective_field_goals_percentage, player_stats.field_goals_percentage, player_stats.field_goals_attempted, player_stats.field_goals_made, " +
          "player_stats.free_throws_percentage, player_stats.free_throws_attempted, player_stats.free_throws_made, player_stats.minutes, player_stats.offensive_rebounds, " +
          "player_stats.personal_fouls, player_stats.player_efficiency_rating, player_stats.points, player_stats.Rebounds, player_stats.steals_percentage, player_stats.steals, " +
          "player_stats.three_pointers_percentage, player_stats.three_pointers_attempted, player_stats.three_pointers_made, player_stats.triple_doubles, " +
          "player_stats.true_shooting_percentage, player_stats.true_shooting_attempts, player_stats.turn_overs_percentage, player_stats.turnovers, " +
          "player_stats.two_pointers_percentage, player_stats.two_pointers_attempted, player_stats.two_pointers_made, player_stats.usage_rate_percentage";

        const player_query = `SELECT ${player_stats} FROM players, player_stats WHERE players.player_id = player_stats.player_id AND players.player_id = ${this.player1.player_id}`;

        await axios
          .post(process.env.API_URL, player_query)
          .then((response) => {
            this.player1_stats = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.player1 = null;
        this.player2 = null;
        this.player1_stats = null;
        this.player2_stats = null;
      }
    },
    async updatePlayer2(value) {
      if (value) {
        const player_stats =
          "players.height, players.weight, player_stats.games, player_stats.assists_percentage, player_stats.assists, player_stats.blocked_shots, player_stats.blocks_percentage, player_stats.defensive_rebounds, player_stats.double_doubles, " +
          "player_stats.effective_field_goals_percentage, player_stats.field_goals_percentage, player_stats.field_goals_attempted, player_stats.field_goals_made, " +
          "player_stats.free_throws_percentage, player_stats.free_throws_attempted, player_stats.free_throws_made, player_stats.minutes, player_stats.offensive_rebounds, " +
          "player_stats.personal_fouls, player_stats.player_efficiency_rating, player_stats.points, player_stats.Rebounds, player_stats.steals_percentage, player_stats.steals, " +
          "player_stats.three_pointers_percentage, player_stats.three_pointers_attempted, player_stats.three_pointers_made, player_stats.triple_doubles, " +
          "player_stats.true_shooting_percentage, player_stats.true_shooting_attempts, player_stats.turn_overs_percentage, player_stats.turnovers, " +
          "player_stats.two_pointers_percentage, player_stats.two_pointers_attempted, player_stats.two_pointers_made, player_stats.usage_rate_percentage";

        const player_query = `SELECT ${player_stats} FROM players, player_stats WHERE players.player_id = player_stats.player_id AND players.player_id = ${this.player2.player_id}`;

        await axios
          .post(process.env.API_URL, player_query)
          .then((response) => {
            this.player2_stats = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.player1_stats = null;
        this.player2_stats = null;
      }
    },
  },
};
</script>