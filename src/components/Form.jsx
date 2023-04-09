import { useNavigate } from "react-router-dom";
import { Wizard } from "react-use-wizard";
import { useForm } from "./createForm";
import { Buffer } from "buffer";
import { First } from "./First";
import { Second } from "./Second";
import { Container } from "@chakra-ui/react";
import classes from "./Form.module.css";

export const Form = () => {
    const form = useForm();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values);
        navigate(
            "/recommend/" +
                Buffer.from(JSON.stringify(values)).toString("base64")
        );
    };

    const handleReset = () => {};

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.info}></div>
                <Container className={classes.form} maxW="container.md">
                    <form
                        onReset={form.handleReset(handleReset)}
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <Wizard>
                            <First />
                            <Second />
                        </Wizard>
                    </form>
                </Container>
            </div>
        </div>
    );
};
