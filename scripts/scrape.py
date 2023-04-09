from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import re
import time

LINKS = {
    "secured": "https://www.bankrate.com/finance/credit-cards/secured/",
    "new": "https://www.bankrate.com/finance/credit-cards/no-credit-history/",
    "bad": "https://www.bankrate.com/finance/credit-cards/bad-credit/",
    "fair": "https://www.bankrate.com/finance/credit-cards/fair-credit/",
    "good": "https://www.bankrate.com/finance/credit-cards/good-credit/",
    "excellent": "https://www.bankrate.com/finance/credit-cards/excellent-credit/",
    "student": "https://www.bankrate.com/finance/credit-cards/student/",
    "cashback": "https://www.bankrate.com/finance/credit-cards/cash-back/",
}

credit_cards = {}

driver = webdriver.Chrome()

for type, link in LINKS.items():
    driver.get(link)
    time.sleep(2)

    for card in driver.find_elements(By.TAG_NAME, "article"):
        text = card.text.split("\n")

        name = text[1]
        cashback = ", ".join(
            text[text.index("Rewards Rate") + 1 : text.index("Intro offer")]
        )
        annual_fee = text[text.index("Annual fee") + 1].strip("$")
        apr = text[text.index("Regular APR") + 1]
        credit = text[text.index("Recommended credit") + 1]

        if (
            "Zolve Azpire" not in name
            and "See terms" not in annual_fee
            and "See terms" not in apr
        ):
            credit_cards[name.replace("®", "")] = {
                "cashback": None if cashback == "N/A" else cashback,
                "annual_fee": annual_fee,
                "apr": "".join(i for i in apr if i in "0123456789-.").split("-")[0],
                "credit": (lambda x: 0 if x is None else int(x.group()))(
                    re.search(r"\d+", credit)
                ),
                "student": type == "student",
                "secured": type == "secured",
            }

with open("../data/credit_cards.json", "w") as f:
    f.write(json.dumps(credit_cards))
