import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import pt from 'vuetify/es5/locale/pt'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
