<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="8" md="2">
        <v-autocomplete
          :items="players"
          :item-text="(players) => players.name + ' (' + players.team + ')'"
          clearable
          solo
          label="Player's name"
          @input="filterplayers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr1"
          return-object
          label="Attribute 1"
          solo
        ></v-select>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr2"
          return-object
          label="Attribute 2"
          solo
        ></v-select>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr3"
          return-object
          label="Attribute 3"
          solo
        ></v-select>
      </v-col>
      <v-col cols="8" md="2">
        <v-select
          :items="attributes"
          v-model="attr4"
          return-object
          label="Attribute 4"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-tabs v-model="pagination" vertical hide-slider>
      <v-tab-item
        v-for="(n, pag_index) in ~~(filtered_players.length / 10) > 0
          ? ~~(filtered_players.length / 10)
          : 2"
        :key="pag_index"
      >
        <v-row
          justify="center"
          align="center"
          class="my-5"
          v-for="(n, player_index) in filtered_players.length > 1 ? 10 : 1"
          :key="player_index"
        >
          <v-col
            cols="10"
            v-if="filtered_players[(pag_index - 1) * 10 + player_index]"
          >
            <PlayerCard
              :player="filtered_players[(pag_index - 1) * 10 + player_index]"
              :attr1="attr1"
              :attr2="attr2"
              :attr3="attr3"
              :attr4="attr4"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="pagination"
          :length="
            ~~(filtered_players.length / 10) > 1
              ? ~~(filtered_players.length / 10) - 1
              : 1
          "
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlayerCard from "@/components/PlayerCard.vue";
const axios = require("axios");

export default {
  data() {
    return {
      players: [],
      filtered_players: [],
      pagination: 1,
      attributes: [
        "Minutes",
        "Field goals %",
        "Two pointers %",
        "Three pointers %",
        "Free throws %",
        "Offensive rebounds",
        "Defensive rebounds",
        "Team",
        "Rebounds",
        "Assists",
        "Steals",
        "Turnovers",
        "Points",
        "Blocked shots",
        "Double doubles",
        "Triple doubles",
      ],
      attr1: "Team",
      attr2: "Minutes",
      attr3: "Points",
      attr4: "Field goals %",
    };
  },
  components: {
    PlayerCard,
  },
  async mounted() {
    let player_fields =
      "players.player_id, players.height, players.weight, players.photo_url, player_stats.name";

    for (let i in this.attributes) {
      player_fields +=
        ", player_stats." +
        this.attributes[i]
          .toLowerCase()
          .replace(/\ /g, "_")
          .replace(/\%/g, "percentage");
    }

    const query =
      "SELECT " +
      player_fields +
      " FROM player_stats INNER JOIN players ON player_stats.player_id = players.player_id";
    await axios
      .post(process.env.API_URL, query)
      .then((response) => {
        this.players = response.data;
        this.filtered_players = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    filterplayers(value) {
      if (value) {
        const name = value.substring(0, value.indexOf("(") - 1);
        for (let i in this.players) {
          if (this.players[i].name == name) {
            this.filtered_players = [this.players[i]];
            this.pagination = 1;
          }
        }
      } else {
        this.filtered_players = this.players;
      }
    },
  },
};
</script>

<style>
.player-row {
  background-color: #fff1;
  border: 1px solid #eee3;
  border-radius: 1rem;
}
</style>