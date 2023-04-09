import { useForm } from "./createForm";
import { useWizard } from "react-use-wizard";

import { Input, Text, Button, Stack, Select } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import classes from "./First.module.css";

export const First = () => {
    const { nextStep } = useWizard();
    const { register } = useForm();

    return (
        <Stack p={10} spacing="12px">
            <Text className={classes.text} fontWeight={"bold"}>
                Age
            </Text>
            <Input placeholder="" type="number" {...register("age")} />
            <Checkbox {...register("student")}>
                <b className={classes.text}>Student?</b>
            </Checkbox>
            <Text className={classes.text} fontWeight={"bold"}>
                Credit Score (if applicable)
            </Text>
            <Input
                colorScheme="blue"
                placeholder=""
                type="number"
                {...register("creditScore")}
            />
            <Text className={classes.text} fontWeight={"bold"}>
                Financial Goals
            </Text>
            <Select placeholder="" {...register("goals")}>
                <option value="saving">Saving Money</option>
                <option value="credit">Building Credit</option>
                <option value="debt">Paying off Debt</option>
            </Select>

            <Stack
                className={classes.bottom}
                direction="row"
                spacing={12}
                justify="center"
            >
                <Button colorScheme="blue" type="reset">
                    Reset
                </Button>
                <Button colorScheme="blue" onClick={nextStep}>
                    Next
                </Button>
            </Stack>
        </Stack>
    );
};
