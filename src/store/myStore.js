import { defineStore } from 'pinia';
import {ref} from "vue";
import piniaPluginPersist from "pinia-plugin-persist";

export const useMyStore = defineStore('myStore',()=> {
    const userId = ref(null);
    const daId = ref(null);
    const token = ref(null);
    function setUserId(newUserId){
        userId.value = newUserId;
    }
    function setDaId(newDaId){
        daId.value = newDaId;
    }
    function setToken(newToken){
        token.value = newToken;
    }

    return {userId,setUserId,daId,setDaId,token,setToken};
},
    {
        persist:{
            enabled:true,
            strategies:[
                {
                    key:'user',
                    storage:localStorage,
                    paths:['userId','daId','token']
                }
            ]

        }
    }
);

