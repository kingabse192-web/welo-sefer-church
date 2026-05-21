import React from 'react';
import ContactSection from '../components/ContactSection';
import { Language } from '../translations';

const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-24 pb-12">
    <ContactSection lang={lang} />
  </div>
);

export default ContactPage;
