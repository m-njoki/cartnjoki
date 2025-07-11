import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white mt-12 py-6 text-center text-sm border-t border-darkgray">
  <p className="font-medium">TechFlow &copy; {new Date().getFullYear()}</p>
  <p>Your trusted store for quality tech electronics.</p>
    </footer>
  );
};

export default Footer;
