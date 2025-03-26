'use client'

export default function Home() {


async function handleClick(e) { 
    const token = window.localStorage.getItem('token');
    const res = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "x-auth-token": token
        }
    });

    console.log("res: ", res);

    const response = res.json();

    if(res.status === 200){
        window.location.href = "/create_plan";
        console.log("response: ", response);
    }else{
        console.log("response: ", response);
    }
}

  return (
      <div className="min-h-screen p-6">
          <h1 className="text-4xl font-bold mb-10">Welcome to Vacation Planner</h1>
          <button onClick={handleClick}>Create a Plan</button>
      </div>
  );
}

{/* <a href="/create_plan" className="w-full bg-blue-600 text-white py-3 px-5 mt-5 shadow-lg rounded-lg hover:bg-blue-700 transition-colors duration-200">
Plan your trip
</a> */}
