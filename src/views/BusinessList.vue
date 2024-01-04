<script setup>
import {ref, onMounted, watch} from "vue";
import axios from "axios";
import Footer from "@/components/Footer.vue";
import router from "@/router";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";


let businessData = ref([]);
let isDisabled = ref(true);
let name = ref();
let address = ref();
let explain = ref();
let orderTypeId = ref();
let star = ref();
let delivery = ref();
let remark = ref();
let image = ref();
let myStore = useMyStore();

let orderTypeIdCheck=ref(0);


const router1 = useRouter();
const listenOrderTypeId = async ()=>{
  orderTypeIdCheck.value = Number(router1.currentRoute.value.params.orderTypeId);
}

const list = async () =>{
  if (orderTypeIdCheck.value === 0){
    try {
      const response = await axios.get('http://localhost:8080/business');
      if (response.data.code === 1) {
        businessData.value=response.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }else{
    try {
      const response = await axios.get(`http://localhost:8080/business/orderTypeId/${orderTypeIdCheck.value}`)
      if (response.data.code === 1){
        businessData.value = response.data.data;
      }
    }catch (error){
      console.log(error);
    }
  }
}

function show(){
  const button = document.querySelector(".insert");
  button.style.display = "flex";
}
function cancel(){
  const button1 = document.querySelector(".insert");
  button1.style.display = "none";

}

const check = () =>{
  return(
      !name.value ||
      !address.value ||
      !explain.value ||
      !orderTypeId.value ||
      !star.value ||
      !delivery.value
  );
};
watch([name, address, explain, image, orderTypeId, star, delivery], () => {
  isDisabled.value = check();
});



// 添加商家
const add = async ()=> {
  try {
    const data = {
      businessName: name.value,
      businessAddress: address.value,
      businessExplain: explain.value,
      businessImg: image.value,
      orderTypeId: orderTypeId.value,
      starPrice: star.value,
      deliveryPrice: delivery.value,
      remarks: remark.value,
    };
    const response = await axios.post('http://localhost:8080/business', data,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      console.log('add,Success');
      document.querySelector(".insert").style.display = "none";
      alert('添加成功');
      listAll();
    }
  }catch (error){
    console.log(error);
  }
}
// 删除商家
const delete1 = async (id) =>{
  try {
    const response = await axios.delete(`http://localhost:8080/business/${id}`,{
      headers:{
        Authorization:myStore.token,
      }
    })
    if (response.data.code === 1){
      console.log('success');
      alert('删除成功');
      listAll();
    }
  }catch (error){
    console.error(error);
  }
}

//跳转功能
function gotoBusinessInfo(businessId){
  router.push(`/businessInfo/${businessId}`);
}

onMounted(() => {
  listenOrderTypeId();
  list();
});
</script>

<template>
<!--  新增商家信息框-->
  <div class="insert">
    <div>*商家名称:<input type="text" v-model="name"></div>
    <div>*商家地址:<input type="text" v-model="address"></div>
    <div>*商家介绍:<input type="text" v-model="explain"></div>
    <div>*商家图片:<input type="text" v-model="image"></div>
    <div>*点餐分类:<input type="text" v-model="orderTypeId"></div>
    <div>*起送费:<input type="text" v-model="star"></div>
    <div>*配送费:<input type="text" v-model="delivery"></div>
    <div>备注:<input type="text" v-model="remark"></div>
    <div class="button">
      <button @click="add" :disabled="isDisabled">提交</button>
      <button style="margin-left: 30vw;" @click="cancel">取消</button>
    </div>
  </div>

  <header class="businessHeader">商家列表</header>
  <div class="action">
    <button @click="show" v-show="false">新增商家</button>
  </div>
  <main>
    <div class="bus" v-for="(business,index) in businessData" :key = "index" >
      <div>
        <img :src="`../src/assets/image/${business.businessImg}`" alt="" @click="gotoBusinessInfo(business.businessId)">
      </div>
      <div>
        <p>{{business.businessName}}（{{business.businessAddress}}）</p>
        <p>{{business.starPrice}}起送 | ¥{{business.deliveryPrice}}配送</p>
        <p>{{business.businessExplain}}</p>
      </div>
      <div>
        <button @click="delete1(business.businessId)" v-show="false">删除商家</button>
      </div>
    </div>
    <div style="height: 15vw;"> </div>
  </main>
  <Footer></Footer>

</template>

<style scoped>
.insert{
  display: none;
  background-color: #bee0f3;
  //display: flex;
  flex-direction: column;
  justify-content:start;
  position: fixed;
  margin-top: 20vw;
  margin-left: 10vw;
  height: 120vw;
  width: 80vw;
}

.insert div{
  font-family: STSong ;
  font-size: 5vw;
  margin-top: 15px;
  display: flex;
  justify-content: left;
  margin-left: 10vw;
}
.insert div input{
  height: 8vw;
}
.button button {
  font-size: 4vw;
  height: 9vw;
  width: 14vw;
}
template{
  display: flex;
  height: 270vw;
  flex-direction: column;
}
.businessHeader{
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
  top: 0;
}
.action{
  margin-top: 15vw;
  display: flex;
  justify-content: space-around;
}
.action button{
  width: 15vw;
  height: 5vw;
  background-color: deepskyblue;
  color: white;
}
main{
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
.bus div:nth-child(3) {
  margin-left:15vw;
}
.bus div:nth-child(3) button{
  background-color: deepskyblue;
  margin-top: 5vw;
  color: white;
  width: 15vw;
  height: 5vw;
  text-align: center;

}

</style>
