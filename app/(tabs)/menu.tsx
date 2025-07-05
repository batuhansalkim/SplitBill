import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Badge, Box, Button, Divider, FlatList, HStack, Icon, Image, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Modal, ScrollView as RNScrollView, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../../stores/cartStore';
import { useGroupStore } from '../../stores/groupStore';
import { useUserStore } from '../../stores/slices/userSlice';

// Demo veriler
const categories = [
  { id: '1', name: 'Yemekler' },
  { id: '2', name: 'Tatlılar' },
  { id: '3', name: 'İçecekler' },
];
const products = [
  { id: '101', name: 'Köfte', price: 120, category: '1', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/anne-koftesi-yemekcom.jpg' },
  { id: '102', name: 'Tavuk Şiş', price: 130, category: '1', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/tavuk-sis-yemekcom.jpg' },
  { id: '201', name: 'Baklava', price: 50, category: '2', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/baklava-yemekcom.jpg' },
  { id: '202', name: 'Sütlaç', price: 45, category: '2', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/sutlac-yemekcom.jpg' },
  { id: '301', name: 'Ayran', price: 20, category: '3', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/ayran-yemekcom.jpg' },
  { id: '302', name: 'Kola', price: 30, category: '3', image: 'https://cdn.yemek.com/mnresize/940/940/uploads/2014/11/kola-yemekcom.jpg' },
];

export default function MenuScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { users, sharedItems, addSharedItem } = useGroupStore();
  const { items, addToCart, removeFromCart, updateQuantity, totalAmount } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Modal'ları güvenli şekilde kapat
  const closeCartModal = () => {
    try {
      setCartOpen(false);
    } catch (error) {
      console.log('Cart modal close error:', error);
    }
  };

  const closeShareModal = () => {
    try {
      setShareModal(false);
      setShareProduct(null);
      setSelectedUsers([]);
    } catch (error) {
      console.log('Share modal close error:', error);
    }
  };

  const handleAddToCart = (item) => addToCart(item);

  // Ortak ürün ekleme modalı açılır
  const handleOpenShareModal = (item) => {
    setShareProduct(item);
    setSelectedUsers([]);
    setShareModal(true);
  };
  
  // Ortak ürün ekle
  const handleAddToShared = () => {
    if (shareProduct && selectedUsers.length > 0) {
      addSharedItem(shareProduct, 1, selectedUsers);
      setShareModal(false);
      setShareProduct(null);
      setSelectedUsers([]);
    }
  };

  const handleIncrease = (productId) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };
  
  const handleDecrease = (productId) => {
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };
  
  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const total = totalAmount + sharedItems.reduce((sum, i) => sum + (i.product.price * i.quantity) / (i.sharedWith.length || 1), 0);

  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="primary.500">Menü</Text>
        <Pressable onPress={() => setCartOpen(true)}>
          <Box>
            <Icon as={MaterialIcons} name="shopping-cart" size={8} color="primary.500" />
            {(items.length > 0 || sharedItems.length > 0) && (
              <Badge colorScheme="error" rounded="full" position="absolute" top={-2} right={-2} zIndex={1}>{items.length + sharedItems.length}</Badge>
            )}
          </Box>
        </Pressable>
      </HStack>
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
        contentContainerStyle={{ paddingBottom: 0 }}
      />
      <FlatList
        data={products.filter(p => p.category === selectedCategory)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Box bg="white" p={3} mb={3} rounded="lg" shadow={1}>
            <HStack space={3} alignItems="center">
              <Image source={{ uri: item.image }} alt={item.name} w={16} h={16} rounded="md" mr={2} />
              <VStack flex={1}>
                <Text fontSize="md" fontWeight="bold" color="gray.800">{item.name}</Text>
                <Text color="primary.500" fontWeight="semibold">₺{item.price}</Text>
              </VStack>
              <VStack space={2}>
                <Button colorScheme="primary" size="sm" onPress={() => handleAddToCart(item)}>Sepete Ekle</Button>
                <Button colorScheme="secondary" size="xs" variant="outline" onPress={() => handleOpenShareModal(item)}>Ortak Siparişe Ekle</Button>
              </VStack>
            </HStack>
          </Box>
        )}
        contentContainerStyle={{ paddingBottom: 0 }}
      />
      {/* Ortak ürün kullanıcı seçimi modalı */}
      <Modal
        visible={shareModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeShareModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400 }}>
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Ortak Siparişe Ekle</Text>
              <TouchableOpacity onPress={closeShareModal}>
                <Icon as={MaterialIcons} name="close" size={6} color="gray.500" />
              </TouchableOpacity>
            </HStack>
            
            <Text mb={4}>Bu ürünü kimlerle paylaşmak istiyorsun?</Text>
            
            <VStack space={3}>
              {users.filter(user => user.isActive).map(u => (
                <TouchableOpacity
                  key={u.id}
                  onPress={() => {
                    if (selectedUsers.includes(u.id)) {
                      setSelectedUsers(selectedUsers.filter(id => id !== u.id));
                    } else {
                      setSelectedUsers([...selectedUsers, u.id]);
                    }
                  }}
                >
                  <HStack space={3} alignItems="center" p={3} bg={selectedUsers.includes(u.id) ? "blue.50" : "gray.50"} rounded="md">
                    <Icon 
                      as={MaterialIcons} 
                      name={selectedUsers.includes(u.id) ? "check-circle" : "radio-button-unchecked"} 
                      size={5} 
                      color={selectedUsers.includes(u.id) ? "blue.500" : "gray.400"} 
                    />
                    <Text color={selectedUsers.includes(u.id) ? "blue.700" : "gray.700"} fontWeight={selectedUsers.includes(u.id) ? "semibold" : "normal"}>
                      {u.name}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              ))}
            </VStack>
            
            <HStack space={3} mt={6}>
              <Button flex={1} variant="outline" onPress={closeShareModal}>
                İptal
              </Button>
              <Button flex={1} colorScheme="primary" isDisabled={selectedUsers.length < 2} onPress={handleAddToShared}>
                Ekle
              </Button>
            </HStack>
          </View>
        </View>
      </Modal>
      
      {/* Sepet modalı */}
      <Modal
        visible={cartOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCartModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 20, width: '95%', maxWidth: 400, maxHeight: '80%' }}>
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Sepetim</Text>
              <TouchableOpacity onPress={closeCartModal}>
                <Icon as={MaterialIcons} name="close" size={6} color="gray.500" />
              </TouchableOpacity>
            </HStack>
            
            <RNScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              <VStack space={4}>
                {items.length === 0 && sharedItems.length === 0 && (
                  <Text color="gray.400" textAlign="center">Sepetiniz boş</Text>
                )}
                {items.length > 0 && (
                  <>
                    <Text fontWeight="semibold" color="gray.700">Ürünler</Text>
                    {items.map(item => (
                      <Box key={item.product.id} bg="gray.50" p={3} rounded="md" mb={2}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <VStack>
                            <Text fontWeight="semibold">{item.product.name}</Text>
                            <Text color="primary.500">₺{item.product.price} x {item.quantity}</Text>
                          </VStack>
                          <HStack space={2} alignItems="center">
                            <Pressable onPress={() => handleDecrease(item.product.id)}>
                              <Icon as={MaterialIcons} name="remove-circle-outline" size={5} color="primary.500" />
                            </Pressable>
                            <Text fontWeight="bold">{item.quantity}</Text>
                            <Pressable onPress={() => handleIncrease(item.product.id)}>
                              <Icon as={MaterialIcons} name="add-circle-outline" size={5} color="primary.500" />
                            </Pressable>
                            <Pressable onPress={() => handleRemove(item.product.id)}>
                              <Icon as={MaterialIcons} name="cancel" size={5} color="error.500" />
                            </Pressable>
                          </HStack>
                        </HStack>
                      </Box>
                    ))}
                  </>
                )}
                {sharedItems.length > 0 && (
                  <>
                    <Divider my={2} />
                    <Text fontWeight="semibold" color="gray.700">Ortak Ürünler</Text>
                    {sharedItems.map(item => (
                      <Box key={item.id} bg="blue.50" p={3} rounded="md" mb={2}>
                        <HStack justifyContent="space-between" alignItems="center">
                          <VStack>
                            <Text fontWeight="semibold">{item.product.name}</Text>
                            <Text color="primary.500">₺{item.product.price} x {item.quantity}</Text>
                            <Text fontSize="xs" color="blue.700">{item.sharedWith.length} kişiyle paylaşılıyor</Text>
                            <Text fontSize="xs" color="blue.700">Kişi başı: ₺{((item.product.price * item.quantity) / item.sharedWith.length).toFixed(2)}</Text>
                            <Text fontSize="xs" color="blue.700">Paylaşanlar: {users.filter(u => item.sharedWith.includes(u.id)).map(u => u.name).join(', ')}</Text>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </>
                )}
              </VStack>
            </RNScrollView>
            
            <VStack w="full" space={3} mt={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">Toplam:</Text>
                <Text fontWeight="bold" color="primary.700">₺{total.toFixed(2)}</Text>
              </HStack>
              <Button colorScheme="primary" w="full" isDisabled={items.length === 0 && sharedItems.length === 0} onPress={() => { 
                closeCartModal(); 
                router.push('/payment'); 
              }}>
                Ödeme Yap
              </Button>
            </VStack>
          </View>
        </View>
      </Modal>
    </Box>
  );
} 