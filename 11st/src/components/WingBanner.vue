<template>
  <div
    v-if="done"
    class="wing-banner">
    <div class="ad"></div>

    <a
      :href="banner.vertical.href"
      class="wing wing--vertical">
      <div class="wing__inner">
        <div class="text">{{ banner.vertical.name }}</div>
        <div
          :style="`background-image: url(${banner.vertical.thumbnail});`"
          class="thumbnail"></div>
      </div>
    </a>

    <div class="wing-outer">
      <a
        :href="banner.horizontal.href"
        class="wing wing--horizontal">
        <div class="wing__inner">
          <div class="text">
            <div class="name">{{ banner.horizontal.name }}</div>
            <div class="price">
              <strong>{{ banner.horizontal.price.value }}</strong>{{ banner.horizontal.price.unit }}
            </div>
          </div>
          <div
            :style="`background-image: url(${banner.horizontal.thumbnail});`"
            class="thumbnail"></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banner: {},
      done: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.banner = await this.$fetch({
        requestName: 'banner'
      })
      this.done = true
    }
  }
}
</script>

<style scoped lang="scss">
.wing-banner {
  width: 70px;
  position: fixed;

  right: 30px;
  bottom: 30px;
  z-index: 97;

  .ad {
    width: 34px;
    height: 18px;
    margin: 0 auto 5px;
    cursor: pointer;
    background-image: url("https://trusting-williams-8cacfb.netlify.app/images/ad_2x.png");
    background-repeat: no-repeat;
    background-size: 63px;
  }

  .wing-outer {
    width: 70px;
    height: 70px;
    margin-bottom: 12px;
    position: relative;
  }
  a.wing {
    display: block;
    border: 5px solid #fff;
    border-radius: 35px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 0 8px 0 rgba(#000, .1);

    // 이 부분은 아무리 작성해도 구현이 안되서 강사님꺼 참조했습니다.
    &--vertical {
      width: 70px;
      margin-bottom: 10px;
      padding-top: 16px;
      &:hover {
        .text {
          text-decoration: underline;
        }
      }
      .text {
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
      }
    }

    &--horizontal {
      position: absolute;
      right: 0;
      width: 70px;
      height: 70px;
      padding-left: 16px;
      background-color: #fff;
      overflow: hidden;
      transition: .1s;
      &:hover {
        width: 160px;
      }
      .wing__inner {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .text {
        margin-right: 4px;
        .price {
          margin-top: 4px;
          font-size: 11px;
          strong {
            font-weight: 700;
          }
        }
      }
      .thumbnail {
        flex-shrink: 0;
      }
    }

    .text {
      font-size: 12px;
      line-height: 1.2;
      color: #666;
      word-break: keep-all;
    }
    .thumbnail {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #333;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}
</style>
