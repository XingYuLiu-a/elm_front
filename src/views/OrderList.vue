<script setup>
import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";

const myStore =useMyStore();
const userId = myStore.userId;
let orderDataNotPay = ref([]);
let orderDataPay = ref([]);

function check(){
  if (userId === null){
    alert('请先登录');
    router.push('/login');
  }else {
    listOrderNotPay();
    listOrderPay();
  }

}
const listOrderNotPay = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/orderListNotPay/${userId}`, {
      headers: {
        Authorization: myStore.token,
      },
    });
    if (response.data.code === 1){
      orderDataNotPay.value = response.data.data;
    }
  }catch (error){
    console.error(error);
  }
}

const listOrderPay = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/orderListPay/${userId}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      orderDataPay.value = response.data.data;
    }
  }catch (error){
    console.error(error);
  }
}

const deleteOrders= async (orderId) =>{
  try {
    const response = await axios.delete(`http://localhost:8080/orders/${orderId}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      alert('删除订单成功');
      listOrderNotPay();
      listOrderPay();
    }else{
      console.log(response.data.msg);
    }
  }catch (error){
    console.error(error);
  }
}

const router1 = useRouter();
const gotoPayment = (orderId) => {
  router1.push(`/payment/${orderId}`);
};

onMounted(()=>{
  check();
})
</script>

<template>
  <section>
    <header>我的订单</header>
    <main>
<!--      未支付订单-->
      <div class="notPay">
        <p class="noPayInfo">未支付订单信息:</p>
        <div class="notPayBusiness" v-for="(orderNotPay,index) in orderDataNotPay" :key="index">
          <div style="display: flex;">
            <div class="notPayName">
              <p>{{orderNotPay.business.businessName}}({{orderNotPay.business.businessAddress}})</p>
              <button style="margin-left: 2vw;width: 10vw;" @click="deleteOrders(orderNotPay.orderId)" v-show="false">删除</button>
            </div>
            <div class="notPayPrice">
              <p>￥{{orderNotPay.orderTotal}}</p>
              <button class="goPay" @click="gotoPayment(orderNotPay.orderId)">去支付</button>
            </div>
          </div>
          <div class="notPayShow" >
            <div v-for="(orderDetailed,index1) in orderNotPay.orderDetailetList" :key="index1" style="display: flex; margin-top: 3vw;justify-content: space-between;width: 100vw;">
              <div style="margin-left: 3vw;">{{orderDetailed.food.foodName}}({{orderDetailed.food.foodExplain}})&nbsp; &nbsp; &nbsp; x{{orderDetailed.quantity}}</div>
              <div style="margin-right: 10vw;">￥{{orderDetailed.food.foodPrice}}</div>
            </div>
            <div style="display: flex;margin-top: 3vw;justify-content: space-between;width: 100vw;">
              <div style="margin-left: 3vw;">配送费</div>
              <div>
                <p style="margin-right: 10vw;">￥{{orderNotPay.business.deliveryPrice}}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
<!--      已支付-->
      <div class="pay">
        <p class="payInfo">已支付订单信息:</p>
        <div class="payBusiness" v-for="(orderPay,index) in orderDataPay" :key="index">
          <div style="display: flex">
            <div class="payName">
              <p>{{orderPay.business.businessName}}({{orderPay.business.businessAddress}})</p>
              <button style="margin-left: 2vw;width: 10vw;" @click="deleteOrders(orderPay.orderId)" v-show="false">删除</button>
            </div>
            <div class="payPrice">
              <p>￥{{orderPay.orderTotal}}</p>
            </div>
          </div>
          <div class="payShow">
            <div v-for="(orderDetailed,index1) in orderPay.orderDetailetList" :key="index1" style="display: flex; margin-top: 3vw;justify-content: space-between;width: 100vw;">
              <div style="margin-left: 3vw;">{{orderDetailed.food.foodName}}({{orderDetailed.food.foodExplain}})&nbsp; &nbsp; &nbsp; x{{orderDetailed.quantity}}</div>
              <div style="margin-right: 10vw;">￥{{orderDetailed.food.foodPrice}}</div>
            </div>
            <div style="display: flex;margin-top: 3vw;justify-content: space-between;width: 100vw;">
              <div style="margin-left: 3vw;">配送费</div>
              <div>
                <p style="margin-right: 10vw;">￥{{orderPay.business.deliveryPrice}}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    <Footer></Footer>
  </section>

</template>

<style scoped>
section{
  display: flex;
  height: 1000vw;
  flex-direction: column;
}
header{
  height: 12vw;
  width: 100vw;
  background-color: #0097FF;
  position: fixed;
  font-size: 5vw;
  text-align: center;
  line-height: 12vw;
  color: white;
}
main{
  display: flex;
  flex-direction: column;
  margin-top: 12vw;
}
.notPay{
  display: flex;
  flex-direction: column;
  margin-top: 3vw;
  margin-left: 4vw;
}
.noPayInfo{
  color: #999;
  font-weight: 300;
  font-size: 4vw;
}
.notPayBusiness{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6vw;
}
.notPayName{
  display: flex;
  color: #666;
  font-size: 4vw;
  align-items: center;
  justify-content: space-between;
  margin-right: 20vw;
}
.notPayPrice{
  display: flex;
  margin-right: 4vw;
}
.notPayPrice p {
  margin-right: 2vw;
  color: #666;
  font-size: 4vw;
}
.goPay{
  background-color: #f90;
  color: white;
  border-radius: 1.3vw;
}
.pay{
  display: flex;
  flex-direction: column;
  margin-top: 18vw;
  margin-left: 4vw;
}
.payInfo{
  color: #999;
  font-weight: 300;
  font-size: 4vw;

}
.payBusiness{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6vw;
  flex-direction: column;
}
.payName{
  display: flex;
  color: #666;
  font-size: 4vw;
  align-items: center;
  margin-right: 35vw;
}
.payPrice{
  display: flex;
  margin-right: 4vw;
}
.payPrice p{
  margin-right: 2vw;
  color: #666;
  font-size: 4vw;
}
</style>
