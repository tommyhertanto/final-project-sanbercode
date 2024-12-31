import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const Register = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // Tambahkan logika register di sini, seperti mengirim data ke API
    };
  
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bg="gray.100"
      >
        <Box
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          width="100%"
          maxWidth="400px"
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Register
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" width="full">
                Register
              </Button>
            </VStack>
          </form>
          <Text mt={4} textAlign="center" fontSize="sm">
            Already have an account?{" "}
            {/* <a href="/login" style={{ color: "#2b6cb0" }}>
              Login
            </a> */}
          </Text>
        </Box>
      </Box>
    );
  };
  
  export default Register;
  