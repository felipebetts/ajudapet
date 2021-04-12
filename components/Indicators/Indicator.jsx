import { Flex } from "../Containers"
import { SingleContainer, Text } from "./styles"


const Indicator = ({Icon, amount, label}) => {
    return (
        <SingleContainer>
            { !Icon ? null : (
                <div style={{ margin: "10px" }}>
                    <Icon /> 
                </div>
            )}
            <Text>{amount}</Text>
            <Text>{label}</Text>
        </SingleContainer>
    )
}

export default Indicator