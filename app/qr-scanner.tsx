import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Input, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useUserStore } from '../stores/slices/userSlice';

function getRandomTableId() {
  // 1-99 arası random masa numarası
  const num = Math.floor(Math.random() * 99) + 1;
  return `table-${num}`;
}

export default function QRScannerScreen() {
  const router = useRouter();
  const { connectToTable } = useUserStore();
  const [manualCode, setManualCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleManualConnect = async () => {
    setIsLoading(true);
    let tableId = manualCode.trim();
    if (!tableId) {
      // Random masa kodu ile bağlan
      tableId = getRandomTableId();
      Alert.alert('Demo', `Rastgele masa: ${tableId} ile bağlanıldı.`);
    } else {
      // Kullanıcı kodu girmişse, prefix ekle
      if (!tableId.startsWith('table-')) {
        tableId = `table-${tableId}`;
      }
    }
    connectToTable(tableId);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/menu');
    }, 500);
  };

  const handleBack = () => router.back();

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" px={4} py={3} shadow={2}>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={handleBack}>
            <Icon as={MaterialIcons} name="arrow-back" size={6} color="gray.600" />
          </Pressable>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            QR Kod / Masa Girişi
          </Text>
        </HStack>
      </Box>

      <ScrollView flex={1} contentContainerStyle={{ padding: 16 }}>
        <VStack space={6}>
          {/* QR Scanner Placeholder */}
          <Box
            bg="white"
            h={220}
            rounded="lg"
            shadow={1}
            borderWidth={2}
            borderColor="primary.300"
            borderStyle="dashed"
            justifyContent="center"
            alignItems="center"
          >
            <VStack space={3} alignItems="center">
              <Box bg="primary.100" p={4} rounded="full" alignItems="center">
                <Icon as={MaterialIcons} name="qr-code-scanner" size={10} color="primary.500" />
              </Box>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                QR Kodu Tarayın
              </Text>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                (Demo: Kamera entegrasyonu yok)
              </Text>
            </VStack>
          </Box>

          {/* Manuel Kod Girişi */}
          <Box bg="white" p={4} rounded="lg" shadow={1}>
            <VStack space={3}>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                Masa Kodu
              </Text>
              <Input
                placeholder="Masa kodu (örn: 12 veya table-12)"
                value={manualCode}
                onChangeText={setManualCode}
                bg="gray.50"
                borderWidth={1}
                borderColor="gray.200"
                rounded="md"
                fontSize="md"
                autoCapitalize="none"
                autoCorrect={false}
                isDisabled={isLoading}
              />
              <Pressable onPress={handleManualConnect} isDisabled={isLoading}>
                <Box
                  bg={isLoading ? 'gray.300' : 'primary.500'}
                  p={3}
                  rounded="md"
                  alignItems="center"
                >
                  <Text fontSize="md" fontWeight="semibold" color={isLoading ? 'gray.500' : 'white'}>
                    {isLoading ? 'Bağlanıyor...' : 'Masaya Katıl'}
                  </Text>
                </Box>
              </Pressable>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Kod girmezseniz rastgele bir masa ile bağlanılır (demo).
              </Text>
            </VStack>
          </Box>

          {/* Bilgilendirme */}
          <Box bg="blue.50" p={4} rounded="lg" borderWidth={1} borderColor="blue.200">
            <VStack space={2}>
              <HStack space={2} alignItems="center">
                <Icon as={MaterialIcons} name="info" size={5} color="blue.500" />
                <Text fontSize="md" fontWeight="semibold" color="blue.800">
                  Nasıl Çalışır?
                </Text>
              </HStack>
              <Text fontSize="sm" color="blue.700">
                {`1. QR kodu tarayın veya masa kodunu girin\n2. Menüye erişin\n3. Ürün seçin\n4. Ödeme yapın`}
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
} 