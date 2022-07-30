<script lang="ts">
import { reactive } from "vue";

enum Valid {
  REQUIRED = "REQUIRED",
  PHONE_NUMBER = "PHONE_NUMBER",
  EMAIL = "EMAIL",
  CREDIT_CARD = "CREDIT_CARD",
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
  const isValidPhoneNumber = (value: string): boolean => {
    if (!value) return false;
    const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return regex.test(value);
  };
  const isValidRequired = (value: string): boolean => {
    return !!value;
  };
  const isValidCreditCardNumber = (value: string): boolean => {
    if (!value) return false;
    const regex = /([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{4})/;
    const regTest = regex.test(value);
    console.log("card regTest", regTest);
    if (!regTest) return false;
    const reverse = value
      .replace(/[^0-9]/g, "")
      .split("")
      .reverse();
    const sumOdd = reverse.reduce((a: number, b: string, idx: number) => {
      if ((idx + 1) % 2 !== 0) {
        return Number(b) + a;
      }
      return a;
    }, 0);
    const sumEven = reverse.reduce((a: number, b: string, idx: number) => {
      if ((idx + 1) % 2 === 0) {
        const sumNumber =
          Number(b) * 2 >= 10
            ? String(Number(b) * 2)
                .split("")
                .reduce((c: number, d: string) => c + Number(d), 0)
            : Number(b) * 2;
        return sumNumber + a;
      }
      return a;
    }, 0);
    console.log("sum", sumOdd + sumEven);
    return (sumOdd + sumEven) % 10 === 0;
  };
  const matchValidFn: { [key in TValid]: Function } = {
    REQUIRED: isValidRequired,
    PHONE_NUMBER: isValidPhoneNumber,
    EMAIL: isValidEmail,
    CREDIT_CARD: isValidCreditCardNumber,
  };
  const isValidCheck = ({
    value,
    error = [],
  }: {
    value: string;
    error: TValid[];
  }) => {
    if (error.length === 0) return true;
    console.log("isValid", error);
    return error
      .map((errorName: TValid) =>
        matchValidFn[errorName](value.replace(/ /g, ""))
      )
      .every((valid: boolean) => valid === true);
  };
  return { formValue, isValidCheck };
};

export default useForm;
</script>
