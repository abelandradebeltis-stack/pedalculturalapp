
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-20">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Pedal Cultural e Social da USJT. Todos os direitos reservados.</p>
        <p className="mt-2">Ânima Educação 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
