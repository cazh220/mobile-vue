<template>
  <div id="app">
    <van-tabs v-model="active" swipeable @change="onClick">
      <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
        <div v-if="index == 0">
          <v-swiper></v-swiper>
          <v-recommend></v-recommend>
          <!-- <v-swiper></v-swiper>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item.article_id" :title="item.title" />
            </van-list>
          </van-pull-refresh> -->
        </div>
        <div v-else-if="index == 1">1</div>
        <div v-else-if="index == 2">2</div>
        <div v-else-if="index == 3">3</div>
        <div v-else-if="index == 4">4</div>
        <div v-else>5</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import vRecommend from "./Test2.vue";
import vSwiper from "./common/swiper.vue";
// import { articles } from "@/request/api";
import { Tab, Tabs } from "vant";
export default {
  components: {
    vSwiper,
    vRecommend,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    // [List.name]: List,
    // [Cell.name]: Cell,
    // [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      active: 0,
      tabs: ["推荐", "新闻", "音乐", "体育", "娱乐"],
      // list: [],
      // loading: false,
      // finished: false,
      // page: 1
    };
  },
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   // setTimeout(() => {
    //   //   for (let i = 0; i < 10; i++) {
    //   //     this.list.push(this.list.length + 1);
    //   //   }

    //   //   // 加载状态结束
    //   //   this.loading = false;

    //   //   // 数据全部加载完成
    //   //   if (this.list.length >= 40) {
    //   //     this.finished = true;
    //   //   }
    //   // }, 1000);
    //   console.log("onLoad", this.page);
    //   this.getArticles(this.page);
    // },
    // onRefresh() {
    //   console.log("onRefresh");
    //   this.loading = false;
    //   this.page = 1;
    //   this.list = [];
    //   this.finished = false;
    //   this.getArticles(this.page);
    // },
    // getArticles(page) {
    //   articles({ cid: 1, page: page })
    //     .then(res => {
    //       if (res.data.current_page >= res.data.last_page) {
    //         this.finished = true;
    //       }
    //       res.data.data.map(item => {
    //         this.list.push(item);
    //       });
    //       this.page += 1;
    //       this.loading = false;
    //     })
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // },
    onClick(name, title) {
      console.log(name, title);
    }
  }
};
</script>