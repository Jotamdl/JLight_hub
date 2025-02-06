import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const products = useProductStore((state) => state.products);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    
    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack spacing={8}>
                <Text
                    fontFamily={""}
                    fontSize={"30"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    Current Products
                </Text>
                
                <SimpleGrid
                    columns={{base: 1, 
                              md: 2,
                              lg: 3
                            }}
                    spacing={10}
                    w={"full"}
                >
                    {products.map((product) => (
                        <ProductCard 
                            key={product._id} 
                            product={product}
                        />
                    ))}
                </SimpleGrid>
                
                {!!products.length ||
                <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    color={'gray.500'}
                >
                    No products found.
                    <Link to={"/create"}>
                        <Text color={"blue.500"} _hover={{textDecoration: "underline"}}>
                            Create product
                        </Text>
                    </Link>
                </Text>}

            </VStack>
        </Container>
    )
}

export default HomePage