import React from 'react';
import { Box, Text, HStack, VStack, Pressable, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '../../stores/menuStore';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  showAddButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showAddButton = true,
}) => {
  return (
    <Pressable onPress={() => onPress(product)}>
      <Box
        bg="white"
        rounded="lg"
        shadow={2}
        p={4}
        mb={3}
        borderWidth={1}
        borderColor="gray.200"
      >
        <HStack space={3} alignItems="center">
          {/* Ürün Görseli Placeholder */}
          <Box
            w={16}
            h={16}
            bg="gray.100"
            rounded="md"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              as={MaterialIcons}
              name="restaurant"
              size="md"
              color="gray.400"
            />
          </Box>

          {/* Ürün Bilgileri */}
          <VStack flex={1} space={1}>
            <Text fontSize="md" fontWeight="semibold" color="gray.800">
              {product.name}
            </Text>
            <Text fontSize="sm" color="gray.600" numberOfLines={2}>
              {product.description}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="primary.500">
              ₺{product.price}
            </Text>
          </VStack>

          {/* Ekle Butonu */}
          {showAddButton && (
            <Box
              bg="primary.500"
              rounded="full"
              w={8}
              h={8}
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={MaterialIcons}
                name="add"
                size="sm"
                color="white"
              />
            </Box>
          )}
        </HStack>

        {/* Stok Durumu */}
        {!product.available && (
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="error.500"
            px={2}
            py={1}
            rounded="full"
          >
            <Text fontSize="xs" color="white" fontWeight="bold">
              Stokta Yok
            </Text>
          </Box>
        )}
      </Box>
    </Pressable>
  );
}; 