export const Loading = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center my-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}