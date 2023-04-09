import { useParams } from "react-router-dom"
import { Buffer } from "buffer"

import { Grid, GridItem, Container } from "@chakra-ui/react";

import cardData from './../data/credit_cards.json';

export function Recommend() {
  let params = useParams();
  const userData = JSON.parse(Buffer.from(params.userData, "base64").toString()) // these are where the answers are
  

  // let available_cards = cardData
  // available_cards = available_cards.filter(function(card) { // filter on student
  //   return ((card.student && userData[student]) || !card.student)
  // });
  // available_cards = available_cards.filter(function(card) { // filter on score
  //   if (userData[score] == 0) {
  //     let predicted_score = 0.005524 * userData[income] + 343.3
  //     return (card.score <= predicted_score)
  //   }
  //   return (card.score <= userData[score])
  // });
  // let maximizer = 0

  // for (const card in available_cards) {
  //   let factor = 0
  //   let total = 0
  //   for (const source in card.cashback) {
  //     let contribution = 0
  //     for (const category in source.category) {
  //       if (category != "all") {
  //         contribution += (source.amount/100) * userData[category]
  //       }
  //       else {
  //         contribution += Math.max((source.amount/100)*userData["entertainment"], (source.amount/100)*userData["rent"], (source.amount/100)*userData["food"])
  //       }
  //     }
  //     contribution = min(contribution, source[limit])
  //     total += contribution
  //   }
  //   factor = (age-18)/userData[debt] + total - card[annual_fee]
  //   maximizer = max(factor, maximizer)
  // }

  // let winner = null

  // for (const card in available_cards) {
  //   let factor = 0
  //   let total = 0
  //   for (const source in card.cashback) {
  //     let contribution = 0
  //     for (const category in source.category) {
  //       if (category != "all") {
  //         contribution += (source.amount/100) * userData[category]
  //       }
  //       else {
  //         contribution += Math.max((source.amount/100)*userData["entertainment"], (source.amount/100)*userData["rent"], (source.amount/100)*userData["food"])
  //       }
  //     }
  //     contribution = min(contribution, source[limit])
  //     total += contribution
  //   }
  //   factor = (age-18)/userData[debt] + total - card[annual_fee]
  //   if (factor === maximizer) {
  //     winner = card
  //   }
  // }


  return (
    <div>
      <Container bg='grey'>
        <Grid
          h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} bg='tomato' />
          <GridItem colSpan={2} bg='papayawhip' />
          <GridItem colSpan={2} bg='papayawhip' />
          <GridItem colSpan={4} bg='tomato' />
        </Grid>
      </Container>
    </div>
  )
}