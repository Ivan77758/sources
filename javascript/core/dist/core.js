'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var json = {

    parse: function parse(str) {
        var result = null;
        try {
            result = JSON.parse(str);
        } catch (e) {}

        return result;
    },

    encode: function encode(str) {
        return JSON.stringify(str);
    }
};

var cookie_storage = {

    enabled: 0,

    init: function init() {},

    get_cookie: function get_cookie(name) {
        var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        if (results) return unescape(results[2]);else return null;
    },

    del_cookie: function del_cookie(name) {
        var expires = new Date(); // получаем текущую дату 
        expires.setTime(expires.getTime() - 1000);
        document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
    },

    set_cookie: function set_cookie(name, val, time) {
        var expires = new Date();
        expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
        document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
    },

    get_data: function get_data(name) {
        return json.parse(get_cookie(name));
    },

    set_data: function set_data() {}

};

function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results) return unescape(results[2]);else return null;
}

function del_cookie(name) {
    var expires = new Date(); // получаем текущую дату
    expires.setTime(expires.getTime() - 1000);
    document.cookie = name + "=; expires=" + expires.toGMTString() + "; path=/";
}
function set_cookie(name, val, time) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 1000 * 60 * time); // минут
    document.cookie = name + "=" + val + "; expires=" + expires.toGMTString() + "; path=/";
}

var device = {

    init: function init() {},

    width: function width() {
        return $(window).width();
    },

    height: function height() {
        return $(window).height(); //document                               
    }

};

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

// -- Получить новый хэш ---
var hash;
function simple_hash() {
    var now = new Date();
    hash = now.getTime();
}

function disabled_with_timeout(elem, time) {
    elem.prop("disabled", true);
    setTimeout(function () {
        elem.prop("disabled", false);
    }, time * 1000);
}

// -- Хранилище ---
var storage = {

    enable: 0,

    init: function init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },

    is_enable: function is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    save: function save(key, val) {
        if (storage.enable) {
            localStorage.setItem(key, val);
        }
    },

    load: function load(key, def) {
        var result = def ? def : null;

        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }

        return result;
    },

    array: {

        load: function load(key) {
            var result = [];
            var value = null;

            value = storage.load(key);
            value = json.parse(value);
            if (value) result = value;

            return result;
        },

        save: function save(key, val) {
            storage.save(key, json.encode(val));
        },

        add: function add(key, val) {}
    }
};

storage.init();

var AccountActivity = Vue.component('account-activity', {
    props: ['humanId'],
    data: function data() {
        return {
            loading: false
        };
    },
    mounted: function mounted() {
        this.load();
    },

    computed: {
        human: function human() {
            return this.$store.state.search.human;
        },
        age: function age() {
            return this.human.age ? moment.duration(this.human.age, "years").humanize() : null;
        },
        tags: function tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        social: function social() {
            var _human = this.human,
                em = _human.em,
                vk = _human.vk,
                ok = _human.ok,
                fb = _human.fb,
                go = _human.go;

            if (em || vk || ok || fb || go) {
                return { em: em, vk: vk, ok: ok, fb: fb, go: go };
            }
            return null;
        },
        interact: function interact() {
            var _human2 = this.human,
                ph = _human2.ph,
                sk = _human2.sk;

            if (ph || sk) {
                return { ph: ph, sk: sk };
            }
            return null;
        },
        figure: function figure() {
            var figure = this.human.anketa ? this.human.anketa.figure : null;
            var result = figure;
            switch (figure) {
                case 2:
                    result = 'спортивного';break;
                case 3:
                    result = 'обычного';break;
                case 5:
                    result = 'полного';break;
                case 6:
                    result = 'худого';break;
            }
            return result;
        },
        hold: function hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        who: function who() {
            var result = 'Парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'Парня ' : 'Девушку ';
            }
            if (this.human.up || this.human.to) {
                result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        ago: function ago() {
            var last = this.human.last;

            var result = 'Онлайн';
            if (last > 2592000) {
                result = null;
            } //else
            if (last > 777) {
                result = moment.duration(0 - last, "seconds").humanize(true);
            }
            return result;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        loaded: function loaded() {
            this.loading = false;
            console.log(this.human);
        },
        hope: function hope() {
            var _this = this;

            setTimeout(function () {
                return _this.loading = false;
            }, 4 * 1000);
        },
        load: function load() {
            var _this2 = this;

            this.loading = true;
            this.hope();
            store.dispatch('HUMAN', this.humanId).then(function (response) {
                _this2.loaded();
            }).catch(function (error) {
                console.log(error);
                _this2.loading = false;
            });
        }
    },
    template: '#account-activity'
});

var ActivityActions = {
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        console.log('Leave:', [to, from]);
        next();
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        back: function back(_back) {
            _back = _back === undefined ? this.$route.meta.back : _back;
            _back = _back === undefined ? this.$route.query.back : _back;
            console.log('back:', _back);
            _back === undefined ? this.$router.push('/') : this.$router.push(_back);
        }
    }
};

var ClosedActivity = Vue.component('closed-activity', {
    extends: ActivityActions,
    template: '#closed-activity'
});

var DefaultActivity = Vue.component('default-activity', {
    extends: ActivityActions,
    template: '#default-activity'
});

var MessagesActivity = Vue.component('messages-activity', {
    extends: DefaultActivity,
    props: ['humanId', 'title'],
    data: function data() {
        return {
            message: '',
            caption: '',
            reply: '',
            code: '',
            show: true,
            process: false,
            approve: true,
            dirt: false,
            captcha: false,
            preview: false,
            photo: false
        };
    },

    // beforeRouteUpdate(to, from, next) {
    //     this.photo = this.preview;
    //     console.log('MessagesActivity', this.photo);
    //     next();
    // },
    mounted: function mounted() {
        if (this.title) {
            this.caption = this.title;
        }
    },
    methods: {
        reset: function reset() {
            //this.cancelPhoto();
            this.show = true;
            this.process = false;
            this.approve = true;
            this.message = '';
            this.photo = null;
        },

        isDirt: _.debounce(function () {
            var word = /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}/i;
            this.dirt = word.test(this.message) ? true : false;
            return this.dirt;
        }, 700),

        close: function close() {
            //this.$emit('close');
            this.back();
        },
        cancel: function cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        select: function select(data) {
            this.photo = data;
            this.preview = data;
        },
        sendMessage: function sendMessage() {
            var _this3 = this;

            console.log(data);
            var data = {
                id: this.humanId,
                captcha_code: this.code
            };
            if (this.photo && this.photo.alias) {
                data['photo'] = this.photo.alias;
            } else if (true) {
                data['mess'] = this.message;
                data['re'] = this.reply;
            }
            this.$store.commit('intimate/notifi', false);
            api.messages.send(data).then(function (response) {
                _this3.onMessageSend(response.data);
            }).catch(function () {
                _this3.onError();
            });
            this.preview = null;
            this.process = true;
            console.log(data);
        },
        setCode: function setCode(code) {
            this.code = code;
            this.sendMessage();
        },
        onMessageSend: function onMessageSend(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended(response);
            }
            this.process = false;
        },
        sended: function sended(response) {
            //MessList.messages.unshift(response.message);
            this.$refs.messages.reload();
            // TODO: очень старая зависимость
            giper_chat.timer_cut();
            this.reset();
        },
        onError: function onError() {
            this.process = false;
        },
        account: function account() {
            this.$router.push(this.humanId + '/detail');
        },
        uploads: function uploads() {
            this.$router.push(this.humanId + '/uploads');
        },
        incoming: function incoming() {
            this.$router.push(this.humanId + '/incoming');
        },

        // preview() {
        //     this.$router.push(this.humanId + '/preview')
        // },
        videochat: function videochat() {
            window.open('/videochat.php?to=' + this.humanId, 'videochat', 'width=432, height=280, resizable=yes, scrollbars=yes');
        }
    },
    template: '#messages-activity'
});

var SearchActivity = Vue.component('search-activity', {
    extends: DefaultActivity,
    data: function data() {
        return {};
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        if (to.fullPath == '/search' && from.fullPath == '/search/settings/search') {
            this.$refs.results.reload();
        }
        next();
    },

    computed: {},
    methods: {
        close: function close() {
            this.back();
        }
    },
    template: '#search-activity'
});

Vue.component('api-key-update', {
    props: ['item'],
    data: function data() {
        return {
            showOption: false
        };
    },

    methods: {
        upKey: function upKey() {
            var _this4 = this;

            console.log('upKey');
            axios.get('/sync/sess/').then(function (response) {
                _this4.$store.dispatch('LOAD_API_TOKEN');
                _this4.upUser(response.data);
                _this4.upSettings(response.data);
            });
        },
        upUser: function upUser(data) {
            var uid = data.uid,
                city = data.city,
                sex = data.sex,
                age = data.age,
                name = data.name,
                contacts = data.contacts,
                promt = data.apromt;
            //console.log('upUser', data);

            this.$store.commit('resetUser', { uid: uid, city: city, sex: sex, age: age, name: name, contacts: contacts, promt: promt });
            //store.commit('loadUser', data.contacts);
        },
        upSettings: function upSettings(data) {
            var who = data.who,
                up = data.years_up,
                to = data.years_to,
                town = data.close,
                virt = data.virt;

            this.$store.commit('settings', { who: who, up: up, to: to, virt: virt, town: town });
        }
    },
    mounted: function mounted() {
        var _this5 = this;

        this.upKey();
        setInterval(function () {
            _this5.upKey();
        }, 1000 * 600);
    },

    template: '#api-key-update'
});

