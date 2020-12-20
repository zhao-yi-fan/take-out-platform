<!-- 商品详情 -->
<template>
  <div class="wsw-top-Commodity" v-if="currentShopInfo">
    <van-nav-bar :title="currentShopInfo.shopsName" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="star" size="18" />
        收藏
      </template>
    </van-nav-bar>
    <div class="wsw-top-Commodity-shop">
      <img :src="currentShopInfo.shopsImage" alt="">
      <div class="wsw-top-Commodity-shop-card">
        <p>{{currentShopInfo.shopsName}}</p>
        <div>评分：<span>{{currentShopInfo.score}}</span></div>
        <van-tag type="danger">优质商家</van-tag>
        <br>
        <span class="wsw-top-Commodity-shop-card-address">地址：{{currentShopInfo.address}}</span>
        <van-notice-bar scrollable :text="currentShopInfo.notice" />
      </div>
      <div class="wsw-top-Commodity-list">
        <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items">
          <template #content>
            <van-card price="2.00" desc="充满了夏天的味道" title="夏威夷菠萝堡" thumb="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg">
              <!-- <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
              </template> -->
              <template #footer>
                <van-button icon="minus" type="primary" size="mini" round plain />
                <span>12</span>
                <van-button icon="plus" type="primary" size="mini" round />
              </template>
            </van-card>
            <van-card price="2.00" desc="充满了夏天的味道" title="夏威夷菠萝堡" thumb="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg">
              <!-- <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
              </template> -->
              <template #footer>
                <van-button icon="minus" type="primary" size="mini" round plain />
                <span>12</span>
                <van-button icon="plus" type="primary" size="mini" round />
              </template>
            </van-card>
            <van-card price="2.00" desc="充满了夏天的味道" title="夏威夷菠萝堡" thumb="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=459317208,1913533082&fm=26&gp=0.jpg">
              <!-- <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
              </template> -->
              <template #footer>
                <van-button icon="minus" type="primary" size="mini" round plain />
                <span>12</span>
                <van-button icon="plus" type="primary" size="mini" round />
              </template>
            </van-card>
          </template>
        </van-tree-select>
      </div>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { Dialog, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'
// import { watch } from 'vue'

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const model = reactive({
      activeId: 1,
      activeIndex: 0,
      shopsList: computed(() => {
        return store.state.shopsList;
      }),
      currentShopInfo: null
    })
    const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 },
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ];
    const onClickLeft = () => {
      Dialog.confirm({
        title: '',
        message: '返回首页会清空购物车',
      })
        .then(() => {
          router.push("/Home/Index");
        })
        .catch(() => {
          // on cancel
        });
    }
    const onClickRight = () => {
      Toast('按钮');
    }
    const onSubmit = () => {
      router.push("/Bill");
    };
    // watch(()=>route.path,(newValue)=>{

    // })
    const init = (shopsId) => {
      for (let i = 0; i < model.shopsList.length; i++) {
        let item = model.shopsList[i];
        if (shopsId === item.shopsId) {

          model.currentShopInfo = item;
          console.log(model, 'a')
        }
      }
    }
    onMounted(() => {
      var shopsId = route.query.shopsId;
      init(shopsId)
    })

    return {
      ...toRefs(model),
      items,
      onClickLeft,
      onClickRight,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-Commodity {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fefcf9;
  ::v-deep .van-nav-bar {
    .van-nav-bar__left i,
    .van-nav-bar__left span,
    .van-nav-bar__right,
    .van-nav-bar__right i {
      color: #ed9428;
    }
  }
  .wsw-top-Commodity-shop {
    img {
      width: 100%;
    }
    .wsw-top-Commodity-shop-card {
      width: 80%;
      height: 150px;
      background: #fff;
      // opacity: 0.8;
      border-radius: 10px;
      position: absolute;
      left: 0;
      right: 0;
      top: 150px;
      margin: 0 auto;
      padding: 5px 10px;
      p {
        font-weight: bolder;
      }
      div {
        font-size: 14px;
        text-align: right;
        span {
          color: red;
          font-weight: bolder;
        }
      }
      .wsw-top-Commodity-shop-card-address {
        font-size: 12px;
        color: #333;
      }
    }
  }
  .wsw-top-Commodity-list {
    margin-top: 45px;
    button {
      vertical-align: middle;
      margin: 0 3px;
    }
  }
  ::v-deep .van-submit-bar__text {
    text-align: left;
  }
}
</style>
