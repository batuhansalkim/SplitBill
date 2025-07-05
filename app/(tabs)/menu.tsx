import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Badge, Box, Button, Checkbox, Divider, FlatList, HStack, Icon, Image, Modal, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (!isConnected || !tableId) router.push('/qr-scanner');
  }, [isConnected, tableId]);

  const handleAddToCart = (item) => setCart([...cart, { ...item, quantity: 1 }]);

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

  const handleIncrease = (id) => {
    setCart(items => items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };
  
  const handleDecrease = (id) => {
    setCart(items => items.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  };
  
  const handleRemove = (id) => {
    setCart(items => items.filter(i => i.id !== id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0) +
    sharedItems.reduce((sum, i) => sum + (i.product.price * i.quantity) / (i.sharedWith.length || 1), 0);

  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="primary.500">Menü</Text>
        <Pressable onPress={() => setCartOpen(true)}>
          <Box>
            <Icon as={MaterialIcons} name="shopping-cart" size={8} color="primary.500" />
            {(cart.length > 0 || sharedItems.length > 0) && (
              <Badge colorScheme="error" rounded="full" position="absolute" top={-2} right={-2} zIndex={1}>{cart.length + sharedItems.length}</Badge>
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
      />
      {/* Ortak ürün kullanıcı seçimi modalı */}
      <Modal isOpen={shareModal} onClose={() => setShareModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Ortak Siparişe Ekle</Modal.Header>
          <Modal.Body>
            <Text mb={2}>Bu ürünü kimlerle paylaşmak istiyorsun?</Text>
            <Checkbox.Group
              value={selectedUsers}
              onChange={setSelectedUsers}
              accessibilityLabel="Kullanıcı seçimi"
            >
              <VStack space={2}>
                {users.filter(user => user.isActive).map(u => (
                  <Checkbox value={u.id} key={u.id}>{u.name}</Checkbox>
                ))}
              </VStack>
            </Checkbox.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="primary" w="full" isDisabled={selectedUsers.length < 2} onPress={handleAddToShared}>
              Ekle
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* Sepet modalı */}
      <Modal isOpen={cartOpen} onClose={() => setCartOpen(false)} size="full">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Sepetim</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {cart.length === 0 && sharedItems.length === 0 && (
                <Text color="gray.400" textAlign="center">Sepetiniz boş</Text>
              )}
              {cart.length > 0 && (
                <>
                  <Text fontWeight="semibold" color="gray.700">Ürünler</Text>
                  {cart.map(item => (
                    <Box key={item.id} bg="gray.50" p={3} rounded="md" mb={2}>
                      <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                          <Text fontWeight="semibold">{item.name}</Text>
                          <Text color="primary.500">₺{item.price} x {item.quantity}</Text>
                        </VStack>
                        <HStack space={2} alignItems="center">
                          <Pressable onPress={() => handleDecrease(item.id)}>
                            <Icon as={MaterialIcons} name="remove-circle-outline" size={5} color="primary.500" />
                          </Pressable>
                          <Text fontWeight="bold">{item.quantity}</Text>
                          <Pressable onPress={() => handleIncrease(item.id)}>
                            <Icon as={MaterialIcons} name="add-circle-outline" size={5} color="primary.500" />
                          </Pressable>
                          <Pressable onPress={() => handleRemove(item.id)}>
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
          </Modal.Body>
          <Modal.Footer>
            <VStack w="full" space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">Toplam:</Text>
                <Text fontWeight="bold" color="primary.700">₺{total.toFixed(2)}</Text>
              </HStack>
              <Button colorScheme="primary" w="full" isDisabled={cart.length === 0 && sharedItems.length === 0} onPress={() => { setCartOpen(false); alert('Ödeme ekranı yakında!'); }}>
                Ödeme Yap
              </Button>
            </VStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
} 