Vue.component('attention-wall', {
    props: ['show', 'text'],
    data: function data() {
        return {
            content: {
                1: {
                    caption: 'Предупреждение',
                    text: '\u041D\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043E\u0442 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E\u0441\u0442\u0443\u043F\u0430\u044E\u0442 \u0436\u0430\u043B\u043E\u0431\u044B. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043C\u0435\u044E\u0442 \u0433\u0440\u0443\u0431\u044B\u0439 \u0442\u043E\u043D,\n                    \u043C\u043E\u0433\u0443\u0442 \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u044C, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442 \u0438\u043D\u0442\u0438\u043C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u0440\u0435\u0437\u043A\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.'
                },
                8: {
                    caption: 'Внимание',
                    text: '\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u0430. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u044B,\n                    \u0438\u043C\u0435\u044E\u0442 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u0440\u0430\u0432\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435, \u043E\u0431\u043C\u0430\u043D \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E\u043F\u043B\u0430\u0442\u044B \u0443\u0441\u043B\u0443\u0433.'
                }
            }
        };
    },

    computed: {
        caption: function caption() {
            return this.content[this.show].caption;
        },
        text: function text() {
            return this.content[this.show].text;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#attention-wall'
});

Vue.component('auth-board', {
    data: function data() {
        return {
            confirmSend: false,
            hint: 'Введите ваш емаил.',
            process: false,
            email: ''
        };
    },
    mounted: function mounted() {
        var _this6 = this;

        _.delay(function () {
            _this6.$store.dispatch('auth/SYNC').then(function () {
                _this6.email = _this6.$store.state.auth.email;
            });
        }, 2500);
    },

    computed: {
        login: function login() {
            return this.$store.state.auth.login;
        },
        password: function password() {
            return this.$store.state.auth.pass;
        },
        loaded: function loaded() {
            return this.login && this.password;
        }
    },
    methods: {
        send: function send() {
            var _this7 = this;

            if (!this.email) {
                return;
            }
            this.process = true;
            this.hint = 'Отправляю...';
            this.$store.dispatch('auth/SAVE_EMAIL', this.email).then(function (response) {
                _this7.hint = response.data.say;
                _this7.error = response.data.err;
                _this7.sended();
            });
        },
        sended: function sended() {
            this.process = false;
            if (!this.error) {
                this.emit('close');
            }
        }
    },
    template: '#auth-board'
});

Vue.component('captcha-dialog', {
    data: function data() {
        return {
            code: '',
            inc: 0
        };
    },

    computed: {
        src: function src() {
            return '/secret_pic.php?inc=' + this.inc;
        }
    },
    methods: {
        close: function close() {
            this.$emit('cancel');
        },
        send: function send() {
            this.$emit('send', this.code);
            this.update();
            this.close();
        },
        update: function update() {
            this.inc++;
        }
    },
    template: '#captcha-dialog'
});

Vue.component('city-suggest', {
    props: ['city'],
    data: function data() {
        return {
            query: '',
            cities: [],
            enable: true
        };
    },
    mounted: function mounted() {
        if (!this.query && this.city && this.city.length > 2) {
            this.query = this.city;
        }
    },

    computed: {
        suggested: function suggested() {
            return this.cities.length;
        }
    },
    methods: {
        load: function load() {
            var _this8 = this;

            if (!this.query.length) {
                return this.reset();
            }
            api.user.get({ q: this.query, hash: hash }, 'town/suggest').then(function (response) {
                _this8.loaded(response.data.cities);
            });
        },
        reset: function reset() {
            this.cities = [];
        },
        select: function select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded: function loaded(data) {
            if (data && data.length) {
                this.cities = data;
            } else {
                this.reset();
            }
        }
    },
    template: '#city-suggest'
});

var ContactDialog = {
    extends: DefaultActivity,
    props: ['quick'],
    data: function data() {
        return {
            response: false,
            slow: false,
            error: false,
            amount: 0,
            offset: 0,
            batch: 10,
            max: 100,
            dialog: false
        };
    },

    computed: {
        showLoader: function showLoader() {
            return this.slow && !this.response;
        },
        showAlert: function showAlert() {
            return this.error && this.response;
        },
        showHint: function showHint() {
            return this.count < 1;
        },
        count: function count() {
            var result = this.contacts ? this.contacts.length : 0;
            return result;
        },
        more: function more() {
            var max = this.offset <= this.max - this.batch;
            var min = this.amount >= this.batch;
            return min && max;
        }
    },
    methods: {
        close: function close() {
            //this.$emit('close');
            this.back();
        },
        reset: function reset() {
            this.response = false;
            this.error = false;
            this.slow = false;
        },
        hope: function hope() {
            var _this9 = this;

            var sec = 2;
            setTimeout(function () {
                return _this9.slow = true;
            }, sec * 1000);
            this.reset();
        },
        loaded: function loaded(result) {
            //this.received = result ? result.length : 0;
            // if (this.received) {
            //     this.contacts = _.union(this.contacts, result);
            // }
            this.offset += this.batch;
            this.amount = this.count;
            this.response = true;
            this.slow = false;
        },
        bun: function bun(index) {
            var item = this.contacts[index];
            console.log('bun', item);
            this.remove(index);return;
            api.bun.send({
                id: item.cont_id,
                tid: item.from
            });
        },
        splice: function splice(index) {
            this.$store.commit('delete', index);
        },
        error: function error(_error) {
            this.response = true;
            this.error = true;
            console.log(_error);
        },
        dialogOpen: function dialogOpen(data) {
            this.dialog = data.id;
            this.title = data.title;
        }
    },
    mounted: function mounted() {
        this.load();
    }
};

var InitialDialog = Vue.component('initial-dialog', {
    extends: ContactDialog,
    mounted: function mounted() {
        this.$store.dispatch('initial/CHECK');
    },

    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return true;
        },
        contacts: function contacts() {
            //console.log(this.$store);
            return this.$store.state.contacts.initial.list;
        }
    },
    methods: {
        load: function load() {
            var _this10 = this;

            this.$store.dispatch('initial/LOAD').then(function (response) {
                _this10.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this11 = this;

            this.$store.dispatch('initial/NEXT', this.offset).then(function (response) {
                _this11.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('initial/DELETE', index);
        },
        read: function read(index) {
            console.log('initial=read', index);
            this.$store.dispatch('initial/READ', index);
        },
        splice: function splice(index) {
            //console.log(this.$store); return;
            this.$store.commit('initial/delete', index);
        }
    },
    template: '#initial-dialog'
});

var IntimateDialog = Vue.component('intimate-dialog', {
    extends: ContactDialog,
    data: function data() {
        return {
            max: 100
        };
    },
    mounted: function mounted() {
        this.$store.dispatch('intimate/CHECK');
    },

    computed: {
        initial: function initial() {
            return true;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.intimate.list;
        }
    },
    methods: {
        load: function load() {
            var _this12 = this;

            this.$store.dispatch('intimate/LOAD', this.next).then(function (response) {
                _this12.loaded();
            }).catch(function (error) {
                return _this12.error = error;
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this13 = this;

            this.$store.dispatch('intimate/NEXT', this.offset).then(function (response) {
                _this13.loaded();
            });
            this.hope();
        },
        remove: function remove(index) {
            console.log('imm=remove', index);
            this.$store.dispatch('intimate/DELETE', index);
        },
        read: function read(index) {
            console.log('intimate=read', index);
            this.$store.dispatch('intimate/READ', index);
        },
        splice: function splice(index) {
            this.$store.commit('intimate/delete', index);
        }
    },
    template: '#intimate-dialog'
});

var SendsDialog = Vue.component('sends-dialog', {
    extends: ContactDialog,
    computed: {
        initial: function initial() {
            return false;
        },
        simple: function simple() {
            return false;
        },
        contacts: function contacts() {
            return this.$store.state.contacts.sends.list;
        }
    },
    methods: {
        load: function load() {
            var _this14 = this;

            this.$store.dispatch('sends/LOAD', this.next).then(function (response) {
                _this14.loaded();
            });
            this.amount = this.count;
            this.hope();
        },
        next: function next() {
            var _this15 = this;

            this.$store.dispatch('sends/NEXT', this.offset).then(function (response) {
                _this15.loaded();
            });
            this.reset();
        },
        remove: function remove(index) {
            this.$store.dispatch('sends/DELETE', index);
        },
        splice: function splice(index) {
            this.$store.commit('sends/delete', index);
        }
    },
    template: '#initial-dialog'
});

Vue.component('contact-item', {
    props: ['item', 'index', 'quick'],
    data: function data() {
        return {
            account: false,
            detail: false,
            confirm: false
        };
    },

    computed: {
        name: function name() {
            var result = 'Парень или девушка';
            if (this.item.user) {
                result = this.item.user.sex == 2 ? 'Девушка' : 'Парень';
                if (this.item.user.name) {
                    result = this.item.user.name;
                }
            }
            return result;
        },
        age: function age() {
            return this.item.user && this.item.user.age ? this.item.user.age : '';
        },
        city: function city() {
            return this.item.user && this.item.user.city ? this.item.user.city : '';
        },
        title: function title() {
            return this.name + ' ' + this.age + ' ' + this.city;
        },
        message: function message() {
            return this.item.message ? this.item.message.text : '';
        },
        unread: function unread() {
            return this.item.message ? this.item.message.unread : 0;
        },
        sent: function sent() {
            return this.item.message ? this.item.message.sender == this.$store.state.user.uid : 0;
        },
        humanId: function humanId() {
            return this.item.human_id;
        }
    },
    methods: {
        show: function show() {
            //this.$emit('show');
            if (this.quick) {
                this.reply();
            } else {
                //this.anketa();
                this.dialog();
            }
        },
        reply: function reply() {
            this.$emit('read', this.index);
            this.$router.push({ name: 'quickReply', params: {
                    humanId: this.humanId,
                    message: this.message,
                    index: this.index
                } });
        },
        dialog: function dialog() {
            this.$emit('read', this.index);
            //this.$emit('dialog', {id: this.humanId, title: this.title});
            this.$router.push({ name: 'dialog', params: { humanId: this.humanId, title: this.title } });
        },
        confirmBun: function confirmBun() {
            this.confirm = 'doit';
        },
        confirmRemove: function confirmRemove() {
            //this.$emit('remove');
            //console.log('initial-item REMOVE');
            this.confirm = !this.quick ? 'some' : 'must';
        },
        close: function close() {
            this.detail = false;
            console.log('close');
        },
        bun: function bun() {
            console.log('bun1', this.index);
            this.$emit('bun', this.index);
        },
        remove: function remove() {
            console.log('remove=remove', this.index);
            this.$emit('remove', this.index);
        },
        cancel: function cancel() {
            this.confirm = false;
            console.log('cancel');
        },
        sended: function sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#contact-item'
});

Vue.component('desire-tag-item', {
    props: ['id', 'tag'],
    data: function data() {
        return {
            active: false,
            error: false
        };
    },

    methods: {
        select: function select() {
            this.$emit('select');
        }
    },
    template: '#desire-tag-item'
});

Vue.component('email-sended', {
    template: '#email-sended'
});

Vue.component('inform-dialog', {
    props: ['loader', 'alert', 'hint'],
    computed: {
        hasContext: function hasContext() {
            return !!this.$slots.context;
        },
        hasHint: function hasHint() {
            return !!this.$slots.hint;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#inform-dialog'
});

Vue.component('intro-info', {
    data: function data() {
        return {
            slide: 1
        };
    }
});

Vue.component('loading-cover', {
    props: ['show', 'text'],
    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Отправляю';
        }
    },
    template: '#loading-cover'
});

Vue.component('loading-wall', {
    props: ['show', 'text'],
    data: function data() {
        return {
            hope: false
        };
    },

    computed: {
        loader: function loader() {
            return this.text ? this.text : 'Загружаем';
        }
    },
    mounted: function mounted() {
        var _this16 = this;

        this.hope = false;
        setTimeout(function () {
            return _this16.hope = true;
        }, 3000);
    },

    template: '#loading-wall'
});

var MenuUser = Vue.component('menu-user', {
    data: function data() {
        return {};
    },

    computed: {
        authorized: function authorized() {
            return this.$store.state.user.uid > 0 ? 1 : 0;
        },
        newMessage: function newMessage() {
            var status = this.$store.state.contacts.intimate.status;

            return status == false || status < 8;
        },
        newContact: function newContact() {
            var status = this.$store.state.contacts.initial.status;

            return status == false || status < 8;
        },
        signature: function signature() {
            var results = 'Кто вы?';
            var _$store$state$user = this.$store.state.user,
                name = _$store$state$user.name,
                city = _$store$state$user.city,
                age = _$store$state$user.age,
                sex = _$store$state$user.sex;

            if (sex) {
                results = sex == 1 ? 'Парень' : 'Девушка';
                results = name ? name : results;
                return results + ' ' + (age ? age : '') + ' ' + (city ? city : '');
            }
            return results;
        }
    },
    methods: {
        search: function search() {
            this.$store.commit('simple', true);
            this.$root.reload();
            this.$router.push('/');
        },
        initial: function initial() {
            this.$router.push({ name: 'initial' });
        },
        intimate: function intimate() {
            this.$router.push({ name: 'intimate' });
        },
        loadStatus: function loadStatus() {
            var _this17 = this;

            axios.get('/mailer/status').then(function (response) {
                _this17.onIntimate(response.data.message);
                _this17.onInitial(response.data.contact);
            });
        },
        onIntimate: function onIntimate(status) {
            var _this18 = this;

            var _$store$state$contact = this.$store.state.contacts.intimate,
                notified = _$store$state$contact.notified,
                current = _$store$state$contact.status;

            this.$store.commit('intimate/status', status);

            notified = !notified || status != current ? false : true;
            if (status == 1 && !notified && this.newMessage) {
                var callback = function callback() {
                    return _this18.$router.push({ name: 'intimate' });
                };
                this.$store.commit('intimate/notifi', true);
                this.$emit('snackbar', 'Новое сообщение', callback, 'Смотреть', true);
            }
        },
        onInitial: function onInitial(status) {
            var _this19 = this;

            var _$store$state$contact2 = this.$store.state.contacts.initial,
                notified = _$store$state$contact2.notified,
                current = _$store$state$contact2.status;

            this.$store.commit('initial/status', status);

            notified = !notified || status != current ? false : true;
            if (status == 1 && !notified && this.newContact && !this.newMessage) {
                var callback = function callback() {
                    return _this19.$router.push({ name: 'initial' });
                };
                this.$store.commit('initial/notifi', true);
                this.$emit('snackbar', 'Новое знакомство', callback, 'Смотреть', true);
            }
        },
        regmy: function regmy() {
            window.location = '/?regmy';
        }
    },
    mounted: function mounted() {
        var _this20 = this;

        var delay = 15;
        this.loadStatus();
        setInterval(function () {
            _this20.loadStatus();
        }, delay * 1000);
    }
});

Vue.component('list-date', {
    props: ['list', 'index'],
    computed: {
        count: function count() {
            return this.list.length;
        },
        item: function item() {
            return this.list[this.index];
        },
        currDate: function currDate() {
            return moment(this.item.date).date();
        },
        prevDate: function prevDate() {
            if (this.index && this.index < this.count) {
                return moment(this.list[this.index - 1].date).date();
            }
        },
        month: function month() {
            return moment(this.item.date).format('MMMM').substring(0, 3);
        },
        formatted: function formatted() {
            var result = this.currDate + ' ' + this.month;
            var today = moment().date();
            var yestd = moment().subtract(1, 'day').date();
            result = this.currDate === today ? 'Сегодня' : result;
            result = this.currDate === yestd ? 'Вчера' : result;
            return result;
        },
        date: function date() {
            if (this.prevDate != this.currDate) {
                return this.formatted;
            } else {
                return null;
            }
        }
    },
    template: '#list-date'
});

var prev = null;

Vue.component('message-item', {
    props: ['item', 'index', 'count', 'alert'],
    template: '#messages-item',
    data: function data() {
        return {
            showOption: false,
            fixOption: false,
            alertOption: false,
            showDialog: false,
            photo: false
        };
    },

    methods: {
        fix: function fix() {
            this.showOption = true;
            this.alertOption = false;
            if (!this.alert) {
                this.fixOption = this.alert ? false : !this.fixOption;
            } else {
                this.$emit('admit');
            }
        },
        bun: function bun() {
            var _this21 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id,
                tid: this.item.from
            };
            axios.post('/mess/bun/', data, config).then(function (response) {
                _this21.$emit('remove', _this21.index);
            }).catch(function (error) {
                console.log('error');
            });
        },
        cancel: function cancel() {
            this.showDialog = false;
            console.log('cancel');
        },
        remove: function remove() {
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken }
            };
            var data = {
                id: this.item.id
            };
            axios.post('/mess/delete/', data, config).then(function (response) {
                //this.$emit('remove', this.index);
            }).catch(function (error) {
                console.log(error);
            });
            this.$emit('remove', this.index);
        },
        play: function play() {
            var _this22 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: this.item.from }
            };
            var server = this.$store.state.photoServer;
            var url = 'http://' + server + '/api/v1/users/' + this.uid + '/sends/' + this.alias + '.jpg';
            axios.get(url, config).then(function (response) {
                _this22.preview(response.data.photo);
            }).catch(function (error) {
                console.log(error);
            });
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                this.photo = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
            }
        },
        pathName: function pathName(name) {
            if (!name || name.length < 10) {
                return null;
            }
            var path = [name.substr(0, 2), name.substr(2, 2), name.substr(4, 3)];
            return path.join('/') + '/' + name;
        }
    },
    mounted: function mounted() {
        if (!this.sent && !this.index && this.count < 5) {
            this.fix();
            this.alertOption = true;
        }
        if (!this.sent && !this.read) {
            this.$emit('set-new');
        }
        //console.log('item', this.index +'+'+ this.date);
    },
    updated: function updated() {
        //console.log('item', this.index +'+'+ this.date);
    },

    computed: {
        uid: function uid() {
            return this.$store.state.user.uid;
        },
        attention: function attention() {
            return this.alert || this.alertOption ? 1 : 0;
        },
        option: function option() {
            if (!this.index && this.alert) {
                return true;
            }
            return this.showOption || this.fixOption ? 1 : 0;
        },
        sent: function sent() {
            return !this.uid || this.uid == this.item.from ? 1 : 0;
        },
        read: function read() {
            return this.item.read == 0 ? false : true;
        },
        time: function time() {
            return moment(this.item.date).format('HH:mm');
        },
        alias: function alias() {
            var result = false;
            var text = this.item.mess;
            var old = /.+images.intim?.(.{32})\.(jpg)/i;
            var now = /\[\[IMG:(.{32})\]\]/i;
            result = old.test(text) ? old.exec(text) : false;
            result = !result && now.test(text) ? now.exec(text) : result;
            if (result) {
                result = result[1];
            }
            return result;
        },
        image: function image() {
            var server = this.$store.state.photoServer;
            var image = this.pathName(this.alias);
            return image ? 'http://' + server + '/res/photo/preview/' + image + '.png' : false;
        },
        previous: function previous() {
            var p = prev;
            prev = this.item.from;
            return !p || p == prev ? true : false;
        }
    }
});

Vue.component('message-list', {
    props: ['humanId'],
    data: function data() {
        return {
            messages: [],
            response: null,
            error: 0,
            next: 0,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            uid: null,
            date: null,
            toSlow: false,
            skipScroll: false
        };
    },

    mounted: function mounted() {
        this.load();
    },
    methods: {
        reload: function reload() {
            this.next = 0;
            this.newCount = 0;
            this.messages = [];
            this.load();
            fdate = null;
            prev = null;
            //TODO: переписать глобальную зависимость
        },
        load: function load() {
            var _this23 = this;

            //console.log('load MessList data');
            this.response = 0;
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { id: this.humanId, next: this.next, hash: hash }
            };
            axios.get('/ajax/messages_load.php', config).then(function (response) {
                _this23.onLoad(response);
            }).catch(function (error) {
                _this23.error = 10;
                console.log(error);
            });
            setTimeout(function () {
                return _this23.toSlow = true;
            }, 7000);
        },
        loadNext: function loadNext() {
            this.skipScroll = true;
            this.load();
        },
        onLoad: function onLoad(response) {
            var messages = response.data.messages;
            this.received = messages ? messages.length : 0;
            if (!messages && !this.messages.length) {
                this.noMessages();
            } else {
                if (this.received) {
                    this.messages = _.union(messages.reverse(), this.messages);
                }
                this.next += this.batch;
            }
            this.response = 200;
            this.toSlow = false;
            this.$nextTick(function () {
                //this.scroll();
            });
            //console.log(response);
        },
        scroll: function scroll() {
            if (this.skipScroll) {
                return this.skipScroll = false;
            }
            var objDiv = document.getElementById("dialog-history");
            console.log('scroll', objDiv.scrollTop);
            objDiv.scrollTop = objDiv.scrollHeight + 30;
            console.log('scroll', objDiv.scrollTop);
        },
        noMessages: function noMessages() {
            // TODO: Заменить на компоненты, страрые зависимости
            //quick_mess.ajax_load();
            //notice_post.show();
            store.commit('intimated', false);
        },
        setDate: function setDate(date) {
            //this.date = new Date(this.item.date).getDayMonth();
        },
        remove: function remove(index) {
            console.log('remove(' + index + ')');
            this.messages.splice(index, 1);
        },
        admit: function admit() {
            console.log('itOk false');
            this.attention = false;
        },
        setNew: function setNew() {
            console.log('new');
            this.newCount += 1;
        }
    },
    computed: {
        // items() {
        //     //let arr = this.messages.slice();
        //     return this.messages.slice().reverse();
        // },
        count: function count() {
            return this.messages.length;
        },
        more: function more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },

        uid: function uid() {
            return undefined.store.user.uid;
        }
    },
    template: '#message-list'
});

var ModalDialog = Vue.component('modal-dialog', {
    extends: ActivityActions,
    mounted: function mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },

    template: '#modal-dialog'
});

Vue.component('modal-super', {
    template: '#modal-super'
});

///
// Модальное окно настроек OptionDialog - контейнер
///
Vue.component('option-dialog', {
    template: '#option-static__dialog-window',
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    created: function created() {
        // Close the modal when the `escape` key is pressed.
        var self = this;
        document.addEventListener('keydown', function () {
            if (self.show && event.keyCode === 27) {
                self.close();
            }
        });
    },
    updated: function updated() {
        if (this.show) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    }
});

var PhotoViewer = Vue.component('photo-send', {
    props: ['photo', 'options'],
    data: function data() {
        return {
            remove: false
        };
    },

    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#photo-send'
});

Vue.component('photo-view', {
    extends: ModalDialog,
    props: ['photo', 'thumb', 'maxWidth', 'bypass'],
    methods: {
        approve: function approve() {
            this.$store.commit('accepts/photo');
        },
        close: function close() {
            this.back();
        }
    },
    computed: {
        accept: function accept() {
            return this.$store.state.accepts.photo || this.bypass ? true : false;
        }
    },
    template: '#photo-view'
});

Vue.directive('resized', {
    bind: function bind(el) {
        $(el).on('change', function () {
            el.style.height = '1px';
            el.style.height = el.scrollHeight + 'px';
        });
    },
    componentUpdated: function componentUpdated(el) {
        $(el).change();
    }
});

var QuickMessage = Vue.component('quick-message', {
    extends: ModalDialog,
    props: ['humanId'],
    data: function data() {
        return {
            text: '',
            captcha: false,
            process: false,
            loading: false,
            confirm: false,
            ignore: false,
            addition: false,
            code: null
        };
    },

    // beforeRouteLeave(to, from, next) {

    // },
    computed: {
        human: function human() {
            return this.$store.state.search.human;
        },
        user: function user() {
            return this.$store.state.user;
        },
        tags: function tags() {
            return 'tags' in this.human ? this.human.tags : [];
        },
        hold: function hold() {
            return this.ignore ? 0 : this.human.hold;
        },
        added: function added() {
            return this.user.city && this.user.age && this.user.name ? false : true;
        },
        warning: function warning() {
            var result = '';
            var who = { 1: 'парни', 2: 'девушки' };
            if (this.human.close && this.user.city && this.user.city != this.human.city) {
                result = 'Мне интересно общение только в моём городе';
            }
            if (this.human.who && this.human.who != this.user.sex) {
                result = 'Мне интересны только ' + who[this.human.who];
            } else if (this.human.who) {
                var age = this.user.age;
                if (this.human.up && age && this.human.up > age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте от ' + this.human.up + ' лет ';
                }
                if (this.human.to && age && this.human.to < age) {
                    result = 'Мне интересны ' + who[this.human.who] + ' в возрасте до ' + this.human.to + ' лет ';
                }
            }
            if (!this.user.age) {
                result = 'Укажите ваш возраст в анкете, для меня это важно';
            }
            if (!this.user.city) {
                result = 'Укажите ваш город в анкете, для меня это важно';
            }
            return result;
        }
    },
    mounted: function mounted() {
        this.reload();
    },

    methods: {
        reload: function reload() {
            var _this24 = this;

            this.loading = true;
            setTimeout(function () {
                return _this24.loading = false;
            }, 4 * 1000);
            store.dispatch('HUMAN', this.humanId).then(function (response) {
                _this24.loaded();
            }).catch(function (error) {
                console.log(error);
                _this24.loading = false;
            });
            console.log('reload*reload');
        },
        loaded: function loaded() {
            this.loading = false;
            this.visited();
            //console.log('hold:', this.human.hold);
            //console.log('tags:', this.human);
            //this.process = false;
        },
        close: function close() {
            this.back();
            //this.$emit('close');
        },
        remove: function remove() {
            console.log('::remove:: (!)');
            this.$emit('remove');
        },
        cancel: function cancel() {
            this.captcha = false;
            this.confirm = false;
            this.ignore = true;
            console.log('cancel');
        },
        inProcess: function inProcess(sec) {
            var _this25 = this;

            this.process = true;
            setTimeout(function () {
                return _this25.process = false;
            }, sec * 1000);
        },
        send: function send() {
            var _this26 = this;

            var data = {
                id: this.humanId,
                mess: this.text,
                captcha_code: this.code
            };
            api.messages.send(data).then(function (response) {
                _this26.onMessageSend(response.data);
            }).catch(function (error) {
                _this26.onError(error);
            });
            //  this.sended();
            this.inProcess(5);
        },
        setCode: function setCode(code) {
            this.code = code;
            this.send();
        },
        onMessageSend: function onMessageSend(response) {
            if (!response.saved && response.error) {
                if (response.error == 'need_captcha') {
                    this.captcha = true;
                }
                this.onError();
            } else {
                this.sended();
            }
            this.process = false;
        },
        sended: function sended() {
            this.$emit('sended');
            this.close();
        },
        account: function account() {
            this.$router.push(this.humanId + '/detail');
        },
        onError: function onError() {
            this.process = false;
        },
        visited: function visited() {
            this.$store.dispatch('visited/ADD', this.humanId);
        }
    },
    template: '#quick-message'
});

var QuickReply = Vue.component('quick-reply', {
    props: ['humanId', 'message', 'index'],
    extends: QuickMessage,
    methods: {
        sended: function sended() {
            this.$emit('sended', this.index);
            this.close();
        }
    },
    template: '#quick-reply'
});

Vue.component('quick-write', {
    // extends: QuickMessage,
    props: ['humanId'],
    data: function data() {
        return {
            account: false,
            open: false,
            sended: false
        };
    },

    methods: {
        write: function write() {
            this.$router.push('write/' + tid);
        }
    },
    template: '#quick-write'
});

Vue.component('remind-login', {
    data: function data() {
        return {
            email: '',
            hint: 'Введите ваш емайл',
            confirm: false
        };
    },

    computed: {},
    methods: {
        close: function close() {
            this.$emit('close');
        },
        send: function send() {
            var _this27 = this;

            if (!this.email) {
                return;
            }
            this.hint = 'Отправляю...';
            api.user.post({ email: this.email }, null, 'sync/remind').then(function (response) {
                _this27.hint = response.data.say;
                _this27.error = response.data.err;
                _this27.sended();
            });
        },
        sended: function sended() {
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                this.confirm = true;
            }
        }
    },
    template: '#remind-login'
});

var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data: function data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: '\u0417\u0430 \u0440\u0435\u0437\u043A\u0438\u0435 \u0441\u043B\u043E\u0432\u0430, \u0437\u0430 \u043E\u0441\u043A\u043E\u0440\u0431\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0445\u0430\u043C\u0441\u0442\u0432\u043E,\n                    \u0437\u0430 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043D\u0435 \u0432 \u0442\u0435\u043C\u0443 \u0438\u043B\u0438 \u0431\u0435\u0441\u0441\u043C\u044B\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u043D\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u0432\u0441\u0435\u0445, \u043A\u043E\u0433\u043E\n                    \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u043C. \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443.',
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 "\u0414\u0438\u0437\u043B\u0430\u0439\u043A" \u0443 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0432\u044B\u0437\u0432\u0430\u043B\u043E \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u044D\u043C\u043E\u0446\u0438\u0438.\n                    \u041D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0435. \u041C\u044B \u043D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0443\u0437\u043D\u0430\u0435\u043C \u043E \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F\u0445, \u0435\u0441\u043B\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0435\u0437 \u043D\u0430\u043A\u0430\u0437\u0430\u043D\u0438\u044F.',
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u043E\u0442\u043E\u0432\u0441\u044E\u0434\u0443, \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\n                    \u043F\u0440\u043E\u043F\u0430\u0434\u0435\u0442 \u043A\u0430\u043A \u0438\u0437 \u0432\u0430\u0448\u0435\u0439 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438, \u0442\u0430\u043A \u0438 \u0438\u0437 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    computed: {
        variant: function variant() {
            return this.show ? this.show : 'some';
        },
        caption: function caption() {
            return this.content[this.variant].caption;
        },
        text: function text() {
            return this.content[this.variant].text;
        },
        action: function action() {
            return this.content[this.variant].action;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        bun: function bun() {
            console.log('bun0');
            this.$emit('bun');
            this.close();
        },
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data: function data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: '\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D \u0431\u0435\u0437 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u0414\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043D\u0438\u043A\u043E\u043C \u0441\u0442\u0430\u043D\u0435\u0442 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E.\n                    \u041E\u0431\u043C\u0435\u043D\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C\u0438 \u0441 \u0442\u0435\u043C\u0438 \u043A\u0442\u043E \u0432\u0430\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0435\u043D \u0432\u0441\u0435\u0433\u0434\u0430.',
                    action: 'Удалить навсегда'
                }
            }
        };
    },

    methods: {
        remove: function remove() {
            this.$emit('remove');
            this.close();
        }
    },
    template: '#remove-confirm'
});

