import { useParams } from "react-router-dom"
import { Buffer } from "buffer"

import { Grid, GridItem, Container } from "@chakra-ui/react";

import cardsData from './../data/credit_cards.json';

export function Recommend() {
  let params = useParams();
  let userData = JSON.parse(Buffer.from(params.userData, "base64").toString()) // these are where the answers are
  
  userData.age = parseInt(userData.age)
  userData.creditScore = parseInt(userData.creditScore)
  userData.income = parseInt(userData.income)
  userData.rent = parseInt(userData.rent)
  userData.food = parseInt(userData.food)
  userData.gas = parseInt(userData.gas)
  userData.debt = parseInt(userData.debt)
  userData.entertainment = parseInt(userData.entertainment)

  let availableNames = Object.keys(cardsData)

  availableNames = availableNames.filter(name => {
    let card = cardsData[name]
    return ((card.student && userData.student) || !card.student)
  })


  availableNames = availableNames.filter(name => {
    let card = cardsData[name]
    if (userData.creditScore == 0 || isNaN(userData.creditScore)) {
      let predicted_score = 0.005524 * userData.income + 343.3
      return (card.credit <= predicted_score)
    }
    return (card.credit <= userData.creditScore)
  })


  let maximizer = 0;


  for (const name of availableNames) {
    let card = cardsData[name]
    let factor = 0
    let total = 0
    for (const source of card.cashback) {
      let contribution = 0
      for (const category of source.category) {
        if (category != "all") {
          contribution += (source.amount/100) * userData[category]
        }
        else {
          contribution += Math.max((source.amount/100)*userData["entertainment"], (source.amount/100)*userData["rent"], (source.amount/100)*userData["food"])
        }
      }
      contribution = Math.min(contribution, source.limit)
      total += contribution
    }
    factor = (userData.age-18)/userData.debt + total - card.annual_fee


    maximizer = Math.max(factor, maximizer)
  }

  // console.log(availableNames)

  let winner = null

  for (const name of availableNames) {
    let card = cardsData[name]
    let factor = 0
    let total = 0
    for (const source of card.cashback) {
      let contribution = 0
      for (const category of source.category) {
        if (category != "all") {
          contribution += (source.amount/100) * userData[category]
        }
        else {
          contribution += Math.max((source.amount/100)*userData["entertainment"], (source.amount/100)*userData["rent"], (source.amount/100)*userData["food"])
        }
      }
      contribution = Math.min(contribution, source.limit)
      total += contribution
    }
    factor = (userData.age-18)/userData.debt + total - card.annual_fee
    if (factor === maximizer) {
      winner = card
    }
  }

  console.log(winner)

  return (
    <div>
        <Grid
          h='100vh'
          w='100vw'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} bg='tomato' />
          <GridItem colSpan={2} bg='papayawhip' />
          <GridItem colSpan={2} bg='papayawhip' />
          <GridItem colSpan={4} bg='tomato' />
        </Grid>
    </div>
  )
}