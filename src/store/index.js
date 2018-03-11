import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

// NODE_ENV
// npm run dev时候这个参数为dev
// npm run build 时候为production 线上环境时候debug为false 不开启严格模式
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
    strict:debug, //是否开启严格模式 生产环境时候开 检测state修改是否来源于mutation
    plugins:debug? [createLogger()] : []
})