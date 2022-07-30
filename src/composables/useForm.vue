<script lang="ts">
import { reactive } from "vue";

enum Valid {
  REQUIRED = "REQUIRED",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
}
export type TValid = `${Valid}`;

const useForm = <T extends Object>(initialFormValue: T) => {
  const formValue = reactive(initialFormValue);
  const isValidEmail = (value: string): boolean => {
    if (!value) return false;
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regex.test(value);
  };
  const isValidRequired = (value: string): boolean => {
    return !!value;
  };
  const matchValidFn: { [key in TValid]: Function } = {
    REQUIRED: isValidRequired,
    PHONE: isValidRequired,
    EMAIL: isValidEmail,
  };
  const isValidCheck = (error: TValid[] = []) => {
    if (error.length === 0) return true;
    return error
      .map((errorName: TValid) => matchValidFn[errorName]())
      .every((valid) => valid === true);
  };
  return { formValue, isValidCheck };
};

export default useForm;
</script>