Vue.component('search-item', {
    props: ['human', 'visited', 'gold', 'compact'],
    data: function data() {
        return {
            first: null,
            second: null,
            third: null,
            social: {
                first: ['em', 'ok', 'vk', 'fb', 'go', 'sk', 'ph'],
                second: ['vk', 'ok', 'fb', 'go', 'sk', 'ph'],
                third: ['sk', 'ph', 'em', 'ok', 'vk', 'fb', 'go']
            }
        };
    },
    mounted: function mounted() {
        var _this28 = this;

        _.find(_.pick(this.human, this.social.first), function (value, key) {
            return value ? _this28.first = key : false;
        });
        _.find(_.pick(this.human, this.social.second), function (value, key) {
            value = _this28.first == key ? false : value;
            return value ? _this28.second = key : false;
        });
        _.find(_.pick(this.human, this.social.second), function (value, key) {
            value = _this28.first == key ? false : value;
            value = _this28.second == key ? false : value;
            return value ? _this28.third = key : false;
        });
        // console.log('item',this.human);
    },

    computed: {
        search: function search() {
            var result = 'парня или девушку ';
            if (this.human.who) {
                result = this.human.who == 1 ? 'парня ' : 'девушку ';
            }
            result = 'Ищет ' + result;
            if (this.human.up || this.human.to) {
                //result += ' в возрасте ';
                result += this.human.up ? ' от ' + this.human.up : '';
                result += this.human.to ? ' до ' + this.human.to : '';
                result += ' лет ';
            }
            return result;
        },
        name: function name() {
            var sex = this.human.sex == 1 ? 'Парень' : 'Девушка';
            return this.human.name ? this.human.name : sex;
        },
        tags: function tags() {
            return this.human.tags.length;
        },
        online: function online() {
            return this.human.last < 777 ? true : false;
        },
        differ: function differ() {
            result = false;
            var sex = this.$store.state.user.sex;
            if (sex && this.human.who && this.human.who != sex) {
                result = true;
            }
            return result;
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        quick: function quick() {
            this.$router.push({
                name: 'quickWrite',
                params: { humanId: this.human.id }
            });
        },
        load: function load() {
            var _this29 = this;

            api.search.load(null).then(function (response) {
                _this29.users = response.data.users;
            });
        }
    },
    template: '#search-item'
});

Vue.component('search-list', {
    data: function data() {
        return {
            loading: false,
            users: [],
            response: null,
            error: 0,
            next: null,
            newCount: 0,
            batch: 15,
            received: 0,
            attention: false,
            toSlow: false,
            humanId: null,
            account: null,
            sended: false,
            compact: true,
            ignore: false
        };
    },
    mounted: function mounted() {
        if (this.virgin && this.defaults) {
            this.compact = false;
            this.onLoad(this.defaults);
        } else {
            this.load();
        }
        this.visitedSync();
        this.$store.dispatch('desires/PICK');
    },

    computed: {
        more: function more() {
            if (this.received && this.received == this.batch) {
                return true;
            }
            return false;
        },
        visited: function visited() {
            return this.$store.state.visited.list;
        },
        accept: function accept() {
            return !this.ignore && !this.$store.state.accepts.search && this.next > this.batch;
        },
        defaults: function defaults() {
            var result = defaultResults ? json.parse(defaultResults) : null;
            console.log(result);
            return result && _.isObject(result) && _.has(result, 'users') && result.users.length ? result : [];
        },
        items: function items() {
            return this.users;
        },
        virgin: function virgin() {
            return this.$store.getters.virgin;
        },
        desires: function desires() {
            return _.pluck(this.$store.state.desires.list, 'tag');
        },
        count: function count() {
            return this.users.length;
        },
        loader: function loader() {
            return this.$store.state.ready && !this.count;
        },
        city: function city() {
            return this.$store.state.user.city;
        },
        age: function age() {
            return this.$store.state.user.age;
        }
    },
    methods: {
        reload: function reload() {
            this.next = 0;
            this.users = [];
            this.received = 0;
            this.compact = true;
            this.$store.commit('ready', false);
            this.load();
        },
        visitedSync: function visitedSync() {
            this.$store.dispatch('visited/SYNC');
        },
        load: function load() {
            var _this30 = this;

            this.response = 0;
            var _$store$state$search$ = this.$store.state.search.settings,
                who = _$store$state$search$.who,
                city = _$store$state$search$.city,
                up = _$store$state$search$.up,
                to = _$store$state$search$.to,
                any = _$store$state$search$.any;

            var sex = this.$store.state.user.sex;
            var next = this.next;
            up = up ? up : 0;
            to = to ? to : 0;
            if (!city || any) {
                city = null;
                this.compact = false;
            }
            //this.onLoad(ls.get('last-search'));
            api.search.load({ sex: sex, who: who, city: city, up: up, to: to, next: next }).then(function (response) {
                _this30.onLoad(response.data);
                //ls.set('last-search', response.data, 31*24*60*60);
            }).catch(function (error) {
                _this30.response = 200;
                _this30.toSlow = false;
            });
        },
        loadNext: function loadNext() {
            //this.skipScroll = true;
            this.load();
        },
        onLoad: function onLoad(data) {
            var users = data.users;
            this.received = users ? users.length : 0;
            if (!users && !this.users.length) {
                this.noResult();
            } else {
                if (this.received) {
                    this.users = _.union(this.users, users);
                }
                this.next += this.batch;
            }
            this.$store.commit('ready', true);
            this.response = 200;
            this.toSlow = false;
        },
        openMessage: function openMessage(id) {
            this.humanId = id;
        },
        noResult: function noResult() {},
        old: function old(id) {
            return _.contains(this.visited, id);
        },
        gold: function gold(tags) {
            var result = _.intersection(this.desires, tags);
            return result.length ? true : false;
        },
        approve: function approve() {
            this.$store.commit('accepts/search');
        }
    },
    template: '#search-list'
});

Vue.component('search-wizard', {
    data: function data() {
        return {};
    },

    store: store,
    computed: Vuex.mapState({
        range: function range(state) {
            var settings = state.search.settings;
            var range = '';
            if (settings.up && settings.to) {
                range = settings.up + ' - ' + settings.to;
            } else if (settings.up && !settings.to) {
                range = ' от ' + settings.up;
            } else if (!settings.up && settings.to) {
                range = ' до ' + settings.to;
            }
            return range ? ' в возрасте ' + range + ' лет ' : '';
        },
        who: function who(state) {
            var settings = state.search.settings;
            var who = ' знакомства с кем угодно ';
            if (settings.who) {
                who = settings.who == 1 ? ' знакомства с парнем ' : ' знакомства с девушкой ';
            }
            return who;
        },
        say: function say(state) {
            var where = state.user.city ? '' : ', из любого города ';
            return this.who + this.range + where;
        },
        desires: function desires() {
            var count = this.$store.state.desires.list.length;
            return count ? count : 0;
        }
    }),
    mounted: function mounted() {}
});

var AboutSettings = Vue.component('about-settings', {
    props: [],
    data: function data() {
        return {
            inputGrowth: '',
            inputWeight: '',
            selectFigure: null,
            process: false,
            virgin: true
        };
    },

    computed: Vuex.mapState({
        growth: function growth(state) {
            return state.about.growth;
        },
        weight: function weight(state) {
            return state.about.weight;
        },
        figure: function figure(state) {
            return state.about.figure;
        }
    }),
    mounted: function mounted() {
        var _this31 = this;

        this.$store.dispatch('about/SYNC').then(function () {
            _this31.init();
            _this31.process = false;
        }).catch(function () {
            _this31.process = false;
        });
        this.process = true;
        this.init();
    },

    methods: {
        init: function init() {
            this.inputGrowth = this.growth ? this.growth : '';
            this.inputWeight = this.weight ? this.weight : '';
            this.selectFigure = this.figure;
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        close: function close() {
            this.save();
            this.$emit('close');
        },
        save: function save() {
            if (!this.virgin) {
                this.$store.dispatch('about/SAVE', {
                    growth: this.inputGrowth,
                    weight: this.inputWeight,
                    figure: this.selectFigure
                });
            }
        }
    },
    template: '#about-settings'
});

var AccountSettings = Vue.component('account-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data: function data() {
        return {
            selectCity: '',
            selectSex: 0,
            selectAge: 0,
            selectName: ''
        };
    },

    computed: Vuex.mapState({
        sex: function sex(state) {
            var sex = Number(state.user.sex);
            if (sex) {
                return sex == 1 ? 1 : 2;
            }
            return 0;
        },
        city: function city(state) {
            return state.user.city;
        },
        age: function age(state) {
            return state.user.age;
        },
        name: function name(state) {
            var variant = [];
            variant[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
            variant[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];
            var x = Math.floor(Math.random() * 7);
            var name = state.user.name;
            var auto = this.sex ? variant[this.sex][x] : '';
            return name ? name : auto;
        }
    }),
    created: function created() {
        var _defaultSettings = defaultSettings,
            city = _defaultSettings.city,
            age = _defaultSettings.age; // GLOBAL

        this.selectCity = this.city ? this.city : city;
        this.selectAge = this.age ? this.age : age;
        this.selectSex = this.sex;
        this.selectName = this.name;
    },

    methods: {
        saveSex: function saveSex() {
            this.$store.dispatch('SAVE_SEX', this.selectSex);
            this.resetName();
        },
        saveCity: function saveCity(city) {
            if (city) {
                this.selectCity = city;
            }
            if (this.selectCity != this.city) {
                this.$store.dispatch('SAVE_CITY', this.selectCity);
            }
        },
        saveAge: function saveAge() {
            if (this.selectAge != this.age) {
                this.$store.dispatch('SAVE_AGE', this.selectAge);
            }
        },
        saveName: function saveName() {
            this.$store.dispatch('SAVE_NAME', this.selectName);
        },
        resetName: function resetName() {
            this.selectName = this.name;
        },
        randomAge: function randomAge() {
            this.selectAge = _.random(19, 30);
            this.saveAge();
        },
        save: function save() {
            this.saveCity();
            this.saveAge();
            this.saveName();
        },
        close: function close() {
            this.save();
            this.back();
        }
    },
    template: '#account-settings'
});

var CityWizard = Vue.component('city-wizard', {
    extends: AccountSettings,
    data: function data() {
        return {
            cities: ['Москва', 'Санкт-Петербург', 'Минск', 'Алматы', 'Краснодар', 'Екатеринбург', 'Новосибирск', 'Киев', 'Омск', 'Воронеж', 'Нижний Новгород', 'Бишкек', 'Челябинск', 'Самара', 'Красноярск', 'Уфа', 'Казань', 'Иркутск', 'Волгоград', 'Харьков', 'Саратов', 'Ростов-на-Дону', 'Одесса', 'Барнаул', 'Пермь', 'Тюмень', 'Ташкент', 'Гомель', 'Томск', 'Хабаровск', 'Тольятти', 'Астана', 'Ставрополь', 'Тула', 'Астрахань', 'Гродно', 'Пенза', 'Оренбург', 'Владивосток', 'Чита', 'Рязань', 'Караганда', 'Тверь', 'Ульяновск', 'Кемерово', 'Сургут', 'Ярославль', 'Улан-Удэ', 'Брянск', 'Шымкент', 'Витебск', 'Симферополь', 'Калининград', 'Сочи', 'Липецк', 'Ижевск', 'Курск', 'Белгород', 'Павлодар', 'Брест', 'Могилев', 'Запорожье', 'Киров', 'Новокузнецк', 'Кривой Рог', 'Калуга', 'Усть-Каменогорск', 'Севастополь', 'Тамбов', 'Днепропетровск', 'Чебоксары', 'Иваново', 'Смоленск', 'Донецк', 'Душанбе', 'Владимир', 'Орел', 'Магнитогорск', 'Кострома', 'Нижневартовск']
        };
    },

    methods: {
        select: function select(city) {
            this.saveCity(city);
            this.back();
        },
        close: function close() {
            this.saveCity();
            this.back();
        }
    },
    template: '#city-wizard'
});

var ContactWizard = Vue.component('contact-wizard', {
    extends: AccountSettings,
    props: ['humanCity', 'humanAge'],
    created: function created() {
        if (!this.selectCity && this.humanCity) {
            this.selectCity = this.humanCity;
        }
        if (!this.selectAge && this.humanAge) {
            this.selectAge = this.humanAge;
        }
    },

    methods: {
        approve: function approve() {
            this.save();
            this.$emit('approve');
            this.$emit('close');
        },
        close: function close() {
            this.$emit('close');
        }
    },
    template: '#contact-wizard'
});

var DesiresSettings = Vue.component('desires-settings', {
    props: [],
    data: function data() {
        return {
            process: false,
            desire: '',
            confirmRemove: null
        };
    },

    computed: Vuex.mapState({
        tags: function tags(state) {
            return state.desires.list;
        }
    }),
    mounted: function mounted() {
        var _this32 = this;

        this.process = true;
        this.$store.dispatch('desires/SYNC').then(function (response) {
            _this32.process = false;
        });
    },

    methods: {
        close: function close() {
            this.$emit('close');
        },
        add: function add(tag) {
            var _this33 = this;

            this.process = true;
            this.$store.dispatch('desires/ADD', tag).then(function (response) {
                _this33.process = false;
            });
        },
        remove: function remove() {
            this.$store.dispatch('desires/DELETE', this.confirmRemove);
            this.confirmRemove = null;
        }
    },
    template: '#desires-settings'
});

var IncomingPhoto = Vue.component('incoming-photo', {
    extends: ClosedActivity,
    props: ['humanId'],
    data: function data() {
        return {
            photos: [],
            user: 0,
            server: null,
            preview: null
        };
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    mounted: function mounted() {
        this.loadPhoto();
    },

    computed: {
        uid: function uid() {
            return this.$store.state.user.uid;
        }
    },
    methods: {
        loadPhoto: function loadPhoto() {
            var _this34 = this;

            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { tid: this.humanId, hash: hash }
            };
            axios.get('http://' + this.server + '/api/v1/users/' + this.uid + '/sends', config).then(function (response) {
                _this34.photos = response.data.photos;
                //console.log(this.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },
        show: function show(index) {
            var photo = this.photos[index];
            var links = photo._links;
            if (links.origin.href) {
                var _data = {
                    thumb: links.thumb.href,
                    photo: links.origin.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                this.preview = _data;
            }
        },
        close: function close() {
            this.back();
            //this.$emit('close');
        }
    },
    template: '#incoming-photo'
});

var LoginAccount = Vue.component('login-account', {
    props: [],
    data: function data() {
        return {
            login: '',
            password: '',
            captcha: false,
            code: '',
            error: false,
            remind: false,
            hint: 'Введите данные'
        };
    },

    computed: Vuex.mapState({
        city: function city(state) {
            return state.user.city;
        }
    }),
    mounted: function mounted() {},

    methods: {
        close: function close() {
            this.$emit('close');
        },
        send: function send() {
            var _this35 = this;

            var data = {
                login: this.login,
                pass: this.password,
                captcha: this.code
            };
            api.user.post(data, null, 'sync/login').then(function (response) {
                _this35.hint = response.data.say;
                _this35.error = response.data.err;
                _this35.captcha = response.data.captcha;
                _this35.onLogin();
            });
        },
        onLogin: function onLogin() {
            this.$refs.captcha.update();
            if (!this.error) {
                this.hint = 'Успешно. Подождите.';
                location.href = '/';
            }
        },
        setCode: function setCode(code) {
            this.code = code;
        }
    },
    template: '#login-account'
});

var OtherSettings = Vue.component('other-settings', {
    props: [],
    data: function data() {
        return {};
    },

    computed: Vuex.mapState({
        uid: function uid() {
            return this.$store.state.user.uid;
        }
    }),
    methods: {
        close: function close() {
            this.$emit('close');
        },
        logout: function logout() {
            window.location = '/logout.php';
        }
    },
    template: '#other-settings'
});

var PhotoSettings = Vue.component('photo-settings', {
    extends: ClosedActivity,
    props: ['humanId'],
    data: function data() {
        return {
            photos: []
        };
    },

    computed: Vuex.mapState({}),
    mounted: function mounted() {
        console.log('fileupload');
        var self = this;
        $('#fileupload').fileupload({
            dataType: 'json',
            add: function add(e, data) {
                var server = self.$store.state.photoServer;
                var uid = self.$store.state.user.uid;
                data.url = 'http://' + server + '/api/v1/users/' + uid + '/photos?jwt=' + self.$store.state.apiToken;
                data.submit();
            },
            done: function done(e, data) {
                self.preview(data.result.photo);
            }
        });
        this.loadPhoto();
    },

    methods: {
        close: function close() {
            this.back();
        },
        loadPhoto: function loadPhoto() {
            var _this36 = this;

            var server = this.$store.state.photoServer;
            var uid = this.$store.state.user.uid;
            var config = {
                headers: { 'Authorization': 'Bearer ' + this.$store.state.apiToken },
                params: { hash: hash }
            };
            axios.get('http://' + server + '/api/v1/users/' + uid + '/photos', config).then(function (response) {
                var result = response.data.photos;
                if (result && result.length) {
                    _this36.photos = response.data.photos;
                }
                console.log(_this36.photos);
            }).catch(function (error) {
                console.log(error);
            });
        },
        upload: function upload(e) {
            $('#fileupload').click();
        },

        show: function show(index) {
            this.preview(this.photos[index]);
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                var _data2 = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                //this.$router.push({ name: 'preview', params: {humanId: this.humanId, photo: data, options: true} });
                this.$emit('select', _data2);
                this.close();
                //this.$store.commit('sendPhoto', data);
                //console.log('sendPhoto');
                //console.log(data);
            } else {
                this.close();
            }
        }
    },
    template: '#photo-settings'
});

var SearchSettings = Vue.component('search-settings', {
    extends: ClosedActivity,
    props: ['root'],
    data: function data() {
        return {
            ageRange: [0, 16, 17, 18, 20, 23, 25, 27, 30, 35, 40, 45, 50, 60, 80],
            selectWho: 0,
            selectUp: 0,
            selectTo: 0,
            selectCity: '',
            checkedTown: 0,
            checkedVirt: 0,
            checkedAnyCity: 0
        };
    },

    // beforeRouteEnter(to, from, next) {,
    //     beforeEnter: (to, from, next) => {
    //         console.log(store.state.user.sex);
    //         if (!store.state.user.sex) {
    //             console.log('settings-search', store.state.user.sex );
    //             next('/confirm-sex/search');
    //         } else {
    //             console.log('next', to );
    //             next();
    //         }
    //     }

    // },
    computed: Vuex.mapState({
        who: function who(state) {
            var who = Number(state.search.settings.who);
            if (who) {
                return who == 1 ? 1 : 2;
            }
            return 0;
        },
        city: function city(state) {
            var _defaultSettings2 = defaultSettings,
                city = _defaultSettings2.city; // GLOBAL

            return state.user.city ? state.user.city : city; // [~!!!~] READ_ONLY
        },
        up: function up(state) {
            return this.age(state.search.settings.up);
        },
        to: function to(state) {
            return this.age(state.search.settings.to);
        },
        town: function town(state) {
            return state.search.settings.town == true;
        },
        virt: function virt(state) {
            return state.search.settings.virt == true;
        },
        any: function any(state) {
            return state.search.settings.any == true;
        },
        virgin: function virgin(state) {
            // Хак для пустых настроек
            if (state.search.settings.city != this.city) {
                return false;
            }
            // Хак для старых настроек NOT Range
            if (state.search.settings.up != this.up) {
                return false;
            }
            if (state.search.settings.to != this.to) {
                return false;
            }
            return this.selectCity == this.city && this.selectWho == this.who && this.selectUp == this.up && this.selectTo == this.to && this.checkedTown == this.town && this.checkedVirt == this.virt && this.checkedAnyCity == this.any;
        }
    }),
    created: function created() {
        var _defaultSettings3 = defaultSettings,
            city = _defaultSettings3.city,
            who = _defaultSettings3.who,
            up = _defaultSettings3.up,
            to = _defaultSettings3.to; // GLOBAL

        this.selectCity = this.city ? this.city : city;
        this.selectWho = this.who ? this.who : who;
        this.selectUp = this.up ? this.up : this.age(up);
        this.selectTo = this.to ? this.to : this.age(to);
        this.checkedTown = this.town;
        this.checkedVirt = this.virt;
        this.checkedAnyCity = this.any;
    },

    methods: {
        age: function age(value) {
            value = Number(value);
            if (!value) {
                return 0;
            }
            var min = _.min(this.ageRange);
            var max = _.max(this.ageRange);
            if (value <= min) {
                return min;
            }
            if (value >= max) {
                return max;
            }
            return _.find(this.ageRange, function (item, index, list) {
                if (index && index < list.length) {
                    if (value > list[index - 1] && value < list[index + 1]) {
                        return true;
                    }
                }
            });
        },

        // setWho(value) {
        //     this.$store.commit('settings', {who: value});
        // },
        // setUp() {
        //     this.$store.commit('settings', {up: this.selectUp});
        // },
        // setTo() {
        //     this.$store.commit('settings', {to: this.selectTo});
        // },
        save: function save() {
            var data = {
                who: this.selectWho,
                city: this.city,
                up: this.selectUp,
                to: this.selectTo,
                town: this.checkedTown,
                virt: this.checkedVirt,
                any: this.checkedAnyCity
            };
            console.log(data);
            if (!this.virgin) {
                this.$store.dispatch('SAVE_SEARCH', data);
            }
        },

        // account() {
        //     if (this.root) {
        //         this.$router.push({ name: 'account-settings', params: {root: true} })
        //     } else {
        //         this.$router.push({ name: 'account-settings'})
        //     }
        // },
        close: function close() {
            this.save();
            this.$root.reload();
            this.back();
        }
    },
    template: '#search-settings'
});

var SecuritySettings = Vue.component('security-settings', {
    props: [],
    data: function data() {
        return {
            inputLogin: '',
            inputPasswd: '',
            inputEmail: '',
            checkSubscribe: 0,
            process: false,
            processLogin: false,
            processPasswd: false,
            processEmail: false,
            confirmRemove: false,
            virgin: true
        };
    },

    computed: Vuex.mapState({
        login: function login(state) {
            return state.auth.login;
        },
        passwd: function passwd(state) {
            return state.auth.pass;
        },
        email: function email(state) {
            return state.auth.email;
        },
        promt: function promt(state) {
            return state.auth.promt;
        },
        subscr: function subscr(state) {
            return state.auth.subscr;
        }
    }),
    mounted: function mounted() {
        var _this37 = this;

        console.log('auth/SYNC');
        this.$store.dispatch('auth/SYNC').then(function () {
            _this37.init();
            _this37.process = false;
        }).catch(function () {
            _this37.process = false;
        });
        this.process = true;
        this.init();
    },

    methods: {
        init: function init() {
            this.inputLogin = this.login;
            this.inputPasswd = this.passwd;
            this.inputEmail = this.email;
            this.checkSubscribe = this.subscr;
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        saveLogin: function saveLogin() {
            var _this38 = this;

            this.processLogin = true;
            this.$store.dispatch('auth/SAVE_LOGIN', this.inputLogin).then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this38.$emit('warning', data.say);
                }
                _this38.processLogin = false;
            }).catch(function () {
                _this38.processLogin = false;
            });
        },
        savePasswd: function savePasswd() {
            var _this39 = this;

            this.processPasswd = true;
            this.$store.dispatch('auth/SAVE_PASSWD', this.inputPasswd).then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this39.$emit('warning', data.say);
                }
                _this39.processPasswd = false;
            }).catch(function () {
                _this39.processPasswd = false;
            });
        },
        saveEmail: function saveEmail() {
            var _this40 = this;

            this.processEmail = true;
            this.$store.dispatch('auth/SAVE_EMAIL', this.inputEmail).then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this40.$emit('warning', data.say);
                }
                _this40.processEmail = false;
            }).catch(function () {
                _this40.processEmail = false;
            });
        },
        removeEmail: function removeEmail() {
            var _this41 = this;

            this.confirmRemove = false;
            this.processEmail = true;
            this.$store.dispatch('auth/REMOVE_EMAIL').then(function (response) {
                var data = response.data;
                if (data.err) {
                    _this41.$emit('warning', data.say);
                }
                _this41.processEmail = false;
            }).catch(function () {
                _this41.processEmail = false;
            });
        },
        saveSubscribe: function saveSubscribe() {
            this.$store.dispatch('auth/SAVE_SUSCRIBE');
        },
        close: function close() {
            if (!this.processLogin && !this.processPasswd && !this.processEmail) {
                this.$emit('close');
            } else {
                this.$emit('alert', 'Подождите, сохраняю.');
            }
        }
    },
    template: '#security-settings'
});

