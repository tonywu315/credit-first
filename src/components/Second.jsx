import { useForm } from "./createForm";
import { useWizard } from "react-use-wizard";

import { Input, Text, Button, Stack } from "@chakra-ui/react";

export const Second = () => {
    const { previousStep } = useWizard();
    const { register } = useForm();

    return (
        <Stack p={10} spacing="12px">
            <Text fontWeight={"bold"} fontSize="2xl">
                Monthly Spending
            </Text>
            <Input placeholder="Income" {...register("income")} />
            <Input placeholder="Rent" {...register("rent")} />
            <Input placeholder="Food" {...register("food")} />
            <Input placeholder="Gas" {...register("gas")} />
            <Input placeholder="Entertainment" {...register("entertainment")} />
            <Input placeholder="Debt" {...register("debt")} />
            <Input placeholder="Other" {...register("other")} />
            <Stack direction="row" spacing={4} justify="center">
                <Button onClick={previousStep}>Previous</Button>
                <Button colorScheme="teal" type="reset">
                    Reset
                </Button>
                <Button colorScheme="teal" type="submit">
                    Submit
                </Button>
            </Stack>
        </Stack>
    );
};
