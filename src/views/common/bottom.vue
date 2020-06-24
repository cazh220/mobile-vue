<template>
  <div class="bottom">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">好友</van-tabbar-item>
      <van-tabbar-item name="chat" icon="chat-o" badge="2">消息</van-tabbar-item>
      <van-tabbar-item name="mine" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 'index'
    };
  },
  mounted(){
    this.active = this.$route.name.toLowerCase()
  },
  methods: {
      onChange(index) {
          this.$router.push(index);
          this.active = index;
      }
  }
};
</script>