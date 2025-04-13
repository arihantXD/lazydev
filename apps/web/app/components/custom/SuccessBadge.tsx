import Check from "../icons/Check";

const SuccessBadge = ({ title }: { title: string }) => {
  return (
    <div className="px-3 py-0.5 flex gap-2 items-center border border-light-green rounded-2xl w-fit">
      <div>{title}</div>
      <span className="text-light-green font-medium leading-0">
        <Check />
      </span>
    </div>
  );
};

export default SuccessBadge;
