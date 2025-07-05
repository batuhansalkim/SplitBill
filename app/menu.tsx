import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Input, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SplitButton } from '../components/common/Button/SplitButton';
import { CategoryTab } from '../components/features/Menu/CategoryTab';
import { ProductCard } from '../components/features/Menu/ProductCard';
import { mockCategories, mockProducts } from '../data/mockData';
import { useCartStore } from '../stores/cartStore';
import { useMenuStore } from '../stores/menuStore';
import { useUserStore } from '../stores/userStore';

export default function MenuScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { 
    categories, 
    products, 
    selectedCategory, 
    setCategories, 
    setProducts, 
    setSelectedCategory,
    getProductsByCategory 
  } = useMenuStore();
  const { addToCart, items } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock verileri yükle
    setCategories(mockCategories);
    setProducts(mockProducts);
    setSelectedCategory(mockCategories[0]?.id || null);
  }, []);

  useEffect(() => {
    // Eğer kullanıcı masaya bağlı değilse ana sayfaya yönlendir
    if (!isConnected || !tableId) {
      router.replace('/');
    }
  }, [isConnected, tableId, router]);

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category.id);
  };

  const handleProductPress = (product: any) => {
    addToCart(product);
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const filteredProducts = selectedCategory 
    ? getProductsByCategory(selectedCategory)
    : products;

  const cartItemCount = items.length;

  if (!isConnected || !tableId) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="gray.50">
        <Text>Masaya bağlanıyor...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" p={4} shadow={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              SplitBill
            </Text>
            <Text fontSize="sm" color="gray.600">
              Masa {tableId}
            </Text>
          </VStack>
          
          <Pressable onPress={handleCartPress}>
            <Box position="relative">
              <Icon
                as={MaterialIcons}
                name="shopping-cart"
                size="lg"
                color="primary.500"
              />
              {cartItemCount > 0 && (
                <Box
                  position="absolute"
                  top={-2}
                  right={-2}
                  bg="error.500"
                  rounded="full"
                  w={5}
                  h={5}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="xs" color="white" fontWeight="bold">
                    {cartItemCount}
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>
        </HStack>
      </Box>

      {/* Arama */}
      <Box p={4} bg="white" borderBottomWidth={1} borderColor="gray.200">
        <Input
          placeholder="Ürün ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          bg="gray.100"
          borderWidth={0}
          rounded="lg"
          InputLeftElement={
            <Icon
              as={MaterialIcons}
              name="search"
              size="sm"
              color="gray.400"
              ml={3}
            />
          }
        />
      </Box>

      {/* Kategoriler */}
      <Box bg="white" p={4} borderBottomWidth={1} borderColor="gray.200">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryTab
              category={item}
              isSelected={selectedCategory === item.id}
              onPress={handleCategoryPress}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>

      {/* Ürünler */}
      <Box flex={1} p={4}>
        <FlatList
          data={filteredProducts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={handleProductPress}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Box flex={1} justifyContent="center" alignItems="center" py={20}>
              <Icon
                as={MaterialIcons}
                name="restaurant-menu"
                size="4xl"
                color="gray.300"
              />
              <Text fontSize="lg" color="gray.500" mt={4}>
                Bu kategoride ürün bulunamadı
              </Text>
            </Box>
          }
        />
      </Box>

      {/* Sepet Butonu */}
      {cartItemCount > 0 && (
        <Box position="absolute" bottom={6} left={4} right={4}>
          <SplitButton
            size="lg"
            onPress={handleCartPress}
          >
            <HStack space={2} alignItems="center" justifyContent="center">
              <Icon as={MaterialIcons} name="shopping-cart" size="md" />
              <Text>Sepeti Görüntüle ({cartItemCount} ürün)</Text>
            </HStack>
          </SplitButton>
        </Box>
      )}
    </Box>
  );
} 