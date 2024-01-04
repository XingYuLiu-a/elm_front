<script setup>

import Footer from "@/components/Footer.vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {useMyStore} from "@/store/myStore";

let name = ref();
let sex =ref();
let tel = ref();
let addr = ref();
let userId = ref();
let daId = ref(null);

const myStore = useMyStore();

const getByDaId = async () =>{
  try {
    const response = await axios.get(`http://localhost:8080/addressList/daId/${daId.value}`,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      name.value = response.data.data.contactName;
      sex.value = response.data.data.contactSex;
      tel.value = response.data.data.contactTel;
      addr.value = response.data.data.address;
      userId.value = response.data.data.userId;
    }else {
      console.error(response.data.message);
    }

  }catch (error){
    console.error(error)
  }
}

// 更新功能
const updateAddr = async () =>{
  try {
    const data={
      daId:daId.value,
      contactName:name.value,
      contactSex: sex.value,
      contactTel: tel.value,
      address:addr.value,
    }
    const response = await axios.put('http://localhost:8080/addressList',data,{
      headers:{
        Authorization:myStore.token,
      }
    });
    if (response.data.code === 1){
      alert('更新成功!');
      router.push(`/addressList/${userId.value}`)
    }
  }catch (error){
    console.error(error);
  }
}


//跳转功能
const router = useRouter();
const listenAddressList = async ()=>{
  daId.value = router.currentRoute.value.params.daId;
}

function back(){
  router.push(`/addressList/${userId.value}`)
}

onMounted(()=>{
  listenAddressList();
  getByDaId();
})

</script>

<template>
  <section>
    <header @click="back">编辑送货地址</header>
    <div style="height: 12vw; width: 100vw;"></div>
    <main>
      <div class="info">
        <div class="name">联系人:<input type="text" v-model="name"></div>
        <div class="sex">
          性别:<input type="radio" checked="checked" name="sex" value="1" v-model="sex" >男
          <input type="radio" v-model="sex" name="sex" value="0">女
        </div>
        <div class="tel">电话:<input type="text" v-model="tel" ></div>
        <div class="address">收货地址:<input type="text" v-model="addr" ></div>
      </div>
      <div class="save">
        <button @click="updateAddr">更新</button>
      </div>
    </main>
    <Footer></Footer>
  </section>

</template>

<style scoped>
section{
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
main{
  display: flex;
  flex-direction: column;
}
.info{
  display: flex;
  flex-direction: column;
}
.info div{
  margin-left: 2vw;
  font-weight: 600;
  font-size: 4vw;
  color: #8a8888;
  margin-bottom: 3vw;
}
.info div input{
  color: #aba9a9;
  font-size: 3vw;
  font-weight: 500;
  margin-left: 2vw;
}
.save {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vw;

}
.save button{
  background-color: #38CA73;
  width: 90vw;
  height: 9vw;
  color: white;
  font-size: 3vw;
  font-weight: 600;
  border-radius: 5px;
}
</style>
