import { Avatar, Box, Button, Text, VStack } from 'native-base';
import React from 'react';

export default function ProfileScreen() {
  return (
    <Box flex={1} bg="gray.50" safeArea p={6}>
      <VStack space={6} alignItems="center" mt={8}>
        <Avatar size="2xl" bg="primary.500" source={{ uri: undefined }}>
          SB
        </Avatar>
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          Demo Kullanıcı
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          SplitBill uygulamasına hoş geldiniz! Profilinizi ve sipariş geçmişinizi buradan yönetebilirsiniz.
        </Text>
        <Button colorScheme="primary" mt={8} w="full">
          Çıkış Yap
        </Button>
      </VStack>
    </Box>
  );
} 