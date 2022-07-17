<template>
  <div class="edit-contact-form-background">
    <div class="edit-contact-form">
      <h2>Edit contact</h2>
      <button class="close-form" v-on:click="closeForm">
        <MaterialIconOutlined code="close" color="" />
      </button>
      <EditContactFormField
        iconCode="perm_identity"
        fieldPlaceholder="Name"
        fieldType="text"
        v-on:text-changed="updateName"
        :model="name"
      />
      <EditContactFormField
        iconCode="phone"
        fieldPlaceholder="Phone"
        fieldType="tel"
        v-on:text-changed="updatePhone"
        :model="phone"
      />
      <button class="create-contact-button" v-on:click="editContact">
        <p>Save</p>
      </button>
    </div>
  </div>
</template>
<script>
import EditContactFormField from "./EditContactFormField.vue";
import MaterialIconOutlined from "../App/MaterialIcon.vue";
import ContactAPI from "../../services/api";

export default {
  name: "EditContactForm",
  components: {
    EditContactFormField,
    MaterialIconOutlined,
  },
  props: {
    isActive: Boolean,
    contactId: Number,
  },
  data() {
    return {
      name: "",
      phone: "",
    };
  },
  methods: {
    updateName(text) {
      this.name = text;
    },
    updatePhone(text) {
      this.phone = text;
    },
    closeForm() {
      this.name = "";
      this.phone = "";
      this.$emit("close-form");
    },
    async editContact() {
      if (!this.name.trim() || !this.phone.trim()) {
        return;
      }

      const token = localStorage.getItem("token");

      await ContactAPI.patch(
        `/contatos/${this.contactId}`,
        {
          nome: this.name,
          telefone: this.phone,
        },
        {
          headers: {
            "Auth-Token": token,
          },
        }
      ).then(() => {
        this.$emit("contact-edited");
        this.closeForm();
      });
    },
    async getContact() {
      const token = localStorage.getItem("token");

      await ContactAPI.get(`/contatos/${this.contactId}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then((response) => {
        const { contato } = response.data;
        this.name = contato.nome;
        this.phone = contato.telefone;
      });
    },
  },
  mounted() {
    this.getContact();
  },
};
</script>
<style scoped>
.edit-contact-form-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 95;
  opacity: 0;
  animation: fadeIn 0.3s linear forwards;
}

.edit-contact-form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  width: 400px;
  color: var(--primary-color);
  position: relative;
}

.edit-contact-form h2 {
  font-size: 18px;
}

.create-contact-button {
  color: #ffffff;
  background: var(--primary-color);
  border-radius: 5px;
  border: none;
  height: 40px;
  width: 350px;
  margin-top: 20px;
  cursor: pointer;
}

.close-form {
  background: var(--primary-color);
  border: none;
  padding: 0;
  position: absolute;
  color: #ffffff;
  top: 20px;
  right: 20px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-form span {
  font-size: 20px;
}
</style>
