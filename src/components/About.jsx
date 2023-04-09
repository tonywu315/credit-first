import { useNavigate } from "react-router-dom";
import classes from "./About.module.css";

export function About() {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.center}>
                <p className={classes.title}>What's the point?</p>
                <p className={classes.text}>
                According to a 2021 FDIC survey, 6 million people are unbanked in the US; 
                <br />
                an additional 18 million are underbanked, meaning they do not rely on 
                <br />
                bank-based transactions. In this day and age, nearly every significant 
                <br />
                financial commitment requires good credit; unfortunately, many people 
                <br />
                do not have access to resources that promote financial literacy, so 
                <br />
                navigating the process can be extremely difficult. 
                <br />
                <br />

                To address this issue, we created Credit First: a web application that matches 
                <br />
                the user to a credit card suited for their needs, with a focus on building credit. 
                <br />
                The application was designed to give the user a seamless experience, focusing on
                <br />
                key factors that are carefully weighed together in order to provide the 
                <br />
                best financial recommendations.
                </p>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        </div>
    )
}