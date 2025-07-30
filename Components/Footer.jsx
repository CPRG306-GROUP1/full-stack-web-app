// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Internet Movies Rental Company</h3>
            <p className="text-gray-300 mb-2">Your premier destination for movie rentals and entertainment.</p>
            <p className="text-gray-300">Established 2024 - Serving movie enthusiasts worldwide.</p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="text-gray-300 space-y-2">
              <p>📍 123 Movie Street, Entertainment District</p>
              <p>📞 Phone: (555) 123-MOVIE</p>
              <p>✉️ Email: info@imrcompany.com</p>
              <p>🌐 Website: www.imrcompany.com</p>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Business Hours</h3>
            <div className="text-gray-300 space-y-2">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: 12:00 PM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 Internet Movies Rental Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer