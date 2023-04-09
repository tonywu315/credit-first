import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import getTips from "../utils/chatbot.mjs";
import cardsData from "./../data/credit_cards.json";
import classes from "./Recommend.module.css";

export const Recommend = () => {
    const params = useParams();
    const [tips, setTips] = useState("");
    const [winner, setWinner] = useState({});
    const [bestCashback, setBestCashback] = useState(Number.NEGATIVE_INFINITY);
    const [cashbackDetails, setCashbackDetails] = useState({});

    let userData = JSON.parse(
        Buffer.from(params.userData, "base64").toString()
    ); // these are where the answers are
    userData.age = parseInt(userData.age);
    userData.creditScore = parseInt(userData.creditScore);
    userData.income = parseInt(userData.income);
    userData.rent = parseInt(userData.rent);
    userData.food = parseInt(userData.food);
    userData.gas = parseInt(userData.gas);
    userData.debt = parseInt(userData.debt);
    userData.entertainment = parseInt(userData.entertainment);

    useEffect(() => {
        const userCategories = {
            food: userData.food,
            gas: userData.gas,
            entertainment: userData.entertainment,
        };
        const mostExpensive = Math.max(Object.values(userCategories));
        const availableNames = Object.keys(cardsData)
            .filter((name) => {
                let card = cardsData[name];
                return (card.student && userData.student) || !card.student;
            })
            .filter((name) => {
                let card = cardsData[name];
                if (userData.creditScore === 0 || isNaN(userData.creditScore)) {
                    let predicted_score =
                        0.005524 * (userData.income - userData.debt) + 343.3;
                    return card.credit <= predicted_score;
                }
                if (userData.creditScore >= 650 && card.secured) {
                    return false;
                }
                return card.credit <= userData.creditScore;
            });

        let bestCash = Number.NEGATIVE_INFINITY;
        let bestCard = null;

        for (const name of availableNames) {
            let card = cardsData[name];
            card["name"] = name;

            let cashback = 0.0;
            Object.entries(userCategories).forEach((entry) => {
                const [key, value] = entry;
                for (const source of card.cashback) {
                    if (
                        source.category.includes(key) ||
                        (source.category.includes("choice") &&
                            value === mostExpensive) ||
                        source.category[0] === "all"
                    ) {
                        if (source.limit === 0) {
                            cashback += (12 * value * source.amount) / 100.0;
                        } else {
                            cashback += Math.min(
                                source.limit,
                                (12 * value * source.amount) / 100.0
                            );
                        }
                        break;
                    }
                }
            });

            cashback = cashback - card.annual_fee;
            if (cashback >= bestCash) {
                bestCash = cashback;
                bestCard = card;
            }
        }

        let description = [];
        if (bestCard.cashback) {
            for (const cashback of bestCard.cashback) {
                description.push(<p>{cashback.description}</p>);
            }
        }
        setCashbackDetails(description);
        setBestCashback(bestCash);
        setWinner(bestCard);
    }, []);

    useEffect(() => {
        const callTips = async () => {
            const response = await getTips(userData);
            setTips(response);
        };
        if (userData) {
            callTips();
        }
    }, []);

    return (
        <div className={classes.container}>
            <p className={classes.title}>
                Our Recommendation:{" "}
                <a href={winner.link} target="_blank">
                    {winner.name}
                </a>
            </p>
            <div className={classes.card}>
                <img src={winner.image} alt="credit card" />
                <div className={classes.info}>
                    <p className={classes.infoheading}>By the numbers</p>
                    <p>APR: {winner.apr}%</p>
                    <p>Annual Fee: ${winner.annual_fee}</p>
                    <p>Estimated Cashback: ${bestCashback}</p>
                    {winner.cashback?.length > 0 && (
                        <>
                            <p className={classes.infoheading}>
                                Cashback Structure
                            </p>
                            {cashbackDetails}
                            <p className={classes.infoheading}>
                                Estimated Cashback: ${bestCashback}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={classes.tips}>{tips}</div>
        </div>
    );
};
