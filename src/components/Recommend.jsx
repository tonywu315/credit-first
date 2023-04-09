import { useParams } from "react-router-dom"
import { Buffer } from "buffer"

import { Center, Image, HStack, VStack, Box, Container, Grid, Text } from "@chakra-ui/react";

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
      winner.name = name
    }
  }

  console.log(winner.cashback.length)

  return (
    <div>
      <Container h='100vh' maxWidth="container.lg">
        <VStack spacing="10px">
          <Box h='13vh' w='100vh' bg="tomato"></Box>
          <Text align='left' fontSize='34px'>Our Best Choice</Text>
          <Box h='45vh' w='100vh'>
            <a href={winner.link} rel="noreferrer noopener" target="_blank">  
            <VStack spacing='8px'>
              <HStack maxWidth='50%' spacing='40px'>
                <img src={winner.image}/>
                <Text fontSize='28px' fontWeight='bold'>{winner.name}</Text>
              </HStack>
              
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <div>
                  
                </div>
              </div>
            </VStack>
            </a>
          </Box>
          <Box h='30vh' w='100vh'></Box>
          <Box h='5vh' w='100vh' bg="tomato"></Box>
        </VStack>
      </Container>
    </div>
  )
}