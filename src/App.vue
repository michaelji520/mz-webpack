<template>
  <div>
    {{ name }}
    <img :src="avatar" />
    <img :src="small" />
    <child></child>
  </div>
</template>

<script>
import avatar from './assets/images/avatar.jpeg';
import small from './assets/images/small-avatar.jpg';
import child from './child.vue';
export default {
  components: {
    child
  },
  data() {
    return {
      name: 'Hello World22233www3',
      avatar: avatar,
      small: small
    };
  },
  mounted() {
  }
}
</script>