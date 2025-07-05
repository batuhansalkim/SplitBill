import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SplitButton } from '../components/common/Button/SplitButton';
import { OrderStatus, useOrderStore } from '../stores/orderStore';
import { useUserStore } from '../stores/userStore';

const statusSteps = [
  { key: 'confirmed', label: 'Sipariş Alındı', icon: 'receipt' },
  { key: 'preparing', label: 'Hazırlanıyor', icon: 'restaurant' },
  { key: 'ready', label: 'Hazır', icon: 'check-circle' },
  { key: 'delivered', label: 'Teslim Edildi', icon: 'delivery-dining' },
];

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { currentOrder } = useOrderStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!isConnected || !tableId) {
      router.replace('/');
      return;
    }

    if (!currentOrder) {
      router.replace('/menu');
      return;
    }

    // Sipariş durumuna göre adım belirle
    const stepIndex = statusSteps.findIndex(step => step.key === currentOrder.status);
    setCurrentStep(Math.max(0, stepIndex));

    // Kalan süreyi hesapla
    if (currentOrder.estimatedTime) {
      const elapsed = Math.floor((Date.now() - currentOrder.createdAt.getTime()) / 60000);
      setTimeRemaining(Math.max(0, currentOrder.estimatedTime - elapsed));
    }

    // Mock durum güncellemeleri
    const statusUpdates = [
      { status: 'preparing' as OrderStatus, delay: 5000 },
      { status: 'ready' as OrderStatus, delay: 15000 },
      { status: 'delivered' as OrderStatus, delay: 25000 },
    ];

    statusUpdates.forEach(({ status, delay }) => {
      setTimeout(() => {
        // Gerçek uygulamada bu güncelleme backend'den gelecek
        console.log(`Sipariş durumu: ${status}`);
      }, delay);
    });
  }, [currentOrder, isConnected, tableId, router]);

  const handleBackToMenu = () => {
    router.push('/menu');
  };

  const getStatusColor = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'success.500';
    if (stepIndex === currentStep) return 'primary.500';
    return 'gray.300';
  };

  const getStatusIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'check-circle';
    if (stepIndex === currentStep) return statusSteps[stepIndex].icon;
    return 'radio-button-unchecked';
  };

  if (!currentOrder) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="gray.50">
        <Text>Sipariş bulunamadı</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" p={4} shadow={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Sipariş Takibi
            </Text>
            <Text fontSize="sm" color="gray.600">
              Sipariş #{currentOrder.id.slice(-8)}
            </Text>
          </VStack>
          
          <Pressable onPress={handleBackToMenu}>
            <Icon
              as={MaterialIcons}
              name="home"
              size="md"
              color="primary.500"
            />
          </Pressable>
        </HStack>
      </Box>

      {/* Sipariş Bilgileri */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={3}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="md" fontWeight="semibold" color="gray.800">
              Masa {tableId}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {currentOrder.createdAt.toLocaleTimeString()}
            </Text>
          </HStack>
          
          <Text fontSize="lg" fontWeight="bold" color="primary.500">
            ₺{currentOrder.totalAmount}
          </Text>
          
          {timeRemaining > 0 && (
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="schedule"
                size="sm"
                color="warning.500"
              />
              <Text fontSize="sm" color="warning.500">
                Tahmini süre: {timeRemaining} dakika
              </Text>
            </HStack>
          )}
        </VStack>
      </Box>

      {/* Durum Adımları */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={4}>
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            Sipariş Durumu
          </Text>
          
          {statusSteps.map((step, index) => (
            <HStack key={step.key} space={3} alignItems="center">
              <Box
                w={8}
                h={8}
                bg={getStatusColor(index)}
                rounded="full"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={MaterialIcons}
                  name={getStatusIcon(index)}
                  size="sm"
                  color="white"
                />
              </Box>
              
              <VStack flex={1}>
                <Text
                  fontSize="md"
                  fontWeight={index <= currentStep ? 'semibold' : 'normal'}
                  color={index <= currentStep ? 'gray.800' : 'gray.500'}
                >
                  {step.label}
                </Text>
                {index === currentStep && (
                  <Text fontSize="sm" color="primary.500">
                    Devam ediyor...
                  </Text>
                )}
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Sipariş Detayları */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={3}>
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            Sipariş Detayları
          </Text>
          
          {currentOrder.items.map((item, index) => (
            <HStack key={index} justifyContent="space-between" alignItems="center">
              <VStack flex={1}>
                <Text fontSize="md" color="gray.800">
                  {item.productName} x{item.quantity}
                </Text>
                {item.notes && (
                  <Text fontSize="sm" color="gray.600">
                    Not: {item.notes}
                  </Text>
                )}
              </VStack>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                ₺{item.price * item.quantity}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* Alt Butonlar */}
      <Box bg="white" p={4} shadow={4}>
        <VStack space={3}>
          <SplitButton
            variant="outline"
            onPress={handleBackToMenu}
          >
            <HStack space={2} alignItems="center" justifyContent="center">
              <Icon as={MaterialIcons} name="menu-book" size="md" />
              <Text>Yeni Sipariş</Text>
            </HStack>
          </SplitButton>
          
          {currentOrder.status === 'delivered' && (
            <SplitButton
              onPress={() => router.push('/')}
            >
              <HStack space={2} alignItems="center" justifyContent="center">
                <Icon as={MaterialIcons} name="home" size="md" />
                <Text>Ana Sayfaya Dön</Text>
              </HStack>
            </SplitButton>
          )}
        </VStack>
      </Box>
    </Box>
  );
} 