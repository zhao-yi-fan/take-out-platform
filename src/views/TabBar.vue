<template>
  <van-tabbar v-model="active" inactive-color="#ed9428" active-color="#f44336" @change="change">
    <van-tabbar-item :icon="item.icon" :name="item.name" :to="item.path" v-for="(item,index) in list" :key="index">{{item.title}}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: '',
  components: {
  },
  setup (propes, { root }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const model = reactive({
      list: [
        {
          name: 'index',
          icon: 'wap-home',
          path: '/Home/Index',
          title: '首页'
        },
        {
          name: 'order',
          icon: 'shopping-cart',
          path: '/Home/Order',
          title: '订单'
        },
        {
          name: 'user',
          icon: 'manager',
          path: '/Home/User',
          title: '我的'
        },
      ],
      active: 'index',
      loginInfo: computed(() => {
        return store.state.loginInfo;
      })
    })

    const change = (name) => {
      if (!model.loginInfo) {
        model.active = 'index';
      }
    }
    const init = () => {
      let path = route.path;
      model.list.forEach((item, index) => {
        if (path == item.path) {
          model.active = item.name
        }
      })
    }
    init();
    return {
      ...toRefs(model),
      change
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
