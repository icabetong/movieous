import {
    Box,
    Stack
} from "@chakra-ui/react";

const BlogEntryList = (props) => {
    return (
        <Stack spacing={4}>
        { props.entries.map(entry => (
            <BlogEntryCard
                key={entry.entryId}
                entry={entry}
                onClick={props.onClick}/>
        ))}
        </Stack>
    )
}

const BlogEntryCard = (props) => {
    return (
        <Box
            p={4}
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.600"
            _hover={{
                cursor: "pointer",
                borderColor: "gray.300",
                bg: "gray.700",
                color: "blue.400"
            }}
            onClick={() => props.onClick(props.entry)}>
            <Box fontWeight="medium" fontSize="lg">
                {props.entry.title}
            </Box>
            <Box 
                color="gray.400"
                noOfLines="2"
                isTruncated>
                {props.entry.preview}
            </Box>
        </Box>
    )
}

export default BlogEntryList;