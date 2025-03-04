import { Helmet } from "react-helmet-async"


export const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - MC Cart`}</title>
        </Helmet>
    )
}