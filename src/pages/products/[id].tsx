import {
  Box,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { PriceTag } from '../../components/products/PriceTag';
import { Rating } from '../../components/products/Rating';
import type { Product } from '../../models/Product';
// import { getProduct } from '../../../services/product.server';

const API_URL = 'https://sweet-apple-acres.netlify.app/.netlify/functions/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data: product } = await axios.get<Product>(`${API_URL}/products/${id}`);
  return { props: { product } };
};

export default function ProductDetailsPage({ product: productData }: { product: Product }) {
  const {
    name, image, price, rating, description, isAvailable,
  } = productData;

  const router = useRouter();

  if (!productData) throw new Error('Product not found');

  useEffect(() => {
    document.title = `Sweet Apple Store | ${name}`;
  });

  const addProductToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((p: Product) => p.id === product.id);
    if (!existingProduct) {
      product.quantity = 1;
      cart.push(product);
    } else {
      existingProduct.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart');
  };

  return (

    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      <Flex>
        <Image
          rounded="md"
          alt={name}
          src={image}
          fit="cover"
          align="center"
          w="100%"
          h={{ base: '100%', sm: '400px', lg: '500px' }}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as="header">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
          >
            {name}
          </Heading>
          <VStack justify="space-between" align="self-start">
            <PriceTag price={price + 10} salePrice={price} currency="USD" />
            <Rating defaultValue={rating} size="sm" />
          </VStack>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction="column"
          divider={(
            <StackDivider
              borderColor={useColorModeValue('gray.200', 'gray.600')}
            />
            )}
        >
          <Text
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize="2xl"
            fontWeight="300"
            h={{ base: 'auto', lg: '215px' }}
          >
            {description}
          </Text>
        </Stack>

        {isAvailable ? (

          <Button
            colorScheme="blue"
            width="full"
            onClick={() => addProductToCart(productData)}
          >
            Add to cart
          </Button>
        ) : (
          <Button
            colorScheme="gray"
            width="full"
            disabled
          >
            Out of stock
          </Button>
        )}

        <Stack direction="row" alignItems="center" justifyContent="center">
          <MdLocalShipping />
          <Text>2-3 business days delivery</Text>
        </Stack>
      </Stack>
    </SimpleGrid>
  );
}
