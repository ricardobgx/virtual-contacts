<template>
  <div class="new-user-form-field" v-bind:style="`border-color:` + color">
    <MaterialIconOutlined :code="iconCode" :color="color" />
    <input
      :type="fieldType"
      name=""
      :id="fieldType"
      :placeholder="fieldPlaceholder"
      v-on:focus="focusOnInput"
      v-on:blur="blurOnInput"
      v-model="text"
      v-on:change="sendText"
      v-bind:style="`color:` + color"
    />
  </div>
</template>
<script>
import MaterialIconOutlined from "../App/MaterialIcon.vue";

export default {
  name: "NewUserFormField",
  props: {
    iconCode: String,
    fieldType: String,
    fieldPlaceholder: String,
  },
  components: {
    MaterialIconOutlined,
  },
  data() {
    return {
      color: "#cccccc",
      text: "",
    };
  },
  methods: {
    focusOnInput() {
      this.color = "#757bc8";
    },
    blurOnInput() {
      if (!this.text.trim()) {
        this.color = "#cccccc";
      }
    },
    sendText() {
      this.$emit("text-changed", this.text);
    },
  },
};
</script>
<style scoped>
.new-user-form-field {
  display: flex;
  align-items: center;
  width: 350px;
  padding: 5px;
  border-bottom: 2px solid var(--secondary-color);
  color: var(--secondary-color);
  transition: all 0.2s linear;
}

.new-user-form-field input {
  border: none;
  padding: 5px;
  font-size: 15px;
  width: 100%;
  color: var(--secondary-color);
  transition: all 0.2s linear;
}

.new-user-form-field {
  margin-top: 10px;
}

.new-user-form-field:nth-child(2) {
  margin-top: 0px;
}

.new-user-form-field input::placeholder {
  color: var(--secondary-color);
}

.new-user-form-field span {
  font-size: 25px;
  transition: all 0.2s linear;
}

@media (max-width: 500px) {
  .new-user-form-field {
    width: 100%;
  }
}
</style>
