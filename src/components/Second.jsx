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
            <Input placeholder="Income" type="number" {...register("income")} />
            <Input placeholder="Rent" type="number" {...register("rent")} />
            <Input placeholder="Food" type="number" {...register("food")} />
            <Input placeholder="Gas" type="number" {...register("gas")} />
            <Input
                placeholder="Entertainment"
                type="number"
                {...register("entertainment")}
            />
            <Input placeholder="Debt" type="number" {...register("debt")} />
            <Input placeholder="Other" type="number" {...register("other")} />
            <Stack direction="row" spacing={4} justify="center">
                <Button colorScheme="teal" onClick={previousStep}>
                    Previous
                </Button>
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
