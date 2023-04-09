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
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Income" type="number" {...register("income")} />
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Rent" type="number" {...register("rent")} />
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Food" type="number" {...register("food")} />
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Gas" type="number" {...register("gas")} />
            <Input
                isInvalid 
                errorBorderColor='#517FA2' 
                variant="filled"
                placeholder="Entertainment"
                type="number"
                {...register("entertainment")}
            />
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Debt" type="number" {...register("debt")} />
            <Input isInvalid errorBorderColor='#517FA2' variant="filled" placeholder="Other" type="number" {...register("other")} />
            <Stack direction="row" spacing={4} justify="center">
<<<<<<< HEAD
                <Button colorScheme="blue" onClick={previousStep}>Previous</Button>
                <Button colorScheme="blue" type="reset">
=======
                <Button colorScheme="teal" onClick={previousStep}>
                    Previous
                </Button>
                <Button colorScheme="teal" type="reset">
>>>>>>> b780e322c7abf50b9f2169d4d3929306e77f0311
                    Reset
                </Button>
                <Button colorScheme="blue" type="submit">
                    Submit
                </Button>
            </Stack>
        </Stack>
    );
};
