from selenium import webdriver
from selenium.webdriver.common.by import By
from urllib.parse import urljoin, urlparse
import json
import re
import requests
import time

LINKS = {
    "new": "https://www.bankrate.com/finance/credit-cards/no-credit-history/",
    "bad": "https://www.bankrate.com/finance/credit-cards/bad-credit/",
    "fair": "https://www.bankrate.com/finance/credit-cards/fair-credit/",
    "good": "https://www.bankrate.com/finance/credit-cards/good-credit/",
    "excellent": "https://www.bankrate.com/finance/credit-cards/excellent-credit/",
    "cashback": "https://www.bankrate.com/finance/credit-cards/cash-back/",
    "student": "https://www.bankrate.com/finance/credit-cards/student/",
    "secured": "https://www.bankrate.com/finance/credit-cards/secured/",
}

CATEGORIES = {
    "food": "food",
    "dining": "food",
    "grocery": "food",
    "supermarkets": "food",
    "restaurants": "food",
    "entertainment": "entertainment",
    "streaming": "entertainment",
    "travel": "entertainment",
    "hotel": "entertainment",
    "retail": "entertainment",
    "gas": "gas",
    "transit": "gas",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
}

credit_cards = {}
driver = webdriver.Chrome()


def get_nth_number(x, index, func):
    regex = re.findall(r"[\d]+(?:\.[\d]+)?", x)
    return 0 if regex == [] else func(regex[index])


# Iterate over links
for type, link in LINKS.items():
    driver.get(link)
    time.sleep(2)

    for card in driver.find_elements(By.TAG_NAME, "article"):
        text = card.text.split("\n")

        # Get fields
        name = text[1]
        cashback_list = text[text.index("Rewards Rate") + 1 : text.index("Intro offer")]
        annual_fee = text[text.index("Annual fee") + 1].strip("$")
        apr = text[text.index("Regular APR") + 1]
        credit = text[text.index("Recommended credit") + 1]
        image = card.find_element(By.TAG_NAME, "img").get_attribute("src")
        link = card.find_element(By.TAG_NAME, "a").get_attribute("href")

        # Remove edge cases
        if (
            "zolve azpire" not in name.lower()
            and "credit one" not in name.lower()
            and "petal" not in name.lower()
            and "miles" not in ", ".join(cashback_list).lower()
            and "points" not in ", ".join(cashback_list).lower()
            and "see terms" not in annual_fee.lower()
            and "see terms" not in apr.lower()
        ):
            # Scrape cashback type
            cashback = []
            if len(cashback_list) % 2 == 0:
                for i in range(0, len(cashback_list), 2):
                    long = (
                        cashback_list[i + 1]
                        .replace("–", "")
                        .replace("®", "")
                        .replace("  ", " ")
                    )
                    description = long.lower()

                    limit = re.findall(r"\$([\d,]+)", description)
                    limit = 0 if limit == [] else int(limit[0].replace(",", ""))

                    if limit < 50:
                        limit = 0
                    elif "quarterly maximum" in description:
                        limit = 75

                    category = set()
                    if i == len(cashback_list) - 2:
                        category.add("all")
                    elif "spend category" in description or "choose" in description:
                        category.add("choice")
                    else:
                        for k, v in CATEGORIES.items():
                            if k in description:
                                category.add(v)

                    if len(category) == 0:
                        category = {"other"}

                    cashback.append(
                        {
                            "amount": get_nth_number(cashback_list[i], 0, float),
                            "description": long,
                            "limit": limit,
                            "category": list(category),
                        }
                    )

            # Clean link
            r = requests.get(link, headers=HEADERS)
            link = urljoin(r.url, urlparse(r.url).path)

            credit_cards[name.replace("®", "").replace("℠", "")] = {
                "cashback": cashback,
                "annual_fee": get_nth_number(annual_fee, -1, int),
                "apr": get_nth_number(apr, -1, float),
                "credit": get_nth_number(credit, 0, int),
                "student": type == "student",
                "secured": type == "secured",
                "image": image,
                "link": link,
            }

with open("../src/data/credit_cards.json", "w") as f:
    f.write(json.dumps(credit_cards))
