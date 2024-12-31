import {
  Box,
  Flex,
  Heading,
  Avatar,
  Text,
  VStack,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Input,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://service.pace-unv.cloud/api/posts?type=all");
        const data = await response.json();
        setPosts(data.posts || []); // Assume the API returns a `posts` array
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePost = () => {
    if (newPost.trim() === "") return;

    const newPostData = {
      id: posts.length + 1,
      author: "Umar Rama",
      email: "umar@mail.com",
      date: new Date().toDateString(),
      content: newPost,
      edited: true,
      likes: 0,
      replies: 0,
    };
    setPosts([newPostData, ...posts]);
    setNewPost("");
  };

  return (
    <Box bg="gray.100" minHeight="100vh">
      {/* Navbar */}
      <Flex
        bg="white"
        boxShadow="sm"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md" color="teal.600">
          Final Project
        </Heading>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="gray.200"
          >
            <Avatar
              name="Umar Rama"
              size="sm"
              bg="orange.400"
              color="white"
              mr={2}
            />
            <Text as="span" fontSize="sm">
              UR
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<EditIcon />}>My Profile</MenuItem>
            <MenuItem icon={<BellIcon />}>Notifications</MenuItem>
            <MenuItem icon={<ChevronDownIcon />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Post Form */}
      <Box bg="white" p={4} mt={4} mx="auto" maxWidth="600px" boxShadow="sm">
        <Input
          placeholder="what's happening ..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button mt={2} colorScheme="blue" onClick={handlePost} isFullWidth>
          Post
        </Button>
      </Box>

      {/* Posts */}
      <VStack spacing={4} mt={4} mx="auto" maxWidth="600px">
        {posts.map((post) => (
          <Box
            key={post.id}
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
            width="100%"
          >
            <HStack justify="space-between">
              <HStack>
                <Avatar
                  name={post.author}
                  bg="blue.400"
                  color="white"
                  size="sm"
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" fontSize="sm">
                    {post.author} {post.email === "umar@mail.com" && "(You)"}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {post.email}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {post.date} {post.edited && <Badge>EDITED</Badge>}
                  </Text>
                </VStack>
              </HStack>
            </HStack>
            <Divider my={2} />
            <Text>{post.content}</Text>
            <HStack mt={2} spacing={4} color="gray.500" fontSize="sm">
              <HStack spacing={1}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setPosts(
                      posts.map((p) =>
                        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                      )
                    )
                  }
                >
                  ❤️
                </Button>
                <Text>{post.likes} Like</Text>
              </HStack>
              <HStack spacing={1}>
                <Text>💬</Text>
                <Text>{post.replies} Replies</Text>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
