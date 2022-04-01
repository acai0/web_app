<template>
  <div>
    <Header />
    <section class="section">
      <div v-if="member">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="avatar(member)" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ member.fullname }}</p>
                <p class="subtitle is-6">{{ member.email }}</p>
              </div>
                            <div class="media-right">
                <button @click="modifMember" class="button is-success is-small">
                  Modifier mon profil
                </button>
                            </div>
              <div class="media-right">
                <button @click="deleteMember" class="button is-danger is-small">
                  Clôturer mon profil
                </button>
              </div>
            </div>
            <div class="content">Membre depuis le {{ created_at }}</div>
          </div>
        </div>
        <div class="box mt-5">
          {{ messages.length }} dernier(s) messages postés
        </div>
        <template v-for="message in messages">
          <message
            :message="message"
            :key="message.id"
            :conversation="conversation"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
export default {
  components: {
    Message,
  },
  data() {
    return {
      member: false,
      allMessages: [],
      conversation: "",
      deleteMemberMessage: "",
    };
  },
  mounted() {
    this.member = this.$store.getters.getMember(this.$route.params.idMember);

    //On récupère toutes les conversation, et pour chaque conversation tous ses messages, on push ensuite les messages du user acutelle dans allMessages
    this.$api.get("channels").then((response) => {
      response.data.forEach((conversation) => {
        this.conversation = conversation;
        this.$api.get(`channels/${conversation.id}/posts`).then((response) => {
          response.data.forEach((message) => {
            if (message.member_id == this.member.id) {
              this.allMessages.push(message);
            }
          });
        });
      });
    });
  },
  computed: {
    messages() {
      //trier les messages selon leurs date de création et prendre les 10 messages les plus récent
      return this.allMessages
        .sort((ma, mb) => new Date(ma.created_at) < new Date(mb.created_at))
        .slice(0, 10);
    },
    created_at() {
      if (this.member) {
        let date = new Date(this.member.created_at);
        return (
          date.toLocaleDateString("fr-FR") +
          " à " +
          date.toLocaleTimeString("fr-FR")
        );
      }
    },
  },
  methods: {
    deleteMember() {
      if (confirm("êtes-vous sûre de vouloir supprimer le membre ?")) {
        this.$api.delete(`members/${this.member.id}`).then((response) => {
          this.$router.push("/Members");
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../scss/bulma.scss";
</style>
