const UnderConstruction = ({
  title,
  decription,
}: {
  title: string;
  decription?: string;
}) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h2 className="font-semibold text-3xl bg-sky-500/20 text-sky-700 px-4 py-2 rounded-lg">
        {title}
      </h2>
      <h5 className="text-2xl text-gray-500">
        {decription ?? "Under Construction"}
      </h5>
    </div>
  );
};

export default UnderConstruction;
