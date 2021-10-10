<template>
  <navbar></navbar>
  <login></login>
  <p id="info"></p>

</template>

<script>
import navbar from "@/components/navbar/navbar";
import login from "@/components/login/login";
export default {
  name: 'Home',
  components: {
    login,
    navbar
  }
}
</script>
