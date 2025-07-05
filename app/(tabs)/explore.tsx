import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Pressable, ScrollView, Text, VStack } from 'native-base';
import React from 'react';

export default function ExploreScreen() {
  const router = useRouter();

  const features = [
    {
      title: 'QR Kod Tarama',
      description: 'Masaya oturduğunuzda QR kodu tarayarak menüye erişin',
      icon: 'qr-code-scanner',
      route: '/qr-scanner',
    },
    {
      title: 'Menü Görüntüleme',
      description: 'Kategorilere göre düzenlenmiş ürünleri inceleyin',
      icon: 'restaurant-menu',
      route: '/menu',
    },
    {
      title: 'Sepet Yönetimi',
      description: 'Seçtiğiniz ürünleri sepete ekleyin ve düzenleyin',
      icon: 'shopping-cart',
      route: '/cart',
    },
    {
      title: 'Ödeme İşlemi',
      description: 'Güvenli ödeme yöntemleriyle siparişinizi tamamlayın',
      icon: 'payment',
      route: '/payment',
    },
    {
      title: 'Sipariş Takibi',
      description: 'Siparişinizin durumunu gerçek zamanlı takip edin',
      icon: 'track-changes',
      route: '/order-tracking',
    },
  ];

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" p={4} shadow={2}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" textAlign="center">
          SplitBill Özellikleri
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center" mt={1}>
          Restoran deneyiminizi keşfedin
        </Text>
      </Box>

      {/* Scrollable Features List */}
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Box p={4} pb={8}>
          <VStack space={4}>
            {features.map((feature, index) => (
              <Pressable
                key={index}
                onPress={() => router.push(feature.route as any)}
              >
                <Box
                  bg="white"
                  p={4}
                  rounded="lg"
                  shadow={2}
                  borderWidth={1}
                  borderColor="gray.200"
                >
                  <HStack space={3} alignItems="center">
                    <Box
                      bg="primary.100"
                      p={3}
                      rounded="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Icon
                        as={MaterialIcons}
                        name={feature.icon as any}
                        size="lg"
                        color="primary.500"
                      />
                    </Box>
                    
                    <VStack flex={1}>
                      <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                        {feature.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        {feature.description}
                      </Text>
                    </VStack>
                    
                    <Icon
                      as={MaterialIcons}
                      name="chevron-right"
                      size="sm"
                      color="gray.400"
                    />
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
