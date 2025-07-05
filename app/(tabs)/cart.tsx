import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Button, HStack, Icon, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { useUserStore } from '../../stores/slices/userSlice';
// Demo sepet verisi
const cartItems = [
  { id: '101', name: 'Mercimek Çorbası', price: 60, quantity: 1 },
  { id: '102', name: 'Köfte', price: 120, quantity: 2 },
];
export default function CartScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  useEffect(() => {
    if (!isConnected || !tableId) router.push('/qr-scanner');
  }, [isConnected, tableId]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>Sepetim</Text>
      {cartItems.length === 0 ? (
        <VStack flex={1} justifyContent="center" alignItems="center" space={4}>
          <Icon as={MaterialIcons} name="shopping-cart" size={16} color="gray.300" />
          <Text fontSize="lg" color="gray.500">Sepetiniz boş</Text>
        </VStack>
      ) : (
        <>
          <VStack space={3} mb={4}>
            {cartItems.map(item => (
              <Box key={item.id} bg="white" p={4} rounded="lg" shadow={1}>
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text fontWeight="semibold" color="gray.800">{item.name}</Text>
                    <Text color="primary.500">₺{item.price} x {item.quantity}</Text>
                  </VStack>
                  <Text fontWeight="bold" color="primary.500">₺{item.price * item.quantity}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Toplam:</Text>
            <Text fontSize="xl" fontWeight="bold" color="primary.500">₺{total}</Text>
          </HStack>
          <Button colorScheme="primary" w="full" size="lg" onPress={() => router.push('/order-tracking')}>Ödemeye Geç</Button>
        </>
      )}
    </Box>
  );
} 