import Button from "../components/Button"
import { ButtonGroup } from "../components/Containers"

const GroupButton = ({ value, onClick }) => {
    const donationValues = [5, 10, 20, 50, 100, 500]
    return (
        <ButtonGroup>
            { donationValues.map((v, i) => {
                if (v === value) {
                    return (
                        <Button key={i} current onClick={() => onClick(v)}>{`R$${v},00`}</Button>
                    )
                } else {
                    return (
                        <Button key={i} onClick={() => onClick(v)}>{`R$${v},00`}</Button>
                    )
                }
            })}
        </ButtonGroup>
    )
}

export default GroupButton