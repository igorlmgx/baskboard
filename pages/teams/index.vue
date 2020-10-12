<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="2">
        <v-autocomplete
          :items="teams"
          :item-text="
            (teams) => teams.city + ' ' + teams.name + ' (' + teams.key + ')'
          "
          clearable
          solo
          label="Team's name"
          @input="filterTeams"
        ></v-autocomplete>
      </v-col>
      <v-col cols="2">
        <v-select
          :items="attributes"
          v-model="attr1"
          return-object
          label="Attribute 1"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          :items="attributes"
          v-model="attr2"
          return-object
          label="Attribute 2"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          :items="attributes"
          v-model="attr3"
          return-object
          label="Attribute 3"
          solo
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          :items="attributes"
          v-model="attr4"
          return-object
          label="Attribute 4"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="my-5"
      v-for="team in filtered_teams"
      :key="team.team_id"
    >
      <v-col cols="10">
        <TeamCard
          :team="team"
          :attr1="attr1"
          :attr2="attr2"
          :attr3="attr3"
          :attr4="attr4"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TeamCard from "@/components/TeamCard.vue";
const axios = require("axios");

export default {
  data() {
    return {
      teams: [],
      filtered_teams: [],
      attributes: [
        { value: "wins", text: "Wins" },
        { value: "losses", text: "Losses" },
        { value: "possessions", text: "Possessions" },
        { value: "minutes", text: "Minutes played" },
        { value: "field_goals_percentage", text: "Field goals %" },
        { value: "two_pointers_percentage", text: "2 pointers %" },
        { value: "three_pointers_percentage", text: "3 pointers %" },
        { value: "free_throws_percentage", text: "Free throws %" },
        { value: "offensive_rebounds", text: "Offensive rebounds" },
        { value: "defensive_rebounds", text: "Defensive rebounds" },
        { value: "rebounds", text: "Total rebounds" },
        { value: "assists", text: "Assists" },
        { value: "steals", text: "Steals" },
        { value: "turnovers", text: "Turnovers" },
        { value: "points", text: "Points" },
        { value: "blocked_shots", text: "Blocked shots" },
        { value: "double_doubles", text: "Double doubles" },
        { value: "triple_doubles", text: "Triple doubles" },
      ],
      attr1: { value: "wins", text: "Wins" },
      attr2: { value: "losses", text: "Losses" },
      attr3: { value: "possessions", text: "Possessions" },
      attr4: { value: "points", text: "Points" },
    };
  },
  components: {
    TeamCard,
  },
  async mounted() {
    let fields =
      "teams.key, teams.team_id, teams.city, teams.name, teams.conference, " +
      "teams.primary_color, teams.secondary_color, teams.wikipedia_logo_url";

    for (let i in this.attributes) {
      fields += ", team_stats." + this.attributes[i].value;
    }

    const query =
      "SELECT " +
      fields +
      " FROM team_stats INNER JOIN teams ON team_stats.global_team_id = teams.global_team_id";
    await axios
      .post(process.env.API_URL, query)
      .then((response) => {
        this.teams = response.data;
        this.filtered_teams = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    filterTeams(value) {
      if (value) {
        const key = value.substring(value.indexOf('(') + 1, value.indexOf(')'));
        for (let i in this.teams) {
          if (this.teams[i].key === key) {
            this.filtered_teams = [this.teams[i]];
          }
        }
      } else {
        this.filtered_teams = this.teams;
      }
    },
  },
};
</script>
