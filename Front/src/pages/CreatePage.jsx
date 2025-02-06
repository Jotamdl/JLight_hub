import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })
    
    const toast = useToast()
    
    const createProduct = useProductStore((state) => state.createProduct);
    const handleProduct = async () => {
        const {success, message} = await createProduct(newProduct);
        
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            });
            return;
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });
        }
        setNewProduct({
            name: "",
            price: "",
            image: ""
        });
    };
    
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading
                    as={"h1"}
                    size={"2xl"}
                    textAlign={"center"}
                    mb={8}
                >
                    Create new product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.900")} p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack  spacing={4}>
                        <Input 
                            placeholder='Product Name'
                            name='name' 
                            value={newProduct.name}
                            onChange={(Input) => setNewProduct({...newProduct, name: Input.target.value})}
                        />
                        <Input
                            placeholder='Price'
                            name='price' 
                            type='number'
                            value={newProduct.price}
                            onChange={(Input) => setNewProduct({...newProduct, price: Input.target.value})}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(Input) => setNewProduct({...newProduct, image: Input.target.value})}
                        />
                        <Button
                            colorScheme='blue'
                            onClick={handleProduct}
                            w={"full"}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage