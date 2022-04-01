<template>
  <section class="hero is-fullheight">
    <Header />
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-12-tablet is-11-desktop is-10-widescreen">
            <h4 class="title is-4 has-text-centered">Nouvel event</h4>
            <form class="box" @submit.prevent="createConversation">
              <div class="field">
                <label class="label">Titre</label>
                <div class="control">
                  <input class="input" v-model="conversation.topic" />
                </div>
              </div>
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <input class="input" v-model="conversation.label" />
                </div>
              </div>
               <div class="field">
                <label class="label">Date Heure</label>
                <div class="control">
                  <input class="input" v-model="conversation.date" />
                </div>
              </div>
              <div class="field">
                <label class="label">Lieu</label>
                <div class="control">
                  <input class="input" v-model="conversation.lieu" />
                </div>
              </div>
              <template>
 <l-map
                  v-if="showMap"
                  :zoom="zoom"
                  :center="initialLocation"
                  :options="mapOptions"
                  style="height: 350px; width: 100%"
                  @update:center="centerUpdate"
                  @update:zoom="zoomUpdate"
                  @click="handleMapClick"
                >
                  <l-tile-layer :url="url" :attribution="attribution" />
                  <l-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :lat-lng="m.pos"
                  >
                    <l-tooltip
                      :options="{ permanent: true, interactive: true }"
                      >{{ place }}</l-tooltip
                    >
                  </l-marker>
                                </l-map>
                                </template>
              <div class="buttons">
                <button class="button is-info is-outlined">Poster</button>
                <router-link class="button is-outlined" to="/"
                  >Annuler</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  components: {
      LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      conversation: {
        label: "",
        topic: "",
      },
        initialLocation: [48.6829037, 6.1613428],
      markers: [],
      x: false,
      y: false,
      zoom: 15,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(48.6829037, 6.1613428),
      showParagraph: false,
      withTooltip: latLng(48.6829037, 6.1613428),
      currentZoom: 15,
      currentCenter: latLng(location.x, location.y),
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  methods: {
    createConversation() {
      this.$api
        .post("channels", this.conversation)
        .then((response) => {
          this.$router.push({
            name: "Conversation",
            params: { id: response.data.id },
            idCreateur: this.$store.state.member.id,
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
       getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.updateLocation);
      }
    },
    updateLocation(position) {
      let currentLocation = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      this.initialLocation = currentLocation;
    },

    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    handleMapClick(event) {
      const pos = L.latLng(event.latlng.lat, event.latlng.lng);
      this.markers = [];
      this.markers.push({ pos: pos });
      this.x = event.latlng.lat;
      this.y = event.latlng.lng;
    },
  },
};
</script>
<style lang="scss">
@import "../scss/bulma.scss";
</style>
