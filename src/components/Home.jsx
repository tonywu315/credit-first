import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <img className={classes.logo} src="./geometric.png" alt="logo" />
            <span onClick={() => navigate("/about")}>
                What is Credit First?
            </span>
            <img className={classes.card} src="./credit_cards.png" alt="logo" />
            <div className={classes.center}>
                <p className={classes.title}>FINANCE YOUR FUTURE</p>
                <p className={classes.text}>
                    Whether you're looking to build credit,
                    <br />
                    earn rewards, or save money,
                    <font color="#EC7955"> Credit First</font>
                    <br />
                    has got your back. No more confusion or <br />
                    stress when it comes to credit cards.
                    <br />
                    Start your journey today!
                </p>
                <button onClick={() => navigate("/form")}>Get Started</button>
            </div>
        </div>
    );
};
