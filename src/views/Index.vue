<!-- 首页 -->
<template>
  <div class="wsw-top-home">
    <div class="wsw-top-home-logo">
      <img src="../assets/images/Logo.png" width="80" />
      <span>饿了么</span>
      <!-- <i class="wsw-r">收货地址</i>
      <van-icon name="location-o" color="#ccc" size="24" class="wsw-r" /> -->
      <van-icon name="search" color="#ccc" size="24" class="wsw-r" />
    </div>
    <van-swipe class="wsw-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608348663068&di=9ccabacd2465508aee4a8296f52cfcc1&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180404%2Fe2f28fc29686449a9ffe7c6628b9d3c6.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2074007851,907951023&fm=26&gp=0.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3467291110,2657821719&fm=26&gp=0.jpg" />
      </van-swipe-item>
    </van-swipe>
    <van-tag type="warning">今日推荐</van-tag>
    <div class="wsw-top-home-List">
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item v-for="(item,index) in shopsList" :key="index" text="文字" @click="toDetail(item.shopsId)">
          <img :src="item.shopsImage" />
          <div class="wsw-top-home-List-title">
            <p class="wsw-clearfix">
              <span class="wsw-l">{{item.shopsName}}</span>
              <span class="wsw-r wsw-red">{{item.score}}</span>
            </p>
            <p class="wsw-clearfix">
              <span class="wsw-l wsw-f14">起送：{{item.shopsStart}}</span>
              <span class="wsw-r wsw-f14">运费：{{item.freight}}</span>
            </p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed } from 'vue'
import { Notify, Toast } from 'vant';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const router = useRouter()
    const store = useStore();
    const model = reactive({
      active: ref(0),
      shopsList: computed(() => {
        console.log(store.state.shopsList,'store.state.shopsList===');
        return store.state.shopsList;
      })
    })
    const toDetail = (shopsId) => {
      router.push({
        path: '/Commodity_details',
        query: {
          shopsId
        }
      })
    }
    return {
      ...toRefs(model),
      toDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.wsw-top-home {
  width: 100%;
  height: 100%;
  background: #fdf4e9;
  padding-top: 80px;
  .wsw-top-home-logo {
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background: #fff;
    span {
      display: inline-block;
      line-height: 80px;
      color: #ed9428;
      font-weight: bolder;
    }
    .van-icon,
    i {
      line-height: 80px;
      margin-right: 10px;
      color: #ccc;
    }
  }
  .wsw-swipe {
    img {
      width: 100%;
      min-height: 230px;
    }
  }
  .van-tag {
    margin: 10px;
  }
  .wsw-top-home-List {
    margin-bottom: 50px;
    background: #fdf4e9;
    ::v-deep .van-grid-item__content {
      background: #fefcf9;
      img {
        width: 100%;
        height: 150px;
      }
      .wsw-top-home-List-title {
        width: 100%;
        padding: 5px;
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
