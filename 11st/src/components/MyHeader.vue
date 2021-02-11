<template>
  <div class="all-header">
    <header>
      <div class="inner">
        <!--   햄버거 서랍    -->
        <div
          class="open-nav-drawer"
          @click="onNav">
        </div>

        <!--   11번가 로고    -->
        <a
          href="javascript:void(0)"
          class="logo"></a>

        <!--   검색창    -->
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

        <!--   랭킹    -->
        <div class="ranking">
          <!-- Slider main container -->
          <div
            ref="swiper"
            class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(rank, index) in rankings.rankings"
                :key="rank.name"
                class="swiper-slide">
                <a :href="rank.href">
                  <span class="index">{{ index + 1 }}</span>
                  <span class="name">{{ rank.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!--   오른쪽 아이콘 메뉴    -->
        <ul class="user_help_menu">
          <li class="user_info">
            <a href="javascript:void(0)"></a>
            <!--   유저 쇼핑 정보    -->
            <ul class="user_info__menu">
              <li
                v-for="item in userInfoMenu"
                :key="item.name">
                <a :href="item.href">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
          <li>
            <a href="javascript:void(0)"></a>
          </li>
        </ul>
      </div>
    </header>

    <!--   헤더 아래 바로가기 메뉴    -->
    <div class="util_menu">
      <div class="inner">
        <div class="util_menu__left">
          <ul>
            <li>
              <a href="javascript:void(0)">베스트</a>
            </li>
            <li>
              <a href="javascript:void(0)">쿠폰/혜택</a>
            </li>
            <li>
              <a href="javascript:void(0)">기획전</a>
            </li>
            <li>
              <a href="javascript:void(0)">오늘장보기</a>
            </li>
            <li>
              <a href="javascript:void(0)">T공식대리점</a>
            </li>
            <li>
              <a
                class="shocking-deal"
                href="javascript:void(0)"></a>
            </li>
          </ul>
        </div>
        <div class="flex-space"></div>
        <div class="util_menu__right">
          <ul>
            <li>
              <a href="javascript:void(0)">로그인</a>
            </li>
            <li>
              <a href="javascript:void(0)">회원가입</a>
            </li>
            <li>
              <a href="javascript:void(0)">바로가기</a>
            </li>
            <li class="language">
              <a href="javascript:void(0)"></a>
              <a href="javascript:void(0)"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      searchText: '',
      rankings: {},
      userInfoMenu: [
        {name: '나의 쿠폰', href: "javascript:void(0)"},
        {name: '주문/배송조회', href: "javascript:void(0)"},
        {name: '취소/반품/교환', href: 'javascript:void(0)'},
        {name: '고객센터', href: 'javascript:void(0)'},
        {name: '회원정보', href: 'javascript:void(0)'}
      ]
    }
  },
  mounted() {
    this.init()
  }
  ,
  methods: {
    async init() {
      this.rankings = await this.$fetch({
        requestName: 'rankings'
      })
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          direction: 'vertical',
          speed: 1000,
          autoplay: {
            delay: 3000
          },
          loop: true
        })
      })
    },
    onNav() {
      // Open LNB
      this.$store.dispatch('navigation/onNav')
    },
    async search() {
      if (!this.searchText.trim()) return
      const res = await this.$search({
        searchText: this.searchText
      })
      console.log(res)
      // location에 설정해주면, 그 URL로 이동
      // location = res;
    }
  }
}
</script>

<style scoped lang="scss">
.all-header {
  width: 1280px;
  margin: 0 auto;
}
header {
  .inner {
    display: flex;
    width: 1240px;
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

    .ranking {
      width: 210px;
      margin: 0 30px;

      .swiper-container {
        width: 182px;
        height: 28px;

        .swiper-slide {
          a {
            display: block;
            height: 28px;
            line-height: 28px;
            text-decoration: none;
            font-size: 15px;
            color: #333;
            font-weight: 700;

            span.index {
              margin-right: 10px;
              color: #f43142;
              font-style: italic;
            }

            &:hover span.name {
              color: #f43142;
            }
          }
        }
      }
    }

    .user_help_menu {
      display: flex;

      > li {
        margin-right: 25px;
        padding: 7px 0;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        > a {
          display: block;
          width: 48px;
          height: 48px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-size: 363px;
        }

        &:nth-child(1) > a {
          background-position: -106px -145px;
        }
        &:nth-child(2) > a {
          background-position: 0px -198px;
        }
        &:nth-child(3) > a {
          background-position: -53px -198px;
        }
        &:nth-child(4) > a {
          background-position: -94px -70px;
        }

        &:nth-child(1) > a:hover {
          background-position: -53px -145px;
        }
        &:nth-child(2) > a:hover {
          background-position: -159px -145px;
        }
        &:nth-child(3) > a:hover {
          background-position: 0px -145px;
        }
        &:nth-child(4) > a:hover {
          background-position: -106px -198px;
        }

        &.user_info {
          &:hover {
            .user_info__menu {
              display: block;
            }
          }

          .user_info__menu {
            display: none;
            width: 170px;
            padding: 15px 0;
            position: absolute;
            top: 60px;
            left: 0;
            z-index: 2;
            border: 1px solid #eee;
            border-radius: 6px;
            box-sizing: border-box;
            box-shadow: 0 6px 24px -8px rgba(#000, .12);
            background-color: #fff;

            li {
              a {
                display: block;
                padding: 7px 10px 7px 25px;
                font-size: 15px;

                &:hover {
                  color: #f43142;
                  background: #fafafa;
                }
              }
            }
          }
        }
      }
    }
  }
}

.util_menu {
  border-top: 1px solid #f1f1f1;
  .inner {
    display: flex;
    margin: 0 auto;
  }

  // 왼쪽 바로가기 메뉴
  .util_menu__left > ul {
    display: flex;
    li {
      box-sizing: border-box;
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
      a {
        display: flex;
        align-items: center;
        height: 66px;
        color: #111;
        font-size: 17px;
        font-weight: bold;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #f43142;
          opacity: 0;
        }
        &:hover::after {
          opacity: 1;
        }
        &.shocking-deal {
          width: 63px;
          overflow: hidden;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -94px 0;
          background-size: 363px;
        }
      }
    }
  }


  // 오른쪽 바로가기 메뉴
  .util_menu__right > ul {
    display: flex;
    li {
      box-sizing: border-box;
      margin: 0 14px;
      a {
        display: flex;
        align-items: center;
        height: 66px;
        color: #111;
        position: relative;
        &:hover {
          text-decoration: underline;
        }
      }

      // 외국어 국가 영역
      &.language {
        display: flex;
        align-items: center;
        margin-right: 0;

        a:nth-child(1){
          width: 20px;
          height: 20px;
          background-size: 363px 275px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -261px -251px;
          margin-right: 6px;
        }
        a:nth-child(2){
          width: 20px;
          height: 20px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
          background-position: -186px -251px;
          background-size: 363px 275px;
        }
      }
    }
  }
}
</style>
