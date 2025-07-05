import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Badge, Box, Button, Divider, HStack, Icon, Input, Pressable, ScrollView, Text, VStack, useTheme } from 'native-base';
import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useUserStore } from '../../stores/slices/userSlice';

export default function MasaScreen() {
  const router = useRouter();
  const { tableId, isConnected, connectToTable, disconnect } = useUserStore();
  const [manualCode, setManualCode] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [garsonAnim] = useState(new Animated.Value(1));
  const theme = useTheme();

  const handleConnect = async () => {
    let code = manualCode.trim();
    if (!code) {
      // Generate random table code for testing
      const randomNum = Math.floor(Math.random() * 99) + 1;
      code = `table-${randomNum}`;
      setManualCode(code);
    }
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    connectToTable(code);
    setIsConnecting(false);
  };

  const handleQRScan = () => {
    // In a real app, this would open camera
    alert('QR kod tarama özelliği yakında eklenecek!');
  };

  const handleGarson = () => {
    Animated.sequence([
      Animated.timing(garsonAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
      Animated.timing(garsonAnim, { toValue: 1, duration: 120, useNativeDriver: true })
    ]).start();
    alert('Garson çağrıldı!');
  };

  if (isConnected && tableId) {
    return (
      <Box flex={1} bg="#f7fafc" safeArea>
        <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Animated Success Icon */}
          <Box alignItems="center" mt={2} mb={-6}>
            <Animated.View style={{ transform: [{ scale: garsonAnim }] }}>
              <Box bg="green.500" p={4} rounded="full" shadow={4} alignItems="center">
                <Icon as={MaterialIcons} name="check-circle" size={16} color="white" />
              </Box>
            </Animated.View>
          </Box>

          {/* Success Header */}
          <Box alignItems="center" mt={6} mb={2}>
            <Text fontSize="2xl" fontWeight="bold" color="green.700" mb={1}>
              Bağlantı Başarılı!
            </Text>
            <Text fontSize="md" color="green.600" textAlign="center">
              Artık sipariş verebilir ve ödeme yapabilirsiniz
            </Text>
            <Button
              size="sm"
              variant="outline"
              colorScheme="danger"
              mt={3}
              mb={1}
              onPress={disconnect}
              leftIcon={<Icon as={MaterialIcons} name="logout" size={4} color="red.500" />}
              _text={{ color: 'red.500', fontWeight: 'semibold' }}
              borderColor="red.300"
              rounded="full"
              _pressed={{ bg: 'red.50' }}
            >
              Bağlantıyı Kes
            </Button>
          </Box>

          {/* Connection Details Card */}
          <Box bg="white" mx={4} mt={2} p={6} rounded="2xl" shadow={4}>
            <VStack space={4} alignItems="center">
              <Box bg="green.50" p={4} rounded="full">
                <Icon as={MaterialIcons} name="restaurant" size={8} color="green.600" />
              </Box>
              <VStack alignItems="center" space={2}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                  Demo Restoran
                </Text>
                <Badge colorScheme="green" variant="solid" rounded="full" px={3}>
                  <HStack space={1} alignItems="center">
                    <Icon as={MaterialIcons} name="wifi" size={3} color="white" />
                    <Text color="white" fontSize="xs">Bağlı</Text>
                  </HStack>
                </Badge>
              </VStack>
              <Divider my={2} />
              <HStack space={6} alignItems="center">
                <VStack alignItems="center">
                  <Text fontSize="sm" color="gray.500">Masa No</Text>
                  <Text fontSize="xl" fontWeight="bold" color="primary.600">{tableId}</Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack alignItems="center">
                  <Text fontSize="sm" color="gray.500">Bağlantı Zamanı</Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.700">
                    {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </VStack>
              </HStack>
              <Button 
                colorScheme="primary" 
                size="lg" 
                w="full" 
                mt={4}
                onPress={() => router.push('/menu')}
                _pressed={{ opacity: 0.85 }}
              >
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="restaurant-menu" size={5} color="white" />
                  <Text fontWeight="semibold">Menüyü Görüntüle</Text>
                </HStack>
              </Button>
            </VStack>
          </Box>

          {/* Restaurant Info & Features */}
          <VStack space={4} p={4} mt={4}>
            {/* Restaurant Features */}
            <Box bg="white" p={4} rounded="xl" shadow={2}>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={3}>
                Restoran Özellikleri
              </Text>
              <VStack space={3}>
                <HStack space={3} alignItems="center">
                  <Icon as={MaterialIcons} name="wifi" size={5} color="green.500" />
                  <Text color="gray.700" flex={1}>Ücretsiz Wi-Fi</Text>
                  <Badge colorScheme="green" variant="subtle" rounded="full">
                    <Text fontSize="xs">Aktif</Text>
                  </Badge>
                </HStack>
                <HStack space={3} alignItems="center">
                  <Icon as={MaterialIcons} name="credit-card" size={5} color="blue.500" />
                  <Text color="gray.700" flex={1}>Kredi Kartı ile Ödeme</Text>
                  <Badge colorScheme="blue" variant="subtle" rounded="full">
                    <Text fontSize="xs">Kabul</Text>
                  </Badge>
                </HStack>
                <HStack space={3} alignItems="center">
                  <Icon as={MaterialIcons} name="delivery-dining" size={5} color="orange.500" />
                  <Text color="gray.700" flex={1}>Ortalama Hazırlama</Text>
                  <Text color="orange.600" fontWeight="semibold">15-20 dk</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Quick Tips */}
            <Box bg="amber.50" p={4} rounded="xl" borderWidth={1} borderColor="amber.200">
              <HStack space={3} alignItems="flex-start">
                <Icon as={MaterialIcons} name="lightbulb" size={5} color="amber.600" mt={0.5} />
                <VStack flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" color="amber.800" mb={1}>
                    İpuçları
                  </Text>
                  <Text fontSize="xs" color="amber.700" lineHeight="sm">
                    {'• Siparişinizi grup halinde verebilirsiniz\n• Ödeme işlemini masadan ayrılmadan yapabilirsiniz\n• Sipariş durumunu gerçek zamanlı takip edebilirsiniz'}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Contact Info */}
            <Box bg="gray.50" p={4} rounded="xl">
              <HStack space={3} alignItems="center" justifyContent="space-between">
                <HStack space={3} alignItems="center">
                  <Icon as={MaterialIcons} name="phone" size={5} color="gray.600" />
                  <VStack>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.800">Yardım mı gerekli?</Text>
                    <Text fontSize="xs" color="gray.600">Garson çağırmak için</Text>
                  </VStack>
                </HStack>
                <Animated.View style={{ transform: [{ scale: garsonAnim }] }}>
                  <Button size="sm" colorScheme="gray" variant="outline" rounded="full" onPress={handleGarson} _pressed={{ opacity: 0.7 }}>
                    <Icon as={MaterialIcons} name="notifications" size={4} color="gray.600" />
                  </Button>
                </Animated.View>
              </HStack>
            </Box>

            {/* Restaurant Info */}
            <Box bg="white" p={4} rounded="xl" shadow={1} mt={2}>
              <Text fontSize="md" fontWeight="semibold" color="gray.800" mb={1}>İletişim & Bilgi</Text>
              <VStack space={1}>
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="location-on" size={4} color="red.400" />
                  <Text fontSize="xs" color="gray.700">İstanbul, Kadıköy, Moda Cd. No:12</Text>
                </HStack>
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="access-time" size={4} color="gray.500" />
                  <Text fontSize="xs" color="gray.700">09:00 - 23:00</Text>
                </HStack>
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="phone" size={4} color="green.500" />
                  <Text fontSize="xs" color="gray.700">0216 123 45 67</Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>
        {/* Fixed Garson Button */}
        <Box position="absolute" bottom={4} left={0} right={0} alignItems="center" zIndex={10}>
          <Animated.View style={{ transform: [{ scale: garsonAnim }] }}>
            <Button
              size="lg"
              colorScheme="amber"
              rounded="full"
              px={10}
              shadow={4}
              onPress={handleGarson}
              _pressed={{ opacity: 0.8 }}
              leftIcon={<Icon as={MaterialIcons} name="notifications-active" size={6} color="white" />}
            >
              Garson Çağır
            </Button>
          </Animated.View>
        </Box>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box bg="white" p={6} shadow={1}>
          <VStack alignItems="center" space={2}>
            <Box bg="primary.50" p={4} rounded="full">
              <Icon as={MaterialIcons} name="restaurant" size={8} color="primary.600" />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Masa Bağlantısı
            </Text>
            <Text fontSize="md" color="gray.600" textAlign="center">
              Restoran masasına bağlanmak için QR kod okutun veya masa kodunu girin
            </Text>
          </VStack>
        </Box>

        {/* Connection Options */}
        <VStack space={6} p={6} pb={8}>
          {/* QR Code Option */}
          <Pressable onPress={handleQRScan}>
            <Box bg="white" p={6} rounded="2xl" shadow={2} alignItems="center" borderWidth={2} borderColor="primary.100">
              <Box bg="primary.50" p={4} rounded="full" mb={4}>
                <Icon as={MaterialIcons} name="qr-code-scanner" size={12} color="primary.600" />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
                QR Kod ile Bağlan
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center" mb={3}>
                Masadaki QR kodu telefonunuzla okutun
              </Text>
              <Badge colorScheme="primary" variant="subtle" rounded="full" px={3}>
                <Text fontSize="xs" color="primary.600">Önerilen</Text>
              </Badge>
            </Box>
          </Pressable>

          {/* Divider */}
          <HStack alignItems="center" space={4}>
            <Divider flex={1} />
            <Text fontSize="sm" color="gray.400" fontWeight="semibold">VEYA</Text>
            <Divider flex={1} />
          </HStack>

          {/* Manual Code Option */}
          <Box bg="white" p={6} rounded="2xl" shadow={2}>
            <VStack space={4}>
              <HStack alignItems="center" space={3}>
                <Box bg="gray.100" p={3} rounded="full">
                  <Icon as={MaterialIcons} name="keyboard" size={6} color="gray.600" />
                </Box>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Manuel Kod ile Bağlan
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Masadaki kodu manuel olarak girin
                  </Text>
                </VStack>
              </HStack>

              <VStack space={3}>
                <Input
                  placeholder="Masa kodunu girin (örn: A12, 15, VIP1)"
                  value={manualCode}
                  onChangeText={setManualCode}
                  bg="gray.50"
                  borderWidth={2}
                  borderColor={manualCode ? "primary.300" : "gray.200"}
                  rounded="xl"
                  fontSize="md"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  _focus={{
                    borderColor: "primary.500",
                    bg: "white"
                  }}
                  InputLeftElement={
                    <Icon as={MaterialIcons} name="table-restaurant" size={5} color="gray.400" ml={3} />
                  }
                />
                
                <Button 
                  colorScheme="primary" 
                  size="lg" 
                  w="full" 
                  onPress={handleConnect}
                  isLoading={isConnecting}
                  isLoadingText="Bağlanıyor..."
                  rounded="xl"
                >
                  <HStack space={2} alignItems="center">
                    <Icon as={MaterialIcons} name="wifi" size={5} color="white" />
                    <Text fontWeight="semibold">
                      {isConnecting ? 'Bağlanıyor...' : 'Masaya Bağlan'}
                    </Text>
                  </HStack>
                </Button>
              </VStack>
            </VStack>
          </Box>

          {/* Help Section */}
          <Box bg="blue.50" p={4} rounded="xl" borderWidth={1} borderColor="blue.200">
            <HStack space={3} alignItems="flex-start">
              <Icon as={MaterialIcons} name="info" size={5} color="blue.600" mt={0.5} />
              <VStack flex={1}>
                <Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={1}>
                  Yardıma mı ihtiyacınız var?
                </Text>
                <Text fontSize="xs" color="blue.700">
                  Masa kodunu bulamıyorsanız, garsonunuzdan yardım isteyebilirsiniz. 
                  Kod genellikle masanın üzerinde veya yanında bulunur.
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
} 