import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { SplitButton } from '../../components/common/Button/SplitButton';
import { useUserStore } from '../../stores/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const { isConnected, tableId } = useUserStore();

  useEffect(() => {
    // Eğer kullanıcı zaten bir masaya bağlıysa, menüye yönlendir
    if (isConnected && tableId) {
      router.replace('/menu');
    }
  }, [isConnected, tableId, router]);

  const handleStartScanning = () => {
    router.push('/qr-scanner');
  };

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <VStack flex={1} p={6} space={8} justifyContent="center">
        {/* Logo ve Başlık */}
        <VStack space={4} alignItems="center">
          <Box
            w={120}
            h={120}
            bg="primary.500"
            rounded="full"
            justifyContent="center"
            alignItems="center"
            shadow={4}
          >
            <Icon
              as={MaterialIcons}
              name="restaurant"
              size="6xl"
              color="white"
            />
          </Box>
          
          <VStack space={2} alignItems="center">
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              SplitBill
            </Text>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              Akıllı Masraf Paylaşım Uygulaması
            </Text>
          </VStack>
        </VStack>

        {/* Özellikler */}
        <VStack space={4}>
          <HStack space={3} alignItems="center">
            <Box
              w={8}
              h={8}
              bg="primary.100"
              rounded="full"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={MaterialIcons}
                name="qr-code-scanner"
                size="sm"
                color="primary.500"
              />
            </Box>
            <Text fontSize="md" color="gray.700">
              QR kod ile masaya katılın
            </Text>
          </HStack>

          <HStack space={3} alignItems="center">
            <Box
              w={8}
              h={8}
              bg="primary.100"
              rounded="full"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={MaterialIcons}
                name="menu-book"
                size="sm"
                color="primary.500"
              />
            </Box>
            <Text fontSize="md" color="gray.700">
              Menüden siparişinizi seçin
            </Text>
          </HStack>

          <HStack space={3} alignItems="center">
            <Box
              w={8}
              h={8}
              bg="primary.100"
              rounded="full"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={MaterialIcons}
                name="payment"
                size="sm"
                color="primary.500"
              />
            </Box>
            <Text fontSize="md" color="gray.700">
              Kendi hesabınızı ödeyin
            </Text>
          </HStack>
        </VStack>

        {/* Başla Butonu */}
        <VStack space={4}>
          <SplitButton
            size="lg"
            onPress={handleStartScanning}
          >
            <HStack space={2} alignItems="center">
              <Icon as={MaterialIcons} name="qr-code-scanner" size="md" />
              <Text>Masaya Katıl</Text>
            </HStack>
          </SplitButton>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Masadaki QR kodu okutarak başlayın
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
