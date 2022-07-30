<template>
  <div>
    <h1>사용자 정보 입력</h1>
    <div class="form-box">
      <form>
        <div>
          <label>이름</label>
          <input type="text" v-model="formValue.name" placeholder="이름" />
        </div>
        <div>
          <label>번호</label>
          <input
            type="text"
            v-model="formValue.phoneNumber"
            placeholder="휴대폰 번호"
          />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" v-model="formValue.email" placeholder="이메일" />
        </div>
      </form>
    </div>
    <div>
      <button :disabled="step === 0">이전</button>
      <button @click="goNextStep(step)">다음</button>
      {{ step }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useForm, { TValid } from "../composables/useForm.vue";

interface FormControl {
  value: string | number;
  error: TValid[];
}

type FormName =
  | "name"
  | "phoneNumber"
  | "email"
  | "zipCode"
  | "address"
  | "detailAddress"
  | "creditCardNumber";

type InitialFormValue = { [key in FormName]: FormControl };

export default defineComponent({
  name: "MultiForm",
  setup() {
    const step = ref(0);
    const { formValue, isValidCheck } = useForm<InitialFormValue>({
      name: {
        value: "",
        error: ["REQUIRED"],
      },
      phoneNumber: {
        value: "",
        error: ["REQUIRED", "PHONE"],
      },
      email: {
        value: "",
        error: ["REQUIRED", "EMAIL"],
      },
      zipCode: {
        value: "",
        error: [],
      },
      address: {
        value: "",
        error: [],
      },
      detailAddress: {
        value: "",
        error: [],
      },
      creditCardNumber: {
        value: "",
        error: [],
      },
    });
    const goNextStep = () => {
      isValidCheck(["REQUIRED"]);
    };

    return {
      step,
      formValue,
      goNextStep,
    };
  },
});
</script>

<style scoped>
button:disabled {
  background-color: "#ddd";
  cursor: "default";
}
</style>
