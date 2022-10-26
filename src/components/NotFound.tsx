import {
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import pageNotFoundAnimation from '../../public/84918-404-error-doodle-animation.json';

export function NotFound() {
  const router = useRouter();

  return (
    <VStack justify="center" spacing={10} minH="Calc(80vh)">
      <Box width={{ base: '70%', lg: '40%' }}>
        <Lottie animationData={pageNotFoundAnimation} loop />
      </Box>
      <Button colorScheme="blue" onClick={() => router.push('/products')}>
        Go Back
      </Button>
    </VStack>
  );
}
