import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function ErrorRouter() {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white text-center px-4">
      <div>
        <h1 className="text-9xl font-bold relative glitch" data-text="404">
          404
        </h1>
        <p className="text-2xl mt-4 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <div className="flex justify-center gap-4">
          <Button className="text-black text-lg font-bold cursor-pointer" variant="outline" onClick={() => navigate(-1)}>
            🔙 Go Back
          </Button>
          <Button className="text-white text-lg font-bold cursor-pointer" onClick={() => navigate('/')}>
            🏠 Home
          </Button>
        </div>
      </div>
    </div>
  )
}
