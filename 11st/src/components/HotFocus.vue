<template>
  <section class="hot-focus">
    <div
      ref="lazyLoadElement"
      class="inner">
      <h2>시선집중</h2>

      <div class="swiper-outer">
        <div
          ref="swiper"
          class="swiper-container">
          <div class="swiper-wrapper">
            <!-- Slides - Product card component -->
            <div
              v-for="product in products"
              :key="product.name"
              class="swiper-slide">
              <product-card
                :product="product"></product-card>
            </div>
          </div>
        </div>
        <div class="prev"></div>
        <div class="next"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
import ProductCard from '~/src/components/ProductCard'

export default {
  components: {
    ProductCard // props
  },
  data () {
    return {
      products: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.$lazyLoad(this.$refs.lazyLoadElement) // using lazyload plugins

      this.products = await this.$fetch({
        requestName: 'hotFocus' // hotFocus 데이터 가져오기
      })

      // swiper 속성 설정
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          speed: 1000,
          spaceBetween: 29,
          // 3장씩
          slidesPerView: 3,
          slidesPerGroup: 3,
          loop: true,
          navigation: {
            nextEl: '.hot-focus .next',
            prevEl: '.hot-focus .prev'
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 직접 적용하다가 시간이 부족해 강사님 CSS 참조하여 적용
section {
  background-color: #f6f7fb;
  .inner {
    height: 528px;
    .swiper-container {
      margin: -30px -16px;
      padding: 30px 16px;
    }
    .swiper-outer {
      position: relative;
      .prev,
      .next {
        position: absolute;
        top: 50%;
        width: 50px;
        height: 50px;
        margin-top: -25px;
        border-radius: 50%;
        box-shadow: 0 4px 16px rgba(#000, .15);
        background-color: #fff;
        z-index: 1;
        display: flex;

        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: none;

        // 화살표 가져오기
        &::after {
          content: "";
          width: 10px;
          height: 18px;
          background-image: url("https://trusting-williams-8cacfb.netlify.app/images/main_2x.png");
          background-size: 209px;
        }
      }
      // 화살표 호버 -> 이미지 변환 (색 변환)
      .prev {
        left: -25px;
        &::after {
          background-position: -199px 0;
        }
        &:hover {
          &::after {
            background-position: -199px -86px;
          }
        }
      }
      .next {
        right: -25px;
        &::after {
          background-position: -199px -46px;
        }
        &:hover {
          &::after {
            background-position: -199px -23px;
          }
        }
      }
    }
  }
}
</style>
