import Button from "../components/Button"
import { ButtonGroup } from "../components/Containers"

const GroupButton = ({ value, onClick }) => {
    const donationValues = [1, 10, 25, 50, 100, 500, 1000]
    return (
        <ButtonGroup>
            { donationValues.map((v, i) => {
                if (v === value) {
                    return (
                        <Button isLoading={false} key={i} variant="contained" onClick={() => onClick(v)}>{`R$${v},00`}</Button>
                    )
                } else {
                    return (
                        <Button isLoading={false} key={i} onClick={() => onClick(v)}>{`R$${v},00`}</Button>
                    )
                }
            })}
        </ButtonGroup>
    )
}

export default GroupButton