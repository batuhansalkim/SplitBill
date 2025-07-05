import { MaterialIcons } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box mb={4}>
      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        <Box
          bg="gray.100"
          p={3}
          rounded="md"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            {title}
          </Text>
          <Icon
            as={MaterialIcons}
            name={isExpanded ? 'expand-less' : 'expand-more'}
            size="sm"
            color="gray.600"
          />
        </Box>
      </Pressable>
      
      {isExpanded && (
        <Box bg="white" p={3} borderWidth={1} borderColor="gray.200" rounded="md" mt={1}>
          {children}
        </Box>
      )}
    </Box>
  );
}; 