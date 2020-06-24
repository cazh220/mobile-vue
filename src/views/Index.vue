<template>
  <div id="_index">
    <van-tabs v-model="active" swipeable @change="onClick">
      <van-tab v-for="(item, index) in tabs" :key="index" :title="item">
        <div v-if="index == 0">
          <!-- <v-recommend></v-recommend> -->
          <v-swiper></v-swiper>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list" :key="item.article_id" :title="item.title" />
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else-if="index == 1">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list1" :key="item.article_id" :title="item.title" />
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else-if="index == 2">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in list2" :key="item.article_id" :title="item.title" />
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-else-if="index == 3">3</div>
        <div v-else-if="index == 4">4</div>
        <div v-else>5</div>
      </van-tab>
    </van-tabs>
    <div class="bottom" style="height:50px"></div>
    <div class="footer">
      <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
import { articles } from "@/request/api";
import vSwiper from "./common/swiper.vue";
import vFoot from "./common/bottom.vue";
import { Tab, Tabs, List, Cell, PullRefresh, Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      tabs: ["推荐", "新闻", "音乐", "体育", "娱乐"],
      list: [],
      list1: [],
      list2: [],
      loading: false,
      finished: false,
      cid: 0,
      page: 1
    };
  },
  components: {
    vSwiper,
    vFoot,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    onLoad() {
      // 异步更新数据
      console.log("onLoad", this.page);
      this.getArticles(this.cid, this.page);
    },
    onRefresh() {
      console.log("onRefresh");
      this.loading = false;
      this.page = 1;
      this.list = [];
      this.list1 = [];
      this.list2 = [];
      this.finished = false;
      this.getArticles(this.cid, this.page);
    },
    getArticles(cid, page) {
      articles({ cid: cid, page: page })
        .then(res => {
          if (res.data.current_page >= res.data.last_page) {
            this.finished = true;
          }
          res.data.data.map(item => {
            if (cid == 1) {
              this.list1.push(item);
            } else if (cid == 2) {
              this.list2.push(item);
            } else {
              this.list.push(item);
            }
            
          });
          this.page += 1;
          this.loading = false;
        })
        .catch(err => {
          console.log("err", err);
          Toast.fail(err.message);
        });
    },
    onClick(name, title) {
      console.log(name, title);
      let cid = 0;
      switch (name) {
        case 0:
          cid = 0;
          break;
        case 1:
          cid = 1;
          break;
        case 2:
          cid = 2;
          break;
        case 3:
          cid = 3;
          break;
        case 4:
          cid = 4;
          break;
        default:
          cid = 0;
          break;
      }
      this.cid = cid;
      console.log('cid', this.cid)
      this.getArticles(this.cid, this.page);
    }
  }
};
</script>

<style>
</style>