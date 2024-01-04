<script setup>
import {onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";

const address = ref();
const searchValue = ref("搜索饿了么商家,商品名称");

let businessData = ref([]);

const myStore=useMyStore();
const daId = myStore.daId;
const userId =myStore.userId;

const getAddress = async () =>{
  try {
    if (daId === null){
      address.value = '请选择地址';
    }else{
      const response = await axios.get(`http://localhost:8080/addressList/daId/${daId}`,{
        headers:{
          Authorization:myStore.token,
        }
      })
      if (response.data.code === 1){
        address.value = response.data.data.address;
      }
    }
  }catch (error){
    console.error(error);
  }

}

//选择地址
function chooseAddress(){
  if (userId != null){
    router.push(`/addressList/${userId}`);
  }else {
    alert('请先登录');
    router.push('/login');
  }

}

const listAll = async () => {
  try {
    const response = await axios.get('http://localhost:8080/business');
    if (response.data.code === 1) {
      businessData.value=response.data.data;
    }
  }catch (error) {
    console.error(error);
  }
};

// 搜索
const search = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/business/search/${searchValue.value.trim()}`)
    if (response.data.code === 1){
      businessData.value = response.data.data;
    }
  }catch (error){
    console.log(error);
  }
}

// 根据orderTypeId筛选商家
const getOrderTypeId = async (id) =>{
  router.push(`/businessList/${id}`)
}

//跳转功能
const router = useRouter();
const goToBusinessInfo = (businessId) => {
  router.push(`/businessInfo/${businessId}`);
};


onMounted(() => {
  listAll();
  getAddress();
});
</script>

<template>
  <section>
    <main>
      <header @click="chooseAddress">
        <div class="header">
          <img src="../assets/image/local.png" alt="">
          <p>{{address}}</p>
        </div>
      </header>
      <!--搜索-->
      <div class="search" >
        <input type="text" v-model="searchValue" @keydown.enter="search">
      </div>
      <!--点餐分类-->
      <ul class="order">
        <li>
          <img src="../assets/image/dcfl01.png" alt="" @click="getOrderTypeId(1)">
          <p>美食</p>
        </li>
        <li>
          <img src="../assets/image/dcfl02.png" alt="" @click="getOrderTypeId(2)">
          <p>早餐</p>
        </li>
        <li>
          <img src="../assets/image/dcfl03.png" alt="" @click="getOrderTypeId(3)">
          <p>跑腿代购</p>
        </li>
        <li>
          <img src="../assets/image/dcfl04.png" alt="" @click="getOrderTypeId(4)">
          <p>汉堡披萨</p>
        </li>
        <li>
          <img src="../assets/image/dcfl05.png" alt="" @click="getOrderTypeId(5)">
          <p>甜品饮品</p>
        </li>
        <li>
          <img src="../assets/image/dcfl06.png" alt="" @click="getOrderTypeId(6)">
          <p>速食简餐</p>
        </li>
        <li>
          <img src="../assets/image/dcfl07.png" alt="" @click="getOrderTypeId(7)">
          <p>地方小吃</p>
        </li>
        <li>
          <img src="../assets/image/dcfl08.png" alt="" @click="getOrderTypeId(8)">
          <p>米粉面馆</p>
        </li>
        <li>
          <img src="../assets/image/dcfl09.png" alt="" @click="getOrderTypeId(9)">
          <p>包子粥铺</p>
        </li>
        <li>
          <img src="../assets/image/dcfl10.png" alt="" @click="getOrderTypeId(10)">
          <p>炸鸡炸串</p>
        </li>
      </ul>
      <!--横幅广告-->
      <div class="ad">
        <h3>品质套餐</h3>
        <p>搭配齐全吃得好</p>
        <a>立即抢购></a>
      </div>
      <!--超级会员-->
      <div class="vip">
        <img src="../assets/image/super_member.png" alt="">
        <h3>超级会员</h3>
        <p style="margin-left: 2vw;">&#8226; 每月享超值权益</p>
        <p style="margin-left: 20vw;">立即开通 &gt;</p>
      </div>
      <!--推荐方式-->
      <div style="margin-top: 16px;height: 40px;">
        <p style="text-align: center;font-size:large">—&emsp;推荐商家&emsp;—</p>
      </div>
      <ul class="recommend">
        <li>综合排序</li>
        <li>距离最近</li>
        <li>销量最高</li>
        <li>筛选</li>
      </ul>
<!--      商家列表-->
      <ul class="business">
        <div class="bus" v-for="(business,index) in businessData" :key = "index" @click="goToBusinessInfo(business.businessId)">
          <div>
            <img :src="`../src/assets/image/${business.businessImg}`" alt="">
          </div>
          <div>
            <p>{{business.businessName}}（{{business.businessAddress}}）</p>
            <p>{{business.starPrice}}起送 | ¥{{business.deliveryPrice}}配送</p>
            <p>{{business.businessExplain}}</p>
          </div>
        </div>
      </ul>
      <div style="height: 15vw;"></div>
    </main>
    <Footer></Footer>
  </section>
</template>

<style scoped>
section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  overflow: auto;
}

header {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 12vw;
}

.header{
  display: flex;
  align-items: center;
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
  padding: 10px;
  background-color: #0097FF;
  width: 100vw;
}
.header img {
  height: 5vw;
  width: 5vw;
}
.search {
  display: flex;
  padding: 8px;
  background-color: #0097FF;
  position: sticky;
  top:0;
  align-items: center;
  width: 100vw;
  height: 13vw;
}
.search input{
  display: flex;
  padding: 8px;
  width: 90vw;
  height: 9vw;
  margin: 3vw 12px;
  font-size: 3.5vw;
  align-items: center;
  justify-content: center;
  color: #AEAEAE;
}
.order {
  width: 100vw;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
}
.order li {
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vw;
}
.order li img {
  width: 12vw;
  height: 12vw;
}
.order li p {
  font-size: 2.8vw;
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity));
}
.ad {
  margin-top: 7vw;
  margin-left: 2vw;
  margin-right: 2vw;
  padding: 16px;
  height: 25vw;
  background-size: cover;
  background-image: url("../assets/image/index_banner.png");
}
.ad h3 {
  font-size: 4.2vw;
  font-weight: 800;
  margin-left: 3vw;
}
.ad p{
  color:#666;
  font-size: 3.5vw;
  margin-left: 3.5vw;
  margin-top: 1vw;
}
.ad a {
  color: #C79060;
  font-weight: 800;
  font-size: 3vw;
  margin-left: 3vw;
}
.vip {
  display: flex;
  margin: 8px 8px 0 8px;
  padding-top: 8px;
  height: 44px;
  background-color: #FEEDC1;
  align-items: center;
}
.vip img{
  width: 6vw;
  height: 6vw;
  margin-left: 4vw;
  margin-bottom: 1vw;
}
.vip h3 {
  font-size: 4vw;
  margin-left: 2vw;
  font-weight: 800;
  color: #644F1B;
}
.vip p {
  font-size: 3vw;
  color: #644F1B;
}
.recommend {
  margin-top: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: small;
  height: 5vw;
  color: #555;
}

.business{
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
}
.bus {
  margin-top: 2vw;
  margin-left: 2vw;
  display: flex;
  height: 23.5vw;
  border-bottom:solid #d7d4d4 0.1px;
}
.bus div:nth-child(1){
  display: flex;
}
.bus div:nth-child(1) img{
  width: 20vw;
  height: 20vw;
}
.bus div:nth-child(2){
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 1.8vw;
  margin-left: 1.4vw;
}
.bus div:nth-child(2) p:nth-child(1){
  font-size: 3.8vw;
  font-weight: 700;
  color: #555;
}
.bus div:nth-child(2) p:nth-child(2){
  font-size: 3vw;
  color: #888;
}
.bus div:nth-child(2) p:nth-child(3){
  font-size: 3vw;
  color: #888;
  margin-bottom: 2.5vw;
}
</style>
