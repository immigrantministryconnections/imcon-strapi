import MemberGroup from '@/components/elements/member-group';

export default function LeadershipSection({ data }) {
  return (
    <div className="w-full text-darkBlue my-2 rounded-lg bg-lightBlue/10 p-4">
      <div className="h-full">
        <h2 className="text-xl font-bold tracking-tight sm:text-3xl sm:tracking-tight sm:text-center">
          {data.title}
        </h2>
        {data.memberGroup.map((memberGroup) => {
          return (
            <MemberGroup
              key={`membergroup-${memberGroup.title}`}
              title={memberGroup.title}
              people={memberGroup.memberInfo}
            />
          );
        })}
      </div>
    </div>
  );
}