var SocialSettings = Vue.component('social-settings', {
    props: [],
    data: function data() {
        return {
            checkedContact: {
                em: 0,
                vk: 0,
                ok: 0,
                fb: 0,
                go: 0,
                sk: 0,
                ph: 0
            },
            virgin: true
        };
    },

    computed: Vuex.mapState({
        contacts: function contacts(state) {
            return state.user.contacts;
        }
    }),
    mounted: function mounted() {
        console.log('user', this.contacts);
        this.checkedContact = this.contacts;
    },

    methods: {
        close: function close() {
            this.save();
            this.$emit('close');
        },
        deflower: function deflower() {
            this.virgin = false;
        },
        save: function save() {
            if (!this.virgin) {
                this.$store.dispatch('SAVE_CONTACTS', this.checkedContact);
            }
        }
    },
    template: '#social-settings'
});

var SexConfirm = Vue.component('sex-confirm', {
    extends: ModalDialog,
    props: ['show'],
    computed: {
        variant: function variant() {
            return this.show ? this.show : 'message';
        },
        caption: function caption() {
            return this.content[this.variant].caption;
        },
        text: function text() {
            return this.content[this.variant].text;
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     if (this.$store.state.user.sex) {
    //         if (this.index('search')) {
    //             console.log('leave-search', [this.$store.state.user.sex, store.state.user.sex, to]);
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('contacts')) {
    //             console.log('leave', 'contacts');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('account')) {
    //             console.log('leave', 'account');
    //             next({name: 'search-settings'});
    //         }
    //         if (this.index('message')) {
    //             console.log('leave', 'message');
    //             next({name: 'search-settings'});
    //         }
    //     }
    //     console.log('leave', 'close');
    //     next();
    // },
    // mounted() {
    //     console.log('confirm', this.variant);
    // },
    methods: {
        close: function close() {
            this.back();
        },
        index: function index(val) {
            return val == this.variant;
        },
        save: function save(sex) {
            this.$store.dispatch('SAVE_SEX', sex);
            this.$emit('select', this.show);
            this.redirect();
        },
        login: function login() {
            this.$emit('login');
            this.$emit('close');
        },
        redirect: function redirect() {
            if (this.index('search')) {
                this.$router.replace('/search');
            } else
                // if (this.index('contacts')) {
                //     console.log('leave', 'contacts');
                //     next({name: 'search-settings'});
                // }
                if (this.index('account')) {
                    this.$router.replace('/settings/account');
                } else if (this.index('message')) {
                    this.$router.replace('/');
                } else if (this.index('city')) {
                    this.$router.replace('/wizard/city');
                } else {
                    this.$router.replace('/');
                }
        }
    },
    data: function data() {
        var content = {
            search: {
                caption: 'Легко начать',
                text: 'Для правильного отображения результатов поиска необходимо указать пол. Вы парень или девушка?'
            },
            contacts: {
                caption: 'Вы девушка?',
                text: 'Начало быстрого общения в один клик. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
            },
            message: {
                caption: 'Общение в один клик',
                text: 'Начать общение просто. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка.'
                //text: 'Все пользователи желают знать с кем будут общаться. Чтобы продолжить укажите, парень вы или девушка.'
            },
            account: {
                caption: 'Кто вы?',
                text: 'Приватная анкета в один клик. Самое быстрое общение. Достаточно указать кто вы, парень или девушка. И начинайте общаться.'
            }
        };
        content.city = content.contacts;
        return { content: content };
    },

    template: '#sex-confirm'
});

Vue.component('simple-captcha', {
    props: [],
    data: function data() {
        return {
            code: '',
            inc: 0
        };
    },

    computed: {
        src: function src() {
            return '/capcha_pic.php?inc=' + this.inc;
        }
    },
    mounted: function mounted() {},

    methods: {
        close: function close() {
            this.$emit('close');
        },
        update: function update() {
            this.inc++;
        },
        input: function input() {
            this.$emit('input', this.code);
        }
    },
    template: '#simple-captcha'
});

Vue.component('slider-vertical', {
    data: function data() {
        return {
            slide: 1
        };
    }
});
Vue.component('snackbar', {
    props: ['callback', 'action', 'play'],
    computed: {
        time: function time() {
            return this.callback ? 5000 : 3000;
        },
        title: function title() {
            return this.action ? this.action : 'Ok';
        }
    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        approve: function approve() {
            this.callback();
        },
        autoplay: function autoplay(event) {
            if (this.play) {
                this.$refs.autoplay.play();
            }
        }
    },
    mounted: function mounted() {
        _.delay(this.close, this.time);
        this.autoplay();
    },

    template: '#snackbar'
});

Vue.component('suggest-input', {
    props: ['url', 'disabled'],
    data: function data() {
        return {
            query: '',
            items: [],
            enable: true
        };
    },

    computed: {
        suggested: function suggested() {
            return this.items.length;
        }
    },
    methods: {
        load: function load() {
            var _this42 = this;

            api.user.get({ q: this.query }, 'tag/suggest').then(function (response) {
                _this42.loaded(response.data);
            });
        },
        reset: function reset() {
            this.query = '';
            this.items = [];
        },
        select: function select(item) {
            this.query = item;
            this.$emit('select', item);
            this.reset();
        },
        loaded: function loaded(data) {
            if (data && data.length) {
                this.items = data;
                console.log('loaded', data);
            } else {
                this.reset();
            }
        }
    },
    template: '#suggest-input'
});

Vue.component('toast', {
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    mounted: function mounted() {
        _.delay(this.close, 2000);
    },

    template: '#toast'
});

Vue.component('upload-dialog', {
    template: '#upload-dialog',
    data: function data() {
        return {
            photos: [],
            server: null
        };
    },

    created: function created() {
        this.server = this.$store.state.photoServer;
    },
    methods: {
        show: function show(index) {
            this.preview(this.photos[index]);
        },
        preview: function preview(photo) {
            var links = photo._links;
            if (links.origin.href) {
                var _data3 = {
                    photo: links.origin.href,
                    thumb: links.thumb.href,
                    alias: photo.alias,
                    height: photo.height,
                    width: photo.width
                };
                this.$store.commit('sendPhoto', _data3);
                //console.log('sendPhoto');
                //console.log(data);
            }
            this.close();
        }
    }
});

Vue.component('photo-dialog', {
    methods: {
        close: function close() {
            this.$emit('close');
            store.commit('viewPhoto', { photo: null });
        }
    },
    computed: Vuex.mapState({
        config: function config(state) {
            return state.photoView;
        }
    }),
    template: '#photo-dialog'
});

// -- Хранилище ---
var storage = {
    enable: 0,
    init: function init() {
        if (storage.is_enable()) {
            storage.enable = 1;
        }
    },
    is_enable: function is_enable() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
    save: function save(key, val) {
        if (storage.enable) {
            localStorage.setItem(key, val);
        }
    },
    load: function load(key, def) {
        var result = def ? def : null;
        if (storage.enable && localStorage.getItem(key)) {
            result = localStorage.getItem(key);
        }
        return result;
    },
    set: function set(key, val) {
        storage.save(key, val);
    },
    get: function get(key, def) {
        storage.load(key, def);
    },

    array: {
        load: function load(key) {
            var result = [];
            var value = null;
            value = storage.load(key);
            value = json.parse(value);
            if (value) result = value;
            return result;
        },
        save: function save(key, val) {
            storage.save(key, json.encode(val));
        },
        add: function add(key, val) {}
    }
};
storage.init();

var about = {
    namespaced: true,
    state: {
        growth: 0,
        weight: 0,
        figure: 0
    },
    actions: {
        SYNC: function SYNC(_ref) {
            var rootState = _ref.rootState,
                commit = _ref.commit,
                getters = _ref.getters;

            return api.user.syncAbout().then(function (response) {
                commit('update', response.data);
            });
        },
        SAVE: function SAVE(_ref2, data) {
            var state = _ref2.state,
                commit = _ref2.commit;

            api.user.saveAbout({ anketa: data }).then(function (response) {
                commit('update', data);
            });
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        }
    }
};

var accepts = {
    namespaced: true,
    state: {
        photo: false,
        search: false
    },
    actions: {
        LOAD: function LOAD(_ref3) {
            var state = _ref3.state;

            var data = ls.get('accepts');
            if (data) {
                _.assign(state, data);
            }
        }
    },
    mutations: {
        photo: function photo(state) {
            state.photo = true;
            ls.set('accepts', state);
        },
        search: function search(state) {
            state.search = true;
            ls.set('accepts', state);
        }
    }
};

var auth = {
    namespaced: true,
    state: {
        iss: '',
        exp: '',
        iat: '',
        sid: '',
        uid: '',
        auth: '',
        ip: '',
        login: '',
        pass: '',
        email: '',
        promt: '',
        subscr: false,
        last: '',
        error: ''
    },
    actions: {
        SYNC: function SYNC(_ref4) {
            var commit = _ref4.commit;

            return api.user.syncAuth().then(function (response) {
                commit('update', response.data);
            });
        },
        SAVE_LOGIN: function SAVE_LOGIN(_ref5, data) {
            var commit = _ref5.commit;

            return api.user.saveLogin(data);
        },
        SAVE_PASSWD: function SAVE_PASSWD(_ref6, data) {
            var commit = _ref6.commit;

            return api.user.savePasswd(data);
        },
        SAVE_EMAIL: function SAVE_EMAIL(_ref7, data) {
            var commit = _ref7.commit;

            return api.user.saveEmail(data);
        },
        REMOVE_EMAIL: function REMOVE_EMAIL(_ref8) {
            var commit = _ref8.commit;

            return api.user.removeEmail();
        },
        SAVE_SUSCRIBE: function SAVE_SUSCRIBE(_ref9, data) {
            var store = _ref9.store,
                commit = _ref9.commit;

            commit('subscr');
            return api.user.saveSubscribe();
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data) {
                _.assign(state, data);
            }
        },
        subscr: function subscr(state) {
            state.subscr = state.subscr ? false : true;
        }
    }
};

var mutations = {
    load: function load(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = data;
        }
    },
    add: function add(state, data) {
        if (data && data instanceof Array && data.length > 0) {
            state.list = _.union(state.list, data);
        }
    },
    status: function status(state, _status) {
        state.status = _status;
    },
    notifi: function notifi(state, status) {
        state.notified = status == true;
    }
};
// // //

var initial = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref10) {
            var state = _ref10.state,
                commit = _ref10.commit,
                rootState = _ref10.rootState;

            commit('load', ls.get('initial-contacts'));
            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('initial-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref11, offset) {
            var state = _ref11.state,
                commit = _ref11.commit,
                rootState = _ref11.rootState;

            return api.contacts.initial.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref12, index) {
            var state = _ref12.state,
                commit = _ref12.commit,
                rootState = _ref12.rootState;

            var result = api.contacts.initial.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref13, index) {
            var state = _ref13.state,
                commit = _ref13.commit,
                rootState = _ref13.rootState;

            var result = api.contacts.initial.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK: function CHECK(_ref14) {
            var commit = _ref14.commit;

            axios.get('/mailer/check_contact').then(function () {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('initial-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('initial-contacts', state.list);
        }
    }, mutations)
});

var intimate = _.extend({
    namespaced: true,
    state: {
        status: 8,
        notified: false,
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref15) {
            var state = _ref15.state,
                commit = _ref15.commit,
                rootState = _ref15.rootState;

            commit('load', ls.get('intimate-contacts'));
            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('intimate-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref16, offset) {
            var state = _ref16.state,
                commit = _ref16.commit,
                rootState = _ref16.rootState;

            return api.contacts.intimate.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref17, index) {
            var state = _ref17.state,
                commit = _ref17.commit,
                rootState = _ref17.rootState;

            var result = api.contacts.intimate.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        },
        READ: function READ(_ref18, index) {
            var state = _ref18.state,
                commit = _ref18.commit,
                rootState = _ref18.rootState;

            var result = api.contacts.intimate.put(null, {
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('read', index);
            return result;
        },
        CHECK: function CHECK(_ref19) {
            var commit = _ref19.commit;

            axios.get('/mailer/check_message').then(function () {
                commit('status', 8);
                commit('notifi', false);
            });
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('intimate-contacts', state.list);
        },
        read: function read(state, index) {
            state.list[index].message.unread = 0;
            ls.set('intimate-contacts', state.list);
        }
    }, mutations)
});

var sends = _.extend({
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        LOAD: function LOAD(_ref20) {
            var state = _ref20.state,
                commit = _ref20.commit,
                rootState = _ref20.rootState;

            commit('load', ls.get('sends-contacts'));
            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: 0
            }).then(function (response) {
                commit('load', response.data);
                ls.set('sends-contacts', state.list);
            });
        },
        NEXT: function NEXT(_ref21, offset) {
            var state = _ref21.state,
                commit = _ref21.commit,
                rootState = _ref21.rootState;

            return api.contacts.sends.cget({
                uid: rootState.user.uid,
                offset: offset
            }).then(function (response) {
                commit('add', response.data);
            });
        },
        DELETE: function DELETE(_ref22, index) {
            var state = _ref22.state,
                commit = _ref22.commit,
                rootState = _ref22.rootState;

            var result = api.contacts.sends.delete({
                uid: rootState.user.uid,
                resource_id: state.list[index].id
            });
            commit('delete', index);
            return result;
        }
    },
    mutations: _.extend({
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('sends-contacts', state.list);
        }
    }, mutations)
});

var contacts = {
    modules: {
        initial: initial,
        intimate: intimate,
        sends: sends
    }
};

var credits = {
    state: {
        count: 0,
        info: ''
    },
    actions: {},
    mutations: {}
};

var desires = {
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        PICK: function PICK(_ref23) {
            var commit = _ref23.commit;

            commit('update', ls.get('desires'));
        },
        SYNC: function SYNC(_ref24) {
            var state = _ref24.state,
                commit = _ref24.commit;

            commit('update', ls.get('desires'));
            return api.user.desireList().then(function (response) {
                commit('update', response.data);
                ls.set('desires', state.list);
            });
        },
        ADD: function ADD(_ref25, tag) {
            var state = _ref25.state,
                commit = _ref25.commit;

            //commit('add', tag);
            return api.user.desireAdd(tag).then(function (response) {
                var id = response.data.id;
                commit('add', { id: id, tag: tag });
            });
        },
        DELETE: function DELETE(_ref26, index) {
            var state = _ref26.state,
                commit = _ref26.commit;

            var result = api.user.desireDelete(state.list[index].id);
            commit('delete', index);
            return result;
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data && data.length) {
                state.list = data.slice();
            }
        },
        add: function add(state, data) {
            state.list.unshift(data);
            ls.set('desires', state.list);
        },
        delete: function _delete(state, index) {
            state.list.splice(index, 1);
            ls.set('desires', state.list);
        }
    }
};

var modals = {
    state: {
        initial: false,
        intimate: false,
        sends: false
    },
    mutations: {
        showInitial: function showInitial(state, data) {
            store.commit('closeAll');
            state.initial = data == true;
        },
        showIntimate: function showIntimate(state, data) {
            store.commit('closeAll');
            state.intimate = data == true;
        },
        showSends: function showSends(state, data) {
            store.commit('closeAll');
            state.sends = data == true;
        },
        closeAll: function closeAll(state) {
            state.initial = false;
            state.intimate = false;
            state.sends = false;
        }
    }
};

var moderator = {
    state: {
        promt: 0,
        rank: 0,
        resident: 0,
        action: 0,
        effect: 0,
        bunn: 0,
        rang: ''
    },
    actions: {},
    mutations: {}
};

