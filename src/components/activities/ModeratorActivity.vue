<script>
import api from '~config/api';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import ActivityActions from '~activities/ActivityActions';

export default {
  data() {
    return {
      process: false,
      promt: true,
      error: null,
      count: null,
      message: {
        id: null,
        text: '',
      },
      secure: null,
      expire: null,
    };
  },
  mounted() {
    this.load();
  },
  computed: {
    human() {
      return this.$store.state.human;
    },
    accept() {
      return this.$store.state.accepts.moderator;
    },
  },
  methods: {
    approve() {
      this.process = true;
      api.moderator
        .promt()
        .then(() => {
          this.load();
        })
        .catch(() => {
          this.needPromt();
          this.process = false;
        });
      this.$store.commit('accepts/moderator', 1);
    },
    load() {
      this.process = true;
      api.moderator.load().then(({data}) => {
        this.error = data.error;
        if (this.error == 'promt') {
          this.needPromt();
        } else if (this.error == 'count') {
          //
        } else if (this.error == 'other') {
          //
        } else if (!this.error && data.message) {
          this.loaded(data);
        }
        this.process = false;
      });
    },
    loaded(data) {
      const {count, message, expire, secure} = data;
      this.count = count;
      this.message = message;
      this.expire = expire;
      this.secure = secure;
    },
    needPromt() {
      this.$store.commit('accepts/moderator', 0);
      this.promt = false;
    },
    action(mark) {
      const data = {
        id: this.message.id,
        secure: this.secure,
        expire: this.expire,
        mark,
      };
      this.process = true;
      api.moderator.press(data).then(() => {
        this.load();
      });
    },
    close() {
      this.$emit('close');
    },
  },
  components: {
    ActivityActions,
    ConfirmDialog,
  },
};
</script>

<template>
  <div>
    <ActivityActions type="wrapped" @close="close">
      <span slot="caption">Защитить</span>

      <template slot="option">
        <a class="menu-button" href="security/action" target="_blank">
          <span class="menu-button__title">
            В админку
          </span>
          <i class="material-icons">&#xE895;</i>
        </a>
      </template>

      <div v-if="error == 'count'">
        <div class="activity-section__title">
          Спасибо. Сообщения скоро будут.
        </div>
        <div id="" class="" style="font-size: 14px; margin-bottom: 10px; color: #777;">
          Мы благодарны вам за вашу подержку.
          С вами сайт становится ещё сильнее.
          Благодаря вам анкеты мошенников, троллей, фейков
          и обнаглевших жриц любви блокируются практически моментально.
        </div>
      </div>

      <div v-if="error == 'other'">
        <div class="activity-section__title">Что-то пошло не так ;(</div>
        <div id="" class="" style="font-size: 14px; margin-bottom: 10px; color: #777;">
          Время ожидания истекло, данные сессии устарели.
          Возможно вариант сообщения уже был рассмотрен.
          Обновите данные. Спасибо.
        </div>
        <button class="btn btn-primary btn-block" @click="load" :disabled="process">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
          Обновить
        </button>
      </div>

      <div v-if="accept && !error">
          <div class="activity-section">
            <div class="activity-section__title">Нужно ли наказать за это?</div>
            <div class="hint-info" style="font-size: 14px; ">
               {{message.text}}
            </div>
          </div>
          <div class="activity-section">
            <button class="btn btn-primary"
             @click="process ? null : action(1)"
             :disabled="process"> Да, наказать </button>
            <button class="btn btn-default"
             @click="process ? null : action(-1)"
             :disabled="process"> Нет, отклонить </button>
            <button class="btn btn-link"
             @click="process ? null : action(0)"
             :disabled="process"> Пропустить </button>
            <!--
            <select>
              <option>Без отметки</option>
              <option>Предложение интим услуг</option>
              <option>Мошенники, просьба перевода денег</option>
              <option>Ссылка на другой сайт, спам</option>
              <option>Грубые намеренные оскорбления</option>
            </select>-->
          </div>

          <div id="" class="" style="font-size: 14px; margin-bottom: 10px; color: #777;">
              Просто ответьте, соответствует ли текст сообщения нарушению или нет. Нарушитель получит новую порцию наказания, если вы подтвердите это.
          </div>

          <div id="" class="" style="font-size: 12px; color: #999; margin-bottom: 0px;">
            Нажмите "Да", если текст содержит грубое оскорбление собеседника,
            предложение интим услуг или мошеннические схемы.
            Нажмите "Нет", если не считаете нужным наказывать
            за содержание текста.
            <a class="link_simple"
             href="http://docs.freedomsex.info/blog/#/Сообщество/Администрирование?id=Интерфейс-модератора"
             target="_blank">Подробнее..</a>
          </div>
        </div>

    </ActivityActions>


    <ConfirmDialog v-if="!accept"
     @confirm="approve()" @close="close()"
     yesText="Стать модератором" noText="Попробую позже">
      <span slot="title">Защитить ресурс</span>
      Присоединяйтесь к группе модераторов сайта,
      сделайте жизнь троллей и фейков ещё сложнее,
      испортите им настроение и весь день на сегодня, это просто.
      <div slot="notation">
        Модератором может стать любой совершеннолетний пользоватеть.
        Нажимая кнопку "Стать модератором"
        вы подтверждаете что вам 18 лет или более.
      </div>
    </ConfirmDialog>

  </div>
</template>

<style lang="less">
</style>
