<!-- 首页 -->
<template>
  <div class="wsw-top-home-logo">
    <img src="../assets/images/Logo.png" width="130" />
    <!-- <span>饿了么</span> -->
    <!-- <i class="wsw-r">收货地址</i>
      <van-icon name="location-o" color="#ccc" size="24" class="wsw-r" /> -->
    <van-icon name="search" color="#fff" size="24" class="wsw-r" @click="toSearch" />
  </div>
  <div class="wsw-top-home">
    <div class="wsw-top-home-top">
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
    </div>
    <!-- <van-tag type="warning">今日推荐</van-tag> -->
    <center>
      <img src="../assets/images/jrtj.png" alt="" width="100" style="margin: 10px 0" />
    </center>
    <div class="wsw-top-home-List">
      <div class="list-item" v-for="(item, index) in shopsList" :key="index" text="文字" @click="toDetail(item.shopsId)">
        <img :src="item.shopsImage" />
        <div class="wsw-top-home-List-title">
          <p class="wsw-clearfix">
            <span class="wsw-l">{{ item.shopsName }}</span>
            <span class="wsw-r wsw-red">{{ item.score }}</span>
          </p>
          <p class="wsw-clearfix">
            <span class="wsw-l wsw-f14">起送：{{ item.shopsStart }}</span>
            <span class="wsw-r wsw-f14">运费：{{ item.freight }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed } from "vue";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "",
  components: {},
  setup (propes, { root }) {
    const router = useRouter();
    const store = useStore();
    const model = reactive({
      active: ref(0),
      shopsList: computed(() => {
        console.log(store.state.shopsList, "store.state.shopsList===");
        return store.state.shopsList;
      }),
    });
    const toDetail = (shopsId) => {
      router.push({
        path: "/Commodity_details",
        query: {
          shopsId,
        },
      });
    };
    const toSearch = (shopsId) => {
      router.push({
        path: "/search",
      });
    };

    return {
      ...toRefs(model),
      toDetail,
      toSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.wsw-top-home-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(to right, #f1b815, #efa71c);
  span {
    display: inline-block;
    line-height: 80px;
    color: #ed9428;
    font-weight: bolder;
  }
  img {
    margin: 5px 0;
  }
  .van-icon,
  i {
    margin-right: 10px;
    color: #ccc;
  }
}
.wsw-top-home {
  width: 100%;
  height: calc(100% - 110px);
  background: #f8f8fa;
  overflow: auto;
  .wsw-top-home-top {
    background: url("../assets/images/round.png");
    width: 100%;
    height: 200px;
    background-size: 100% 100%;
    .wsw-swipe {
      margin: 0 auto;
      width: 90%;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .van-tag {
    margin: 10px;
  }
  .wsw-top-home-List {
    width: 96%;
    margin: 0 auto;
    margin-bottom: 30px;
    background: #f8f8fa;
    column-count: 2;
    column-gap: 10px;
    .list-item {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      background: #fefcf9;
      padding: 0;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      -webkit-column-break-inside: avoid;
      img {
        width: 100%;
      }
      .wsw-top-home-List-title {
        box-sizing: border-box;
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
