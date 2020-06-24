<template>
  <div class="register">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message:'请填写用户名'}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message:'请填写密码'}]"
      />
      <van-field
        v-model="c_password"
        type="password"
        name="c_password"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message:'确认密码'}]"
      />
      <van-field
        v-model="name"
        name="name"
        label="真是姓名"
        placeholder="真实姓名"
        :rules="[{ required: false, message:'请填写真实姓名'}]"
      />
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message:'邮箱'}]"
      />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="user_img" label="头像">
        <template #input>
          <van-uploader
            v-model="user_img"
            :max-count="1"
            :before-read="asyncBeforeRead"
            :after-read="afterRead"
            accept="image/*"
          />
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="area"
        :value="area"
        label="地区"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>
      <div style="margin: 50px 16px">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getAreaList } from "@/request/api";
import { register } from "@/request/api";
import { imgPreview } from "@/lib/Upload";
import {
  Form,
  Button,
  Field,
  RadioGroup,
  Radio,
  Uploader,
  Picker,
  Popup,
  Toast,
  Area
} from "vant";

export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Area.name]: Area
  },
  data() {
    return {
      username: "",
      password: "",
      c_password: "",
      name: "",
      email: "",
      sex: "0",
      user_img: [
        // { url: "https://img.yzcdn.cn/vant/leaf.jpg" }
        ],
      uploaded_pic: "",
      area: "",
      areaList: {},
      areaData: {},
      showArea: false
    };
  },
  created() {
    this.listAreas();
  },
  methods: {
    onSubmit(values) {
      values["picture"] = this.uploaded_pic;
      values["area_detail"] = this.areaData;
      let data = {
        username: values["username"] || "",
        name: values["name"] || "",
        email: values["email"] || "",
        password: values["password"] || "",
        c_password: values["c_password"] || "",
        sex: values["sex"] || 0,
        province: values["area_detail"][0]["code"] || "",
        city: values["area_detail"][1]["code"] || "",
        district: values["area_detail"][2]["code"] || "",
        address: values["area"] || "",
        photo: values["picture"] || "",
      };
      register(data)
        .then(res => {
          // console.log(data, res);
          if (res.code == 200) {
            Toast.success('注册成功');
            window.location.href='/#/login'
          }
        })
        .catch(err => {
          if (err.data) {
            Toast(err.data)
          } else {
            Toast('err')
          }
        });
    },
    onConfirm(values) {
      this.areaData = values;
      this.area = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    //图片上传前
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== "image/jpeg") {
          Toast("请上传 jpg 格式图片");
          reject();
        } else {
          // console.log(file)
          resolve(file);
        }
      });
    },
    //上传后
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log("afterRead", file);
      this.files = {}; //单个文件上传，防止连续上传时，出现files数据累计报错
      this.files.name = file.file.name; // 获取文件名
      this.files.type = file.file.type; // 获取类型
      this.picValue = file.file; // 文件流

      imgPreview(this.picValue, this.files).then(res => {
        console.log("上传图片的url:", res);
        this.uploaded_pic = res;
      });
    },
    //获取省市区三级联动列表
    listAreas() {
      getAreaList()
        .then(res => {
          this.areaList = res.data;
          console.log('res',this.areaList);
        })
        .catch(err => {
          console.log('err',err);
        });
    }
  }
};
</script>