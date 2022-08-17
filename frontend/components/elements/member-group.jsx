import Image from '@/components/elements/image';

export default function MemberGroup({ title, people }) {
  return (
    <div className="border-b-2 last:border-none">
      <div className="mx-auto py-8 lg:py-12">
        <div className="space-y-12">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl sm:tracking-tight">
            {title}
          </h2>

          <ul
            role="list"
            className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
          >
            {people.map((person) => (
              <li key={person.memberName}>
                <div
                  className={`space-y-4 sm:grid ${
                    person.memberImage.data
                      ? 'sm:grid-cols-3'
                      : 'sm:grid-cols-2'
                  } sm:gap-6 sm:space-y-0 lg:gap-8`}
                >
                  <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                    {!!person.memberImage.data && (
                      <Image
                        $className="object-cover shadow-lg rounded-lg"
                        media={person.memberImage}
                      />
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <div className="space-y-4">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.memberName}</h3>
                        <p className="text-mediumBlue">
                          {person.memberPosition}
                        </p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{person.memberBio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
