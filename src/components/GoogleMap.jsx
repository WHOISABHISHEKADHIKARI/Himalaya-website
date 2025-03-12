import React from 'react';

const GoogleMap = () => (
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14158.627288958289!2d84.83812968304882!3d27.47994137693333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994c90007a70f09%3A0x370a576d09ff0ad0!2sHimalaya%20Krishi%20Tatha%20Pasupalan%20Farm!5e0!3m2!1sne!2snp!4v1741707048886!5m2!1sne!2snp"
    className="w-full h-40 md:h-60"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
);

export default GoogleMap;