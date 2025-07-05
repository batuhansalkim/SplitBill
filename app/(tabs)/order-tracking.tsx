import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Divider, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { useUserStore } from '../../stores/slices/userSlice';

// Demo sipariş verisi
const demoOrders = [
  {
    id: 'ORD-1234',
    status: 'preparing',
    statusText: 'Hazırlanıyor',
    date: '2024-05-20',
    time: '14:30',
    total: 200,
    items: [
      { id: '101', name: 'Köfte', quantity: 2, price: 120 },
      { id: '201', name: 'Baklava', quantity: 1, price: 50 },
    ],
    estimatedTime: 15, // dakika
  },
  {
    id: 'ORD-1235',
    status: 'confirmed',
    statusText: 'Sipariş Onaylandı',
    date: '2024-05-20',
    time: '14:25',
    total: 180,
    items: [
      { id: '102', name: 'Tavuk Şiş', quantity: 1, price: 130 },
      { id: '301', name: 'Ayran', quantity: 1, price: 20 },
    ],
    estimatedTime: 20,
  },
];

const pastOrders = [
  {
    id: 'ORD-1222',
    status: 'delivered',
    statusText: 'Teslim Edildi',
    date: '2024-05-18',
    time: '19:45',
    total: 180,
    items: [
      { id: '102', name: 'Tavuk Şiş', quantity: 1, price: 130 },
      { id: '202', name: 'Sütlaç', quantity: 2, price: 45 },
    ],
  },
  {
    id: 'ORD-1221',
    status: 'delivered',
    statusText: 'Teslim Edildi',
    date: '2024-05-17',
    time: '20:15',
    total: 250,
    items: [
      { id: '101', name: 'Köfte', quantity: 2, price: 120 },
      { id: '201', name: 'Baklava', quantity: 1, price: 50 },
      { id: '302', name: 'Kola', quantity: 1, price: 30 },
    ],
  },
];

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { currentOrder } = useOrderStore();

  // Aktif siparişleri filtrele
  const activeOrders = demoOrders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
  );

  // Sipariş durumu ikonunu getir
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'schedule';
      case 'confirmed':
        return 'check-circle';
      case 'preparing':
        return 'restaurant';
      case 'ready':
        return 'local-shipping';
      case 'delivered':
        return 'done';
      default:
        return 'info';
    }
  };

  // Sipariş durumu rengini getir
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange.500';
      case 'confirmed':
        return 'blue.500';
      case 'preparing':
        return 'yellow.500';
      case 'ready':
        return 'green.500';
      case 'delivered':
        return 'gray.500';
      default:
        return 'gray.500';
    }
  };

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView flex={1} showsVerticalScrollIndicator={false} p={4}>
        <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>Siparişlerim</Text>
        
        {/* Aktif Siparişler */}
        {activeOrders.length > 0 && (
          <VStack space={4} mb={6}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">Aktif Siparişler</Text>
            {activeOrders.map(order => (
              <Box key={order.id} bg="white" p={4} rounded="lg" shadow={1}>
                <HStack justifyContent="space-between" alignItems="center" mb={3}>
                  <VStack>
                    <Text fontWeight="semibold" color="gray.800">Sipariş #{order.id}</Text>
                    <Text color="gray.500" fontSize="sm">{order.date} - {order.time}</Text>
                  </VStack>
                  <HStack space={2} alignItems="center">
                    <Icon 
                      as={MaterialIcons} 
                      name={getStatusIcon(order.status)} 
                      size="md" 
                      color={getStatusColor(order.status)} 
                    />
                    <Text fontWeight="bold" color={getStatusColor(order.status)}>
                      {order.statusText}
                    </Text>
                  </HStack>
                </HStack>
                
                <VStack space={2} mb={3}>
                  {order.items.map(item => (
                    <HStack key={item.id} justifyContent="space-between" alignItems="center">
                      <Text color="gray.700">{item.name} x{item.quantity}</Text>
                      <Text color="gray.600">₺{item.price * item.quantity}</Text>
                    </HStack>
                  ))}
                </VStack>
                
                <Divider mb={3} />
                
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text fontWeight="bold" color="primary.700">Toplam: ₺{order.total}</Text>
                    {order.estimatedTime && (
                      <Text fontSize="sm" color="gray.600">
                        Tahmini süre: {order.estimatedTime} dakika
                      </Text>
                    )}
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}

        {/* Geçmiş Siparişler */}
        <VStack space={4} pb={4}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">Geçmiş Siparişler</Text>
          <VStack space={4}>
            {pastOrders.length === 0 ? (
              <Text color="gray.400" textAlign="center">Geçmiş sipariş bulunmuyor.</Text>
            ) : (
              pastOrders.map(order => (
                <Box key={order.id} bg="white" p={4} rounded="lg" shadow={1}>
                  <HStack justifyContent="space-between" alignItems="center" mb={3}>
                    <VStack>
                      <Text fontWeight="semibold" color="gray.800">Sipariş #{order.id}</Text>
                      <Text color="gray.500" fontSize="sm">{order.date} - {order.time}</Text>
                    </VStack>
                    <HStack space={2} alignItems="center">
                      <Icon 
                        as={MaterialIcons} 
                        name={getStatusIcon(order.status)} 
                        size="md" 
                        color={getStatusColor(order.status)} 
                      />
                      <Text fontWeight="bold" color={getStatusColor(order.status)}>
                        {order.statusText}
                      </Text>
                    </HStack>
                  </HStack>
                  
                  <VStack space={2} mb={3}>
                    {order.items.map(item => (
                      <HStack key={item.id} justifyContent="space-between" alignItems="center">
                        <Text color="gray.700">{item.name} x{item.quantity}</Text>
                        <Text color="gray.600">₺{item.price * item.quantity}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  
                  <Divider mb={3} />
                  
                  <Text fontWeight="bold" color="primary.700">Toplam: ₺{order.total}</Text>
                </Box>
              ))
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
} 