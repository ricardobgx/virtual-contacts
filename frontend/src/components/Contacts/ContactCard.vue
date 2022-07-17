<template>
  <button class="contact-card" v-on:click="openContact">
    <div class="contact-info">
      <MaterialIconOutlined code="perm_identity" color="" />
      <p>{{ contact.nome }}</p>
    </div>
  </button>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";

export default {
  name: "ContactCard",
  props: {
    contact: Object,
    index: Number,
  },
  components: {
    MaterialIconOutlined,
  },
  methods: {
    openContact() {
      this.$emit("open-contact", this.contact.id);
    },
  },
};
</script>
<style scoped>
.contact-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  width: calc((100vw - 140px) / 4);
  height: 50px;
  margin-top: 20px;
  cursor: pointer;
  animation: fadeIn 0.3s linear;
  transition: all 0.2s linear;
}

.contact-card:hover {
  background: var(--primary-color);
}

.contact-card:hover .contact-info {
  color: #ffffff;
}

.contact-info {
  display: flex;
  align-items: center;
  color: var(--primary-color);
  transition: all 0.2s linear;
}

.contact-info p {
  font-size: 15px;
}

.contact-info span {
  margin-right: 10px;
  font-size: 25px;
}

@media (max-width: 1000px) and (min-width: 700px) {
  .contact-card {
    width: calc((100vw - 120px) / 3);
  }
}

@media (max-width: 700px) and (min-width: 500px) {
  .contact-card {
    width: calc((100vw - 100px) / 2);
  }
}

@media (max-width: 500px) {
  .contact-card {
    width: 100%;
  }
}
</style>
