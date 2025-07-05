import { Box, VStack, Text, Avatar, Button, Input, Divider } from 'native-base';
import React, { useState } from 'react';

export default function ProfileScreen() {
  const [name] = useState('Demo Kullanıcı');
  const [email] = useState('demo@splitbill.com');
  const [card, setCard] = useState('');

  return (
    <Box flex={1} bg="gray.50" safeArea p={6}>
      <VStack space={6} alignItems="center" mt={8}>
        <Avatar size="2xl" bg="primary.500" source={{ uri: undefined }}>
          SB
        </Avatar>
        <Text fontSize="xl" fontWeight="bold" color="gray.800">{name}</Text>
        <Text fontSize="md" color="gray.500">{email}</Text>
        <Divider my={4} />
        <VStack space={2} w="full">
          <Text fontWeight="semibold" color="gray.700">Kredi Kartı</Text>
          <Input
            placeholder="Kart Numarası (**** **** **** 1234)"
            value={card}
            onChangeText={setCard}
            bg="gray.50"
            borderWidth={1}
            borderColor="gray.200"
            rounded="md"
            fontSize="md"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </VStack>
        <Button colorScheme="primary" w="full" mt={6}>Çıkış Yap</Button>
      </VStack>
    </Box>
  );
} 