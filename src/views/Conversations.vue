<template>
  <div>
    <Header />
    <section class="section">
      <h4 class="title is-4 has-text-centered">Mes évènements</h4>
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-11-tablet is-10-desktop is-9-widescreen">
            <template v-for="conversation in conversations">
              <conversation
                class="box"
                :key="conversation.id"
                :conversation="conversation"
              />
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Conversation from "../components/Conversation.vue";
export default {
  components: {
    Conversation,
  },
  data() {
    return {
      conversations: [],
    };
  },
  mounted() {
    this.$api.get("channels").then((response) => {
      this.conversations = response.data;
    });
  },
};
</script>
<style lang="scss">
@import "../scss/bulma.scss";
</style>
