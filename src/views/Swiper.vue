<template>
  <div class="swiper">
    <van-swipe class="swiper-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in images.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem
} from 'vant';

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      images: {
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ]
      }
    }
  }
}
</script>

<style lang="less">
.swiper {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>