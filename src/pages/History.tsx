import React from 'react';
import HistorySection from '../components/HistorySection';
import { Language } from '../translations';

const HistoryPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-24 pb-12">
    <HistorySection lang={lang} />
  </div>
);

export default HistoryPage;
