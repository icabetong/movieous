import {
    Box,
    GridItem,
    IconButton,
    SimpleGrid,
    Stack
} from "@chakra-ui/react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import dateFormat from "dateformat";

const BlogEntryList = (props) => {
    return (
        <SimpleGrid
            columns={{base: 1, md: 4, lg: 5}}
            mt={4}
            spacing={5}>
            { props.entries.map(entry => (
                <BlogEntryCard
                    key={entry.entryId}
                    entry={entry}
                    onClick={props.onClick}
                    onDelete={props.onDelete}/>
            ))}
        </SimpleGrid>
    )
}

const BlogEntryCard = (props) => {
    return (
        <GridItem>
            <Box 
                p={6} 
                maxW="xs"
                display="flex"
                flexDirection="column"
                alignItems="baseline" 
                borderWidth="1px" 
                borderRadius="lg" 
                overflow="hidden"
                _hover={{ borderColor: "blue.300", bg: "surface.700" }}>
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase">
                    {props.entry.timestamp !== null && dateFormat(props.entry.timestamp.toDate(),"paddedShortDate")}
                </Box>
                <Box 
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated>
                    {props.entry.title}
                </Box>
                <Stack direction="row" display="flex" alignItems="center" justifyContent="flex-end" mt={2} w="100%">
                    <IconButton onClick={() => props.onClick(props.entry)} icon={<HiOutlinePencil/>}/>
                    <IconButton onClick={() => props.onDelete(props.entry)} icon={<HiOutlineTrash/>}/>
                </Stack>
            </Box>
        </GridItem>
    )
}

export default BlogEntryList;