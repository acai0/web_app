<template>
      <transition name="fade">
            <article class="media box" v-if="conversation && afficher">
                  <div class="media-content">
                  <div class="content">
                        <p>
                        <router-link :to="{name : 'Conversation', params :{id: conversation.id}}">
                              <h5 class="title is-5">{{conversation.topic}}</h5>
                              <p class="subtitle is-6 tag is-rounded is-warning">{{conversation.label}}</p>
                        </router-link>
                        </p>
                  </div>
                  </div>
                  <div class="media-right">
                        <router-link div="box" :to="{name : 'EditEvent', params :{id: conversation.id}}" class="button is-success is-small" >Modifier</router-link>    
                         <a div="box" @click="deleteConversation" class="button is-danger is-small">Supprimer</a>
                  </div>
            </article>    
      </transition>                                   
</template>
<script>
export default {
props : ["conversation"],
data() {
      return {
            afficher : true,
            editer : false
      }
},
methods : {
      deleteConversation(){
            if(confirm("êtes-vous sûre de vouloir supprimer la conversation ?")){
       this.$api.delete(`channels/${this.conversation.id}`)
       .then( () =>{
         this.afficher = false;
       })
       .catch((error) => {
         if(error.response.data.message){
           alert(error.response.data.message)
         }
       })
       }
      },
  }
}
</script>

<style lang="scss">
@import "../scss/bulma.scss";
</style>

