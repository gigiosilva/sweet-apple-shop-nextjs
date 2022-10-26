import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import successAnimation from '../../public/57490-successful.json';

export function OrderPlacedModal() {
  const router = useRouter();

  return (
    <Modal
      isCentered
      isOpen
      onClose={() => router.push('/')}
      size="2xl"
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" mx="10">
        <ModalBody>
          <Stack
            maxW="xs"
            mx="auto"
            py={{ base: '12', md: '16' }}
            spacing={{ base: '6', md: '10' }}
            align="center"
          >
            <Lottie animationData={successAnimation} loop={false} />
            <Stack spacing="3" textAlign="center">
              <Text fontSize="4xl" fontWeight={500}>Order Placed</Text>
              <Text fontSize="lg">
                Thank you for choosing us!
              </Text>
              <Text fontSize="sm">
                You will receive an email as soon as your package is shipped.
              </Text>
            </Stack>
            <Button
              colorScheme="blue"
              width="full"
              onClick={() => router.push('/')}
            >
              Continue Shopping
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
