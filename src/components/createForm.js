import { createForm } from "@createform/react";

export const useForm = createForm({
  initialValues: {
    student: false,
    age: 0,
    goals: "",
    creditScore: 0,
    income: 0,
    rent: 0,
    food: 0,
    entertainment: 0,
    gas: 0,
    debt: 0,
    other: 0,
  },
  ///mode: "onChange",
});
