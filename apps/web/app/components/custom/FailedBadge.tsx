import Cross from "../icons/Cross";

const FailedBadge = ({ title }: { title: string }) => {
  return (
    <div className="px-3 py-0.5 flex gap-2 items-center border border-primary1 rounded-2xl w-fit">
      <div>{title}</div>
      <span className="text-primary1 font-medium leading-0">
        <Cross />
      </span>
    </div>
  );
};

export default FailedBadge;
