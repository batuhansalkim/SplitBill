import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Box, Button, HStack, Icon, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';

export default function ProfileScreen() {
  const [name] = useState('Demo Kullanıcı');
  const [email] = useState('demo@splitbill.com');
  const [card] = useState('**** **** **** 1234');

  const menuItems = [
    {
      icon: 'credit-card',
      title: 'Ödeme Yöntemi',
      subtitle: 'Kredi kartı bilgilerinizi yönetin',
      action: () => console.log('Ödeme Yöntemi')
    },
    {
      icon: 'notifications',
      title: 'Bildirimler',
      subtitle: 'Sipariş durumu bildirimleri',
      action: () => console.log('Bildirimler')
    },
    {
      icon: 'help',
      title: 'Yardım',
      subtitle: 'Nasıl kullanılır ve SSS',
      action: () => console.log('Yardım')
    }
  ];

  return (
    <Box flex={1} bg="white" safeArea>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box bg="white" px={6} py={5} borderBottomWidth={1} borderBottomColor="gray.100">
          <Text fontSize="28px" fontWeight="700" color="gray.900" letterSpacing="-0.5">
            Profil
          </Text>
          <Text fontSize="15px" color="gray.600" mt={2} fontWeight="400">
            Uygulama ayarlarınızı yönetin
          </Text>
        </Box>

        <Box px={6} py={5}>
          {/* User Info Section */}
          <Box bg="white" borderWidth={1} borderColor="gray.200" rounded="2xl" overflow="hidden" shadow="sm" mb={6}>
            <Box px={6} py={5} bg="gray.50" borderBottomWidth={1} borderBottomColor="gray.100">
              <HStack space={4} alignItems="center">
                <Avatar size="lg" bg="primary.500" source={{ uri: undefined }}>
                  <Text fontSize="18px" fontWeight="600" color="white">SB</Text>
                </Avatar>
                <VStack flex={1}>
                  <Text fontSize="18px" fontWeight="600" color="gray.900">{name}</Text>
                  <Text fontSize="14px" color="gray.500" mt={1}>{email}</Text>
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* Settings Menu */}
          <VStack space={4} mb={6}>
            <Text fontSize="20px" fontWeight="600" color="gray.900" mb={2}>
              Ayarlar
            </Text>
            <VStack space={2}>
              {menuItems.map((item, index) => (
                <Pressable key={index} _pressed={{ bg: 'gray.50' }}>
                  <Box bg="white" borderWidth={1} borderColor="gray.200" rounded="xl" overflow="hidden">
                    <Box px={5} py={4}>
                      <HStack space={4} alignItems="center">
                        <Box 
                          bg="primary.50" 
                          p={2.5} 
                          rounded="lg"
                          borderWidth={1}
                          borderColor="primary.200"
                        >
                          <Icon as={MaterialIcons} name={item.icon} size={5} color="primary.600" />
                        </Box>
                        <VStack flex={1}>
                          <Text fontSize="16px" fontWeight="600" color="gray.900">{item.title}</Text>
                          <Text fontSize="13px" color="gray.500" mt={1}>{item.subtitle}</Text>
                        </VStack>
                        <Icon as={MaterialIcons} name="chevron-right" size={5} color="gray.400" />
                      </HStack>
                    </Box>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </VStack>

          {/* Payment Method Section */}
          <VStack space={4} mb={6}>
            <Text fontSize="20px" fontWeight="600" color="gray.900" mb={2}>
              Mevcut Kart
            </Text>
            <Box bg="white" borderWidth={1} borderColor="gray.200" rounded="2xl" overflow="hidden" shadow="sm">
              <Box px={5} py={4}>
                <HStack space={4} alignItems="center" mb={4}>
                  <Box 
                    bg="blue.50" 
                    p={2.5} 
                    rounded="lg"
                    borderWidth={1}
                    borderColor="blue.200"
                  >
                    <Icon as={MaterialIcons} name="credit-card" size={5} color="blue.600" />
                  </Box>
                  <VStack flex={1}>
                    <Text fontSize="16px" fontWeight="600" color="gray.900">Kredi Kartı</Text>
                    <Text fontSize="14px" color="gray.500" mt={1}>{card}</Text>
                  </VStack>
                </HStack>
                <Button 
                  variant="outline" 
                  colorScheme="blue" 
                  size="sm"
                  leftIcon={<Icon as={MaterialIcons} name="add" size={4} />}
                >
                  Yeni Kart Ekle
                </Button>
              </Box>
            </Box>
          </VStack>

          {/* Logout Section */}
          <VStack space={4}>
            <Box bg="white" borderWidth={1} borderColor="gray.200" rounded="2xl" overflow="hidden" shadow="sm">
              <Box px={5} py={4}>
                <HStack space={4} alignItems="center" mb={4}>
                  <Box 
                    bg="red.50" 
                    p={2.5} 
                    rounded="lg"
                    borderWidth={1}
                    borderColor="red.200"
                  >
                    <Icon as={MaterialIcons} name="logout" size={5} color="red.600" />
                  </Box>
                  <VStack flex={1}>
                    <Text fontSize="16px" fontWeight="600" color="gray.900">Çıkış Yap</Text>
                    <Text fontSize="13px" color="gray.500" mt={1}>Masadan çıkış yapın</Text>
                  </VStack>
                </HStack>
                <Button 
                  colorScheme="red" 
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon as={MaterialIcons} name="logout" size={4} />}
                >
                  Çıkış Yap
                </Button>
              </Box>
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
} 