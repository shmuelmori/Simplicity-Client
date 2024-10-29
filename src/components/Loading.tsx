
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="w-24 h-24 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                <span className="absolute inset-0 flex items-center justify-center text-blue-500 font-semibold p-2">
                    Loading...
                </span>
            </div>
        </div>
    )
}
