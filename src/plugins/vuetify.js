import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
Vue.use(Vuetify);
export default new Vuetify({
    icons: {
        iconfont: 'fa' || 'fa4',
    },
    breakpoint: {
        scrollBarWidth: 24,
    },
    theme: {
        themes: {
            light: {
                primary: colors.blue,
                secondary: colors.pink,
                accent: colors.teal,
                error: colors.red,
                warning: colors.amber,
                success: colors.green,
                info: colors.cyan,
            },
        },
    },
});
//# sourceMappingURL=vuetify.js.map