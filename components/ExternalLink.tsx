import { Text } from 'native-base';
import React from 'react';
import { Linking, Pressable } from 'react-native';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  const handlePress = () => {
    Linking.openURL(href);
  };

  return (
    <Pressable onPress={handlePress}>
      <Text color="primary.500" textDecorationLine="underline">
        {children}
      </Text>
    </Pressable>
  );
}; 