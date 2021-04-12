import { Box } from "@chakra-ui/react"

const Layout = ({ children }) => {
    return (
        <Box p={2} m={5}>
            { children }
        </Box>
    )
}

export default Layout