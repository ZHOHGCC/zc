<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  created () {
    if (localStorage.eleToken) {
      const eleToken = localStorage.eleToken
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(eleToken));
      this.$store.dispatch("setUser", eleToken);
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
