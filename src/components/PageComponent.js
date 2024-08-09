import StoryblokRenderer from '../components/StoryblokComponent';
import { fetchStory } from '../lib/storyblok';

export default async function PageComponent({ slug }) {
  const story = await fetchStory(slug);

  if (!story || !story.content || !story.content.body) {
    return <div>Error: Story not found or content is empty</div>;
  }

  return (
    <div>
      <StoryblokRenderer story={story} />
    </div>
  );
}
