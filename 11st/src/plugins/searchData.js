import axios from 'axios'

export default {
    // Vue 객체에 새로운 데이터를 추가하겠다.
    // 전역으로 플러그인을 추가하는 것 -> 이제 $search를 통해 함수를 호출할 수 있다.
    install(Vue) {
        Vue.prototype.$search = async ({searchText}) => {
            const {data} = await axios.get(`https://trusting-williams-8cacfb.netlify.app/.netlify/functions/search?apiKey=${process.env.API_KEY}&searchText=${searchText}`)
            return data;
        }
    }
}