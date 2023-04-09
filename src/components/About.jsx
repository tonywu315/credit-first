import classes from "./About.module.css";

export function About() {
    return (
        <div className={classes.container}>
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
            </div>
        </div>
    )
}