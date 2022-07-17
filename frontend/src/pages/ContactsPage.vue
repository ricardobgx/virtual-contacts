<template>
  <div class="contacts">
    <ContactsActions
      v-on:open-form="openNewContactForm"
      v-on:search-contacts="searchContacts"
      v-on:clear-search="clearContactsSearch"
    />
    <NewContactForm
      :isActive="newContactFormIsActive"
      v-if="newContactFormIsActive"
      v-on:close-form="closeNewContactForm"
      v-on:contact-created="getContacts"
    />
    <EditContactForm
      :isActive="editContactFormIsActive"
      :contactId="Number(contactId)"
      v-if="editContactFormIsActive"
      v-on:close-form="closeEditContactForm"
      v-on:contact-edited="getContacts"
    />
    <ContactDetails
      :isActive="contactInfoIsActive"
      :contactId="Number(contactId)"
      v-if="contactInfoIsActive"
      v-on:close-contact="closeContact"
      v-on:edit-contact="openEditContactForm"
      v-on:delete-contact="getContacts"
    />
    <ContactsList :contacts="contacts" v-on:open-contact="openContact" />
  </div>
</template>
<script>
import ContactsActions from "../components/Contacts/ContactsActions.vue";
import NewContactForm from "../components/Contacts/NewContactForm.vue";
import EditContactForm from "../components/Contacts/EditContactForm.vue";
import ContactsList from "../components/Contacts/ContactsList.vue";
import ContactsAPI from "../services/api";
import ContactDetails from "../components/Contacts/ContactDetails.vue";

export default {
  name: "ContactsPage",
  components: {
    ContactsActions,
    NewContactForm,
    EditContactForm,
    ContactsList,
    ContactDetails,
  },
  data() {
    return {
      newContactFormIsActive: false,
      editContactFormIsActive: false,
      contactInfoIsActive: false,
      contacts: [],
      allContacts: [],
      contactId: -1,
    };
  },
  mounted() {
    this.getContacts();
  },
  methods: {
    openNewContactForm() {
      this.newContactFormIsActive = true;
    },
    closeNewContactForm() {
      this.newContactFormIsActive = false;
    },
    openContact(contactId) {
      this.contactId = contactId;
      this.contactInfoIsActive = true;
    },
    closeContact() {
      this.contactInfoIsActive = false;
    },
    openEditContactForm() {
      this.editContactFormIsActive = true;
    },
    closeEditContactForm() {
      this.editContactFormIsActive = false;
    },
    searchContacts(text) {
      this.contacts = this.allContacts.filter(
        (contact) =>
          contact.nome.toUpperCase().indexOf(text.toUpperCase()) !== -1
      );
    },
    clearContactsSearch() {
      this.contacts = [...this.allContacts];
    },
    sortContacts(contacts) {
      return contacts.sort((contactA, contactB) => {
        if (contactA.nome.toUpperCase() < contactB.nome.toUpperCase()) {
          return -1;
        } else if (contactA.nome.toUpperCase() > contactB.nome.toUpperCase()) {
          return 1;
        }
        return 0;
      });
    },
    async getContacts() {
      await ContactsAPI.get("/contatos").then((response) => {
        const contacts = this.sortContacts(response.data.contatos);

        this.contacts = [...contacts];
        this.allContacts = [...contacts];
      });
    },
  },
};
</script>
<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  padding: 40px;
}
</style>
