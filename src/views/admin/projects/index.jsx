import Banner from "./components/Banner";
import NFt2 from "assets/img/nfts/Nft2.png";
import NFt4 from "assets/img/nfts/Nft4.png";
import NFt3 from "assets/img/nfts/Nft3.png";
import NFt5 from "assets/img/nfts/Nft5.png";
import NFt6 from "assets/img/nfts/Nft6.png";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import ProjectCard from "components/card/ProjectCard";
import CategoryCard from "components/card/CategoryCard";

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
    <div className="mt-3 grid h-full flex-col gap-5">
      <div className="h-fit w-full xl:col-span-1 2xl:col-span-2 overflow-x-auto">
        {/* Categories */}
        <div className="mb-5 mt-5 flex items-center justify-between px-2">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Project Categories
          </h4>
        </div>

        {/* Recently Add NFTs */}
        <div className="flex flex-row w-full overflow-x-auto gap-5" id="categories-scroll">
          {categories.map((category, key) => (
            <CategoryCard
              key={key}
              title={category.title}
              alt={category.alt}
              color={category.color}
            />
          ))}
          {/* <CategoryCard
            title="No Poverty"
            image={NFt6}
          />
          <CategoryCard
            title="Zero Hunger"
            image={NFt6}
          />
          <CategoryCard
            title="Good Health and Well-being"
            image={NFt6}
          />
          <CategoryCard
            title="Quality Education"
            image={NFt6}
          />
          <CategoryCard
            title="Gender Equality"
            image={NFt6}
          />
          <CategoryCard
            title="Clean Water and Sanitation"
            image={NFt6}
          />
          <CategoryCard
            title="Affordable and Clean Energy"
            image={NFt6}
          />
          <CategoryCard
            title="Decent Work and Economic Growth"
            image={NFt6}
          />
          <CategoryCard
            title="Industry, Innovation and Infrastructure"
            image={NFt6}
          />
          <CategoryCard
            title="Reduced Inequality"
            image={NFt6}
          />
          <CategoryCard
            title="Sustainable Cities and Communities"
            image={NFt6}
          />
          <CategoryCard
            title="Responsible Consumption and Production"
            image={NFt6}
          />
          <CategoryCard
            title="Climate Action"
            image={NFt6}
          />
          <CategoryCard
            title="Life Below Water"
            image={NFt6}
          />
          <CategoryCard
            title="Life on Land"
            image={NFt6}
          />
          <CategoryCard
            title="Peace, Justice and Strong Institutions"
            image={NFt6}
          />
          <CategoryCard
            title="Partnerships for the Goals"
            image={NFt6}
          /> */}
        </div>

        {/* NFt Header */}
        <div className="mb-4 mt-16 flex flex-col justify-between px-2 md:flex-row md:items-center">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            All Projects
          </h4>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            ppl="100"
            image={NFt3}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            ppl="100"
            image={NFt2}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            ppl="1200"
            image={NFt4}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            ppl="120"
            image={NFt4}
          />
        </div>

        {/* Recenlty Added setion */}
        <div className="mb-5 mt-16 flex items-center justify-between px-2">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Recently Joined
          </h4>
        </div>

        {/* Recently Add NFTs */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Abstract Colors"
            author="Esthera Jackson"
            ppl="0.91"
            image={NFt4}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="ETH AI Brain"
            author="Nick Wilson"
            ppl="0.7"
            image={NFt5}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            ppl="2.91"
            image={NFt6}
          />
          <ProjectCard
            bidders={[avatar1, avatar2, avatar3]}
            title="Mesh Gradients"
            author="Will Smith"
            ppl="2.91"
            image={NFt6}
          />
        </div>
      </div>

      {/* right side section */}

      {/* <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable
          extra="mb-5"
          tableData={tableDataTopCreators}
          columnsData={tableColumnsTopCreators}
        />
        <HistoryCard />
      </div> */}
    </div>
  );
};

export default Marketplace;
