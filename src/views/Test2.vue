<template>
  <div class="recommend">
    <div id="main">
      <!-- <v-swiper></v-swiper> -->
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.article_id" :title="item.title" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { articles } from "@/request/api";
// import vSwiper from "./common/swiper.vue";
import { List, Cell, PullRefresh, Toast } from "vant";
export default {
  components: {
    // vSwiper,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      console.log("onLoad", this.page);
      this.getArticles(this.page);
      // this.loading = false;
    },
    onRefresh() {
      console.log("刷新");
      this.loading = false;
      this.page = 1;
      this.list = [];
      this.finished = false;
      this.getArticles(this.page);
    },
    getArticles(page) {
      articles({ cid: 1, page: page })
        .then(res => {
          if (res.data.current_page >= res.data.last_page) {
            this.finished = true;
          }
          res.data.data.map(item => {
            this.list.push(item);
          });
          this.page += 1;
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          Toast.fail(err.message);
        });
    }
  }
};
</script>