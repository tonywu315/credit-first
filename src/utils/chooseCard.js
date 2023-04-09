import creditCards from '../data/creditCards.js';
import { getData } from '../utils/localStorage.js'

const chooseCard = () => {
    const answers = getData()
    let available_cards = creditCards
    available_cards = available_cards.filter(function(card) {
        return card.student === answers[student];
    });

}
export default chooseCard
