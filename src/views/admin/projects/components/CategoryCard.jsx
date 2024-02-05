import Card from "components/card";

const SdgCategoryCard = (props) => {
  // console.log(props.colour);
  // console.log(props.number);
  // console.log(`flex flex-col w-full h-full h-[7rem] w-[17rem] rounded-md  hover:cursor-pointer hover:bg-opacity-80 ${props.colour}`);
  
  return (
    <Card
      extra={`flex flex-col w-full h-full h-[7rem] max-w-full min-w-[15rem] rounded-md bg-sdg-${props.id} hover:cursor-pointer hover:bg-opacity-80`}
    >
        <div className={`flex items-start flex-col justify-end px-5 py-3 w-full h-full ${props.colour} `}>
            <p className="text-xs font-semibold text-white dark:text-white max-w-full relative">
              {props.number}{" "}:
            </p>
            <p className="text-lg font-bold text-white dark:text-white truncate max-w-full relative">
              {props.name}{" "}
            </p>
            
        </div>
    </Card>
  );
  
};

export default SdgCategoryCard;
