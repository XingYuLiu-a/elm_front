<script setup>
import {onMounted, ref} from "vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {useMyStore} from "@/store/myStore";
import router from "@/router";

const addressData = ref();
const myStore =useMyStore();
const userId =myStore.userId;

const listAddress = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/addressList/${userId}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1) {
      addressData.value=response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteAddress = async (daId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/addressList/${daId}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1) {
      alert("删除成功");
    }
  } catch (error) {
    console.error(error);
  }
};

//设定地址
function setDaId(newDaId){
  myStore.setDaId(newDaId);
  alert(`选择地址成功:${myStore.daId}`)
  router.back();
}

//跳转到新增功能
const router1 = useRouter();
const gotoAddressAdd = (userId) => {
  router1.push(`/addressAdd/${userId}`);
};

//跳转到更新功能
const router2 = useRouter();
const gotoAddressUpdate = (daId) => {
  router2.push(`/addressUpdate/${daId}`);
};

onMounted(() => {
  listAddress();
});

</script>

<template>
<section>
  <header>地址管理</header>
  <div style="height: 12vw; width: 100vw;"></div>
  <main>
    <div class="address" v-for="(address1,index) in addressData" :key="index" >
      <div class="userInfo">
        <div class="info">
          <p class="name">{{address1.contactName}}</p>
          <p class="tel">{{address1.contactTel}}</p>
        </div>
        <p class="addr">{{address1.address}}</p>
      </div>
      <div class="image">
        <button @click="setDaId(address1.daId)" style="position:absolute;margin-left: -10vw;">选择</button>
        <i @click="gotoAddressUpdate(address1.daId)"><svg style="width: 6vw; height: 6vw;" t="1702275074297" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2617" width="200" height="200"><path d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z" fill="#8a8a8a" p-id="2618"></path><path d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539" fill="#8a8a8a" p-id="2619"></path></svg></i>
        <i @click="deleteAddress(address1.daId)"><svg style="width: 5vw; height: 5vw; margin-left: 3vw;" t="1702275290521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2591" width="200" height="200"><path d="M1023.035952 170.907721l-852.12806 852.128061L0.241225 852.730697l852.248588-852.12806z" p-id="2592" fill="#8a8a8a"></path><path d="M170.425782 0l852.128061 852.12806L852.248758 1022.794727l-852.12806-852.248588z" p-id="2593" fill="#8a8a8a"></path></svg></i>
      </div>
      <div></div>
    </div>
    <div class="addAddr" @click="gotoAddressAdd(userId)">
      <p>新增收货地址</p>
    </div>
  </main>
  <Footer></Footer>
</section>
</template>

<style scoped>
section{
  background-color: #f3f2f2;
  display: flex;
  height: 250vw;
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
.address{
  background-color: white;
  align-items: center;
  height: 15vw;
  border-bottom: solid 2px #6666;
  display: flex;
  justify-content: space-between;
}
.userInfo{
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
}
.info {
  display: flex;
}
.name{
  color: #666;
  font-size: 4vw;
}
.tel{
  margin-left: 2vw;
  color: #666;
  font-size: 4vw;
}
.addr{
  margin-top: 1vw;
  font-size: 3vw;
  color: #666;
}
.image{
  position: relative;
  display: flex;
  margin-left: 45vw;
  align-items: center;
}
.addAddr{
  height: 12vw;
  display: flex;
  background-color: white;
  margin-top: 4vw;
  border-bottom: solid #989898 1px;
  color: #0097EF;
  align-items: center;
  font-size: 4vw;
  justify-content: center;
}
</style>