var search = {
    state: {
        list: [],
        url: '',
        human: {
            name: '',
            age: 0,
            city: ''
        },
        settings: {
            who: 0,
            city: '',
            up: null,
            to: null,
            town: false,
            virt: false,
            any: false
        }
    },
    actions: {
        HUMAN: function HUMAN(_ref27, tid) {
            var commit = _ref27.commit;

            var index = 'human.data.' + tid;
            commit('resetHuman', tid);
            commit('setHuman', ls.get(index));
            return api.search.get({ tid: tid }).then(function (response) {
                commit('setHuman', response.data);
                ls.set(index, response.data, 1500);
            });
        },
        SETTINGS: function SETTINGS(_ref28) {
            var commit = _ref28.commit;

            commit('settingsCookies');
            commit('settings', ls.get('search.settings'));
            //let index = 'search.settings';
        },
        SAVE_SEARCH: function SAVE_SEARCH(_ref29, data) {
            var state = _ref29.state,
                commit = _ref29.commit;

            commit('settings', data);
            ls.set('search.settings', data);
            return api.user.saveSearch(data).then(function (response) {});
        }
    },
    mutations: {
        // Сбросить предыдущие данные, если там что-то не то
        resetHuman: function resetHuman(state, tid) {
            if (state.human && state.human.id != tid) {
                state.human = {};
            }
        },
        setHuman: function setHuman(state, data) {
            if (data) {
                state.human = data;
            }
        },
        settings: function settings(state, data) {
            if (data) {
                //console.log('settings:', data);
                _.assign(state.settings, data);
            }
        },
        settingsCookies: function settingsCookies(state) {
            var data = get_cookie('mail_sett');
            if (data) {
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                state.settings.city = data.city;
                state.settings.who = Number(data.who);
                state.settings.up = Number(data.up);
                state.settings.to = Number(data.to);
                state.settings.town = Boolean(data.town);
                state.settings.virt = Boolean(data.virt);
                //console.log('dataCookies:', data);
            }
        }
    },
    getters: {
        searchURL: function searchURL(state, getters, rootState) {
            var settings = state.settings;
            var result = '/index.php?view=simple&town=' + rootState.user.city + '&years_up=' + settings.up + '&years_to=' + settings.to + '&who=' + settings.who + '';
            return result;
        },
        virgin: function virgin(state, getters, rootState) {
            var _state$settings = state.settings,
                who = _state$settings.who,
                up = _state$settings.up,
                to = _state$settings.to;

            return !who && !rootState.user.city && !up && !to;
        }
    }
};

var user = {
    state: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        contacts: {
            em: 0,
            vk: 0,
            ok: 0,
            fb: 0,
            go: 0,
            sk: 0,
            ph: 0
        },
        tags: {
            str: ''
        },
        status: 0,
        promt: null,
        last: ''
    },
    actions: {
        LOAD_USER: function LOAD_USER(_ref30) {
            var commit = _ref30.commit;

            // if (uid) {
            //     commit('loadUser', {uid});
            // }
            commit('loadUser', ls.get('user.data'));
        },
        SAVE_SEX: function SAVE_SEX(_ref31, sex) {
            var state = _ref31.state,
                commit = _ref31.commit;

            commit('loadUser', { sex: sex, name: '' });
            if (sex) {
                api.user.saveSex(sex).then(function (response) {});
                commit('loadUser', { sex: sex });
            }
        },
        SAVE_AGE: function SAVE_AGE(_ref32, age) {
            var state = _ref32.state,
                commit = _ref32.commit;

            if (age && state.age != age) {
                api.user.saveAge(age).then(function (response) {});
                commit('loadUser', { age: age });
            }
        },
        SAVE_NAME: function SAVE_NAME(_ref33, name) {
            var state = _ref33.state,
                commit = _ref33.commit;

            if (name && state.name != name) {
                api.user.saveName(name).then(function (response) {});
                commit('loadUser', { name: name });
            }
        },
        SAVE_CITY: function SAVE_CITY(_ref34, city) {
            var state = _ref34.state,
                commit = _ref34.commit;

            if (city && state.city != city) {
                api.user.saveCity(city).then(function (response) {});
                commit('loadUser', { city: city });
            }
        },
        SAVE_CONTACTS: function SAVE_CONTACTS(_ref35, contacts) {
            var state = _ref35.state,
                commit = _ref35.commit;

            api.user.saveContacts(contacts).then(function (response) {});
            commit('loadUser', { contacts: contacts });
        }
    },
    mutations: {
        loadUser: function loadUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', state, 23456);
        },
        resetUser: function resetUser(state, data) {
            _.assign(state, data);
            ls.set('user.data', data, 23456);
        }
    }
};

var visited = {
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        SYNC: function SYNC(_ref36) {
            var rootState = _ref36.rootState,
                state = _ref36.state,
                commit = _ref36.commit;

            var index = 'visited-' + rootState.user.uid;
            commit('update', ls.get(index));
            return api.user.visitedList().then(function (response) {
                var data = response.data;

                commit('update', data);
                ls.set(index, state.list, 31 * 24 * 60 * 60);
            });
        },
        ADD: function ADD(_ref37, tid) {
            var rootState = _ref37.rootState,
                state = _ref37.state,
                commit = _ref37.commit;

            var uid = rootState.user.uid;
            var index = 'visited-' + uid;
            commit('add', tid);
            ls.set(index, state.list, 31 * 24 * 60 * 60);
            return api.user.visitedAdd(uid, tid).then(function (response) {});
        }
    },
    mutations: {
        update: function update(state, data) {
            if (data && data.length) {
                state.list = _.union(state.list, data);
            }
        },
        add: function add(state, data) {
            state.list.unshift(data);
        }
    }
};

moment.locale('ru');

var ls = lscache;

var store = new Vuex.Store({
    modules: {
        user: user,
        auth: auth,
        about: about,
        search: search,
        contacts: contacts,
        desires: desires,
        visited: visited,
        accepts: accepts,
        modals: modals
    },
    state: {
        ready: false,
        apiToken: '',
        photoServer: '127.0.0.1:8008',
        simple: false
    },
    actions: {
        LOAD_API_TOKEN: function LOAD_API_TOKEN(_ref38) {
            var commit = _ref38.commit;

            commit('setApiToken', { apiToken: get_cookie('jwt') });
        }
    },
    mutations: {
        setApiToken: function setApiToken(state, data) {
            if (data) {
                _.assign(state, data);
            }
            //console.log(state)
        },
        simple: function simple(state, data) {
            state.simple = data == true;
        },
        ready: function ready(state, data) {
            state.ready = data == true;
        }
    },
    getters: {
        accept: function accept() {}
    }
});

store.dispatch('LOAD_API_TOKEN');
store.dispatch('accepts/LOAD');
store.dispatch('LOAD_USER');
store.dispatch('SETTINGS');

var Api = function () {
    function Api(host, key, version, routing) {
        _classCallCheck(this, Api);

        // Delay requests sec
        this.setDelay('2');
        // [!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
        this.setRoot(host, version);
        this.setConfig(this.root, key);
        this.setRouting(routing);
    }

    _createClass(Api, [{
        key: 'setDelay',
        value: function setDelay(sec) {
            this.wait = sec * 1000; //
        }
    }, {
        key: 'setRouting',
        value: function setRouting(routing) {
            this.routing = {
                route: '',
                load: '',
                get: '{resource_id}',
                cget: '',
                send: '',
                post: '',
                save: '',
                remove: '',
                delete: '{resource_id}',
                put: '{resource_id}',
                patch: '{resource_id}',
                option: '{resource_id}'
            };
            _.extend(this.routing, routing);
        }
    }, {
        key: 'setRoot',
        value: function setRoot(host, version) {
            var ver = version ? 'v' + version + '/' : '';
            this.root = host + ver;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(url, key) {
            this.config = {
                baseURL: url,
                headers: {
                    'Authorization': 'Bearer ' + key
                }
            };
        }
    }, {
        key: 'setBaseURL',
        value: function setBaseURL(url) {
            _.extend(this.config, {
                baseURL: url
            });
        }
    }, {
        key: 'setAuthKey',
        value: function setAuthKey(key) {
            _.extend(this.config.headers, {
                'Authorization': 'Bearer ' + key
            });
            this.key = key;
        }
    }, {
        key: 'setParams',
        value: function setParams(params, url) {
            var result = url.replace(/\{(.*?)\}/ig, function (match, token) {
                var slug = params[token];
                delete params[token];
                return slug;
            });
            //console.log('url: ', [this.root, result, params]);
            this.config.params = params ? params : {};
            return result;
        }
    }, {
        key: 'setUrl',
        value: function setUrl(method, params, url) {
            this.refresh();
            var route = this.routing.route;
            if (url) {
                result = url;
            } else {
                var action = this.routing[method];
                result = route ? route : '';
                if (result && action) {
                    result = result + '/' + action;
                } else if (action) {
                    result = action;
                }
            }
            result = this.setParams(params, result);
            return this.root + result;
        }
    }, {
        key: 'get',
        value: function get(params, url) {
            return this.delay(axios.get(this.setUrl('get', params, url), this.config), 0);
        }
    }, {
        key: 'load',
        value: function load(params, url) {
            return this.delay(axios.get(this.setUrl('load', params, url), this.config), 0);
        }
    }, {
        key: 'cget',
        value: function cget(params, url) {
            return this.delay(axios.get(this.setUrl('cget', params, url), this.config), 0);
        }
    }, {
        key: 'send',
        value: function send(params, url) {
            return this.delay(axios.get(this.setUrl('send', params, url), this.config), 0);
        }
    }, {
        key: 'post',
        value: function post(data, params, url) {
            return this.delay(axios.post(this.setUrl('post', params, url), data, this.config), 0);
        }
    }, {
        key: 'save',
        value: function save(data, params, url) {
            return this.delay(axios.post(this.setUrl('save', params, url), data, this.config), 0);
        }
    }, {
        key: 'remove',
        value: function remove(data, params, url) {
            return this.delay(axios.post(this.setUrl('remove', params, url), data, this.config), 0);
        }
    }, {
        key: 'delete',
        value: function _delete(params, url) {
            return this.delay(axios.delete(this.setUrl('delete', params, url), this.config), 0);
        }
    }, {
        key: 'put',
        value: function put(data, params, url) {
            return this.delay(axios.put(this.setUrl('put', params, url), data, this.config), 0);
        }
    }, {
        key: 'patch',
        value: function patch(data, params, url) {
            return this.delay(axios.patch(this.setUrl('patch', params, url), data, this.config), 0);
        }
    }, {
        key: 'request',
        value: function request(method, action, data, params, url) {
            // this.config.method = method;
            // this.config.url = this.setUrl(action, url);
            // this.config.data = data;
            // this.config.params = params;
            // return this.delay(axios.request(this.config), 0);
            if (data) {
                return this.delay(axios[method](this.setUrl(action, params, url), data, this.config), 0);
            } else {
                return this.delay(axios[method](this.setUrl(action, params, url), this.config), 0);
            }
        }
    }, {
        key: 'option',
        value: function option() {}
    }, {
        key: 'delay',
        value: function delay(result, wait) {
            var msec = wait ? wait : this.wait;
            if (msec < this.wait) {
                msec = this.wait;
            }
            if (msec == 0 || typeof Promise == "undefined") {
                return result;
            }
            return new Promise(function (resolve, reject) {
                _.delay(resolve, msec, result);
            });
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            store.dispatch('LOAD_API_TOKEN');
        }
    }]);

    return Api;
}();

var ApiBun = function (_Api) {
    _inherits(ApiBun, _Api);

    function ApiBun() {
        _classCallCheck(this, ApiBun);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiBun.__proto__ || Object.getPrototypeOf(ApiBun)).call(this, host, key));
    }

    _createClass(ApiBun, [{
        key: 'send',
        value: function send(data) {

            return axios.post('mess/bun/', data, this.config);
            console.log('ApiBun Bun-Bun');
        }
    }]);

    return ApiBun;
}(Api);

var ApiMessages = function (_Api2) {
    _inherits(ApiMessages, _Api2);

    function ApiMessages() {
        _classCallCheck(this, ApiMessages);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiMessages.__proto__ || Object.getPrototypeOf(ApiMessages)).call(this, host, key));
    }

    _createClass(ApiMessages, [{
        key: 'send',
        value: function send(data) {
            return this.post(data, null, 'mailer/post/');
        }
    }]);

    return ApiMessages;
}(Api);

var ApiUser = function (_Api3) {
    _inherits(ApiUser, _Api3);

    function ApiUser() {
        _classCallCheck(this, ApiUser);

        var key = '1234';
        var host = '/';
        return _possibleConstructorReturn(this, (ApiUser.__proto__ || Object.getPrototypeOf(ApiUser)).call(this, host, key, null, null));
    }

    _createClass(ApiUser, [{
        key: 'saveSex',
        value: function saveSex(sex) {
            return this.save({ sex: sex }, null, 'option/sex');
        }
    }, {
        key: 'saveAge',
        value: function saveAge(age) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { age: age }, null, 'option/age');
        }
    }, {
        key: 'saveName',
        value: function saveName(name) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { name: name }, null, 'option/name');
        }
    }, {
        key: 'saveCity',
        value: function saveCity(city) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { city: city }, null, 'option/city');
        }
    }, {
        key: 'saveContacts',
        value: function saveContacts(data) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { contact: data }, null, 'option/contact');
        }
    }, {
        key: 'saveSearch',
        value: function saveSearch(data) {
            data = {
                search_sex: data.who,
                years_up: data.up,
                years_to: data.to,
                option_mess_town: data.town,
                option_virt_accept: data.virt
            };
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, data, null, 'msett/save');
        }
    }, {
        key: 'syncAbout',
        value: function syncAbout() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'sync/anketa');
        }
    }, {
        key: 'saveAbout',
        value: function saveAbout(data) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, data, null, 'option/anketa');
        }
    }, {
        key: 'syncAuth',
        value: function syncAuth() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'sync/authdata');
        }
    }, {
        key: 'saveLogin',
        value: function saveLogin(login) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { login: login }, null, 'option/login');
        }
    }, {
        key: 'savePasswd',
        value: function savePasswd(pass) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { pass: pass }, null, 'option/passwd');
        }
    }, {
        key: 'saveEmail',
        value: function saveEmail(email) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { email: email }, null, 'option/email');
        }
    }, {
        key: 'removeEmail',
        value: function removeEmail() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'remove', this).call(this, null, null, 'option/demail');
        }
    }, {
        key: 'saveSubscribe',
        value: function saveSubscribe() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, null, null, 'option/subscr');
        }
    }, {
        key: 'desireList',
        value: function desireList() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'tag/user');
        }
    }, {
        key: 'desireAdd',
        value: function desireAdd(tag) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'save', this).call(this, { tag: tag }, null, 'tag/add');
        }
    }, {
        key: 'desireDelete',
        value: function desireDelete(id) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'remove', this).call(this, { id: id }, null, 'tag/del');
        }
    }, {
        key: 'visitedList',
        value: function visitedList() {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'load', this).call(this, null, 'contact/visited');
        }
    }, {
        key: 'visitedAdd',
        value: function visitedAdd(uid, tid) {
            return _get(ApiUser.prototype.__proto__ || Object.getPrototypeOf(ApiUser.prototype), 'send', this).call(this, { tid: tid, uid: uid }, 'contact/addvisit/{uid}');
        }
    }]);

    return ApiUser;
}(Api);

var ApiSearch = function (_Api4) {
    _inherits(ApiSearch, _Api4);

    function ApiSearch() {
        _classCallCheck(this, ApiSearch);

        var key = '1234';
        var host = 'http://127.0.0.1:9000/';
        var routing = {
            route: 'users',
            get: '{tid}'
        };
        return _possibleConstructorReturn(this, (ApiSearch.__proto__ || Object.getPrototypeOf(ApiSearch)).call(this, host, key, null, routing));
    }

    return ApiSearch;
}(Api);

var ApiContact = function (_Api5) {
    _inherits(ApiContact, _Api5);

    function ApiContact(routing) {
        _classCallCheck(this, ApiContact);

        var key = store.state.apiToken;
        var host = 'http://127.0.0.1:8000/';
        return _possibleConstructorReturn(this, (ApiContact.__proto__ || Object.getPrototypeOf(ApiContact)).call(this, host, key, null, routing));
    }

    _createClass(ApiContact, [{
        key: 'refresh',
        value: function refresh() {
            store.dispatch('LOAD_API_TOKEN');
            this.setAuthKey(store.state.apiToken);
        }
    }]);

    return ApiContact;
}(Api);

var ApiInitial = function (_ApiContact) {
    _inherits(ApiInitial, _ApiContact);

    function ApiInitial() {
        _classCallCheck(this, ApiInitial);

        var routing = {
            route: 'users/{uid}/initials'
        };
        return _possibleConstructorReturn(this, (ApiInitial.__proto__ || Object.getPrototypeOf(ApiInitial)).call(this, routing));
    }

    return ApiInitial;
}(ApiContact);

var ApiIntimate = function (_ApiContact2) {
    _inherits(ApiIntimate, _ApiContact2);

    function ApiIntimate() {
        _classCallCheck(this, ApiIntimate);

        var routing = {
            route: 'users/{uid}/intimates'
        };
        return _possibleConstructorReturn(this, (ApiIntimate.__proto__ || Object.getPrototypeOf(ApiIntimate)).call(this, routing));
    }

    return ApiIntimate;
}(ApiContact);

var ApiSends = function (_ApiContact3) {
    _inherits(ApiSends, _ApiContact3);

    function ApiSends() {
        _classCallCheck(this, ApiSends);

        var routing = {
            route: 'users/{uid}/sends'
        };
        return _possibleConstructorReturn(this, (ApiSends.__proto__ || Object.getPrototypeOf(ApiSends)).call(this, routing));
    }

    return ApiSends;
}(ApiContact);

var api = {
    user: new ApiUser(),
    search: new ApiSearch(),
    bun: new ApiBun(),
    contacts: {
        initial: new ApiInitial(),
        intimate: new ApiIntimate(),
        sends: new ApiSends()
    },
    messages: new ApiMessages()
};

//ApiMessages.send();


// window.onbeforeunload = function(e) {
//   var dialogText = 'Вы действительно хотите покинуть приложение?';
//   e.returnValue = dialogText;
//   return dialogText;
// };

////
// РОУТЕР ==========================================================
////

// const routes = [
//     { path: '/sends-contacts', name: 'sends', component: SendsDialog, props: { quick: false } },
//     { path: '/initial-contacts', name: 'initial', component: InitialDialog, props: { quick: true } },
//     { path: '/intimate-contacts',  name: 'intimate', component: IntimateDialog, props: { quick: false },
//         // children: [
//         //     {
//         //         path: 'quick-reply',
//         //         component: HumanDialog,
//         //         props: {
//         //             show : true
//         //         }
//         //     },
//         // ]
//     }
// ];

var routes = [{ path: '/write/:humanId(\\d+)/(.*)?', name: 'quickWrite', component: QuickMessage, props: true,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/message');
    }
},
// { path: '/', name: 'search', component: SearchActivity,
//     beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/search'),
//     children: [
//         { path: ':humanId(\\d+)/(.*)?', name: 'quickMessage', meta: {back: '/search'}, component: QuickMessage, props: true },
//     ]
// },
{ path: '/initial/(.*)?', name: 'initial', component: InitialDialog, props: true,
    //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
    children: [{ path: ':humanId(\\d+)/(.*)?', name: 'quickReply', meta: { back: '/initial' }, component: QuickReply, props: true }]
}, { path: '/intimate/(.*)?', name: 'intimate', component: IntimateDialog, props: true,
    //beforeEnter: (to, from, next) => store.state.user.sex ? next() : next('/confirm-sex/messages'),
    children: [{ path: ':humanId(\\d+)/(.*)?', name: 'dialog', meta: { back: '/intimate' }, component: MessagesActivity, props: true,
        children: [{ path: 'uploads', name: 'uploads', meta: { back: '.' }, component: PhotoSettings, props: true }, { path: 'incoming', name: 'incoming', meta: { back: '.' }, component: IncomingPhoto, props: true }]
    }]
}, { path: '/confirm-sex/:show?', component: SexConfirm, props: true }, { path: '(.*)?/settings/search', meta: { back: '/' }, component: SearchSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/search');
    }
}, { path: '(.*)?/settings/account', component: AccountSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/account');
    }
}, { path: '(.*)?/settings/other', component: OtherSettings }, { path: '(.*)?/settings/about', meta: { back: 'other' }, component: AboutSettings }, { path: '(.*)?/settings/social', meta: { back: 'other' }, component: SocialSettings }, { path: '(.*)?/settings/desires', meta: { back: 'other' }, component: DesiresSettings,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/search');
    }
}, { path: '(.*)?/settings/security', meta: { back: 'other' }, component: SecuritySettings }, { path: '(.*)?/wizard/city', meta: { back: '/settings/account' }, component: CityWizard,
    beforeEnter: function beforeEnter(to, from, next) {
        return store.state.user.sex ? next() : next('/confirm-sex/city');
    }
}];

