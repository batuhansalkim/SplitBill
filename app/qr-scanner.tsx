import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SplitButton } from '../components/ui/SplitButton';
import { useUserStore } from '../stores/userStore';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  
  const router = useRouter();
  const { connectToTable } = useUserStore();

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    // QR kod verisi masa ID'si olarak kabul ediyoruz
    // Gerçek uygulamada bu veri daha karmaşık olabilir
    const tableId = data;
    
    // Masaya bağlan
    connectToTable(tableId);
    
    // Menü ekranına yönlendir
    router.push('/menu');
  };

  const handleManualConnect = () => {
    if (manualCode.trim()) {
      connectToTable(manualCode.trim());
      router.push('/menu');
    }
  };

  if (hasPermission === null) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="gray.50">
        <Text>Kamera izni isteniyor...</Text>
      </Box>
    );
  }

  if (hasPermission === false) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="gray.50" p={6}>
        <VStack space={4} alignItems="center">
          <Icon
            as={MaterialIcons}
            name="camera-alt"
            size="4xl"
            color="gray.400"
          />
          <Text fontSize="lg" fontWeight="semibold" textAlign="center">
            Kamera İzni Gerekli
          </Text>
          <Text fontSize="md" textAlign="center" color="gray.600">
            QR kodu okutabilmek için kamera iznine ihtiyacımız var.
          </Text>
          <SplitButton
            variant="outline"
            onPress={() => setShowManualInput(true)}
          >
            Masa Kodu Gir
          </SplitButton>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="black">
      {!showManualInput ? (
        <>
          {/* Kamera Görünümü */}
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Üst Bilgi Çubuğu */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bg="rgba(0,0,0,0.7)"
            p={4}
            pt={12}
          >
            <VStack space={2} alignItems="center">
              <Text color="white" fontSize="lg" fontWeight="bold">
                SplitBill
              </Text>
              <Text color="white" fontSize="sm" textAlign="center">
                Masadaki QR kodu okutun
              </Text>
            </VStack>
          </Box>

          {/* QR Çerçevesi */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            style={{
              transform: [{ translateX: -100 }, { translateY: -100 }],
            }}
            w={200}
            h={200}
            borderWidth={2}
            borderColor="primary.500"
            borderRadius={20}
          />

          {/* Alt Butonlar */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0,0,0,0.8)"
            p={6}
            pb={12}
          >
            <VStack space={4}>
              <SplitButton
                variant="outline"
                onPress={() => setShowManualInput(true)}
              >
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="keyboard" size="sm" />
                  <Text>Masa Kodu Gir</Text>
                </HStack>
              </SplitButton>

              {scanned && (
                <SplitButton
                  onPress={() => setScanned(false)}
                >
                  Tekrar Tara
                </SplitButton>
              )}
            </VStack>
          </Box>
        </>
      ) : (
        /* Manuel Kod Girişi */
        <Box flex={1} bg="gray.50" p={6} pt={12}>
          <VStack space={6} flex={1}>
            <VStack space={4} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="qr-code-scanner"
                size="4xl"
                color="primary.500"
              />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Masa Kodunu Girin
              </Text>
              <Text fontSize="md" textAlign="center" color="gray.600">
                Masadaki QR kodun altındaki kodu buraya yazın
              </Text>
            </VStack>

            <Box
              bg="white"
              p={4}
              rounded="lg"
              borderWidth={1}
              borderColor="gray.200"
            >
              <Text
                fontSize="lg"
                fontWeight="semibold"
                textAlign="center"
                color="gray.800"
              >
                {manualCode || 'Masa Kodu'}
              </Text>
            </Box>

            <VStack space={3}>
              <SplitButton
                onPress={handleManualConnect}
                disabled={!manualCode.trim()}
              >
                Masaya Katıl
              </SplitButton>
              
              <SplitButton
                variant="ghost"
                onPress={() => setShowManualInput(false)}
              >
                Geri Dön
              </SplitButton>
            </VStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
} 