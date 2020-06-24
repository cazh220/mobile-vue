<template>
  <div id="friends">
    <van-index-bar>
        <van-index-anchor index="A" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="B" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="C" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="D" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="E" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="F" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />

        <van-index-anchor index="G" />
        <van-cell title="文本" />
        <van-cell title="文本" />
        <van-cell title="文本" />
    </van-index-bar>

    <div class="footer">
      <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
import vFoot from "./common/bottom.vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
export default {
  data() {
    return {
    };
  },
  components: {
    vFoot,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell
  },
};
</script>

<style>
</style>