<template>
  <div>
    <header>
      <div class="inner">
        <div
          class="open-nav-drawer"
          @click="onNav">
        </div>
        <a
          href="javascript:void(0)"
          class="logo"></a>
        <div class="search">
          <input
            type="text"
            placeholder="찾고 싶은 상품을 검색해 보세요 !"
            v-model="searchText"
            @keyup.enter="search" />
          <!--   __ BEM 작명법   -->
          <div
            class="search__icon"
            @click="search"></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    onNav() {
      // Open LNB
      this.$store.dispatch('navigation/onNav')
    },
    async search() {
      if (!this.searchText.trim()) return
      const res = await this.$search({
        searchText: this.searchText
      })

      // location에 설정해주면, 그 URL로 이동
      // location = res;
    }
  }
}
</script>

<style scoped lang="scss">
header {
  .inner {
    display: flex;
    height: 120px;
    align-items: center;

    .open-nav-drawer {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(#000, .06),
      0 0 1px rgba(#000, .4);
      display: flex;
      justify-content: center;
      align-items: center;

      &::after {
        content: "";
        display: block;
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -302px -203px;
        background-size: 363px;
      }
    }

    .logo {
      width: 94px;
      height: 40px;
      display: block;
      margin: 0 24px;
      background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
      background-position: -162px 0;
      background-size: 363px;
      cursor: pointer;
    }

    .search {
      position: relative;

      input {
        width: 500px;
        height: 50px;
        padding: 0 27px;
        border: 1px solid #ddd;
        border-radius: 25px;
        box-sizing: border-box;
        background-color: #fafafa;
        font-size: 18px;

        // input 탭의 기본값 변경 -> 외부라인 없애기, 기본 폰트를 구글 폰트 적용
        outline: none;
        font-family: 'Noto Sans KR', sans-serif;
        &::placeholder {
          //  placeholder에 대한 스타일 명시 가능
          color: #bbb;
        }
      }

      // & --> .search
      // 즉, .search__icon == &__icon
      &__icon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -162px -45px;
        background-size: 363px;

      }
    }
  }
}
</style>