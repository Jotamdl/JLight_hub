import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalFooter, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { MdEditSquare, MdDelete  } from "react-icons/md";
import React, { useState } from 'react'
import { useProductStore } from '../store/product';


const ProductCard = ({product}) => {
    const [updatedProduct,setUpdatedProduct] = useState(product)
    
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const deleteProduct = useProductStore((state) => state.deleteProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true
            })
        }
    };

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.900");
    
    const handleUpdateProduct = async (pid, product) => {
        const {success, message} = await updateProduct(pid, product);
        
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: 'success',
                isClosable: true
            })
        }
        
        onClose();
    };

    return (
    <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    >
        <Image 
            src={product.image}
            alt={product.name}
            h={48}
            w={"full"}
            objectFit={"cover"}
        />
        <Box
            p={4}
        >
            <Heading 
                as={"h3"}
                size={"md"}
                mb={2}
            >
                {product.name}
            </Heading>
            <Text
                fontWeight={"bold"}
                fontSize={"xl"}
                color={textColor}
                mb={4}
            >
                ${product.price}
            </Text>
            <HStack
                spacing={2}
            >
                <IconButton
                    icon={<MdEditSquare />}
                    onClick={onOpen}
                    colorScheme='blue'
                />
                <IconButton
                    icon={<MdDelete />}
                    onClick={() => handleDeleteProduct(product._id)}
                    colorScheme='red'
                />
                
            </HStack>
        </Box>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Update product
                </ModalHeader>                    
                <ModalCloseButton/>
                <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                            placeholder='Product Name'
                            name='name' 
                            value={updatedProduct.name}
                            onChange={(Input) => setUpdatedProduct({...updatedProduct, name: Input.target.value})}
                        />
                        <Input
                            placeholder='Price'
                            name='price' type='number'
                            value={updatedProduct.price}
                            onChange={(Input) => setUpdatedProduct({...updatedProduct, price: Input.target.value})}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(Input) => setUpdatedProduct({...updatedProduct, image: Input.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='blue'
                        mr={3}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                        Update
                    </Button>
                    <Button
                        variant='ghost'
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>

  );
};

export default ProductCard