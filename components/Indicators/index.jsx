import { GroupContainer } from "./styles"
import { Flex } from "../Containers"
import { H2 } from "../Text"
import Indicator from "./Indicator"
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';

const info = [
    {
        amount: "500",
        label: "Exames",
        Icon: LocalHospitalIcon
    },
    {
        amount: "500",
        label: "Consultas",
        Icon: LocalHospitalIcon
    },
    {
        amount: "2500",
        label: "Vacinas",
        Icon: LocalHospitalIcon
    },
    {
        amount: "5000kg",
        label: "Ração",
        Icon: LocalHospitalIcon
    },
    {
        amount: "2500",
        label: "Vermífugos",
        Icon: LocalHospitalIcon
    },
    {
        amount: "2500",
        label: "Antipestes",
        Icon: LocalHospitalIcon
    },
    {
        amount: "2500",
        label: "Banhos",
        Icon: LocalPharmacyIcon
    },
    {
        amount: "2500",
        label: "Tosas",
        Icon: LocalPharmacyIcon
    },
    {
        amount: "500",
        label: "Medicações",
        Icon: LocalPharmacyIcon
    },
    {
        amount: "500",
        label: "Castrações",
        Icon: LocalPharmacyIcon
    },
]

const Indicators = () => {
    return (
        <Flex column>
            <H2>INDICADORES</H2>
            <GroupContainer 
                // column
                margin="15px 0px"
            >
                { info.map((i, x) => (
                    <Indicator key={x} amount={i.amount} label={i.label} Icon={i.Icon} />
                ))}
            </GroupContainer>
        </Flex>
    )
}

export default Indicators