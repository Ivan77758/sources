<script>
import ActivityActions from '~activities/ActivityActions';
import Tooltip from '~widgets/Tooltip';
import Payments from './Payments';

export default {
  data() {
    return {
      //
    };
  },
  mounted() {

  },
  computed: {
    //
  },
  methods: {
    //
  },
  components: {
    ActivityActions,
    Payments,
    Tooltip,
  },
};
</script>

<template>
  <ActivityActions type="wrapped" @close="$emit('close')">
    <span slot="caption">Статус анкеты</span>

    <div class="activity-section">
      Статус отображается в результатах поиска
      и в самой анкете, выделяя ее особым образом среди
      остальных. Кредиты начисляются бесплатно.
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        VIP
      </div>
      <div class="activity-section__tile">
        Премиум статус для вашей анкеты, безлимит
        кредитов ежедневно.
      </div>

      <Payments action="enpay"
       product="vip"
       button="danger"
       text="Получить за <s>99$</s> <b>19</b>$">
      </Payments>
      скидка 80%

    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Золотая
      </div>
      <div class="activity-section__tile">
        Яркий статус вашей анкеты, до 2500 кредитов
        каждый день бесплатно.
      </div>

      <Payments action="enpay"
       product="gold"
       button="warning"
       text="Получить за <s>49$</s> <b>9</b>$">
      </Payments>
      скидка 80%
    </div>

    <div class="activity-section">
      <div class="activity-section__title">
        Особенная
      </div>
      <div class="activity-section__tile">
        Особый статус для вашей анкеты, бесплатное
        пополнение доверия до 1500 кредитов ежедневно.
      </div>

      <Payments action="enpay"
       product="status"
       button="default"
       text="Получить за <b>4.9</b>$">
      </Payments>
    </div>


    <div class="hint-info" slot="footer">
      Количество акционных позиций ограничено. Количество
      кредитов и статус могут быть аннулированы
      за нарушение правил.
      <a href="http://docs.freedomsex.info/blog/#/Как-пользоваться/Кредиты-доверия?id=Статус-анкеты" target="_blank">
        Подробнее...
      </a>
    </div>
  </ActivityActions>
</template>

<style lang="less">

</style>
