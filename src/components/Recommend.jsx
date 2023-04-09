import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import getTips from "../utils/chatbot.js";
import cardsData from "./../data/credit_cards.json";
import classes from "./Recommend.module.css";

export const Recommend = () => {
    const [tips, setTips] = useState("");

    let params = useParams();
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

    const userCategories = {
        food: parseInt(userData.food),
        gas: parseInt(userData.gas),
        entertainment: parseInt(userData.entertainment),
    };
    const mostExpensive = Math.max(Object.values(userCategories));

    let availableNames = Object.keys(cardsData);

    availableNames = availableNames
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

    let bestCashback = Number.NEGATIVE_INFINITY;
    let winner = null;

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
        if (cashback >= bestCashback) {
            bestCashback = cashback;
            winner = card;
        }
    }

    let cashbackDetails = [];
    for (const cashback of winner.cashback) {
        cashbackDetails.push(<p>{cashback.description}</p>);
    }

    // useEffect(() => {
    //     const callTips = async () => {
    //         setTips(await getTips());
    //     };
    //     callTips();
    // }, []);

    return (
        <div className={classes.container}>
            <p className={classes.title}>Our Recommendation: <a href={winner.link} target="_blank">{winner.name}</a></p>
            <div className={classes.card}>
                <img src={winner.image} alt="credit card" />
                <div className={classes.info}>
                    <p className={classes.infoheading}>By the numbers</p>
                    <p>APR: {winner.apr}%</p>
                    <p>Annual Fee: ${winner.annual_fee}</p>
                    {(winner.cashback.length > 0 && bestCashback > Number.NEGATIVE_INFINITY) && (
                        <>
                            <p className={classes.infoheading}>Cashback Structure</p>
                            {cashbackDetails}
                            <p className={classes.infoheading}>Estimated Cashback: ${bestCashback}</p>
                        </>
                    )}
                    
                </div>
            </div>
            <div className={classes.tips}>{tips}</div>
        </div>
    );
};