var router = new VueRouter({
    //mode: 'history',
    routes: routes
});

// router.beforeEach((to, from, next) => {
//     console.log('router:', [to, from]);
//     next();
// });

// =================================================================
//
// =================================================================

var settingsRouter = new VueRouter({
    //mode: 'history',
    routes: [{ path: '/search/settings/account', meta: { back: 'search' }, component: AccountSettings }, { path: '(.*)?/:humanId(\\d+)/detail', component: AccountActivity, props: true },
    // { path: '(.*)?/uploads', component: PhotoSettings },
    // { path: '(.*)?/preview', name: 'preview', component: PhotoViewer, props: true },

    { path: '/login', name: 'login', component: LoginAccount }]
});

settingsRouter.beforeEach(function (to, from, next) {
    // console.log('sRouter:', [to, from]);
    if (!to.meta.back) {
        to.meta.back = from.fullPath;
    }
    next();
});

var app = new Vue({
    data: {
        alert: '',
        snackbar: {
            text: '',
            callback: null,
            action: ''
        }
    },
    mounted: function mounted() {},

    computed: {
        humanId: function humanId() {
            return Number(this.$route.path.substr(1));
        },
        simple: function simple() {
            return this.$store.state.simple;
        },
        ready: function ready() {
            return this.$store.state.ready;
        },
        promt: function promt() {
            var promt = this.$store.state.user.promt;

            return !promt || promt == 'no';
        }
    },
    methods: {
        showSnackbar: function showSnackbar(text, callback, action, play) {
            console.log('snackbar', text);
            this.snackbar.text = text;
            this.snackbar.callback = callback;
            this.snackbar.action = action;
            this.snackbar.play = play == true;
        },
        toast: function toast(text) {
            this.alert = text;
        },
        reload: function reload() {
            this.$refs.results.reload();
        }
    },
    el: '#app',
    store: store,
    router: router
});

new Vue({
    data: {
        warning: '',
        alert: ''
    },
    methods: {
        snackbar: function snackbar(text) {
            this.warning = text;
        },
        toast: function toast(text) {

            this.alert = text;
        }
    },
    el: '#settings',
    store: store,
    router: settingsRouter
});

$(document).ready(function () {
    //userinfo.init();
    slider.init();
    //giper_chat.init();
    notepad.init();

    mailsett.init();
    report.init();
    navigate.init();

    name_suggest.init();
    city_suggest.init();

    option_static.init();
    option_sex.init();
    //option_email.init();
    profile_alert.init();
    profile_option.init();

    //user_tag.init();
    //desire_clip.init();

    //result_list.init();
    //visited.init();
});

// -- Получить новый хэш ---
var hash;
function simple_hash() {
    var now = new Date();
    hash = now.getTime();
}

// -- Автогенератор информации ---        
var auto_gen = {

    name: function name(sex) {
        var name = [];
        name[0] = ['Онилиона', 'Безимени', 'Неуказано', 'Хуисзиз', 'Незнаю', 'Неизвестно', 'Несонено'];
        name[1] = ['Саша', 'Дима', 'Сергей', 'Иван', 'Максим', 'Валера', 'Николай'];
        name[2] = ['Оля', 'Юля', 'Настя', 'Алена', 'Катя', 'Маргарита', 'Татьяна'];

        var x = Math.floor(Math.random() * 7);

        return name[sex][x];
    },

    age: function age(year) {
        var age = [];
        age[0] = [18, 21, 24, 25, 27, 28, 31];
        age[1] = [year + 3, year + 2, year + 1, year, year - 1, year - 2, year - 3];

        var y = year ? 1 : 0;
        var x = Math.floor(Math.random() * 7);

        return age[y][x];
    }

};

var desire_clip = {

    sync_taglist: 0,

    init: function init() {
        desire_clip.action.set();
        desire_clip.ajax.sync();
    },
    ajax: {
        sync: function sync() {
            $.get('/sync/taglist/', desire_clip.ajax.parse);
        },
        parse: function parse(data) {
            data = json.parse(data);
            if (data) {
                if (data.id && user_tag.sync != data.id) {
                    user_tag.sync = data.id;
                    user_tag.action.store();
                    desire_clip.ajax.load();
                }
            }
        },
        load: function load() {
            $.get('/tag/user/', desire_clip.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(data)
            data = json.parse(data);
            if (data.tags != undefined) {
                user_tag.list = data.tags;
                user_tag.option.set_count();
                user_tag.action.store();
            }
            if (data.tags.length > 0) {
                desire_clip.action.set();
            }
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag });
        }
    },
    action: {
        set: function set() {
            user_tag.action.ids();
            $('.desire_clip').each(function (i, elem) {
                $(elem).off('click');
                $(elem).removeClass('desire_user');
                if (user_tag.idls.indexOf($(elem).data('id')) >= 0) {
                    $(elem).addClass('desire_user');
                } else $(elem).on('click', desire_clip.action.add);
            });
            user_tag.option.set_count();
        },
        add: function add() {
            desire_clip.ajax.add($(this).data('tag'));
            desire_clip.option.toggle(this);
            //$(this).on('click',desire_clip.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.push(data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            desire_clip.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            $(this).on('click', desire_clip.action.add);
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('desire_user');
        }
    }
};

var active_textarea; ////////////////////////////////////////////////////////
var giper_chat = {

    open_mess: 0,
    idle_round: 0,

    count_unread: 0,
    cascade: 0,

    round_time: 0,
    round_open: 1,

    timer_id: null,
    mess_block: null,

    mess_stock: [],

    prev_title: null,

    init: function init() {
        if (device.width() > 1200) {
            giper_chat.mess_stock = storage.array.load('mess_stock');
            giper_chat.remind();
        }
        $('<div id="block_timer" class="timer">').appendTo('body');
        giper_chat.timer_set();
        giper_chat.new_round();

        $('#giper_reply .post').on('click', giper_chat.reply_show);
        // Установка текста по умолчанию
        if (storage.load('reply_all')) $('#giper_reply textarea').val(storage.load('reply_all'));
        giper_chat.prev_title = document.title;
    },

    set_unread: function set_unread() {
        if (giper_chat.count_unread > 0) {
            $('#menu_message_unread b').text(giper_chat.count_unread);
            $('#menu_message_unread').show();
            $('#menu_message').attr('title', 'Новых сообщений ' + giper_chat.count_unread);
        } else {
            $('#menu_message_unread').text('');
            $('#menu_message_unread').hide();
            $('#menu_message').attr('title', 'Новых сообщений нет');
        }
    },

    on_timer: function on_timer() {
        giper_chat.title_blink();

        if (giper_chat.round_open && giper_chat.cascade == 0) giper_chat.round_time--;

        //if (giper_chat.cascade != 0)console.log('on_timer cascade: ' +giper_chat.cascade)

        giper_chat.trace();

        if (giper_chat.round_time < 1) giper_chat.new_round();
    },

    new_round: function new_round() {
        giper_chat.timer_stop();
        giper_chat.ajax_new();
    },

    trace: function trace() {
        $('#block_timer').text(giper_chat.round_time);
    },

    ajax_new: function ajax_new() {
        simple_hash();
        giper_chat.round_open = 0;

        $.get('/ajax/new_mess.php', { hash: hash }, giper_chat.on_load).always(function () {
            giper_chat.round_open = 1;
        });
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = json.parse(data);
            giper_chat.route_xz(mess);
            giper_chat.count_unread = mess.count_unread; ////////////////////////////////////
            giper_chat.set_unread(); ////////////////////////////////////
        }
        setTimeout(function () {
            giper_chat.timer_set();
        }, 5000);
    },

    route_xz: function route_xz(mess) {
        if (device.width() > 1200 && mess.type && giper_chat.open_mess < 9) {
            /* */
            if (mess.type == 'air_user' || mess.type == 'new_client') {
                //                visited.action.load_cache();
                //                if (visited.list.length) {
                //                    if (visited.list.indexOf(mess.user+'') >= 0) {
                //                        giper_chat.reply_enable();
                //                        giper_chat.idle_round = 0;
                //                        setTimeout( function (){ giper_chat.timer_set(); },5000 );
                //                        return 0;
                //                    }
                //                }
            }
            giper_chat.mess_stock.push(mess);
            giper_chat.stock.store();
            giper_chat.new_message(mess);
        }
    },

    reply_enable: function reply_enable() {
        if (giper_chat.cascade == 0) {
            if (giper_chat.open_mess > 2) $('#giper_reply').show('blind');
            if (giper_chat.open_mess > 5) $('#giper_reply textarea').show('blind');
        }

        if (giper_chat.open_mess < 3) $('#giper_reply').hide('blind');
        if (giper_chat.open_mess == 0) giper_chat.cascade = 0;

        // console.log('re cascade: ' +giper_chat.cascade)
    },

    reply_show: function reply_show() {
        var textarea = $('#giper_reply textarea');
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea;
            textarea.show('blind');
            textarea.focus();
            notepad.show(); ////////////////////////////////////
        } else giper_chat.reply_all();
    },

    reply_all: function reply_all() {
        var textarea = $('#giper_reply textarea');
        var text = textarea.val();

        if (text) {
            var block_mess = $('#giper_stock').children().filter(':first');
            giper_chat.cascade = text;
            storage.save('reply_all', text);
            $('textarea', block_mess).val(text);
            $('.post', block_mess).click();
            textarea.hide('blind');
        }
        giper_chat.reply_enable();
    },

    new_message: function new_message(val) {
        //  elem.appendChild();
        giper_chat.open_mess++;
        giper_chat.reply_enable();

        var new_block = giper_chat.create_message(val);

        new_block.prependTo($('#giper_stock'));

        new_block.show('blind');

        setTimeout(function () {
            $('.sound', new_block).show();
        }, 500);

        giper_chat.idle_round = 0;
        // giper_chat.mess_stock.push(val);
        // giper_chat.stock.store();
    },

    remind: function remind() {
        jQuery.each(giper_chat.mess_stock, function (i, val) {
            giper_chat.new_message(val);
        });
    },

    stock: {

        store: function store() {
            storage.array.save('mess_stock', giper_chat.mess_stock);
        },

        remove: function remove(num) {
            var del = null;
            jQuery.each(giper_chat.mess_stock, function (i, val) {
                if (val.mess_id == num) del = i;
            });

            if (del || del == 0) {
                //alert($('.new_message').length + '  <> ' + giper_chat.mess_stock.length)
                giper_chat.mess_stock.splice(del, 1);
                if (giper_chat.mess_stock.length - $('.new_message').length > 1) giper_chat.mess_stock = [];
                giper_chat.stock.store();
            }
        }

    },

    create_message: function create_message(val) {
        if (!val.reply) val.reply = '';

        //return 0;

        var new_block = $('#new_message_ex').clone().attr('id', val.type + '_' + val.mess_id) //.css("display","none")
        .data('number', val.mess_id).data('user', val.user).addClass(val.type);

        $('.mess_text', new_block).html(val.text); // click( function (){ location.href =  });
        $('.close', new_block).click(function () {
            giper_chat.close_message($(new_block));
        });

        if (val.type == 'new_message' || val.type == 'old_message') {
            if (val.type == 'old_message') {
                $('.title', new_block).text('Есть сообщение без ответа');
                $('.sound', new_block).remove();
            }

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('textarea', new_block).val(val.reply);
            $('.user_name', new_block).text(val.name + ':');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            $('.bunn', new_block).click(function () {
                giper_chat.ajax_bun(val.user, val.mess_id, val.type);
                giper_chat.open_mess--;
            });

            if (val.type == 'new_message') $('#contact_update').show('fade');
        }

        if (val.type == 'server_mess') {
            $('.sound', new_block).remove();
            $('.title', new_block).text(val.reply);
            $('.bunn', new_block).remove();
            $('.post', new_block).val('Хорошо');

            $('.post', new_block).click(function () {
                send_serv_mess($('#' + val.type + '_' + val.mess_id), 'tip_user_bun_close');
            });

            $('.history', new_block).text('Подробнее...');
            $('.history', new_block).attr('href', '/блог/наказывайте-кого-следует/');
            $('.history', new_block).attr('target', '_blank');
        }

        if (val.type == 'air_user' || val.type == 'new_client') {
            if (val.type == 'air_user') $('.title', new_block).text('Сейчас на сайте');
            if (val.type == 'new_client') $('.title', new_block).text('Зарегистрировалась сегодня');

            $('.mess_text', new_block).html(val.age + ' ' + val.city + ' ' + val.text);

            $('.sound', new_block).remove();
            // var timer_air = setTimeout( function (){ close_message( $(new_block) ); open_mess--; },30000 );
            //$('.title',new_block).text( val.reply );
            $('.bunn', new_block).remove();
            $('.user_name', new_block).text(val.name + ',');
            $('.user_name', new_block).text(val.name + ',');
            $('.post', new_block).val('Написать');

            $('.post', new_block).click(function () {
                giper_chat.post_mess(val);
            });

            $('.history', new_block).text('Смотреть анкету');
            $('.history', new_block).click(function () {
                giper_chat.follow_message(val.user, val.mess_id);
            });

            if (val.type == 'new_client') {}
        }

        $(new_block).draggable({
            handle: '.title',
            stop: function stop(event, ui) {
                $('.sound', new_block).remove();

                //alert ($(this).offset().left)

                var topOff = $(this).offset().top - $(window).scrollTop();
                var leftOff = $(this).offset().left;
                $(this).css("top", topOff).css("left", leftOff).css("position", "fixed");

                $(this).appendTo('body');
            }
        }); /**/

        return new_block;
    },

    close_message: function close_message(elem) {
        $('.sound', elem).remove();
        elem.hide('blind');
        giper_chat.open_mess--;
        giper_chat.stock.remove(elem.data('number'));
        setTimeout(function () {
            elem.remove();
        }, 500);
    },

    close_all: function close_all(user) {/*
                                         $('#giper_stock div').
                                         $('.sound',elem).remove();
                                         elem.hide('blind');
                                         giper_chat.open_mess--;
                                         giper_chat.stock.remove(elem.data('number'));
                                         setTimeout( function (){ elem.remove(); },500 ); */
    },

    follow_message: function follow_message(user, mess_id) {
        giper_chat.stock.remove(mess_id);
        location.href = '/' + user;
    },

    ajax_bun: function ajax_bun(user, mess_id, type) {
        giper_chat.close_message($('#' + type + '_' + mess_id));
        $.post("/mess/bun/", { id: mess_id, tid: user });
    },

    timer_set: function timer_set() {
        giper_chat.timer_stop();
        if (giper_chat.idle_round == 0) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 1) {
            giper_chat.round_time = 10;
        } else if (giper_chat.idle_round == 2) {
            giper_chat.round_time = 5;
        } else if (giper_chat.idle_round == 3) {
            giper_chat.round_time = 25;
        } else if (giper_chat.idle_round == 4) {
            giper_chat.round_time = 35;
        } else if (giper_chat.idle_round > 11) {
            giper_chat.round_time = 300;
        } else if (giper_chat.idle_round > 4) {
            giper_chat.round_time = 60;
        }

        giper_chat.idle_round++;
        giper_chat.timer_id = window.setInterval('giper_chat.on_timer()', 1000);
        //console.log('таймер запущен: ' +giper_chat.round_time)
    },

    timer_stop: function timer_stop() {
        window.clearInterval(giper_chat.timer_id);
        //console.log('таймер остановлен: ' +giper_chat.cascade)
    },

    timer_cut: function timer_cut() {
        if (giper_chat.idle_round > 0 && giper_chat.round_time > 10) giper_chat.round_time = 10;
        giper_chat.idle_round = 0;
    },

    toggle_text: function toggle_text() {
        var textarea = $('textarea', giper_chat.mess_block);
        var text_value = $(textarea).val();
        if (!$(textarea).is(":visible")) {
            active_textarea = textarea; ///////////////////////////////////////
            $(textarea).show('blind');
            $(textarea).focus();
            notepad.show(); ///////////////////////////////////////
            return 0;
        }

        return text_value;
    },

    post_mess: function post_mess(val) {
        giper_chat.mess_block = $('#' + val.type + '_' + val.mess_id); // alert( user )

        var text, repl;

        if (giper_chat.cascade != 0) {
            text = giper_chat.cascade;
            repl = '';
        } else {
            text = giper_chat.toggle_text();
            repl = text;
        }

        if (text) {
            simple_hash();

            $.post("/mailer/post/", {
                mess: text,
                id: val.user,
                re: repl,
                captcha_code: $('.code', giper_chat.mess_block).val(),
                hash: hash
            }, giper_chat.on_post);

            disabled_with_timeout($('.post', giper_chat.mess_block), 5);
            giper_chat.timer_cut();
        }
    },

    on_post: function on_post(data) {
        // alert (data)
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'captcha') {
            $('textarea', giper_chat.mess_block).show('blind');
            $('.captcha_block', giper_chat.mess_block).show('blind');
            $('.captcha', giper_chat.mess_block).get(0).src = '/secret_pic.php?hash=' + hash;
        }

        if (mess.saved == '1') {
            giper_chat.idle_round = 0;

            $('#contact_update').show('fade');
            giper_chat.close_message(giper_chat.mess_block);

            notepad.hide(); //////////////////////////////////////////////
            //visited.action.save(giper_chat.mess_block.data('user'));

            setTimeout(function () {
                if (giper_chat.cascade != 0) giper_chat.reply_all();
            }, 700);
        }

        if (mess.error == 'reload') {
            giper_chat.idle_round = 0;
            location.href = '/' + user + '?text=' + text; //alert ('reload')
        }

        disabled_with_timeout($('.post', giper_chat.mess_block), 0.05);
    },

    title_blink: function title_blink() {
        if (giper_chat.count_unread == 0) {
            document.title = giper_chat.prev_title;
            return false;
        }

        if (document.title != 'Вам сообщение!') {
            document.title = 'Вам сообщение!';
        } else document.title = ' * * * * * * * * * * * * ';
    },

    post_serv: function post_serv(elem, value) {
        giper_chat.close_message($(elem)); /*
                                           var param = {}; param[value] = 1;
                                           $.get( "/ajax/messages_load.php", param ); */
        set_cookie('user_bun', '1', 259200);
    }

};

$(document).ready(function () {
    /*            
      giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925673",name: "Максим",reply: "",sity: "Ивантеевка",text: "Привет. Давай познакомимся.",time: "1415561723",type: "air_user",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925674",name: "Николай",reply: "",sity: "Ивантеевка",text: "и дай я тебя отжарю. не пожалеешь. отсосешь мне",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925675",name: "Виктор",reply: "",sity: "Ивантеевка",text: "юлия а где найти анонимные объявления",time: "1415561723",type: "new_message",user: "699208"});
    giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925676",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925677",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
     giper_chat.new_message ({age: "45",count_unread: "1",mess_id: "36925678",name: "Саша",reply: "",sity: "Ивантеевка",text: "До тех пор, пока не нажата кнопка «Выход» на свою анкету можно зайти именно с этого компьютера или телефона в любое время. Если вы впервые зашли на сайт из телефона и хотите",time: "1415561723",type: "new_message",user: "699208"});
            */
});

