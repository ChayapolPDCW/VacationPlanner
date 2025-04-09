export default function Footer() {
    return (
      <footer className="bg-indigo-400 text-white py-4">
        <div className="container mx-auto mt-4 mb-4 px-6 text-center">
          <h3 className="text-lg font-bold font-gealova tracking-wider">Roamaru .</h3>
          <p className="text-sm mt-1">
            © {new Date().getFullYear()} Roamaru. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }