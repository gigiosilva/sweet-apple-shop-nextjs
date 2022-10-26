// import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import {
  Box, Button, Heading, VStack,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ProductGrid } from '../../components/products/ProductGrid';
import type { Product } from '../../models/Product';
import { ProductCard } from '../../components/products/ProductCard';
import noProductFoundAnimation from '../../../public/105560-no-product.json';
import { OrderPlacedModal } from '../../components/OrderPlacedModal';

const API_URL = 'https://sweet-apple-acres.netlify.app/.netlify/functions/api';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<Product[]>(`${API_URL}/products`, {
    params: {
      search: context.query.search || '',
    },
  });
  return { props: { data } };
};

export default function ProductsPage({ data: products }: { data: Product[] }) {
  const router = useRouter();
  const orderPlaced = router.query.orderPlaced === 'true';

  useEffect(() => {
    document.title = 'Sweet Apple Store | Products';
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

  return products.length > 0 ? (
    <>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClickDetails={() => router.push(`/products/${product.id}`)}
            onClickAddToCart={() => addProductToCart(product)}
          />
        ))}
      </ProductGrid>
      {orderPlaced && <OrderPlacedModal />}
    </>
  ) : (
    <VStack justify="flex-start" spacing={10} minH="Calc(80vh)">
      <Box width={{ base: '70%', lg: '40%' }}>
        <Lottie animationData={noProductFoundAnimation} loop={false} />
      </Box>
      <Heading fontSize="2xl" fontWeight="extrabold">
        Product not found
      </Heading>
      <Button colorScheme="blue" onClick={() => router.push('/')}>
        Go Back
      </Button>
    </VStack>
  );
}
