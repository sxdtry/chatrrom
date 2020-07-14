<template>
  <div class="user-view">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.user-view {
  width: 100%;
  height: 100%;
  .container {
    width: 350px;
    margin: 260px auto 0;
	background-color: #ccc;
	padding: 20px;
  }
}
</style>
