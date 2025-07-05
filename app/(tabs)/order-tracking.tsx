import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Button, Divider, HStack, Icon, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/slices/userSlice';

// Demo sipariş verisi (local state)
const initialOrders = [
  { id: 'ORD-1234', name: 'Mercimek Çorbası', quantity: 1, status: 'Hazırlanıyor' },
  { id: 'ORD-1235', name: 'Köfte', quantity: 2, status: 'Hazırlanıyor' },
];

const activeOrder = {
  id: 'ORD-1234',
  status: 'Hazırlanıyor',
  date: '2024-05-20',
  total: 200,
  items: [
    { id: '101', name: 'Köfte', quantity: 2 },
    { id: '201', name: 'Baklava', quantity: 1 },
  ],
};
const pastOrders = [
  {
    id: 'ORD-1222',
    status: 'Teslim Edildi',
    date: '2024-05-18',
    total: 180,
    items: [
      { id: '102', name: 'Tavuk Şiş', quantity: 1 },
      { id: '202', name: 'Sütlaç', quantity: 2 },
    ],
  },
];

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const [orders, setOrders] = useState(initialOrders);
  const [order, setOrder] = useState(activeOrder);
  const [history, setHistory] = useState(pastOrders);

  useEffect(() => {
    if (!isConnected || !tableId) router.push('/qr-scanner');
  }, [isConnected, tableId]);

  const handleIncrease = (id: string) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, quantity: o.quantity + 1 } : o));
    setOrder(o => ({ ...o, items: o.items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) }));
  };
  const handleDecrease = (id: string) => {
    setOrders(orders => orders.map(o => o.id === id && o.quantity > 1 ? { ...o, quantity: o.quantity - 1 } : o));
    setOrder(o => ({ ...o, items: o.items.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i) }));
  };
  const handleCancel = (id: string) => {
    setOrders(orders => orders.filter(o => o.id !== id));
    setOrder(o => ({ ...o, items: o.items.filter(i => i.id !== id) }));
  };

  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>Siparişler</Text>
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
        <Text fontWeight="semibold" color="gray.800">Aktif Sipariş</Text>
        <Text color="primary.500" fontWeight="bold" mb={2}>Durum: {order.status}</Text>
        <Text color="gray.500" fontSize="sm">Tarih: {order.date}</Text>
        <VStack space={2} mt={2}>
          {order.items.map(item => (
            <HStack key={item.id} justifyContent="space-between" alignItems="center">
              <Text>{item.name} x{item.quantity}</Text>
              <HStack space={1} alignItems="center">
                <Pressable onPress={() => handleDecrease(item.id)}>
                  <Icon as={MaterialIcons} name="remove-circle-outline" size={5} color="primary.500" />
                </Pressable>
                <Pressable onPress={() => handleIncrease(item.id)}>
                  <Icon as={MaterialIcons} name="add-circle-outline" size={5} color="primary.500" />
                </Pressable>
                <Pressable onPress={() => handleCancel(item.id)}>
                  <Icon as={MaterialIcons} name="cancel" size={5} color="error.500" />
                </Pressable>
              </HStack>
            </HStack>
          ))}
        </VStack>
        <Divider my={2} />
        <Text fontWeight="bold" color="primary.700">Toplam: ₺{order.total}</Text>
      </Box>
      <Text fontWeight="semibold" color="gray.700" mb={2}>Geçmiş Siparişler</Text>
      <ScrollView>
        <VStack space={4}>
          {history.length === 0 ? (
            <Text color="gray.400" textAlign="center">Geçmiş sipariş yok.</Text>
          ) : (
            history.map(po => (
              <Box key={po.id} bg="white" p={4} rounded="lg" shadow={1}>
                <Text fontWeight="semibold" color="gray.800">Sipariş No: {po.id}</Text>
                <Text color="gray.500" fontSize="sm">Tarih: {po.date}</Text>
                <Text color="primary.500" fontWeight="bold">Durum: {po.status}</Text>
                <VStack space={1} mt={2}>
                  {po.items.map(item => (
                    <Text key={item.id} color="gray.700">{item.name} x{item.quantity}</Text>
                  ))}
                </VStack>
                <Text fontWeight="bold" color="primary.700" mt={2}>Toplam: ₺{po.total}</Text>
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>
      {orders.length > 0 && (
        <Button colorScheme="primary" w="full" size="lg" mt={6} onPress={() => router.push('/payment')}>
          Ödemeye Geç
        </Button>
      )}
    </Box>
  );
} 