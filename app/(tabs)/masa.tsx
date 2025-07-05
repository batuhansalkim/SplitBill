import { Box, VStack, Text, Input, Button, HStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function MasaScreen() {
  const [connected, setConnected] = useState(false);
  const [restaurant, setRestaurant] = useState('Demo Restoran');
  const [table, setTable] = useState('12');
  const [manualCode, setManualCode] = useState('');

  const handleConnect = () => {
    setConnected(true);
    setRestaurant('Demo Restoran');
    setTable(manualCode || '12');
  };

  return (
    <Box flex={1} bg="gray.50" safeArea p={4}>
      {connected && (
        <Box bg="primary.50" p={4} rounded="lg" mb={4} alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="primary.700">{restaurant}</Text>
          <Text fontSize="md" color="gray.700">Masa: <Text fontWeight="bold">{table}</Text></Text>
        </Box>
      )}
      <VStack space={6} alignItems="center" mt={connected ? 0 : 12}>
        <Box bg="white" p={6} rounded="2xl" shadow={2} alignItems="center">
          <Icon as={MaterialIcons} name="qr-code-scanner" size={16} color="primary.500" mb={2} />
          <Text fontSize="md" fontWeight="semibold" color="gray.800" mb={2}>QR Kod Okut</Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">(Demo: Kamera entegrasyonu yok)</Text>
        </Box>
        <Box bg="white" p={6} rounded="2xl" shadow={2} w="full">
          <Text fontSize="md" fontWeight="semibold" color="gray.800" mb={2}>Manuel Masa Kodu</Text>
          <Input
            placeholder="Masa kodu girin (örn: 12)"
            value={manualCode}
            onChangeText={setManualCode}
            bg="gray.50"
            borderWidth={1}
            borderColor="gray.200"
            rounded="md"
            fontSize="md"
            autoCapitalize="none"
            autoCorrect={false}
            mb={3}
          />
          <Button colorScheme="primary" w="full" onPress={handleConnect}>
            Bağlan
          </Button>
        </Box>
      </VStack>
    </Box>
  );
} 