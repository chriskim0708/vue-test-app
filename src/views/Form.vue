<template>
  <div>
    <h1>사용자 정보 입력</h1>
    <div class="form-box">
      <form>
        <template v-if="step === 0">
          <div>
            <label>이름</label>
            <input
              type="text"
              v-model="formValue.name.value"
              placeholder="이름"
            />
          </div>
          <div>
            <label>번호</label>
            <input
              type="text"
              v-model="formValue.phoneNumber.value"
              placeholder="휴대폰 번호"
            />
          </div>
          <div>
            <label>이메일</label>
            <input
              type="text"
              v-model="formValue.email.value"
              placeholder="이메일"
            />
          </div>
        </template>
        <template v-else-if="step === 1">
          <div>
            <label>우편번호</label>
            <input
              type="text"
              v-model="formValue.zipCode.value"
              placeholder="우편번호"
            />
            <button type="button" @click="showPostalPopup">
              우편번호 찾기
            </button>
          </div>
          <div>
            <label>주소</label>
            <input
              type="text"
              v-model="formValue.address.value"
              placeholder="주소"
            />
          </div>
          <div>
            <label>상세주소</label>
            <input
              type="text"
              v-model="formValue.detailAddress.value"
              placeholder="상세주소"
            />
          </div>
        </template>
        <template v-else-if="step === 2">
          <div>
            <label>신용카드</label>
            <input
              type="text"
              v-model="formValue.creditCardNumber.value"
              placeholder="신용카드"
            />
          </div>
        </template>
      </form>
    </div>
    <div>
      <button :disabled="step === 0" @click="goPrevStep">이전</button>
      <button @click="goNextStep(step)">다음</button>
    </div>
    <div v-if="print">
      {{ JSON.stringify(print) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useForm, { TValid } from "../composables/useForm.vue";

interface FormControl {
  value: string;
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

interface PrintData {
  name: string;
  address: {
    addr1: string;
    addr2: string;
    postal: string;
  };
  email: string;
  creditNumber: string;
}

export default defineComponent({
  name: "MultiForm",
  setup() {
    const step = ref(0);
    const print = ref<null | PrintData>(null);
    const { formValue, isValidCheck } = useForm<InitialFormValue>({
      name: {
        value: "",
        error: ["REQUIRED"],
      },
      phoneNumber: {
        value: "",
        error: ["REQUIRED", "PHONE_NUMBER"],
      },
      email: {
        value: "",
        error: ["REQUIRED", "EMAIL"],
      },
      zipCode: {
        value: "",
        error: ["REQUIRED"],
      },
      address: {
        value: "",
        error: ["REQUIRED"],
      },
      detailAddress: {
        value: "",
        error: ["REQUIRED"],
      },
      creditCardNumber: {
        value: "",
        error: ["REQUIRED", "CREDIT_CARD"],
      },
    });
    const goPrevStep = () => {
      if (step.value > 0) {
        step.value--;
      }
    };
    const goNextStep = () => {
      switch (step.value) {
        case 0: {
          const valid = [
            isValidCheck(formValue.name),
            isValidCheck(formValue.phoneNumber),
            isValidCheck(formValue.email),
          ].every((valid) => valid === true);
          valid && step.value++;
          break;
        }
        case 1: {
          const valid = [
            isValidCheck(formValue.zipCode),
            isValidCheck(formValue.address),
            isValidCheck(formValue.detailAddress),
          ].every((valid) => valid === true);
          valid && step.value++;
          break;
        }
        case 2: {
          const valid = isValidCheck(formValue.creditCardNumber);
          valid && printInputData();
          break;
        }
        default: {
          return false;
        }
      }
    };
    const showPostalPopup = () => {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          if (fullRoadAddr !== "") {
            fullRoadAddr += extraRoadAddr;
          }

          formValue.zipCode.value = data.zonecode;
          formValue.address.value = fullRoadAddr;
        },
      }).open();
    };
    const printInputData = () => {
      print.value = {
        name: formValue.name.value,
        address: {
          addr1: formValue.address.value,
          addr2: formValue.detailAddress.value,
          postal: String(formValue.zipCode),
        },
        email: formValue.email.value,
        creditNumber: formValue.creditCardNumber.value.replace(
          /^(\d{4})(\d{4})(\d{4})(\d{4})$/,
          `$1-$2-$3-$4`
        ),
      };
    };

    return {
      step,
      print,
      formValue,
      goPrevStep,
      goNextStep,
      showPostalPopup,
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
