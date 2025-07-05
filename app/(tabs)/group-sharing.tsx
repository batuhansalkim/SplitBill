import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Box, Button, HStack, Icon, Input, Modal, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useGroupStore } from '../../stores/groupStore';

export default function GroupSharingScreen() {
  const { 
    users, 
    sharedItems, 
    addUser, 
    removeUserFromSharedItem, 
    addUserToSharedItem, 
    removeSharedItem,
    calculatePerPersonAmount,
    calculateTotalSharedAmount
  } = useGroupStore();
  
  const [addUserModal, setAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  // Kişi ekleme
  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      setAddUserModal(false);
    }
  };

  // Kişiyi ortak üründen çıkar/ekle
  const toggleUserFromItem = (itemId, userId) => {
    const item = sharedItems.find(i => i.id === itemId);
    if (item?.sharedWith.includes(userId)) {
      removeUserFromSharedItem(itemId, userId);
    } else {
      addUserToSharedItem(itemId, userId);
    }
  };

  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      <HStack justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="primary.500">Grup Paylaşımı</Text>
        <Pressable onPress={() => setAddUserModal(true)}>
          <Icon as={MaterialIcons} name="person-add" size={6} color="primary.500" />
        </Pressable>
      </HStack>

      {/* Masadaki Kişiler */}
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
        <Text fontWeight="semibold" color="gray.700" mb={3}>Masadaki Kişiler</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space={3}>
            {users.filter(user => user.isActive).map(user => (
              <VStack key={user.id} alignItems="center">
                <Avatar size="md" bg="primary.500" mb={1}>
                  {user.avatar}
                </Avatar>
                <Text fontSize="xs" color="gray.600">{user.name}</Text>
              </VStack>
            ))}
          </HStack>
        </ScrollView>
      </Box>

      {/* Ortak Ürünler */}
      <VStack space={4} flex={1}>
        <Text fontWeight="semibold" color="gray.700">Ortak Ürünler</Text>
        
        {sharedItems.length === 0 ? (
          <Box bg="white" p={6} rounded="lg" shadow={1} alignItems="center">
            <Icon as={MaterialIcons} name="restaurant" size={12} color="gray.400" mb={2} />
            <Text color="gray.400" textAlign="center">Henüz ortak ürün yok</Text>
            <Text fontSize="sm" color="gray.400" textAlign="center">Menüden ortak ürün ekleyebilirsiniz</Text>
          </Box>
        ) : (
          sharedItems.map(item => (
            <Box key={item.id} bg="white" p={4} rounded="lg" shadow={1}>
              <HStack justifyContent="space-between" alignItems="flex-start" mb={3}>
                <VStack flex={1}>
                  <Text fontWeight="semibold" color="gray.800">{item.product.name}</Text>
                  <Text color="primary.500" fontWeight="bold">₺{item.product.price} x {item.quantity}</Text>
                  {item.notes && (
                    <Text fontSize="sm" color="gray.500">Not: {item.notes}</Text>
                  )}
                  <Text fontSize="sm" color="blue.700" mt={1}>
                    Kişi başı: ₺{calculatePerPersonAmount(item.id).toFixed(2)}
                  </Text>
                </VStack>
                <Pressable onPress={() => removeSharedItem(item.id)}>
                  <Icon as={MaterialIcons} name="delete" size={5} color="error.500" />
                </Pressable>
              </HStack>

              {/* Paylaşan Kişiler */}
              <VStack space={2}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.600">Paylaşan Kişiler:</Text>
                <HStack flexWrap="wrap" space={2}>
                  {users.filter(user => user.isActive).map(user => (
                    <Pressable 
                      key={user.id}
                      onPress={() => toggleUserFromItem(item.id, user.id)}
                    >
                      <HStack 
                        space={2} 
                        alignItems="center" 
                        bg={item.sharedWith.includes(user.id) ? "blue.100" : "gray.100"}
                        px={3} 
                        py={2} 
                        rounded="full"
                      >
                        <Avatar size="xs" bg={item.sharedWith.includes(user.id) ? "blue.500" : "gray.400"}>
                          {user.avatar}
                        </Avatar>
                        <Text 
                          fontSize="xs" 
                          color={item.sharedWith.includes(user.id) ? "blue.700" : "gray.600"}
                          fontWeight={item.sharedWith.includes(user.id) ? "semibold" : "normal"}
                        >
                          {user.name}
                        </Text>
                        {item.sharedWith.includes(user.id) && (
                          <Icon as={MaterialIcons} name="check-circle" size={4} color="blue.500" />
                        )}
                      </HStack>
                    </Pressable>
                  ))}
                </HStack>
              </VStack>
            </Box>
          ))
        )}
      </VStack>

      {/* Toplam Özet */}
      {sharedItems.length > 0 && (
        <Box bg="primary.50" p={4} rounded="lg" mt={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={2}>
            <Text fontWeight="semibold" color="primary.700">Toplam Ortak Tutar:</Text>
            <Text fontWeight="bold" color="primary.700" fontSize="lg">₺{calculateTotalSharedAmount().toFixed(2)}</Text>
          </HStack>
          <Text fontSize="sm" color="primary.600">
            Bu tutar paylaşan kişiler arasında eşit olarak bölünecek
          </Text>
        </Box>
      )}

      {/* Kişi Ekleme Modalı */}
      <Modal isOpen={addUserModal} onClose={() => setAddUserModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Kişi Ekle</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              <Text>Masaya yeni kişi eklemek istiyor musunuz?</Text>
              <Input
                placeholder="Kişi adı"
                value={newUserName}
                onChangeText={setNewUserName}
                bg="gray.50"
                borderWidth={1}
                borderColor="gray.200"
                rounded="md"
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button colorScheme="primary" w="full" onPress={handleAddUser} isDisabled={!newUserName.trim()}>
              Ekle
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
} 