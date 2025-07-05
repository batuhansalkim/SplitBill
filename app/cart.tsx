import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Divider, HStack, Icon, Input, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SplitButton } from '../components/common/Button/SplitButton';
import { CartItem, useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';

export default function CartScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { 
    items, 
    totalAmount, 
    removeFromCart, 
    updateQuantity, 
    updateNotes, 
    clearCart 
  } = useCartStore();
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleNotesChange = (productId: string, notes: string) => {
    updateNotes(productId, notes);
    setEditingNotes(null);
  };

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/payment');
    }
  };

  const handleBackToMenu = () => {
    router.back();
  };

  if (!isConnected || !tableId) {
    router.replace('/');
    return null;
  }

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Box bg="white" p={4} mb={3} rounded="lg" shadow={1}>
      <VStack space={3}>
        {/* Ürün Bilgileri */}
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1}>
            <Text fontSize="md" fontWeight="semibold" color="gray.800">
              {item.product.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {item.product.description}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="primary.500">
              ₺{item.product.price}
            </Text>
          </VStack>
          
          {/* Sil Butonu */}
          <Pressable onPress={() => removeFromCart(item.product.id)}>
            <Icon
              as={MaterialIcons}
              name="delete"
              size="md"
              color="error.500"
            />
          </Pressable>
        </HStack>

        {/* Miktar Kontrolü */}
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.600">
            Miktar:
          </Text>
          <HStack space={2} alignItems="center">
            <Pressable
              onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
            >
              <Box
                w={8}
                h={8}
                bg="gray.200"
                rounded="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={MaterialIcons}
                  name="remove"
                  size="sm"
                  color="gray.600"
                />
              </Box>
            </Pressable>
            
            <Text fontSize="md" fontWeight="semibold" minW={8} textAlign="center">
              {item.quantity}
            </Text>
            
            <Pressable
              onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
            >
              <Box
                w={8}
                h={8}
                bg="primary.500"
                rounded="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={MaterialIcons}
                  name="add"
                  size="sm"
                  color="white"
                />
              </Box>
            </Pressable>
          </HStack>
        </HStack>

        {/* Not Ekleme */}
        <VStack space={2}>
          <Text fontSize="sm" color="gray.600">
            Not:
          </Text>
          {editingNotes === item.product.id ? (
            <Input
              value={item.notes || ''}
              onChangeText={(text) => updateNotes(item.product.id, text)}
              onBlur={() => setEditingNotes(null)}
              placeholder="Özel isteklerinizi yazın..."
              bg="gray.50"
              borderWidth={1}
              borderColor="gray.200"
              rounded="md"
              autoFocus
            />
          ) : (
            <Pressable onPress={() => setEditingNotes(item.product.id)}>
              <Box
                bg="gray.50"
                p={3}
                rounded="md"
                borderWidth={1}
                borderColor="gray.200"
              >
                <Text fontSize="sm" color={item.notes ? 'gray.800' : 'gray.400'}>
                  {item.notes || 'Özel isteklerinizi yazın...'}
                </Text>
              </Box>
            </Pressable>
          )}
        </VStack>

        {/* Toplam Fiyat */}
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.600">
            Toplam:
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="primary.500">
            ₺{item.totalPrice}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" p={4} shadow={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={handleBackToMenu}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="arrow-back"
                size="md"
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Sepetim
              </Text>
            </HStack>
          </Pressable>
          
          {items.length > 0 && (
            <Pressable onPress={clearCart}>
              <Text fontSize="sm" color="error.500">
                Temizle
              </Text>
            </Pressable>
          )}
        </HStack>
      </Box>

      {/* Sepet İçeriği */}
      <Box flex={1} p={4}>
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <VStack flex={1} justifyContent="center" alignItems="center" space={4}>
            <Icon
              as={MaterialIcons}
              name="shopping-cart"
              size="6xl"
              color="gray.300"
            />
            <Text fontSize="lg" color="gray.500" textAlign="center">
              Sepetiniz boş
            </Text>
            <Text fontSize="md" color="gray.400" textAlign="center">
              Menüden ürün seçerek başlayın
            </Text>
            <SplitButton
              variant="outline"
              onPress={handleBackToMenu}
            >
              Menüye Dön
            </SplitButton>
          </VStack>
        )}
      </Box>

      {/* Toplam ve Ödeme */}
      {items.length > 0 && (
        <Box bg="white" p={4} shadow={4}>
          <VStack space={4}>
            <Divider />
            
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                Toplam Tutar:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="primary.500">
                ₺{totalAmount}
              </Text>
            </HStack>

            <SplitButton
              size="lg"
              onPress={handleCheckout}
            >
              <HStack space={2} alignItems="center" justifyContent="center">
                <Icon as={MaterialIcons} name="payment" size="md" />
                <Text>Ödemeye Geç</Text>
              </HStack>
            </SplitButton>
          </VStack>
        </Box>
      )}
    </Box>
  );
} 