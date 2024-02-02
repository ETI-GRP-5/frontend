import { FaUser } from "react-icons/fa";


const Category = () => {
  return (
    <div
      className="flex w-full flex-col rounded-md bg-cover px-2 py-2 bg-white"
    >
      <div className="text-white linear rounded-full bg-blueSecondary px-4 py-1 text-center text-base font-medium w-fit">
        SDG 1
      </div>


      <div className="w-full mt-2">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-black md:text-3xl md:leading-[38px]">
          How would you describe the community we're creating here on Tookapic?\How would you describe the community we're creating here on Tookapic?
        </h4>
      </div>



      <div className="w-full flex items-start gap-3 mt-8">
        <div className="min-w-fit flex h-10 w-10 items-center justify-center border border-black rounded-full p-1.5">
          <FaUser
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4 items-end">
            <h5 className="text-base font-bold text-navy-700 dark:text-white leading-none">
              Pawel Kadysz
            </h5>
            <p className="text-xs font-medium text-gray-300 leading-none">
              3 days ago
            </p>
          </div>
          
          <p className="mt-1 text-sm font-normal text-black">
            Imagine your friend asks you about your photography and hwy you always have your camera with you? In one sentence, how would you describe who we are and what we do here on Tookapic?
            {" "}
            Imagine your friend asks you about your photography and hwy you always have your camera with you? In one sentence, how would you describe who we are and what we do here on Tookapic?
            {" "}
            Imagine your friend asks you about your photography and hwy you always have your camera with you? In one sentence, how would you describe who we are and what we do here on Tookapic?
          </p>
        </div>
      </div>



      <div className="w-full flex items-start gap-3 mt-8">
        <div className="min-w-fit flex h-10 w-10 items-center justify-center border border-black rounded-full p-1.5">
          <FaUser
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <textarea 
            id="message" 
            rows="3" 
            class="block p-3 w-full text-sm text-black font-medium bg-gray-50 rounded-lg border border-gray-300" 
            placeholder="Type here to reply to Pawel..."
          ></textarea>

          <button type="submit" class="w-fit mt-2 inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blueSecondary rounded-lg hover:bg-brandLinear">
              Post Comment
          </button>

        </div>
      </div>



    </div>
  );
};

export default Category;
