<template>
  <div>Deconnexion en cours</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setToken", false);
    setTimeout(() => {
      this.$router.push("/Login");
    }, 100);
  },
};
</script>
