<script>
// TODO: remove support from proj
import ContactDialog from './ContactDialog';

export default {
  extends: ContactDialog,
  computed: {
    initial: () => false,
    simple: () => false,
    contacts() {
      return this.$store.state.contacts.sends.list;
    },
  },
  methods: {
    load() {
      this.$store.dispatch('sends/LOAD', this.next).then(() => {
        this.loaded();
      });
      this.amount = this.count;
      this.hope();
    },
    next() {
      this.$store.dispatch('sends/NEXT', this.offset).then(() => {
        this.loaded();
      });
      this.reset();
    },
    remove(index) {
      this.$store.dispatch('sends/DELETE', index);
    },
    splice(index) {
      this.$store.commit('sends/delete', index);
    },
  },
};
</script>
