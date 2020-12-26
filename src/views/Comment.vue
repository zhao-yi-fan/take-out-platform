<!-- 我的页面 -->
<template>
  <van-nav-bar title="全部评价" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="wsw-top-User">
    <van-empty description="无历史评价" v-if="currEvaluateList.length == 0" />
    <van-collapse v-model="activeNames">
      <van-collapse-item :title="item.shopsName" :name="item.businessesId" v-for="(item) in currEvaluateList" :key="item.businessesId">
        <template #title>
          <div>
            <van-icon name="smile" size="20" color="#ed9428" />{{item.shopsName}}
            <span class="wsw-r">{{item.evaluate.score}}</span>
          </div>
        </template>
        {{item.evaluate.content}}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, ref } from "vue";
import { Dialog, Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "",
  components: {},
  setup (propes, { root }) {
    const router = useRouter();
    const store = useStore();
    const activeNames = ref(["1"]);
    const model = reactive({
      currEvaluateList: []
    })
    const init = () => {
      let { loginInfo, shopsList, orderList } = store.state;
      let userId = loginInfo.userId;

      orderList.forEach((item, index) => {
        if (item.userId == userId && item.evaluate.content) {
          shopsList.forEach((shopItem, shopIndex) => {
            if (shopItem.shopsId == item.shopsId) {
              item.shopsName = shopItem.shopsName;
              model.currEvaluateList.push(item);
            }
          })
        }
      })
      console.log(model.currEvaluateList, 'currEvaluateList===');
    }
    init();
    const onClickLeft = () => {
      router.go(-1)
    }
    return {
      ...toRefs(model),
      activeNames,
      onClickLeft
    };
  },
};
</script>

<style lang="scss" scoped>
$a: 100vh;
$b: 390px;
.wsw-top-User {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: #f8f8fa;
}
</style>
