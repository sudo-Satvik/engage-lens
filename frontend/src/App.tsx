import { Button } from "./components/ui/button"
import Register from "./pages/components/auth/Register"
import Signup from "./pages/components/auth/Signup"

function App() {


  return (
    <>
      <main>
          <h2 className="text-center text-3xl font-semibold text-blue-500">hello this is engage lens</h2>
          {/* shadcn is working as this button is from shadcn UI  */}
          <Button variant="destructive" onClick={() => alert("hello world")}>Click Me</Button>
          <div>
            <Register />
            <Signup />
          </div>
      </main>
    </>
  )
}

export default App
