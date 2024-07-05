import { DirectiveBinding } from "vue";

const decimalDirective = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    el.addEventListener("input", () => {
      const value = el.value;
      if (!value.match(/^\d*\.?\d*$/)) {
        el.value = value.replace(/[^0-9.]/g, "");
      }
      if ((value.match(/\./g) || []).length > 1) {
        el.value = value.substring(0, value.length - 1);
      }
    });
  },
};

export default decimalDirective;
