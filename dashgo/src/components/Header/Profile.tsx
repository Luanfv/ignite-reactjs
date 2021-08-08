import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex
      align="center"
    >
      <Box mr="4" textAlign="right">
        <Text>Luan Vieira</Text>
        <Text color="gray.300" fontSize="small">
          luan@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Luan Vieira"
        src="https://github.com/luanfv.png"
      />
    </Flex>
  );
}
