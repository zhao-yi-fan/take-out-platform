<!-- 首页 -->
<template>
  <div class="wsw-top-home">
    <div class="wsw-top-home-logo">
      <img src="../assets/images/Logo.png" width="80" />
      <span>饿了么</span>
      <i class="wsw-r">收货地址</i>
      <van-icon name="location-o" color="#ccc" size="24" class="wsw-r" />
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
        <van-grid-item v-for="value in 6" :key="value" text="文字">
          <router-link to="/Commodity_details">aaa</router-link>
          <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3421435433,1448772455&fm=26&gp=0.jpg" />
          <div class="wsw-top-home-List-title">
            <p class="wsw-clearfix">
              <span class="wsw-l">华莱士</span>
              <span class="wsw-r wsw-red">4.5</span>
            </p>
            <p class="wsw-clearfix">
              <span class="wsw-l wsw-f14">起送：20</span>
              <span class="wsw-r wsw-f14">运费：2</span>
            </p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: '',
  components: {},
  setup (propes, { root }) {
    const active = ref(0);

    return {
      active,
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
  .wsw-swipe{
    img{
      width: 100%;
      min-height: 230px;
    }
  }
  .van-tag {
    margin: 10px;
  }
  .wsw-top-home-List {
    margin-bottom: 50px;
    ::v-deep .van-grid-item__content {
      background: #fefcf9;
      img {
        width: 100%;
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
