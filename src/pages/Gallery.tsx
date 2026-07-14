import React from 'react';
import BayWindowSlider from '../components/BayWindowSlider';
import { Language } from '../translations';

const GalleryPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-16">
    <BayWindowSlider lang={lang} />
  </div>
);

export default GalleryPage;
