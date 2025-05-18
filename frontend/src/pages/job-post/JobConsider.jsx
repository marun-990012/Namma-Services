function JobConsider(){
    return(
        <div className="mt-4 space-y-4 max-w-6xl mx-auto px-2">
      {[1,2,3].map((_, index) => (
        <div className="bg-gray-50 p-4 rounded-lg shadow flex items-center gap-4">
  <img
    src='https://res.cloudinary.com/dxludspye/image/upload/v1747306608/Namma-Services/rpkkgdua0dnhpt2hwstr.jpg'
    alt="Profile"
    className="w-12 h-12 rounded-full object-cover"
  />
  <div className="flex-1">
    <p className="font-semibold text-gray-800">Arun Rathod</p>
    <p className="text-sm text-gray-500">Gandhi Bazar , North Road, Basavanagudi, Vanivilas Road, VV Puram, Bengaluru - 560004, KA, India</p>
    <p className="text-sm font-medium text-gray-700">Rating 4.5</p>
  </div>
  <button className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 text-sm rounded">
    View
  </button>
</div>

      ))}
    </div>
)
}
export default JobConsider;