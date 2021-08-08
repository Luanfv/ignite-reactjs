import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface IProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: IProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Luan Vieira</Text>
          <Text color="gray.300" fontSize="small">
            luan@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Luan Vieira"
        src="https://github.com/luanfv.png"
      />
    </Flex>
  );
}
