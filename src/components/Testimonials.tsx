import Image, { StaticImageData } from 'next/image';

import cloudzoneLogo from '@/assets/customers/cloudzone.png';
import KavakLogo from '@/assets/customers/kavak.svg';
import lineajeLogo from '@/assets/customers/lineaje.png';
import fernandoCarlettiPhoto from '@/assets/testimonials/fernandocarletti.jpg';
import nickMistryPhoto from '@/assets/testimonials/nickmistry.jpg';
import rotemLeviPhoto from '@/assets/testimonials/rotemlevi.jpg';

const testimonials: {
  authorName: string;
  authorTitle: string;
  authorPhoto: StaticImageData;
  quote: string;
  companyName: string;
  companyLogo:
    | ((
        props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
      ) => JSX.Element)
    | StaticImageData;
}[] = [
  {
    authorName: 'Fernando Carletti',
    authorPhoto: fernandoCarlettiPhoto,
    authorTitle: 'Senior Software Engineer',
    companyName: 'Kavak',
    companyLogo: (props) => <KavakLogo {...props} />,
    quote:
      'The major ‘click’ for me was when I saw how Fix allows you to just search for all relationships for all resources. And that was magical, to be honest.',
  },
  {
    authorName: 'Nick Mistry',
    authorPhoto: nickMistryPhoto,
    authorTitle: 'CISO',
    companyName: 'Lineaje',
    companyLogo: lineajeLogo,
    quote:
      'What I like about Fix is that I can actually see the test. What is the config setting that you’re auditing, what are the results you’re looking for, and how do you determine pass or fail? When the rubber meets the road, what I want to know is: what’s the call you’re making on the API?',
  },
  {
    authorName: 'Rotem Levi',
    authorPhoto: rotemLeviPhoto,
    authorTitle: 'Security Engineer',
    companyName: 'CloudZone',
    companyLogo: cloudzoneLogo,
    quote:
      'I’ve never found use in tools that just give me an asset list. With Fix, I get filters and scenarios, like public instances with admin rights or IAM users without MFA. And then, in one click, I get the recomendation.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto -mt-10 grid max-w-2xl grid-cols-1 gap-y-10 divide-y divide-gray-900/10 sm:-mt-16 sm:gap-y-16 lg:mx-0 lg:-ml-8 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:divide-x lg:divide-y-0"
          id="testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div
              className="flex flex-col pt-10 sm:pt-16 lg:pl-8 lg:pt-0"
              key={`testimonial-${index}`}
            >
              <span className="sr-only">{testimonial.companyName}</span>
              {typeof testimonial.companyLogo === 'object' ? (
                <Image
                  src={testimonial.companyLogo}
                  className="h-10 w-auto self-start"
                  alt=""
                />
              ) : (
                <testimonial.companyLogo className="h-10 self-start" />
              )}
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-gray-900">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <Image
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src={testimonial.authorPhoto}
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-gray-900">
                      {testimonial.authorName}
                    </div>
                    <div className="mt-1 text-gray-500">
                      {testimonial.authorTitle} at {testimonial.companyName}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
