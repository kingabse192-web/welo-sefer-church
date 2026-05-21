import React from 'react';
import LocationSection from '../components/LocationSection';
import { Language } from '../translations';

const LocationPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-24 pb-12">
    <LocationSection lang={lang} />
  </div>
);

export default LocationPage;
