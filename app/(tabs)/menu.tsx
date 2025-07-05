import { useRouter } from 'expo-router';
import { Box, Button, FlatList, HStack, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/slices/userSlice';
// Demo veriler
const categories = [
  { id: '1', name: 'Başlangıçlar' },
  { id: '2', name: 'Ana Yemekler' },
  { id: '3', name: 'Tatlılar' },
  { id: '4', name: 'İçecekler' },
];
const products = [
  { id: '101', name: 'Mercimek Çorbası', price: 60, category: '1' },
  { id: '102', name: 'Köfte', price: 120, category: '2' },
  { id: '103', name: 'Baklava', price: 50, category: '3' },
  { id: '104', name: 'Ayran', price: 20, category: '4' },
];
export default function MenuScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  useEffect(() => {
    if (!isConnected || !tableId) router.push('/qr-scanner');
  }, [isConnected, tableId]);
  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>Menü</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelectedCategory(item.id)}>
            <Box bg={selectedCategory === item.id ? 'primary.500' : 'gray.200'} px={4} py={2} rounded="full" mx={1}>
              <Text color={selectedCategory === item.id ? 'white' : 'gray.800'} fontWeight="semibold">{item.name}</Text>
            </Box>
          </Pressable>
        )}
        mb={4}
      />
      <FlatList
        data={products.filter(p => p.category === selectedCategory)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box bg="white" p={4} mb={3} rounded="lg" shadow={1}>
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text fontSize="md" fontWeight="bold" color="gray.800">{item.name}</Text>
                <Text color="primary.500" fontWeight="semibold">₺{item.price}</Text>
              </VStack>
              <Button colorScheme="primary" size="sm">Sepete Ekle</Button>
            </HStack>
          </Box>
        )}
      />
    </Box>
  );
} 