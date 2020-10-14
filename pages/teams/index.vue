<template>
  <v-container fluid>
    <v-row justify="center" align="end">
      <v-col cols="8" md="2">
        <v-autocomplete
          :items="teams"
          :item-text="
            (teams) => teams.city + ' ' + teams.name + ' (' + teams.key + ')'
          "
          hide-details
          clearable
          solo
          label="Team's name"
          @input="filterTeams"
        ></v-autocomplete>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr1"
          hide-details
          return-object
          label="Attribute 1"
          solo
        >
        </v-select>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr2"
          hide-details
          return-object
          label="Attribute 2"
          solo
        ></v-select>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr3"
          hide-details
          return-object
          label="Attribute 3"
          solo
        ></v-select>
      </v-col>
      <v-col cols="8" md="2">
        <p class="mb-1">Order by</p>
        <v-select
          :items="attributes"
          v-model="attr4"
          hide-details
          return-object
          label="Attribute 4"
          @change="sort_teams"
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
        "Wins",
        "Losses",
        "Assists",
        "Blocked shots",
        "Defensive rebounds",
        "Double doubles",
        "Field goals %",
        "Free throws %",
        "Minutes",
        "Offensive rebounds",
        "Points",
        "Possessions",
        "Rebounds",
        "Steals",
        "Three pointers %",
        "Triple doubles",
        "Turnovers",
        "Two pointers %",
      ],
      attr1: "Wins",
      attr2: "Losses",
      attr3: "Possessions",
      attr4: "Points",
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
      fields += ", team_stats." + this.unformat_attr(this.attributes[i]);
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

    this.sort_teams(this.attr4);
  },
  methods: {
    unformat_attr(attr) {
      return attr
        .toLowerCase()
        .replace(/\ /g, "_")
        .replace(/\%/g, "percentage");
    },
    filterTeams(value) {
      if (value) {
        const key = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
        for (let i in this.teams) {
          if (this.teams[i].key === key) {
            this.filtered_teams = [this.teams[i]];
          }
        }
      } else {
        this.filtered_teams = this.teams;
      }
    },
    sort_teams(value) {
      const attr = this.unformat_attr(value);
      this.filtered_teams.sort(function (a, b) {
        return parseFloat(a[attr]) > parseFloat(b[attr]) ? -1 : a[attr] > b[attr] ? 1 : 0;
      });
    },
  },
};
</script>
