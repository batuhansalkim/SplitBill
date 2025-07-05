import { Box } from 'native-base';
import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
  headerBackgroundColor?: { light: string; dark: string };
  headerImage?: React.ReactNode;
  style?: ViewStyle;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  children,
  headerBackgroundColor,
  headerImage,
  style,
}) => {
  return (
    <Box flex={1} bg="gray.50">
      {headerImage && (
        <Box
          bg={headerBackgroundColor?.light || 'gray.200'}
          h={200}
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {headerImage}
        </Box>
      )}
      <ScrollView
        style={[{ flex: 1 }, style]}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Box>
  );
};

export default ParallaxScrollView; 