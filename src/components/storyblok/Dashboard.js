import React from 'react';

import StoryblokImage from '@/components/storyblok/StoryblokImage';

const Dashboard = ({ blok }) => (
  <StoryblokImage blok={blok} picture={blok.picture} />
);

export default Dashboard;
