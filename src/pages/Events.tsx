import React from 'react';
import EventCalendar from '../components/EventCalendar';
import { Language } from '../translations';

const EventsPage: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="pt-24 pb-12">
    <EventCalendar lang={lang} />
  </div>
);

export default EventsPage;
