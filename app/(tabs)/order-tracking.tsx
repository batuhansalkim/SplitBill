import { useRouter } from 'expo-router';
import { Box, Button, HStack, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { useUserStore } from '../../stores/slices/userSlice';
// Demo sipariş verisi
const order = {
  id: 'ORD-1234',
  status: 'Hazırlanıyor',
  items: [
    { id: '101', name: 'Mercimek Çorbası', quantity: 1 },
    { id: '102', name: 'Köfte', quantity: 2 },
  ],
};
export default function OrderTrackingScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  useEffect(() => {
    if (!isConnected || !tableId) router.push('/qr-scanner');
  }, [isConnected, tableId]);
  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>Sipariş Takibi</Text>
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
        <Text fontWeight="semibold" color="gray.800">Sipariş No: {order.id}</Text>
        <Text color="primary.500" fontWeight="bold" mb={2}>Durum: {order.status}</Text>
        <VStack space={2}>
          {order.items.map(item => (
            <HStack key={item.id} justifyContent="space-between">
              <Text>{item.name} x{item.quantity}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Button colorScheme="primary" w="full" size="lg" onPress={() => router.push('/')}>Ana Sayfaya Dön</Button>
    </Box>
  );
} 