import { Heading, Text, VStack } from 'native-base';
import React from 'react';
import Logo from "../assets/logo.svg";
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const New = () => {

  return (
    <VStack flex={1} bg="gray.900">

    <Header title='Criar novo bolão' showBackButton />

        <VStack alignItems='center' mt={8} mx={5}>
            <Logo width={150} />

            <Heading fontFamily='heading' color='white' mt={8} fontSize='xl'>
                Crie seu próprio bolão da copa  {'\n'}  e compartilhe com amigos!
            </Heading>

            <Input placeholder='Qual o nome do seu bolão' mt={8} />
            <Button title='CRIAR MEU BOLÃO' mt={3}/>

            <Text color='gray.200' textAlign='center' fontSize='sm' mt={5} px={10}>
                Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
            </Text>


            
        </VStack>


    </VStack>
  );
};
