import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Badge, Box, Button, Divider, HStack, Icon, Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../../stores/cartStore';
import { useGroupStore } from '../../stores/groupStore';
import { useUserStore } from '../../stores/slices/userSlice';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Demo veriler
const categories: Category[] = [
  { id: '1', name: 'Ana Yemekler', icon: 'restaurant' },
  { id: '2', name: 'Tatlılar', icon: 'cake' },
  { id: '3', name: 'İçecekler', icon: 'local-cafe' },
];

const products: Product[] = [
  { 
    id: '101', 
    name: 'Köfte', 
    price: 120, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    description: 'Özel baharatlarla hazırlanmış dana köfte'
  },
  { 
    id: '102', 
    name: 'Tavuk Şiş', 
    price: 130, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=300&fit=crop&crop=center',
    description: 'Marine edilmiş tavuk şiş, özel sos ile'
  },
  { 
    id: '103', 
    name: 'Lahmacun', 
    price: 45, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    description: 'İnce hamur üzerine kıyma ve sebze'
  },
  { 
    id: '104', 
    name: 'Pide', 
    price: 85, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=300&fit=crop&crop=center',
    description: 'Kaşarlı, kıymalı veya kuşbaşılı pide'
  },
  { 
    id: '105', 
    name: 'Döner', 
    price: 95, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
    description: 'Tavuk veya dana eti döner'
  },
  { 
    id: '106', 
    name: 'İskender', 
    price: 140, 
    category: '1', 
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=300&fit=crop&crop=center',
    description: 'Özel soslu, tereyağlı iskender'
  },
  { 
    id: '201', 
    name: 'Baklava', 
    price: 50, 
    category: '2', 
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    description: 'Geleneksel Türk tatlısı, fıstıklı baklava'
  },
  { 
    id: '202', 
    name: 'Sütlaç', 
    price: 45, 
    category: '2', 
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    description: 'Fırında pişirilmiş geleneksel sütlaç'
  },
  { 
    id: '203', 
    name: 'Künefe', 
    price: 60, 
    category: '2', 
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    description: 'Kadayıf hamuru ile peynirli künefe'
  },
  { 
    id: '204', 
    name: 'Kazandibi', 
    price: 55, 
    category: '2', 
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    description: 'Geleneksel kazandibi tatlısı'
  },
  { 
    id: '205', 
    name: 'Aşure', 
    price: 40, 
    category: '2', 
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center',
    description: 'Geleneksel aşure tatlısı'
  },
  { 
    id: '301', 
    name: 'Ayran', 
    price: 20, 
    category: '3', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
    description: 'Doğal yoğurttan yapılmış taze ayran'
  },
  { 
    id: '302', 
    name: 'Kola', 
    price: 30, 
    category: '3', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
    description: 'Soğuk içecek seçenekleri'
  },
  { 
    id: '303', 
    name: 'Çay', 
    price: 15, 
    category: '3', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
    description: 'Demli çay'
  },
  { 
    id: '304', 
    name: 'Kahve', 
    price: 25, 
    category: '3', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
    description: 'Türk kahvesi'
  },
  { 
    id: '305', 
    name: 'Meyve Suyu', 
    price: 35, 
    category: '3', 
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
    description: 'Portakal, elma veya şeftali suyu'
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { users, sharedItems, addSharedItem } = useGroupStore();
  const { items, addToCart, removeFromCart, updateQuantity, totalAmount } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [cartOpen, setCartOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

  const handleAddToCart = (item: Product) => addToCart(item);

  // Ortak ürün ekleme modalı açılır
  const handleOpenShareModal = (item: Product) => {
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

  const handleIncrease = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };
  
  const handleDecrease = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    }
  };
  
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const total = totalAmount + sharedItems.reduce((sum, i) => sum + (i.product.price * i.quantity) / (i.sharedWith.length || 1), 0);

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <Box flex={1} bg="white" safeArea>
      {/* Header */}
      <Box bg="white" px={6} py={5} borderBottomWidth={1} borderBottomColor="gray.100">
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize="28px" fontWeight="700" color="gray.900" letterSpacing="-0.5">
              Menü
            </Text>
            <Text fontSize="15px" color="gray.600" mt={1} fontWeight="400">
              Lezzetli yemeklerimizi keşfedin
            </Text>
          </VStack>
          <Pressable onPress={() => setCartOpen(true)} _pressed={{ opacity: 0.7 }}>
            <Box position="relative">
              <Box 
                bg="primary.50" 
                p={3} 
                rounded="xl"
                borderWidth={1}
                borderColor="primary.200"
              >
                <Icon as={MaterialIcons} name="shopping-cart" size={6} color="primary.600" />
              </Box>
              {(items.length > 0 || sharedItems.length > 0) && (
                <Badge 
                  colorScheme="red" 
                  rounded="full" 
                  position="absolute" 
                  top={-2} 
                  right={-2} 
                  zIndex={1}
                  minW={6}
                  h={6}
                >
                  {items.length + sharedItems.length}
                </Badge>
              )}
            </Box>
          </Pressable>
        </HStack>
      </Box>

      <Box flex={1}>
        {/* Categories */}
        <Box px={6} py={4}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack space={3}>
              {categories.map((category) => (
                <Pressable 
                  key={category.id} 
                  onPress={() => setSelectedCategory(category.id)}
                  _pressed={{ opacity: 0.7 }}
                >
                  <Box 
                    bg={selectedCategory === category.id ? 'primary.500' : 'gray.100'} 
                    px={4} 
                    py={3} 
                    rounded="xl"
                    borderWidth={1}
                    borderColor={selectedCategory === category.id ? 'primary.500' : 'gray.200'}
                    minW={24}
                    alignItems="center"
                  >
                    <Icon 
                      as={MaterialIcons} 
                      name={category.icon} 
                      size={5} 
                      color={selectedCategory === category.id ? 'white' : 'gray.600'} 
                      mb={1}
                    />
                    <Text 
                      color={selectedCategory === category.id ? 'white' : 'gray.700'} 
                      fontWeight="600"
                      fontSize="sm"
                    >
                      {category.name}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* Products */}
        <ScrollView flex={1} px={6} showsVerticalScrollIndicator={false}>
          <VStack space={4} pb={6}>
            {filteredProducts.length === 0 ? (
              <Box alignItems="center" py={12}>
                <Icon as={MaterialIcons} name="restaurant" size={12} color="gray.300" mb={3} />
                <Text fontSize="16px" color="gray.500" fontWeight="500">Bu kategoride ürün bulunmuyor</Text>
              </Box>
            ) : (
              filteredProducts.map((product) => (
                <Box 
                  key={product.id} 
                  bg="white" 
                  borderWidth={1} 
                  borderColor="gray.200" 
                  rounded="2xl" 
                  overflow="hidden" 
                  shadow="sm"
                >
                  <HStack space={0}>
                    <Image 
                      source={{ uri: product.image }} 
                      alt={product.name} 
                      w={20} 
                      h={20} 
                      resizeMode="cover"
                    />
                    <VStack flex={1} p={4} space={2}>
                      <VStack flex={1}>
                        <Text fontSize="16px" fontWeight="600" color="gray.900" numberOfLines={1}>
                          {product.name}
                        </Text>
                        {product.description && (
                          <Text fontSize="13px" color="gray.500" numberOfLines={2} mt={1}>
                            {product.description}
                          </Text>
                        )}
                        <Text fontSize="18px" fontWeight="700" color="primary.600" mt={2}>
                          ₺{product.price}
                        </Text>
                      </VStack>
                      
                      <HStack space={2}>
                        <Button 
                          flex={1}
                          colorScheme="primary" 
                          size="xs"
                          rounded="lg"
                          onPress={() => handleAddToCart(product)}
                          leftIcon={<Icon as={MaterialIcons} name="add-shopping-cart" size={3} />}
                        >
                          Sepete Ekle
                        </Button>
                        <Button 
                          colorScheme="blue" 
                          size="xs"
                          variant="outline"
                          rounded="lg"
                          onPress={() => handleOpenShareModal(product)}
                          leftIcon={<Icon as={MaterialIcons} name="group-add" size={3} />}
                        >
                          Ortak Siparişe Ekle
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </ScrollView>
      </Box>

      {/* Ortak ürün kullanıcı seçimi modalı */}
      <Modal
        visible={shareModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeShareModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, width: '90%', maxWidth: 400 }}>
            <HStack justifyContent="space-between" alignItems="center" mb={6}>
              <Text fontSize="20px" fontWeight="600" color="gray.900">Ortak Siparişe Ekle</Text>
              <TouchableOpacity onPress={closeShareModal}>
                <Icon as={MaterialIcons} name="close" size={6} color="gray.500" />
              </TouchableOpacity>
            </HStack>
            
            <Text fontSize="15px" color="gray.600" mb={6}>Bu ürünü kimlerle paylaşmak istiyorsun?</Text>
            
            <VStack space={3} mb={6}>
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
                  <Box 
                    bg={selectedUsers.includes(u.id) ? "blue.50" : "gray.50"} 
                    p={4} 
                    rounded="xl"
                    borderWidth={1}
                    borderColor={selectedUsers.includes(u.id) ? "blue.200" : "gray.200"}
                  >
                    <HStack space={3} alignItems="center">
                      <Icon 
                        as={MaterialIcons} 
                        name={selectedUsers.includes(u.id) ? "check-circle" : "radio-button-unchecked"} 
                        size={5} 
                        color={selectedUsers.includes(u.id) ? "blue.500" : "gray.400"} 
                      />
                      <Text 
                        color={selectedUsers.includes(u.id) ? "blue.700" : "gray.700"} 
                        fontWeight={selectedUsers.includes(u.id) ? "600" : "400"}
                        fontSize="15px"
                      >
                        {u.name}
                      </Text>
                    </HStack>
                  </Box>
                </TouchableOpacity>
              ))}
            </VStack>
            
            <HStack space={3}>
              <Button flex={1} variant="outline" onPress={closeShareModal} rounded="lg">
                İptal
              </Button>
              <Button 
                flex={1} 
                colorScheme="primary" 
                isDisabled={selectedUsers.length < 2} 
                onPress={handleAddToShared}
                rounded="lg"
              >
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
          <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 24, width: '95%', maxWidth: 400, maxHeight: '80%' }}>
            <HStack justifyContent="space-between" alignItems="center" mb={6}>
              <Text fontSize="20px" fontWeight="600" color="gray.900">Sepetim</Text>
              <TouchableOpacity onPress={closeCartModal}>
                <Icon as={MaterialIcons} name="close" size={6} color="gray.500" />
              </TouchableOpacity>
            </HStack>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              <VStack space={4}>
                {items.length === 0 && sharedItems.length === 0 && (
                  <Box alignItems="center" py={8}>
                    <Icon as={MaterialIcons} name="shopping-cart" size={12} color="gray.300" mb={3} />
                    <Text fontSize="16px" color="gray.500" fontWeight="500">Sepetiniz boş</Text>
                    <Text fontSize="14px" color="gray.400" mt={1}>Menüden ürün seçerek başlayın</Text>
                  </Box>
                )}
                {items.length > 0 && (
                  <>
                    <Text fontSize="16px" fontWeight="600" color="gray.900">Ürünler</Text>
                    {items.map(item => (
                      <Box key={item.product.id} bg="gray.50" p={4} rounded="xl" borderWidth={1} borderColor="gray.200">
                        <HStack justifyContent="space-between" alignItems="center">
                          <VStack flex={1}>
                            <Text fontSize="15px" fontWeight="600" color="gray.900">{item.product.name}</Text>
                            <Text fontSize="14px" color="primary.600" fontWeight="500">₺{item.product.price} x {item.quantity}</Text>
                          </VStack>
                          <HStack space={2} alignItems="center">
                            <Pressable onPress={() => handleDecrease(item.product.id)} _pressed={{ opacity: 0.7 }}>
                              <Icon as={MaterialIcons} name="remove-circle-outline" size={6} color="primary.500" />
                            </Pressable>
                            <Text fontSize="16px" fontWeight="600" color="gray.900" minW={8} textAlign="center">
                              {item.quantity}
                            </Text>
                            <Pressable onPress={() => handleIncrease(item.product.id)} _pressed={{ opacity: 0.7 }}>
                              <Icon as={MaterialIcons} name="add-circle-outline" size={6} color="primary.500" />
                            </Pressable>
                            <Pressable onPress={() => handleRemove(item.product.id)} _pressed={{ opacity: 0.7 }}>
                              <Icon as={MaterialIcons} name="delete-outline" size={5} color="red.500" />
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
                    <Text fontSize="16px" fontWeight="600" color="gray.900">Ortak Ürünler</Text>
                    {sharedItems.map(item => (
                      <Box key={item.id} bg="blue.50" p={4} rounded="xl" borderWidth={1} borderColor="blue.200">
                        <VStack space={2}>
                          <HStack justifyContent="space-between" alignItems="center">
                            <Text fontSize="15px" fontWeight="600" color="gray.900">{item.product.name}</Text>
                            <Text fontSize="14px" color="primary.600" fontWeight="500">₺{item.product.price} x {item.quantity}</Text>
                          </HStack>
                          <Text fontSize="12px" color="blue.700">{item.sharedWith.length} kişiyle paylaşılıyor</Text>
                          <Text fontSize="12px" color="blue.700">Kişi başı: ₺{((item.product.price * item.quantity) / item.sharedWith.length).toFixed(2)}</Text>
                          <Text fontSize="12px" color="blue.700">
                            Paylaşanlar: {users.filter(u => item.sharedWith.includes(u.id)).map(u => u.name).join(', ')}
                          </Text>
                        </VStack>
                      </Box>
                    ))}
                  </>
                )}
              </VStack>
            </ScrollView>
            
            <VStack w="full" space={4} mt={6}>
              <Box bg="gray.50" p={4} rounded="xl" borderWidth={1} borderColor="gray.200">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="18px" fontWeight="600" color="gray.900">Toplam:</Text>
                  <Text fontSize="18px" fontWeight="700" color="primary.600">₺{total.toFixed(2)}</Text>
                </HStack>
              </Box>
              <Button 
                colorScheme="primary" 
                size="lg"
                rounded="xl"
                isDisabled={items.length === 0 && sharedItems.length === 0} 
                onPress={() => { 
                  closeCartModal(); 
                  router.push('/payment'); 
                }}
                leftIcon={<Icon as={MaterialIcons} name="payment" size={5} />}
              >
                Ödeme Yap
              </Button>
            </VStack>
          </View>
        </View>
      </Modal>
    </Box>
  );
}