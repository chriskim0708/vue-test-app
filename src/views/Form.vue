<template>
  <div>
    <h1>사용자 정보 입력</h1>
    <div class="form-box">
      <form>
        <div>
          <label>이름</label>
          <input type="text" placeholder="이름" />
        </div>
        <div>
          <label>번호</label>
          <input type="text" placeholder="휴대폰 번호" />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" placeholder="이메일" />
        </div>
      </form>
    </div>
    <div>
      <button :disabled="step === 0">이전</button>
      <button>다음</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MultiForm",
  setup() {
    const step = ref(0);

    return {
      step,
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
