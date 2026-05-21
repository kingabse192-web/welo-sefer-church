import React from 'react';
import GallerySection from '../components/GallerySection';
import { Language } from '../translations';

const GalleryPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-24 pb-12">
    <GallerySection lang={lang} />
  </div>
);

export default GalleryPage;
