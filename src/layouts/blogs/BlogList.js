import {
    Box,
    Stack
} from "@chakra-ui/react";

const BlogEntryList = (props) => {
    return (
        <Stack direction="row">
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
            maxW="100%"
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
            <Box fontWeight="medium" fontSize="lg" as="h4">
                {props.entry.title}
            </Box>
            <Box as="h6" color="gray.400" lineHeight="tight" noOfLines={2} isTruncated>
                {props.entry.preview}
            </Box>
        </Box>
    )
}

export default BlogEntryList;