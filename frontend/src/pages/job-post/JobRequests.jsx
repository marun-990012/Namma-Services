function JobRequests(){
    return(
        <div className="mt-5">
            {[1,2,3,4,5].map(()=>{
                return(
                    <div className="flex justify-evenly items-center bg-gray-200 py-1 rounded mt-3">
                <div className="bg-green-300 w-16 h-16 flex justify-center items-center rounded-full">
                    <img className="w-15 h-15 rounded-full" src="https://res.cloudinary.com/dxludspye/image/upload/v1747306608/Namma-Services/rpkkgdua0dnhpt2hwstr.jpg" alt="" />
                </div>
                <div className="w-30  ml-[-25px]">
                    <p>Arun Rathod</p>
                </div>
                 <div className="w-70">
                    <p>Arun Rathod Arun Rathod Arun Rathod Arun Rathod Arun Rathod Arun Rathod</p>
                 </div>
                <p>Arun Rathod</p>
                <button className="cursor-pointer bg-green-300 text-green-800 hover:bg-green-400 hover:text-black px-5 py-1 rounded">View</button>
            </div>
                )
            })}
        </div>
    )
}
export default JobRequests;