// Установки  почты        
var mailsett = {

    init: function init() {
        $('#link_virt_turn').on('click', mailsett.turn_virt);
        $('#link_close_turn').on('click', mailsett.turn_close);
    },

    turn_virt: function turn_virt() {
        var text = $('#text_virt_turn').text();

        if (text == 'неприемлемо') {
            $('#text_virt_turn').text('возможен');
            mailsett.send_virt(1);
        } else {
            $('#text_virt_turn').text('неприемлемо');
            mailsett.send_virt(0);
        }
    },

    turn_close: function turn_close() {
        var text = $('#text_close_turn').text();

        if (text == 'ограничить') {
            $('#text_close_turn').text('разрешить');
            mailsett.send_close(0);
        } else {
            $('#text_close_turn').text('ограничить');
            mailsett.send_close(1);
        }
    },

    send_close: function send_close(data) {
        $.post('/msett/close/', { option_mess_town: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    },

    send_virt: function send_virt(data) {
        $.post('/msett/virt/', { option_virt_accept: data }, onAjaxSuccess);
        function onAjaxSuccess(data) {}
    }

};

var master_info = {

    init: function init() {
        if (!userinfo.data.sex) {
            master_info.ajax.load_sex();
        } else if (!userinfo.data.city && $('#human_print_city').text()) {
            master_info.ajax.load_city();
        } else if (!userinfo.data.age) {
            master_info.ajax.load_age();
        } else if (userinfo.data.second > 300 && userinfo.data.contact.mc < 20) {
            master_info.ajax.load_contact();
        }
    },
    ajax: {
        load_contact: function load_contact() {
            $('#anketa_master_info').load('/static/htm/master_contact.html', master_info.ajax.on_contact);
        },
        on_contact: function on_contact() {
            master_contact.action.sett(0);
            master_contact.option.print();
        },
        load_city: function load_city() {
            $('#anketa_master_info').load('/static/htm/master_city.html', master_info.ajax.on_city);
        },
        on_city: function on_city() {
            master_city.init();
            option_static.init();
        },
        load_age: function load_age() {
            $('#anketa_master_info').load('/static/htm/master_age.html', master_info.ajax.on_age);
        },
        on_age: function on_age() {
            master_age.init();
            option_static.init();
        },
        load_sex: function load_sex() {
            $('#anketa_master_info').load('/static/htm/master_sex.html', master_info.ajax.on_sex);
        },
        on_sex: function on_sex() {
            master_sex.init();
            option_static.init();
        }
    }

};

// Навигация с помошью клавиатуры
var navigate = {

    enable: 0,

    init: function init() {
        $(document).on('keydown', function () {
            navigate.through(event);
        });
    },

    // Отправка сообщения по CTRL + Enter
    post_form: function post_form(event, formElem) {
        if (event.ctrlKey && (event.keyCode == 10 || event.keyCode == 13)) {
            formElem.submit();
        }
    },

    // Навигация с помошью стрелок + CTRL
    through: function through(event) {
        if (window.event) event = window.event;

        if (event.ctrlKey) {
            var link = null;
            var href = null;
            switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
                case 0x25:
                    link = '#previous_page';
                    break;
                case 0x27:
                    link = '#next_page';
                    break;
                case 0x26:
                    link = '#up_page';
                    break;
                case 0x28:
                    link = '#down_page';
                    break;
                case 0x24:
                    link = '#home_page';
                    break;
            }
            if ($('a').is(link)) // alert($(link).attr('href')); return false;
                document.location = $(link).attr('href');
        }
    }

};

// -- Блокнот ---
var notepad = {

    note_block: null,
    last_click: null,
    disibled: 0,
    create: 0,

    init: function init() {
        if (device.width() < 1000) {
            notepad.disibled = 1;
        }

        notepad.disibled = get_cookie('note_vis') * 1 ? 1 : 0; //////////////////////////

        active_textarea = $('#mess_text_val');
        notepad.note_block = $('.notepad');

        $('textarea').click(function () {
            active_textarea = this;
            notepad.show();
        });

        $('#notepad_on').click(function () {
            notepad.toggle_disable('on');notepad.show('force');
        });

        $('.close', notepad.note_block).click(function () {
            notepad.hide();
        });
        $('.post', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
        $('.bunn', notepad.note_block).click(function () {
            notepad.toggle_disable('off');notepad.hide();
        });
    },

    hide: function hide() {
        notepad.note_block.hide('fade');
    },

    show: function show(force) {
        if (!notepad.disibled) if (force || active_textarea && notepad.last_click != active_textarea) {
            if (notepad.create) {
                notepad.note_block.show('fade');
                notepad.last_click = active_textarea; /////////////////////////////
            } else notepad.ajax_load();
        }
    },

    toggle_disable: function toggle_disable(vset) {
        if (vset == 'off') notepad.disibled = 1;
        if (vset == 'on') notepad.disibled = 0;

        if (vset) {
            set_cookie('note_vis', notepad.disibled, 259200); /////////////////////////
        }
    },

    ajax_load: function ajax_load() {
        simple_hash();
        $.get('/ajax/load_notepad.php', { hash: hash }, notepad.on_load);
    },

    remind: function remind() {
        var top = storage.load('notepad_top');
        var left = storage.load('notepad_left');

        if (top && top < 40) top = 50;
        if (left && left < 10) left = 10;
        if (top > device.height() - 300) top = 0;
        if (left > device.width() - 300) left = 0;

        if (top) notepad.note_block.css("top", top + 'px');
        if (left) notepad.note_block.css("left", left + 'px');
    },

    on_load: function on_load(data) {
        if (data.indexOf('div') > 0) {
            notepad.create = 1;
            $('.notes', notepad.note_block).html(data);
            $('.note_line', notepad.note_block).click(function () {
                var text = $(this).text();
                $(active_textarea).val(text).focus();
                if ($(active_textarea).attr('id') == 'mess-text-area') {
                    FormMess.message = text;
                } // TODO: жэсточайшы костыль для блокнота

                //                        // Trigger a DOM 'input' event
                //                        var evt = document.createEvent('HTMLEvents');
                //                        evt.initEvent('input', false, true);
                //                        elt.dispatchEvent(evt);
            });

            notepad.remind();

            notepad.note_block.draggable({
                handle: '.title',
                stop: function stop(event, ui) {
                    var topOff = $(this).offset().top - $(window).scrollTop();
                    notepad.note_block.css("top", topOff);
                    storage.save('notepad_top', topOff);
                    storage.save('notepad_left', $(this).offset().left);
                }
            });

            notepad.show();
        }
    }

};

var option_age = {

    init: function init() {
        $('#option_age_value').val(userinfo.data.age);
        $('#option_age_button').off('click').on('click', option_age.action.send_age);
        $('.opt_age_val').off('click').on('click', option_age.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.age) {
                userinfo.data.age = data.age;
                userinfo.action.set_age(data.say);
            }
        }
    },
    action: {
        save: function save(age) {
            userinfo.data.age = age;
            userinfo.ajax.save.age(option_age.ajax.on_save);
            userinfo.action.set_age();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_age.action.save($(this).text());
        },
        send_age: function send_age() {
            option_age.action.save($('#option_age_value').val());
        }
    }
};

var option_anketa = {

    anketa: {
        growth: 0,
        weight: 0,
        figure: 0
    },

    init: function init() {
        $('#option_anketa input').prop('disabled', true);
        $('#option_anketa input:radio').on('click', option_anketa.action.set);
        $('#option_anketa_button').on('click', option_anketa.action.send);
        option_anketa.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/sync/anketa/', option_anketa.ajax.on_load);
        },
        on_load: function on_load(data) {
            option_anketa.action.print(json.parse(data));
            //option_static.action.close();     
        },
        save: function save(anketa) {
            $.post('/option/anketa/', { anketa: anketa }, option_anketa.ajax.on_save);
            option_static.action.close();
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.alert != undefined) {
                profile_alert.option.show(data.alert);
                option_anketa.action.set_anketa(data.text);
            }
        }
    },
    action: {
        set_anketa: function set_anketa(text) {
            $('#user_anketa_option').text(text);
        },
        set: function set() {
            option_anketa.anketa.figure = $(this).val();
        },
        send: function send() {
            option_anketa.anketa.growth = $('#option_anketa_growth').val();
            option_anketa.anketa.weight = $('#option_anketa_weight').val();
            option_anketa.ajax.save(option_anketa.anketa);
        },
        print: function print(anketa) {
            if (anketa.figure != undefined) {
                option_anketa.anketa = anketa;
                var elem = $('#option_anketa input:radio[name=figure]');
                elem.filter('[value=' + anketa.figure * 1 + ']').prop('checked', true);
                $('#option_anketa_growth').val(anketa.growth * 1);
                $('#option_anketa_weight').val(anketa.weight * 1);
            }
            $('#option_anketa input').prop('disabled', false);
        }
    }
};

var option_chlogin = {

    init: function init() {
        $('.option_chlogin_toggle').on('click', option_chlogin.option.toggle);
        $('#option_chpass_send').on('click', option_chlogin.action.chpass);
        $('#option_chlogin_send').on('click', option_chlogin.action.chlogin); /*
                                                                              $('#hide_char').on('click',option_login.action.hide_char);     
                                                                              $('#option_remind_send').on('click',option_login.action.remind);  
                                                                              $('#option_login_reset').on('click',option_login.option.reset);     */

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        chpass: function chpass(pass) {
            $.post('/option/auth/', { pass: pass }, option_chlogin.ajax.on_pass);
        },
        chlogin: function chlogin(login) {
            $.post('/option/auth/', { login: login }, option_chlogin.ajax.on_login);
        },
        on_pass: function on_pass(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chpass_send'), 0.5);
        },
        on_login: function on_login(data) {
            option_chlogin.ajax.on_err(data);
            disabled_with_timeout($('#option_chlogin_send'), 0.5);
        },
        on_err: function on_err(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 0) {
                option_chlogin.option.text(data.say);
            } else option_static.action.close();
        }
    },
    action: {
        chlogin: function chlogin() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chlogin_send'), 5);
            option_chlogin.ajax.chlogin($('#option_chlogin_value').val());
        },
        chpass: function chpass() {
            option_chlogin.option.text('');
            disabled_with_timeout($('#option_chpass_send'), 5);
            option_chlogin.ajax.chpass($('#option_chpass_value').val());
        }
    },
    option: {
        toggle: function toggle() {
            option_chlogin.option.text('');
            $('#option_tab_chlogin').toggle('blind');
            $('#option_tab_chpass').toggle('blind');
        },
        text: function (_text) {
            function text(_x) {
                return _text.apply(this, arguments);
            }

            text.toString = function () {
                return _text.toString();
            };

            return text;
        }(function (text) {
            $('.option_chlogin_text').text(text);
        })
    }
};

var option_city = {

    init: function init() {
        $('#option_city_value').val(userinfo.data.city);
        $('#option_city_button').off('click').on('click', option_city.action.send_city);
        $('.opt_city_val').off('click').on('click', option_city.action.send_link);
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.city) {
                userinfo.data.city = data.city;
                userinfo.data.city_id = data.city_id;
                userinfo.data.verify = data.verify;
                userinfo.action.set_city();
            }
        }
    },
    action: {
        save: function save(city) {
            userinfo.data.city = city;
            userinfo.ajax.save.city(option_city.ajax.on_save);
            userinfo.action.set_city();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_city.action.save($(this).text());
        },
        send_city: function send_city() {
            option_city.action.save($('#option_city_value').val());
        }
    }
};

var option_contact = {

    init: function init() {
        $('#option_contact input').prop('disabled', true);
        $('#option_contact input:checkbox').on('click', option_contact.action.set);
        $('#option_contact_button').on('click', option_contact.action.send);
        option_contact.action.print();
    },
    ajax: {
        save: function save(contact) {
            $.post('/option/contact/', { contact: contact }, option_contact.ajax.on_save);
        },
        on_save: function on_save(data) {
            mess = json.parse(data);
            $('#user_contact_option').text(mess.count);
            profile_alert.option.show(mess.alert);
            option_static.action.close();
        }
    },
    action: {
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        send: function send() {
            option_contact.ajax.save(userinfo.data.contact);
        },
        print: function print() {
            if (userinfo.data.contact != undefined) {
                $('#option_contact_em').prop('checked', userinfo.data.contact.em * 1);
                $('#option_contact_vk').prop('checked', userinfo.data.contact.vk * 1);
                $('#option_contact_ok').prop('checked', userinfo.data.contact.ok * 1);
                $('#option_contact_fb').prop('checked', userinfo.data.contact.fb * 1);
                $('#option_contact_go').prop('checked', userinfo.data.contact.go * 1);
                $('#option_contact_sk').prop('checked', userinfo.data.contact.sk * 1);
                $('#option_contact_ph').prop('checked', userinfo.data.contact.ph * 1);
                $('#option_contact input').prop('disabled', false);
            }
        }
    }
};

var option_email = {

    init: function init() {
        $('.option_email_button').off('click');
        $('.option_email_button').on('click', option_email.action.send_email);
        if (userinfo.data.email) $('.option_email_value').val(userinfo.data.email);
        option_email.ajax.load();
    },
    ajax: {
        load: function load() {
            $.post('/sync/email/', option_email.ajax.on_load);
        },
        post: function post(email) {
            $.post('/option/email/', { email: email }, option_email.ajax.on_save);
            userinfo.data.email = data.email;
            userinfo.action.set_email();
            option_static.action.close();
        },
        on_save: function on_save(data) {
            profile_alert.option.show(json.parse(data));
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data) {
                if (data.email != '') {
                    userinfo.data.email = data.email;
                    userinfo.action.set_email();
                }
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('.option_email_value').val());
        }
    }
};

var option_intro = {

    name: '',
    city: '',
    age: 0,
    sex: 0,

    init: function init() {
        $('#option_intro input').prop('disabled', true);
        $('#option_intro input:radio').on('click', option_intro.action.set_sex);
        $('#option_intro_button').on('click', option_intro.action.send);
        option_intro.action.print();
    },
    action: {
        set_sex: function set_sex() {
            var sex = $(this).val();
            if (sex != userinfo.data.sex) {
                userinfo.data.sex = sex;
                userinfo.ajax.save.sex(option_sex.ajax.on_save);
                userinfo.action.set_sex();
            }
        },
        set_name: function set_name() {
            var name = $('#option_intro_name').val();
            if (name != userinfo.data.name) {
                userinfo.data.name = name;
                userinfo.ajax.save.name(option_name.ajax.on_save);
                userinfo.action.set_name();
            }
        },
        set_city: function set_city() {
            var city = $('#option_intro_city').val();
            if (city != userinfo.data.city) {
                userinfo.data.city = city;
                userinfo.ajax.save.city(option_city.ajax.on_save);
                userinfo.action.set_city();
            }
        },
        set_age: function set_age() {
            var age = $('#option_intro_age').val();
            if (age != userinfo.data.age) {
                userinfo.data.age = age;
                userinfo.ajax.save.age(option_age.ajax.on_save);
                userinfo.action.set_age();
            }
        },
        send: function send() {
            option_intro.action.set_name();
            option_intro.action.set_city();
            option_intro.action.set_age();
            option_static.action.close();
        },
        print: function print() {
            option_intro.name = userinfo.data.name;
            option_intro.city = userinfo.data.city;
            option_intro.age = userinfo.data.age;
            option_intro.sex = userinfo.data.sex;
            $('#option_intro_name').val(userinfo.data.name);
            $('#option_intro_city').val(userinfo.data.city);
            $('#option_intro_age').val(userinfo.data.age);
            var elem = $('#option_intro input:radio[name=sex]');
            elem.filter('[value=' + userinfo.data.sex * 1 + ']').prop('checked', true);
            $('#option_intro input').prop('disabled', false);
        }
    }
};

var option_login = {

    init: function init() {
        $('#hide_char').on('click', option_login.action.hide_char);
        $('#option_login_send').on('click', option_login.action.send);
        $('#option_remind_send').on('click', option_login.action.remind);
        $('.option_login_toggle').on('click', option_login.option.toggle);
        $('#option_login_reset').on('click', option_login.option.reset);

        /*
           $('#option_intro input:radio').on('click',option_intro.action.set_sex); 
           option_intro.action.print(); */
    },
    ajax: {
        send: function send(login, pass, captcha) {
            $.post('/sync/login/', { login: login, pass: pass, captcha: captcha }, option_login.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.captcha.reload();
                    option_login.option.captcha.show();
                    option_login.option.say_login(data.say);
                } else {
                    option_login.option.say_login(data.say);
                    location.href = location.href;
                }
                //option_anketa.action.set_anketa(data.text);    
                //option_static.action.close(); 
            }
            disabled_with_timeout($('#option_login_send'), 0.1);
        },
        remind: function remind(email) {
            $.post('/sync/remind/', { email: email }, option_login.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                if (data.err != '0') {
                    option_login.option.say_remind(data.say);
                } else {
                    option_login.option.posted();
                }
            }
            disabled_with_timeout($('#option_remind_send'), 0.1);
        }
    },
    action: {
        hide_char: function hide_char() {
            // $(this)
            var elem = $('#password_input');
            var attr = elem.attr('type');
            if (attr == 'password') {
                elem.attr('type', 'text');
            } else elem.attr('type', 'password');
        },
        send: function send() {
            var login = $('#login_input').val();
            var pass = $('#password_input').val();
            var captcha = $('#captcha_input').val();
            disabled_with_timeout($('#option_login_send'), 7);
            option_login.ajax.send(login, pass, captcha);
        },
        remind: function remind() {
            var email = $('#option_remind_email').val();
            disabled_with_timeout($('#option_remind_send'), 7);
            option_login.ajax.remind(email);
        }
    },
    option: {
        captcha: {
            show: function show() {
                $('#captcha_pass_block').show();
            },
            reload: function reload() {
                if ($('#captcha_code').is(":visible")) $('#captcha_code').get(0).src = '/capcha_pic.php?hash=' + hash;
            }
        },
        say_login: function say_login(text) {
            $('#option_login_text').text(text);
        },
        say_remind: function say_remind(text) {
            $('#option_remind_text').text(text);
        },
        toggle: function toggle() {
            $('#option_tab_login').toggle('blind');
            $('#option_tab_remind').toggle('blind');
            $('#option_tab_posted').hide('blind');
        },
        posted: function posted() {
            $('#option_tab_posted').show('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').hide('blind');
        },
        reset: function reset() {
            $('#option_tab_posted').hide('blind');
            $('#option_tab_remind').hide('blind');
            $('#option_tab_login').show('blind');
        }
    }
};

var option_name = {

    init: function init() {
        $('#option_name_value').val(userinfo.data.name);
        $('#option_name_button').off('click').on('click', option_name.action.send_name);
        option_name.option.namelist();
    },
    ajax: {
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.name) {
                userinfo.data.name = data.name;
                userinfo.action.set_name();
            }
        }
    },
    action: {
        save: function save(name) {
            userinfo.data.name = name;
            userinfo.ajax.save.name(option_name.ajax.on_save);
            userinfo.action.set_name();
            option_static.action.close();
        },
        send_link: function send_link() {
            option_name.action.save($(this).text());
        },
        send_name: function send_name() {
            option_name.action.save($('#option_name_value').val());
        }
    },
    option: {
        namelist: function namelist() {
            if (userinfo.data.sex == 1) {
                $('#man_opt_name').show();
            }
            if (userinfo.data.sex == 2) {
                $('#woman_opt_name').show();
            }
            if (!userinfo.data.sex) {
                //$('#woman_opt_name').show(); 
            }
            $('.opt_name_val').on('click', option_name.action.send_link);
        }
    }
};

var option_sex = {

    init: function init() {
        $('.option_sex_change').off('click').on('click', option_sex.action.send_sex);
    },
    ajax: {
        on_save: function on_save(data) {
            userinfo.data.name = auto_gen.name(userinfo.data.sex);
            userinfo.ajax.save.name(option_name.ajax.on_save);
            data = json.parse(data);
            if (data.sex) {
                userinfo.data.sex = data.sex;
                userinfo.action.set_sex();
            }
        }
    },
    action: {
        send_sex: function send_sex() {
            if (userinfo.data.sex == 0) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 1) {
                userinfo.data.sex = 2;
            } else if (userinfo.data.sex == 2) {
                userinfo.data.sex = 1;
            }
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        },
        save: function save(sex) {
            userinfo.data.sex = sex;
            userinfo.ajax.save.sex(option_sex.ajax.on_save);
            userinfo.action.set_sex();
        }
    }
};

