import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Box, Divider, HStack, Icon, Input, Pressable, Radio, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { SplitButton } from '../components/common/Button/SplitButton';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useUserStore } from '../stores/userStore';

type PaymentMethod = 'card' | 'mobile' | 'cash';

export default function PaymentScreen() {
  const router = useRouter();
  const { tableId, isConnected } = useUserStore();
  const { items, totalAmount, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [couponCode, setCouponCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (items.length === 0) {
      return;
    }

    setIsProcessing(true);

    try {
      // Mock ödeme işlemi - gerçek uygulamada payment gateway entegrasyonu olacak
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Sipariş oluştur
      const orderItems = items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        notes: item.notes,
      }));

      createOrder({
        tableId: tableId!,
        userId: 'user_' + Date.now(), // Mock user ID
        items: orderItems,
        totalAmount,
        status: 'confirmed',
        estimatedTime: 20, // 20 dakika
      });

      // Sepeti temizle
      clearCart();

      // Sipariş takip ekranına yönlendir
      router.push('/order-tracking');
    } catch (error) {
      console.error('Ödeme hatası:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToCart = () => {
    router.back();
  };

  if (!isConnected || !tableId) {
    router.replace('/');
    return null;
  }

  if (items.length === 0) {
    router.replace('/menu');
    return null;
  }

  return (
    <Box flex={1} bg="gray.50" safeArea>
      {/* Header */}
      <Box bg="white" p={4} shadow={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={handleBackToCart}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="arrow-back"
                size="md"
                color="gray.600"
              />
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Ödeme
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </Box>

      {/* Sipariş Özeti */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={3}>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Sipariş Özeti
          </Text>
          
          {items.map((item, index) => (
            <HStack key={index} justifyContent="space-between" alignItems="center">
              <VStack flex={1}>
                <Text fontSize="md" color="gray.800">
                  {item.product.name} x{item.quantity}
                </Text>
                {item.notes && (
                  <Text fontSize="sm" color="gray.600">
                    Not: {item.notes}
                  </Text>
                )}
              </VStack>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                ₺{item.totalPrice}
              </Text>
            </HStack>
          ))}
          
          <Divider />
          
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Toplam
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="primary.500">
              ₺{totalAmount}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* Kupon Kodu */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={3}>
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            Kupon Kodu
          </Text>
          <HStack space={2}>
            <Input
              flex={1}
              placeholder="Kupon kodunuzu girin"
              value={couponCode}
              onChangeText={setCouponCode}
              bg="gray.50"
              borderWidth={1}
              borderColor="gray.200"
              rounded="lg"
            />
            <SplitButton
              variant="outline"
              size="sm"
              disabled={!couponCode.trim()}
            >
              Uygula
            </SplitButton>
          </HStack>
        </VStack>
      </Box>

      {/* Ödeme Yöntemi */}
      <Box bg="white" p={4} mb={2}>
        <VStack space={4}>
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            Ödeme Yöntemi
          </Text>
          
          <Radio.Group
            name="paymentMethod"
            value={paymentMethod}
            onChange={(value) => setPaymentMethod(value as PaymentMethod)}
          >
            <VStack space={3}>
              <Radio value="card" size="sm">
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="credit-card" size="sm" color="primary.500" />
                  <Text>Kredi Kartı</Text>
                </HStack>
              </Radio>
              
              <Radio value="mobile" size="sm">
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="smartphone" size="sm" color="primary.500" />
                  <Text>Mobil Ödeme</Text>
                </HStack>
              </Radio>
              
              <Radio value="cash" size="sm">
                <HStack space={2} alignItems="center">
                  <Icon as={MaterialIcons} name="attach-money" size="sm" color="primary.500" />
                  <Text>Nakit</Text>
                </HStack>
              </Radio>
            </VStack>
          </Radio.Group>
        </VStack>
      </Box>

      {/* Kart Bilgileri */}
      {paymentMethod === 'card' && (
        <Box bg="white" p={4} mb={2}>
          <VStack space={4}>
            <Text fontSize="md" fontWeight="semibold" color="gray.800">
              Kart Bilgileri
            </Text>
            
            <Input
              placeholder="Kart Numarası"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
              bg="gray.50"
              borderWidth={1}
              borderColor="gray.200"
              rounded="lg"
            />
            
            <Input
              placeholder="Kart Sahibi"
              value={cardHolder}
              onChangeText={setCardHolder}
              bg="gray.50"
              borderWidth={1}
              borderColor="gray.200"
              rounded="lg"
            />
            
            <HStack space={2}>
              <Input
                flex={1}
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
                bg="gray.50"
                borderWidth={1}
                borderColor="gray.200"
                rounded="lg"
              />
              <Input
                flex={1}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={3}
                bg="gray.50"
                borderWidth={1}
                borderColor="gray.200"
                rounded="lg"
              />
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Ödeme Butonu */}
      <Box bg="white" p={4} shadow={4}>
        <VStack space={4}>
          <SplitButton
            size="lg"
            onPress={handlePayment}
            loading={isProcessing}
            disabled={isProcessing || (paymentMethod === 'card' && (!cardNumber || !cardHolder || !expiryDate || !cvv))}
          >
            <HStack space={2} alignItems="center" justifyContent="center">
              <Icon as={MaterialIcons} name="payment" size="md" />
              <Text>
                {isProcessing ? 'İşleniyor...' : `₺${totalAmount} Öde`}
              </Text>
            </HStack>
          </SplitButton>
          
          <Text fontSize="xs" color="gray.500" textAlign="center">
            Ödeme güvenliğiniz için SSL şifreleme kullanılmaktadır
          </Text>
        </VStack>
      </Box>
    </Box>
  );
} 