import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { Spinner } from "@chakra-ui/react";
import getTips from "../utils/chatbot.mjs";
import cardsData from "./../data/credit_cards.json";
import classes from "./Recommend.module.css";

export const Recommend = () => {
    const params = useParams();
    const [tips, setTips] = useState("");
    const [winner, setWinner] = useState({});
    const [bestCashback, setBestCashback] = useState(Number.NEGATIVE_INFINITY);
    const [bestCashbackParts, setBestCashbackParts] = useState([]);
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
        const mostCategory =
            userCategories.food === mostExpensive
                ? "Food"
                : userCategories.gas === mostExpensive
                ? "Gas"
                : "Entertainment";
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
        let bestCashParts;

        for (const name of availableNames) {
            let card = cardsData[name];
            card["name"] = name;

            let cashback = 0.0;
            let entries = {
                Food: 0,
                Gas: 0,
                Entertainment: 0,
                Other: 0,
            };

            Object.entries(userCategories).forEach((entry) => {
                const [key, value] = entry;
                for (const source of card.cashback) {
                    const amount =
                        source.limit === 0
                            ? (12 * value * source.amount) / 100.0
                            : Math.min(
                                  source.limit,
                                  (12 * value * source.amount) / 100.0
                              );
                    if (source.category.includes(key)) {
                        const type = key.charAt(0).toUpperCase() + key.slice(1);
                        entries[type] = amount;
                        cashback += amount;
                        break;
                    } else if (
                        source.category.includes("choice") &&
                        value === mostExpensive
                    ) {
                        entries[mostCategory] = amount;
                        cashback += amount;
                        break;
                    } else if (source.category[0] === "all") {
                        entries.Other = amount;
                        cashback += amount;
                        break;
                    }
                }
            });

            cashback = cashback - card.annual_fee;
            if (cashback >= bestCash) {
                bestCash = cashback;
                bestCard = card;
                bestCashParts = entries;
            }
        }

        let description = [];
        if (bestCard.cashback) {
            for (const cashback of bestCard.cashback) {
                description.push(<p>{cashback.description}</p>);
            }
        }

        let parts = [];
        Object.entries(bestCashParts).forEach((x) => {
            parts.push(
                <p>
                    {x[0]}: ${x[1]}
                </p>
            );
        });

        setCashbackDetails(description);
        setBestCashback(bestCash);
        setBestCashbackParts(parts);
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
            <img className={classes.logo} src="../geometric.png" alt="logo" />
            <p className={classes.title}>Our Recommendation</p>
            <div className={classes.card}>
                <a href={winner.link} target="_blank" rel="noreferrer">
                    {winner.name}
                </a>
                <div className={classes.body}>
                    <img src={winner.image} alt="credit card" />
                    <div className={classes.info}>
                        <p className={classes.infoheading}>By the numbers</p>
                        <p>APR: {winner.apr}%</p>
                        <p>Annual Fee: ${winner.annual_fee}</p>
                    </div>
                    <div className={classes.infoSecond}>
                        <p className={classes.infoheading}>
                            Estimated Cashback: ${bestCashback}
                        </p>
                        {bestCashbackParts}
                    </div>
                </div>
                <div className={classes.cashback}>
                    {winner.cashback?.length > 0 && (
                        <>
                            <p className={classes.infoheading}>
                                Cashback Structure
                            </p>
                            {cashbackDetails}
                        </>
                    )}
                </div>
            </div>
            <div className={classes.tips}>
                <p>Here are 3 ways to help you succeed:</p>
                {tips}
                {Object.keys(tips).length === 0 ? (
                    <Spinner className={classes.spinner} size="xl" />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
