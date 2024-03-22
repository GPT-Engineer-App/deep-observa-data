import React, { useState } from "react";
import { Box, Heading, Text, Flex, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image } from "@chakra-ui/react";
import { FaPlus, FaSearch, FaDatabase, FaProjectDiagram, FaTags } from "react-icons/fa";

const datasets = [
  { id: 1, name: "Customer Data", source: "CRM", owner: "John Doe", quality: 4, tags: ["crm", "customers"] },
  { id: 2, name: "Sales Data", source: "Sales DB", owner: "Jane Doe", quality: 5, tags: ["sales", "revenue"] },
  { id: 3, name: "Product Catalog", source: "PIM", owner: "Bob Smith", quality: 3, tags: ["products", "catalog"] },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDataset, setSelectedDataset] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredDatasets = datasets.filter((dataset) => dataset.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box p={8}>
      <Flex align="center" justify="space-between" mb={8}>
        <Heading as="h1" size="xl">
          Data Management Platform
        </Heading>
        <Button leftIcon={<FaPlus />} colorScheme="blue">
          Add Dataset
        </Button>
      </Flex>

      <Flex mb={8}>
        <Input placeholder="Search datasets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mr={4} />
        <Button leftIcon={<FaSearch />}>Search</Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Source</Th>
            <Th>Owner</Th>
            <Th>Quality Score</Th>
            <Th>Tags</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredDatasets.map((dataset) => (
            <Tr key={dataset.id}>
              <Td>{dataset.name}</Td>
              <Td>{dataset.source}</Td>
              <Td>{dataset.owner}</Td>
              <Td>
                <Badge colorScheme={dataset.quality >= 4 ? "green" : "red"}>{dataset.quality}</Badge>
              </Td>
              <Td>
                {dataset.tags.map((tag) => (
                  <Badge key={tag} mr={2}>
                    {tag}
                  </Badge>
                ))}
              </Td>
              <Td>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedDataset(dataset);
                    onOpen();
                  }}
                >
                  View
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dataset Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDataset && (
              <Box>
                <Heading as="h2" size="lg" mb={4}>
                  {selectedDataset.name}
                </Heading>
                <Flex align="center" mb={4}>
                  <FaDatabase />
                  <Text ml={2}>{selectedDataset.source}</Text>
                </Flex>
                <Flex align="center" mb={4}>
                  <FaProjectDiagram />
                  <Text ml={2}>Lineage Graph</Text>
                </Flex>
                <Image src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwbGluZWFnZSUyMGRpYWdyYW18ZW58MHx8fHwxNzExMTIwNDE4fDA&ixlib=rb-4.0.3&q=80&w=1080" mb={4} />
                <Flex align="center">
                  <FaTags />
                  <Text ml={2}>Tags: {selectedDataset.tags.join(", ")}</Text>
                </Flex>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
