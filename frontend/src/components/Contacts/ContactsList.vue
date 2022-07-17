<template>
  <div class="contacts-list">
    <ContactCard
      v-for="(contact, index) in contacts"
      v-bind:key="index"
      :contact="contact"
      :index="index"
      v-on:open-contact="openContact"
    />
  </div>
</template>
<script>
import ContactCard from "./ContactCard.vue";

export default {
  name: "ContactsList",
  props: {
    contacts: Array,
  },
  components: {
    ContactCard,
  },
  methods: {
    openContact(contactId) {
      this.$emit("open-contact", contactId);
    },
  },
};
</script>
<style scoped>
.contacts-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 40px 0;
}
</style>
