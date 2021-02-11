<template>
  <div class="direct">
    <div class="inner">
      <ul>
        <li
          v-for="item in directs"
          :key="item.name">
          <a :href="item.href">
            <div>
              <img
                class="icon"
                :src="item.src"
                :alt="item.name" />
              <div class="text">
                {{ item.name }}
              </div>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <div
              @click="onNav('LNB')">
              <div class="icon icon__open-more"></div>
              <div class="text">
                더보기
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Direct",
  data () {
    return {
      directs: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.directs = await this.$fetch({
        requestName: 'directs'
      })
    },
    onNav (name) {
      this.$store.dispatch('navigation/onNav', name)
    }
  }
}
</script>

<style scoped lang="scss">
a{
  color: #666;
}
.direct {
  .inner {
    min-height: 227px;
    padding: 50px 0;
    box-sizing: border-box;
  }
  ul {
    display: flex;
    li {
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
      // 구조적으로 아이콘이 .text 보다 더 이전 형제 요소에요~
      .icon {
        display: block;
        width: 90px;
        height: 90px;
        // 같은 하나만 사용할 때는 개별 속성을 권장해요~
        margin-bottom: 15px;
        // 사용한 배경 이미지가 없다면 필요치 않은 속성이에요~
        // background-repeat: no-repeat;
      }
      .text {
        font-size: 15px;
        text-align: center;
      }
      .icon__open-more {
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
        background-position: 0 0;
        background-size: 209px 184px;
      }
    }
  }
}
</style>
