<template>
  <v-row no-gutters class="player-row" align="center">
    <v-col cols="12" md="1">
      <v-img
        height="150px"
        contain
        style="background-color: #fff; border-radius: 0.3rem"
        :src="player.photo_url"
      ></v-img>
    </v-col>
    <v-col cols="12" md="2" class="my-1">
      <h2 class="player-name">{{ player.name }}</h2>
      <h4 class="overline">
        {{ ~~(player.height / 10) + '"' + (player.height % 10) + "'" }}
        {{ player.weight }} lb
      </h4>
    </v-col>
    <v-col cols="12" md="2" class="my-1">
      <h2>
        {{
          player[
            attr1.toLowerCase().replace(/\ /g, "_").replace(/\%/g, "percentage")
          ]
        }}
      </h2>
      <h4>{{ attr1 }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="my-1">
      <h2>
        {{
          player[
            attr2.toLowerCase().replace(/\ /g, "_").replace(/\%/g, "percentage")
          ]
        }}
      </h2>
      <h4>{{ attr2 }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="my-1">
      <h2>
        {{
          player[
            attr3.toLowerCase().replace(/\ /g, "_").replace(/\%/g, "percentage")
          ]
        }}
      </h2>
      <h4>{{ attr3 }}</h4>
    </v-col>
    <v-col cols="12" md="2" class="my-1">
      <h2>
        {{
          player[
            attr4.toLowerCase().replace(/\ /g, "_").replace(/\%/g, "percentage")
          ]
        }}
      </h2>
      <h4>{{ attr4 }}</h4>
    </v-col>
    <v-col cols="12" md="1" class="btn-details">
      <v-btn :to="'/players/' + player.player_id" nuxt fab light small>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    player: Object,
    attr1: String,
    attr2: String,
    attr3: String,
    attr4: String,
  },
};
</script>

<style>
.player-row {
  border-radius: 0.5rem;
  margin: 1rem 0;
  background-color: #6661;
  text-align: center;
}
.btn-details {
  text-align: center;
}
@media (max-width: 959px) {
  .btn-details {
    text-align: right;
  }
  .player-row {
    text-align: left;
  }
  .player-row h2,
  .player-row h4 {
    padding-left: 1.5rem;
  }
  .player-row .v-btn {
    margin: 0 0.5rem 0.5rem 0;
  }
}
</style>