<template>
    <div class="login">
        <div class="logo">
            <div class="img"><img src="../assets/img/logo.png"></div>
        </div>
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
            <div class="tip"><a href="/#/register"><van-icon name="question-o" />没有账号？请注册</a></div>
            <div style="margin: 50px 16px">
                <van-button round block type="info" native-type="submit">登陆</van-button>
            </div>  
        </van-form>
    </div>
</template>

<script>
import { login } from "@/request/api";
import { Form, Button, Field, Icon, Toast } from "vant";
export default {
    components: {
        [Form.name]: Form,
        [Button.name]: Button,
        [Field.name]: Field,
        [Icon.name]: Icon,
        [Toast.name]: Toast
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        onSubmit(values){
            console.log('submit', values)
            login(values).then( res => {
                if (res.code == 200) {
                    Toast.success('登录成功');
                    //清除原信息并token保存本地
                    localStorage.removeItem('account');
                    localStorage.removeItem('token');
                    localStorage.setItem('account', JSON.stringify(res.data.user))
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    window.location.href = "/#/index"
                } else {
                    Toast(res.msg);
                }
                console.log('res', res)
            }).catch( err => {
                console.log('err', err)
                Toast.fail(err.msg);
            })
        }
    }
}
</script>

<style>
.logo {
    height: 160px;
}
.img {
    margin-top:80px;
}
.tip {
    font-size: 13px;
    float: right;
    padding: 10px 30px;
}
</style>