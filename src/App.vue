<template>
  <div>
    {{ name }}
    <img :src="avatar" />
    <img :src="small" />
  </div>
</template>

<script>
import avatar from './assets/images/avatar.jpeg';
import small from './assets/images/small-avatar.jpg';
export default {
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