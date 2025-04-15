

export const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-4 pb-3 mt-auto shadow-sm">
            <div className="container">
                <div className="row">

                    {/* Brand Info */}
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">MC Cart</h5>
                        <p className="text-muted">Your one-stop shop for mobile phones and accessories.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-semibold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
                            <li><a href="/about" className="text-white text-decoration-none">About</a></li>
                            <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-semibold">Contact</h6>
                        <p className="mb-1"><i className="bi bi-envelope me-2"></i> support@mccart.com</p>
                        <p className="mb-3"><i className="bi bi-telephone me-2"></i> +91 98765 43210</p>
                        <div>
                            <a href="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-twitter fs-5"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <hr className="border-light" />
                <div className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} <strong>MC Cart</strong> — All Rights Reserved</p>
                </div>
            </div>
        </footer>

    )
}