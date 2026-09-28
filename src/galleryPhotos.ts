import { Language, translations } from './translations';

export interface Photo {
  url: string;
  title: string;
  description: string;
}

export function getGalleryPhotos(lang: Language): Photo[] {
  const items = translations[lang].gallery.items;

  return [
    { url: 'galery.PNG', title: items.interior.title, description: items.interior.desc },
    { url: '1galery.PNG', title: items.icons.title, description: items.icons.desc },
    { url: '2galery.PNG', title: items.education.title, description: items.education.desc },
    { url: '3galery.PNG', title: items.procession.title, description: items.procession.desc },
    { url: 'comuniy.jpg', title: items.outreach.title, description: items.outreach.desc },
    { url: '2comuniy.jpg', title: items.youth.title, description: items.youth.desc },
    { url: '3comuniy.jpg', title: items.charity.title, description: items.charity.desc },
    { url: '5galery.PNG', title: items.blessing.title, description: items.blessing.desc },
    { url: 'hosaena galery  (1).jpg', title: items.hosaenaYouth.title, description: items.hosaenaYouth.desc },
    { url: 'hosaena galery  (2).jpg', title: items.hosaenaTeachings.title, description: items.hosaenaTeachings.desc },
    { url: 'hosaena galery  (3).jpg', title: items.hosaenaIcon.title, description: items.hosaenaIcon.desc },
    { url: 'hosaena galery  (4).jpg', title: items.hosaenaPalm.title, description: items.hosaenaPalm.desc },
    { url: 'hosaena.jpg', title: items.hosaenaCelebration.title, description: items.hosaenaCelebration.desc },
    { url: 'speritual time-1.jpg', title: items.spiritualTime.title, description: items.spiritualTime.desc },
    { url: 'best church person.jpg', title: items.bestChurchPerson.title, description: items.bestChurchPerson.desc },
    { url: 'power of together.jpg', title: items.powerOfTogether.title, description: items.powerOfTogether.desc },
    { url: 'suterday seremony.jpg', title: items.saturdayCeremony.title, description: items.saturdayCeremony.desc },
  ];
}
