import { createForm } from '@createform/react';

export const useForm = createForm({
  initialValues: {
    student: false,
    age: 0,
    goals: [0],
    income: 0,
    rent: 0,
    food: 0,
    gas: 0,
    debt: 0,
  },
  ///mode: "onChange",
});