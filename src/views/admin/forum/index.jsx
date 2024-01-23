import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { BsChatLeftText } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";
import DiscussionCard from "components/card/DiscussionCard";

const Marketplace = () => {

  const categories = [
    {
      title: "No Poverty",
      alt: "SDG 1",
      color: "bg-[#E5243B]",
    },
    {
      title: "Zero Hunger",
      alt: "SDG 2",
      color: "bg-[#DDA83A]",
    },
    {
      title: "Good Health and Well-being",
      alt: "SDG 3",
      color: "bg-[#4C9F38]",
    },
    {
      title: "Quality Education",
      alt: "SDG 4",
      color: "bg-[#C5192D]",
    },
    {
      title: "Gender Equality",
      alt: "SDG 5",
      color: "bg-[#FF3A21]",
    },
    {
      title: "Clean Water and Sanitation",
      alt: "SDG 6",
      color: "bg-[#26BDE2]",
    },
    {
      title: "Affordable and Clean Energy",
      alt: "SDG 7",
      color: "bg-[#FCC30B]",
    },
    {
      title: "Decent Work and Economic Growth",
      alt: "SDG 8",
      color: "bg-[#A21942]",
    },
    {
      title: "Industry, Innovation and Infrastructure",
      alt: "SDG 9",
      color: "bg-[#FD6925]",
    },
    {
      title: "Reduced Inequality",
      alt: "SDG 10",
      color: "bg-[#DD1367]",
    },
    {
      title: "Sustainable Cities and Communities",
      alt: "SDG 11",
      color: "bg-[#FD9D24]",
    },
    {
      title: "Responsible Consumption and Production",
      alt: "SDG 12",
      color: "bg-[#BF8B2E]",
    },
    {
      title: "Climate Action",
      alt: "SDG 13",
      color: "bg-[#3F7E44]",
    },
    {
      title: "Life Below Water",
      alt: "SDG 14",
      color: "bg-[#0A97D9]",
    },
    {
      title: "Life on Land",
      alt: "SDG 15",
      color: "bg-[#56C02B]",
    },
    {
      title: "Peace, Justice and Strong Institutions",
      alt: "SDG 16",
      color: "bg-[#00689D]",
    },
    {
      title: "Partnerships for the Goals",
      alt: "SDG 17",
      color: "bg-[#19486A]",
    }
  ]


  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-20 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-[8px] md:flex-row md:items-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            All Discussions
          </h4>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 flex flex-col gap-y-5">
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="91"
            image={NFt3}
          />
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="7"
            image={NFt2}
          />
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="291"
            image={NFt4}
          />
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            price="91"
            image={NFt3}
          />
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            price="7"
            image={NFt2}
          />
          <DiscussionCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            price="291"
            image={NFt4}
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <div className="mb-2 mt-5 flex flex-col justify-between pl-[16px] md:items-center border-b border-black/05 w-full">
          <button className="w-full flex items-center justify-center bg-blueSecondary text-white rounded-md p-2">
            Start New Discussion
          </button>

          <div className="flex w-full flex-col gap-y-5 my-5 items-start">
            <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1">
              <span>
                <BsChatLeftText />
              </span>
              <span className="font-bold text-navy-700 dark:text-white">
                All Discussions
              </span>
              
            </button>

            <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1">
              <span>
                <BsStar />
              </span>
              <span className="font-bold text-navy-700 dark:text-white">
                Following
              </span>
              
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-col justify-between pl-[16px] md:items-center">
          <div className="flex w-full flex-col gap-y-5 my-5 items-start">
            {categories.map((category, key) => (

              <button className="flex flex-row items-center justify-start w-full gap-x-4 mx-1 whitespace-nowrap">
                <span>
                  <div className={`w-3 rounded-full ${category.color} h-3`}/>
                </span>
                <span className="font-bold text-navy-700 dark:text-white truncate">
                  {category.title}
                </span>
                </button>
            ))}
          </div>
        </div>
        
        {/* <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard /> */}
      </div>
    </div>
  );
};

export default Marketplace;
