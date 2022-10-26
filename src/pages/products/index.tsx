// import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import {
  Box, Button, Heading, VStack,
} from '@chakra-ui/react';
import Lottie from 'lottie-react';
import axios from 'axios';
import { ProductGrid } from '../../components/products/ProductGrid';
import type { Product } from '../../models/Product';
import { ProductCard } from '../../components/products/ProductCard';
// import { OrderPlacedModal } from '../../components/OrderPlacedModal';
// import { getProducts } from '~/services/product.server';
import noProductFoundAnimation from '../../../public/105560-no-product.json';

// export const loader: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url);
//   const products = await getProducts(url.searchParams.get('search') || '');
//   return products;
// };

const API_URL = 'https://sweet-apple-acres.netlify.app/.netlify/functions/api';

export async function getServerSideProps() {
  const { data } = await axios.get<Product[]>(`${API_URL}/products`, {
    // params: {
    //   search: query,
    // },
  });
  return { props: { data } };
}

export default function ProductsPage({ data: products }: { data: Product[] }) {
  // const products: Product[] = useLoaderData();
  // const [params] = useSearchParams();
  // const navigate = useNavigate();

  // const orderPlaced = params.get('orderPlaced') === 'true';

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
    // navigate('/cart');
  };

  return products.length > 0 ? (
    <>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // onClickDetails={() => navigate(`/products/${product.id}`)}
            onClickAddToCart={() => addProductToCart(product)}
          />
        ))}
      </ProductGrid>
      {/* {orderPlaced && <OrderPlacedModal />} */}
    </>
  ) : (
    <VStack justify="flex-start" spacing={10} minH="Calc(80vh)">
      <Box width={{ base: '70%', lg: '40%' }}>
        <Lottie animationData={noProductFoundAnimation} loop={false} />
      </Box>
      <Heading fontSize="2xl" fontWeight="extrabold">
        Product not found
      </Heading>
      {/* <Button colorScheme="blue" onClick={() => navigate('/')}> */}
      <Button colorScheme="blue">
        Go Back
      </Button>
    </VStack>
  );
}
