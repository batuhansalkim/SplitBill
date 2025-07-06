import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
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
    estimatedTime: 15,
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

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: '#f59e0b', bg: '#fef3c7', icon: 'schedule' };
    case 'confirmed':
      return { color: '#3b82f6', bg: '#dbeafe', icon: 'check-circle' };
    case 'preparing':
      return { color: '#f59e0b', bg: '#fef3c7', icon: 'restaurant' };
    case 'ready':
      return { color: '#10b981', bg: '#d1fae5', icon: 'local-shipping' };
    case 'delivered':
      return { color: '#6b7280', bg: '#f3f4f6', icon: 'done' };
    default:
      return { color: '#6b7280', bg: '#f3f4f6', icon: 'info' };
  }
};

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { currentOrder } = useOrderStore();

  const activeOrders = demoOrders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
  );

  return (
    <Box flex={1} bg="white" safeArea>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box bg="white" px={6} py={5} borderBottomWidth={1} borderBottomColor="gray.100">
          <Text fontSize="28px" fontWeight="700" color="gray.900" letterSpacing="-0.5">
            Siparişlerim
          </Text>
          <Text fontSize="15px" color="gray.600" mt={2} fontWeight="400">
            Aktif ve geçmiş siparişlerinizi takip edin
          </Text>
        </Box>

        <Box px={6} py={5}>
          {/* Aktif Siparişler */}
          {activeOrders.length > 0 && (
            <VStack space={6} mb={8}>
              <Box>
                <Text fontSize="20px" fontWeight="600" color="gray.900" mb={5}>
                  Aktif Siparişler
                </Text>
                <VStack space={4}>
                  {activeOrders.map(order => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                      <Box key={order.id} bg="white" borderWidth={1} borderColor="gray.200" rounded="2xl" overflow="hidden" shadow="sm">
                        {/* Header */}
                        <Box px={5} py={4} bg="gray.50" borderBottomWidth={1} borderBottomColor="gray.100">
                          <HStack justifyContent="space-between" alignItems="center">
                            <VStack>
                              <Text fontSize="16px" fontWeight="600" color="gray.900">
                                Sipariş #{order.id}
                              </Text>
                              <Text fontSize="13px" color="gray.500" mt={1} fontWeight="400">
                                {order.date} • {order.time}
                              </Text>
                            </VStack>
                            <Box 
                              bg={statusConfig.bg} 
                              px={3} 
                              py={1.5} 
                              rounded="lg"
                              borderWidth={1}
                              borderColor={statusConfig.color + '20'}
                              maxW="140px"
                            >
                              <HStack space={1.5} alignItems="center">
                                <Icon 
                                  as={MaterialIcons} 
                                  name={statusConfig.icon} 
                                  size={4} 
                                  color={statusConfig.color} 
                                />
                                <Text fontSize="13px" fontWeight="600" color={statusConfig.color} numberOfLines={1}>
                                  {order.statusText}
                                </Text>
                              </HStack>
                            </Box>
                          </HStack>
                        </Box>

                        {/* Content */}
                        <Box px={5} py={4}>
                          {/* Items */}
                          <VStack space={3} mb={4}>
                            {order.items.map(item => (
                              <HStack key={item.id} justifyContent="space-between" alignItems="center">
                                <Text fontSize="14px" color="gray.700" fontWeight="500">{item.name}</Text>
                                <HStack space={2} alignItems="center">
                                  <Text fontSize="13px" color="gray.500" fontWeight="400">x{item.quantity}</Text>
                                  <Text fontSize="14px" fontWeight="600" color="gray.900">
                                    ₺{item.price * item.quantity}
                                  </Text>
                                </HStack>
                              </HStack>
                            ))}
                          </VStack>

                          {/* Footer */}
                          <Box pt={3} borderTopWidth={1} borderTopColor="gray.100">
                            <HStack justifyContent="space-between" alignItems="center">
                              <VStack>
                                <Text fontSize="16px" fontWeight="700" color="gray.900">
                                  Toplam: ₺{order.total}
                                </Text>
                                {order.estimatedTime && (
                                  <Text fontSize="13px" color="gray.500" mt={1} fontWeight="400">
                                    Tahmini süre: {order.estimatedTime} dakika
                                  </Text>
                                )}
                              </VStack>
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </VStack>
          )}

          {/* Geçmiş Siparişler */}
          <VStack space={6}>
            <Box>
              <Text fontSize="20px" fontWeight="600" color="gray.900" mb={5}>
                Geçmiş Siparişler
              </Text>
              {pastOrders.length === 0 ? (
                <Box alignItems="center" py={12} bg="gray.50" rounded="2xl" borderWidth={1} borderColor="gray.200">
                  <Icon as={MaterialIcons} name="history" size={10} color="gray.400" mb={3} />
                  <Text fontSize="16px" color="gray.500" fontWeight="600" mb={2}>Geçmiş sipariş bulunmuyor</Text>
                  <Text fontSize="14px" color="gray.400" textAlign="center" px={6}>
                    Daha önce verdiğiniz siparişler burada görünecek
                  </Text>
                </Box>
              ) : (
                <VStack space={3}>
                  {pastOrders.map(order => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                      <Box key={order.id} bg="white" borderWidth={1} borderColor="gray.200" rounded="2xl" overflow="hidden" shadow="sm">
                        <Box px={5} py={4}>
                          <HStack justifyContent="space-between" alignItems="center" mb={3}>
                            <VStack>
                              <Text fontSize="16px" fontWeight="600" color="gray.900">
                                Sipariş #{order.id}
                              </Text>
                              <Text fontSize="13px" color="gray.500" mt={1} fontWeight="400">
                                {order.date} • {order.time}
                              </Text>
                            </VStack>
                            <Box 
                              bg={statusConfig.bg} 
                              px={3} 
                              py={1.5} 
                              rounded="lg"
                              borderWidth={1}
                              borderColor={statusConfig.color + '20'}
                              maxW="140px"
                            >
                              <HStack space={1.5} alignItems="center">
                                <Icon 
                                  as={MaterialIcons} 
                                  name={statusConfig.icon} 
                                  size={4} 
                                  color={statusConfig.color} 
                                />
                                <Text fontSize="13px" fontWeight="600" color={statusConfig.color} numberOfLines={1}>
                                  {order.statusText}
                                </Text>
                              </HStack>
                            </Box>
                          </HStack>

                          <VStack space={2} mb={3}>
                            {order.items.map(item => (
                              <HStack key={item.id} justifyContent="space-between" alignItems="center">
                                <Text fontSize="14px" color="gray.700" fontWeight="500">{item.name}</Text>
                                <HStack space={2} alignItems="center">
                                  <Text fontSize="13px" color="gray.500" fontWeight="400">x{item.quantity}</Text>
                                  <Text fontSize="14px" fontWeight="600" color="gray.900">
                                    ₺{item.price * item.quantity}
                                  </Text>
                                </HStack>
                              </HStack>
                            ))}
                          </VStack>

                          <Box pt={3} borderTopWidth={1} borderTopColor="gray.100">
                            <Text fontSize="16px" fontWeight="700" color="gray.900">
                              Toplam: ₺{order.total}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </VStack>
              )}
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
} 