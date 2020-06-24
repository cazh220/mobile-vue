<template>
  <div class="mine">
    <div class="user">
      <van-row>
        <van-col span="8" class="us">
          <div class="user_img">
            <img class="pic_css" src="../assets/img/me.jpg">
          </div>
        </van-col>
        <van-col span="16" class="us">
          <div class="desc u_name">潇潇</div>
          <div class="desc">
            <span class="u_badge"><van-tag round type="danger">VIP</van-tag></span>
            <span class="u_badge"><van-tag round type="danger">卖家</van-tag></span>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="more">
      <van-cell title="我的收藏" is-link to="shoucang" />
      <van-cell title="我的优惠券" is-link to="coupon" />
      <van-cell title="设置" is-link to="setting" />
    </div>

    <div class="logout">
      <van-button type="primary" round  block to="logout">退出</van-button>
    </div>

    <div class="footer">
      <v-foot></v-foot>
    </div>
  </div>
</template>

<script>
import vFoot from "./common/bottom.vue";
import { 
  Col, 
  Row,
  Tag,
  Cell,
  CellGroup,
  Button
} from "vant";
export default {
  components: {
    vFoot,
    [Col.name]: Col,
    [Row.name]: Row,
    [Tag.name]: Tag,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  data() {
    return {};
  }
};
</script>

<style>
body {
  background-color: #eef;
}
.us {
  line-height: 120px;
  background-color: lightskyblue;
  height: 120px;
}
.user_img {
  padding-top: 20px;
}
.pic_css {
  height: 80px;
  width: 80px;
  border-radius: 40px;
}
.u_name {
  padding-top:30px;
}
.desc {
  height: 30px;
  line-height:30px;
  margin-left:30px;
  text-align: left;
}
.u_badge {
  margin: auto 5px auto 0px;
}
.more {
  text-align:left;
  margin-top: 50px;
}
.logout {
  width: 90%;
  margin: 50px auto;
}
</style>