// -- Статический блок опций ---
var option_static = {

    click_enable: null,
    active_elem: null,
    timer_id: null,
    form: null,

    init: function init() {
        if (!$('.option_static').length) return null;

        $('.option_static').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('click', option_static.action.preload);
                elem.data('active', 1);
            }
        }); // alert(1)
        $('#option-static__close').on('click', option_static.action.close);
    },

    ajax: {
        load: function load(option) {
            option_static.option.form.trash();
            $('#option-static__container').load('/static/htm/option_' + option + '.html', option_static.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(visited.list)
            if (data) {
                option_static.action.router();
                option_static.action.show_form();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        },
        save: function save(tid) {
            //$.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        }
    },

    option: {
        loader: {
            show: function show() {
                $('#option-static__loader').delay(1000).show('fade');
            },
            hide: function hide() {
                $('#option-static__loader').clearQueue();
                $('#option-static__loader').hide('fade');
            }
        },
        form: {
            show: function show() {
                $('#option-static__container').show('fade');
            },
            hide: function hide() {
                $('#option-static__container').hide('fade');
            },
            trash: function trash() {
                $('#option-static__container').empty();
            }
        },
        block: {
            show: function show() {
                $('#option-static').show('fade');
            },
            hide: function hide() {
                $('#option-static').hide('fade');
            }
        }
    },

    action: {
        show_form: function show_form() {
            option_static.option.form.show();
            option_static.option.loader.hide();
        },
        preload: function preload() {
            var option = $(this).data('option');
            option_static.form = option;
            if (option) {
                option_static.ajax.load(option);
                option_static.option.block.show();
                option_static.option.loader.show();
            }
        },
        close: function close() {
            option_static.option.form.hide();
            option_static.option.loader.hide();
            option_static.option.block.hide();
        },
        router: function router() {
            if (option_static.form == 'login') {
                option_login.init();
            }
            if (option_static.form == 'contact') {
                option_contact.init();
            }
            if (option_static.form == 'age') {
                option_age.init();
            }
            if (option_static.form == 'name') {
                option_name.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'city') {
                option_city.init();
                city_suggest.init();
            }
            if (option_static.form == 'hidepass') {
                option_email.init();
            }
            if (option_static.form == 'anketa') {
                option_anketa.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'chlogin') {
                option_chlogin.init();
            }
            if (option_static.form == 'introduce') {
                option_intro.init();
                name_suggest.init();
                city_suggest.init();
            }
            if (option_static.form == 'desire') {
                option_tag.init();
                tag_suggest.init();
            }
        }
    }
};

var option_tag = {

    loaded: 0,

    init: function init() {
        $('#option_tag input').prop('disabled', true);
        $('#option_tag_button').on('click', option_tag.action.send);
        option_tag.action.remind();
        option_tag.ajax.load();
    },
    ajax: {
        load: function load() {
            $.get('/tag/user/', option_tag.ajax.on_load);
        },
        on_load: function on_load(data) {
            data = json.parse(data);
            if (data.tags.length > 0) {
                option_tag.action.print(data.tags);
                user_tag.list = data.tags;
                user_tag.action.store();
            }
            $('#option_tag input').prop('disabled', false);
            //
            //option_static.action.close();
        },
        add: function add(tag) {
            $.post('/tag/add/', { tag: tag }, option_tag.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.id) {
                user_tag.list[user_tag.list.length - 1].id = data.id;
                user_tag.option.set_count();
                option_tag.action.remind();
            } else {
                option_tag.option.error(option_tag.loaded);
            }
            $('#option_tag_value').val('');
            user_tag.action.store();
        },
        del: function del(id) {
            $.post('/tag/del/', { id: id });
        }
    },
    action: {
        remind: function remind() {
            if (user_tag.list.length > 0) {
                option_tag.action.print(user_tag.list);
            }
        },
        send: function send() {
            var tag = $('#option_tag_value').val();
            var data = { "tag": tag, "id": 0 };
            user_tag.list.push(data);
            option_tag.action.remind();
            option_tag.ajax.add(tag);
        },
        set: function set() {
            userinfo.data.contact[$(this).data('val')] = $(this).prop('checked') * 1;
        },
        print: function print(tags) {
            $('#option_tag_list').empty();
            for (var i = 0; i < tags.length; i++) {
                var style = '';
                var block_line = $('<i class="desire_tag">').text(tags[i].tag);
                if (!tags[i].id) block_line.addClass('desire_onload');
                block_line.data('id', tags[i].id);
                block_line.data('num', i);
                block_line.data('tag', tags[i].tag);
                block_line.attr('id', 'utag' + i);
                block_line.on('click', option_tag.action.del);
                $('#option_tag_list').append(block_line);
            }
        },
        add: function add() {
            option_tag.ajax.add($(this).data('tag'));
            option_tag.option.toggle(this);
            $(this).on('click', option_tag.action.del);
            var data = { "tag": $(this).data('tag'), "id": $(this).data('id') };
            user_tag.list.splice($(this).data('num'), 0, data);
        },
        del: function del() {
            option_tag.ajax.del($(this).data('id'));
            option_tag.option.toggle(this);
            user_tag.list.splice($(this).data('num'), 1);
            user_tag.option.set_count();
            $(this).on('click', option_tag.action.add);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        toggle: function toggle(elem) {
            $(elem).off('click');
            $(elem).toggleClass('deleted_tag');
        },
        error: function error(i) {
            $('#utag' + [i]).off('click');
            $('#utag' + [i]).toggleClass('error_tag');
        }
    }
};

var profile_alert = {
    init: function init() {
        $('#profile_alert').on('click', profile_alert.option.hide);
    },
    option: {
        show: function show(text) {
            if (text) {
                var elem = $('#profile_alert');
                elem.clearQueue();
                elem.html(text);
                $('#profile_alert').show('fade');
                $("html, body").animate({ scrollTop: 0 }, "slow");
                elem.delay(5000).queue(profile_alert.option.hide);
            }
        },
        hide: function hide() {
            var elem = $('#profile_alert');
            elem.clearQueue();
            elem.hide('fade');
            elem.delay(500).queue(profile_alert.option.clear);
        },
        clear: function clear() {
            $('#profile_alert').empty();
        }
    }
};

var profile_option = {

    init: function init() {
        $('#profile_auth_button').on('click', profile_option.action.send_auth);
        $('#profile_send_pass').on('click', profile_option.action.send_pass);
        $('#profile_del_email').on('click', profile_option.action.del_email);
        $('#profile_subscr_send').on('click', profile_option.action.subscr);
    },
    ajax: {
        post: function post(login, pass) {
            $.post('/option/auth/', { login: login, pass: pass }, profile_option.ajax.on_save);
        },
        on_save: function on_save(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        send_pass: function send_pass() {
            $.post('/option/passend/', profile_option.ajax.alert);
        },
        del_email: function del_email() {
            $.post('/option/demail/', profile_option.ajax.alert);
        },
        subscr: function subscr(_subscr) {
            $.post('/option/subscr/', profile_option.ajax.error);
        },
        alert: function alert(data) {
            data = json.parse(data);
            if (data.err != undefined) {
                profile_alert.option.show(data.say);
            }
        },
        error: function error(data) {
            data = json.parse(data);
            if (data.err != undefined && data.err > 1) {
                profile_alert.option.show(data.say);
            }
        }
    },
    action: {
        send_email: function send_email() {
            option_email.ajax.post($('#profile_email_value').val());
        },
        send_auth: function send_auth() {
            profile_option.ajax.post($('#profile_login_value').val(), $('#profile_pass_value').val());
        },
        send_pass: function send_pass() {
            profile_option.ajax.send_pass();
        },
        del_email: function del_email() {
            profile_option.ajax.del_email();
        },
        subscr: function subscr() {
            var on = $('#subscr_status_on');
            var un = $('#subscr_status_off');
            if (on.text() == 'включены') {
                un.text('отключены');
                on.text('');
            } else {
                un.text('');
                on.text('включены');
            }
            profile_option.ajax.subscr();
        }
    }
};

// -- Обратная связь ---
var report = {

    is_report: 0,

    init: function init() {
        $('#send_question').click(function () {
            report.show_quest();
        });
        $('#send_report').click(function () {
            report.show_report();
        });
        $('#send_reset').click(function () {
            report.hide();
        });
        $('#report_text').unbind('click');

        $('#hint_close').click(function () {
            report.hint_hide();
        });
    },

    show: function show() {
        $('#report_send').off('click');
        $('#report_block').show('blind');
    },

    hide: function hide() {
        $('#report_block').hide('blind');
    },

    show_quest: function show_quest() {
        report.show();
        $('#report_send').val('Отправить вопрос');
        $('#report_send').on('click', report.post_quest);
    },

    show_report: function show_report() {
        report.show();
        $('#report_send').val('Отправить отзыв');
        $('#report_send').on('click', report.post_report);
    },

    hint_show: function hint_show() {
        $("#hint_block").show('blind');
    },

    hint_hide: function hint_hide() {
        $("#hint_block").hide('fade');
    },

    post_quest: function post_quest() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/mailer/post/", {
            mess: text,
            id: 10336,
            hash: hash
        }, report.on_post);

        report.hint_show();
    },

    post_report: function post_report() {
        report.hide();
        var text = $('#report_text').val();

        $.post("/details.php?reviews", {
            text_reviews: text,
            hash: hash
        });

        report.hint_show();
        $('#report_text').val('');
    },

    on_post: function on_post(data) {
        // alert (data) 
        if (!data) return 0;
        var mess = JSON.parse(data);

        if (mess.error == 'reload') {
            location.href = '/10336?text=' + encodeURIComponent($('#report_text').val());
        }
        $('#report_text').val('');
    }

};

// -- Слайдер, главная ---
var slider = {

    timer: null,
    context: 0,
    next: 0,

    init: function init() {
        if (!$('div').is('#top_intro_info_block')) return null;

        $('#top_intro_info_block').on('mouseover', slider.stop);
        $('#top_intro_info_block').on('mouseout', slider.start);

        // Предзагрузка картинок
        setInterval(function () {
            var nn = slider.next + 1 < 5 ? slider.next + 1 : 0;
            var a1 = new Image();
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";
        }, 10000);
    },

    slide: function slide(num, st) {
        var top_intro_caption = [];
        var top_intro_context = [];
        top_intro_context[0] = 'Позволит познакомиться с парнем или девушкой для секса, найти партнёра в соседнем подъезде или доме напротив. Знакомиться в собственном дворе или районе уже сегодня';
        top_intro_caption[0] = 'Уникальный способ знакомства';
        top_intro_caption[1] = 'Знакомства без регистрации';
        top_intro_context[1] = 'Начинайте использовать всё и сразу, на полную, лишь только зайдя на сайт. Без подтверждений регистрации, без активации анкет. Лёгкий и быстрый поиск новых знакомств';
        top_intro_caption[2] = 'Секс знакомства без смс';
        top_intro_context[2] = 'Ни номеров телефонов, ни подтверждений, ни смс. 100% анонимность, лёгкое и раскрепощённое общение. Онлайн обмен любыми фотографиями. E-mail адрес и всё остальное указывается по желанию';
        top_intro_caption[3] = 'Онлайн общение, интимные темы';
        top_intro_context[3] = 'То что вы хотели спросить, то о чём вы хотели поговорить. Получайте прямо сейчас. Комфортное онлайн общение, интимные беседы, уютная обстановка и приятные собеседники уже ждут вас';
        top_intro_caption[4] = 'Секс знакомства бесплатно';
        top_intro_context[4] = 'Здесь всё бесплатно. Вам доступны все сервисы сайта полностью, уже сейчас. Ваша анкета всегда наверху. Vip аккаунтов нет, открытый доступ ко всем анкетам и безграничные возможности';

        if (num > 4) num = 0;
        for (var i = 0; i < 5; i++) {
            $('#board_img_' + i).removeClass('show');
            $('#board_img_' + i).attr('src', '');
        }

        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src', '/img/board/top_intro_info_' + num + '.jpg');

        if (slider.context) {
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]);
        }

        slider.next = num;
    },

    start: function start() {
        slider.timer = setInterval(function () {
            slider.slide(++slider.next, 0);
        }, 20000);
    },

    stop: function stop() {
        clearTimeout(slider.timer);
    }

};

// -- Города, подсказки, поиск названия ---
var city_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.city_suggest').length) return null;

        $('.city_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', city_suggest.enabled);
                elem.on('blur', city_suggest.blur);
                elem.on('keyup', city_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', city_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        // alert ($(this).val()); return false //  data('num')
        //if (!elem) elem = this;       
        city_suggest.active_elem = $(this);
        var city = city_suggest.active_elem.val();
        $.get('/town/suggest/', { q: city, hash: hash }, city_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.cities) {
                city_suggest.hide_suggest();
                city_suggest.show_suggest(mess.cities);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(cities) {
        var block_line = '';
        var block_this = city_suggest.active_elem.parent();
        for (var i = 0; i < cities.length; i++) {
            if (!cities[i]) continue;

            block_line = $('<div class="suggest_line" data-city="' + cities[i] + '">').text(cities[i]);
            block_line.on('click', city_suggest.print);

            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        city_suggest.active_elem.val($(this).data('city'));
        city_suggest.hide_suggest();
    }

};

// -- Имена подсказки, поиск ---
var name_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.name_suggest').length) return null;

        $('.name_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', name_suggest.enabled);
                elem.on('blur', name_suggest.blur);
                elem.on('keyup', name_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },

    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', name_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },

    ajax_load: function ajax_load(elem) {
        //alert ($(this).val()); //return    data('num')
        //if (!elem) elem = this;       
        name_suggest.active_elem = $(this);
        var name = name_suggest.active_elem.val();
        $.post('/ajax/name.php', { name: name, hash: hash }, name_suggest.on_load);
        /* */
    },

    on_load: function on_load(data) {
        if (data) {
            var mess = JSON.parse(data);
            if (mess.names) {
                name_suggest.hide_suggest();
                name_suggest.show_suggest(mess.names);
            }
        }
    },

    blur: function blur() {
        $('.suggest_block').hide('fade');
    },

    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },

    show_suggest: function show_suggest(names) {
        var block_line = '';
        var block_this = name_suggest.active_elem.parent();
        for (var i = 0; i < names.length; i++) {
            if (!names[i]) continue;
            block_line = $('<div class="suggest_line" data-name="' + names[i] + '">').text(names[i]);
            block_line.on('click', name_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }

        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        name_suggest.active_elem.val($(this).data('name'));
        name_suggest.hide_suggest();
    }
};

// -- Таги подсказки, поиск ---
var tag_suggest = {

    click_enable: null,
    active_elem: null,
    timer_id: null,

    init: function init() {
        if (!$('.tag_suggest').length) return null;
        $('.tag_suggest').each(function (i, elem) {
            elem = $(elem);
            if (!elem.data('active')) {
                elem.on('mouseover', tag_suggest.enabled);
                elem.on('blur', tag_suggest.blur);
                elem.on('keyup', tag_suggest.ajax_load);
                elem.attr('autocomplete', 'off');
                elem.wrap($('<div class="suggest_wrap">'));
                elem.parent().append($('<div class="small_loader">'));
                elem.parent().append($('<div class="suggest_block">')); /**/
                elem.data('active', 1);
            }
        });
    },
    enabled: function enabled() {
        if (!$(this).data('click')) {
            $(this).on('click', tag_suggest.ajax_load);
            $(this).data('click', 1);
        }
    },
    ajax_load: function ajax_load(elem) {
        tag_suggest.active_elem = $(this);
        var tag = tag_suggest.active_elem.val();
        $.post('/tag/suggest/', { tag: tag, hash: hash }, tag_suggest.on_load);
    },
    on_load: function on_load(data) {
        tag_suggest.hide_suggest();
        data = json.parse(data);
        if (data.tags.length > 0) {
            tag_suggest.show_suggest(data.tags);
        }
    },
    blur: function blur() {
        $('.suggest_block').hide('fade');
    },
    hide_suggest: function hide_suggest() {
        $('.suggest_block').empty();
        $('.suggest_block').hide();
    },
    show_suggest: function show_suggest(tags) {
        var block_line = '';
        var block_this = tag_suggest.active_elem.parent();
        for (var i = 0; i < tags.length; i++) {
            block_line = $('<div class="suggest_line" data-tag="' + tags[i] + '">').text(tags[i]);
            block_line.on('click', tag_suggest.print);
            $('.suggest_block', block_this).append(block_line);
        }
        if ($('.suggest_line', block_this).length) $('.suggest_block', block_this).show();
    },

    print: function print() {
        tag_suggest.active_elem.val($(this).data('tag'));
        tag_suggest.hide_suggest();
    }
};

var user_menu = { init: function init() {},
    ajax: {},
    action: { sets: { search: function search() {}, contact: function contact() {} } },
    option: { act: {}, se: function se() {} }
};

var user_tag = {

    list: [],
    idls: [],
    sync: 0,
    count: 0,

    init: function init() {
        user_tag.list = storage.array.load('user_tag_list');
        user_tag.sync = storage.load('sync_taglist');
        user_tag.count = storage.load('user_tag_count');
    },
    action: {
        store: function store() {
            storage.array.save('user_tag_list', user_tag.list);
            storage.save('user_tag_count', user_tag.count);
            storage.save('sync_taglist', user_tag.sync);
        },
        ids: function ids() {
            user_tag.idls = [];
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id) user_tag.idls.push(user_tag.list[i].id);
            }
            return user_tag.idls;
        }
    },
    option: {
        set_count: function set_count() {
            if (user_tag.list.length) $('#user_desire_count').text(user_tag.list.length);
        }
    }
};

// -- Информация о пользователе ---
var userinfo = {

    data: {
        uid: 0,
        sex: 0,
        age: 0,
        name: '',
        city: '',
        city_id: 0,
        verify: 0,
        name_mod: 0,
        apromt: 0,
        daily: 0,

        town: '',
        who: 0,
        years_up: 0,
        years_to: 0,
        virt: 0,
        close: 0,

        dating: '',
        setting: 0,
        assist: 0,
        intim: 0,

        second: 0,
        time: 0,
        email: ''
    },

    init: function init() {
        userinfo.ajax.load();
    },
    ajax: {
        load: function load(option) {
            $.get('/sync/sess/', userinfo.ajax.on_load);
        },
        on_load: function on_load(data) {
            // alert(userinfo.name)
            data = json.parse(data);
            if (data && data.uid) {
                userinfo.data = data;
                userinfo.action.set_data(data);
                master_info.init();
            } else {
                storage.save('auth', 0);
                user_menu.option.act.show_reg();
                userinfo.action.set_string();
            }
        },
        save: {
            sex: function sex(func) {
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            },
            age: function age(func) {
                $.post('/option/age/', { age: userinfo.data.age }, func);
            },
            name: function name(func) {
                $.post('/option/name/', { name: userinfo.data.name }, func);
            },
            city: function city(func) {
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }
        }
    },
    action: {
        set_data: function set_data(data) {
            storage.save('auth', data.uid);

            user_menu.option.act.show_opt();
            user_menu.action.sets.search();

            userinfo.action.set_sex();
            userinfo.action.set_age();
            userinfo.action.set_name();
            userinfo.action.set_city();

            userinfo.action.set_string(); /**/
        },
        set_name: function set_name() {
            if (userinfo.data.name && userinfo.data.name.length > 2) {
                $('.user_name_option').text(userinfo.data.name);
                $('.name_suggest').val(userinfo.data.name);
            }
            userinfo.action.set_string();
        },
        set_age: function set_age(say) {
            if (userinfo.data.age > 0) $('.user_age_option').text(userinfo.data.age);
            if (say) $('.user_age_say').text(say);
            userinfo.action.set_string();
        },
        set_city: function set_city() {
            if (userinfo.data.city && userinfo.data.city.length > 3) {
                $('.user_city_option').text(userinfo.data.city);
                $('.city_suggest').val(userinfo.data.city);
            }
            //userinfo.data.city_id = city['city_id'];
            //userinfo.data.verify  = city['verify'];
            userinfo.action.set_string();
        },
        set_sex: function set_sex() {
            var say;
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка';
            } else if (userinfo.data.sex == 1) {
                say = 'Парень';
            } else if (userinfo.data.sex == 2) {
                say = 'Девушка';
            }
            $('.user_sex_option').text(say);
        },
        set_string: function set_string() {
            var str = userinfo.data.name ? userinfo.data.name : '';
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }
            }

            var cityLen = userinfo.data.city ? userinfo.data.city.length : 0;
            if (userinfo.data.age > 10 || cityLen > 3) {
                str = str + ', ';
            }
            if (userinfo.data.age > 10) str = str + userinfo.data.age + ' ';
            if (20 - str.length - cityLen >= 0) {
                str = str + userinfo.data.city;
            }
            if (!str) {
                str = 'Кто вы?';
            }
            if (userinfo.data.uid) {
                $('.user_string_option').text(str);
                storage.save('user_string_print', str);
            } else
                //if (!uid)
                $('.user_string_option').text('');
        },
        set_email: function set_email() {
            $('.option_email_value').val(userinfo.data.email);
            $('.profile_email_value').text(userinfo.data.email);
        }

    }
};
