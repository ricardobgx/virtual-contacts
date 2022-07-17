<template>
  <div class="contacts-actions">
    <button class="new-contact-button" v-on:click="openForm">
      <p>New contact</p>
      <MaterialIconOutlined code="add" color="" />
    </button>
    <div class="search-contacts">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search contacts"
        v-model="name"
      />
      <p class="search-contacts-icon">
        <MaterialIconOutlined code="search" color="" />
      </p>
    </div>
  </div>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";

export default {
  name: "ContactsActions",
  components: {
    MaterialIconOutlined,
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    openForm() {
      this.$emit("open-form");
    },
  },
  watch: {
    name(text) {
      if (text.trim()) {
        this.$emit("search-contacts", text);
      } else {
        this.$emit("clear-search");
      }
    },
  },
};
</script>
<style scoped>
.contacts-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.new-contact-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background: var(--primary-color);
  padding: 0 20px;
  font-size: 15px;
  min-width: max-content;
  margin-right: 20px;
  cursor: pointer;
}

.new-contact-button p {
  margin-right: 10px;
}

.new-contact-button span {
  font-size: 20px;
}

.search-contacts {
  display: flex;
  width: 500px;
  align-items: center;
  height: 40px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.45);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search-contacts input {
  padding: 5px 10px;
  border: none;
  font-size: 15px;
  background: none;
  width: 100%;
  color: var(--primary-color);
}

.search-contacts input::placeholder {
  color: var(--secondary-color);
}

.search-contacts-icon {
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 950px) {
  .search-contacts {
    position: relative;
    width: 100%;
    left: unset;
    transform: unset;
  }
}

@media (max-width: 600px) {
  .new-contact-button p {
    display: none;
  }
}
</style>
