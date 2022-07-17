<template>
  <div class="contact-background">
    <div class="contact">
      <h2>Contact</h2>
      <button class="close-form" v-on:click="closeForm">
        <MaterialIconOutlined code="close" color="" />
      </button>
      <div class="contact-info">
        <div class="contact-info-detail">
          <MaterialIconOutlined code="perm_identity" color="" />
          <p>{{ contact.nome }}</p>
        </div>
        <div class="contact-info-detail">
          <MaterialIconOutlined code="phone" color="" />
          <p>{{ contact.telefone }}</p>
        </div>
      </div>
      <div class="contact-actions">
        <button
          class="create-contact-button edit-contact-button"
          v-on:click="editContact"
        >
          <MaterialIconOutlined code="edit" color="" />
        </button>
        <button
          class="create-contact-button delete-contact-button"
          v-on:click="deleteContact"
        >
          <MaterialIconOutlined code="delete" color="" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";
import ContactAPI from "../../services/api";

export default {
  name: "ContactDetails",
  components: {
    MaterialIconOutlined,
  },
  props: {
    isActive: Boolean,
    contactId: Number,
  },
  data() {
    return {
      contact: {},
    };
  },
  methods: {
    closeForm() {
      this.$emit("close-contact");
    },
    async getContact() {
      const token = localStorage.getItem("token");

      await ContactAPI.get(`/contatos/${this.contactId}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then((response) => {
        this.contact = response.data.contato;
      });
    },
    async deleteContact() {
      const token = localStorage.getItem("token");

      await ContactAPI.delete(`/contatos/${this.contactId}`, {
        headers: {
          "Auth-Token": token,
        },
      }).then(() => {
        this.$emit("delete-contact");
        this.closeForm();
      });
    },
    editContact() {
      this.$emit("edit-contact", this.contact.id);
      this.closeForm();
    },
  },
  mounted() {
    this.getContact();
  },
};
</script>
<style scoped>
.contact-background {
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

.contact {
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

.new-contact-form h2 {
  font-size: 18px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
}

.contact-info-detail {
  display: flex;
  width: 100%;
}

.contact-info-detail:nth-child(2) {
  margin-top: 10px;
}

.contact-info-detail span {
  margin-right: 10px;
  font-size: 25px;
}

.contact-info-detail p {
  font-size: 15px;
}

.contact-actions button {
  color: #ffffff;
  border-radius: 5px;
  border: none;
  height: 40px;
  width: calc(50% - 10px);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-actions button span {
  font-size: 20px;
}

.edit-contact-button {
  background: var(--primary-color);
}

.delete-contact-button {
  background: #e63946;
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

.contact-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 500px) {
  .contact {
    width: calc(100% - 80px);
  }
}
</style>
