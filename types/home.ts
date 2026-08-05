export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

export interface LuxuryBannerData {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

export interface NewsletterData {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}
