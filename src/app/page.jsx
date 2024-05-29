import Results from "@/components/Results";

import { getSession } from "@auth0/nextjs-auth0";

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const session = await getSession();

  const genre = searchParams.genre || "fetchTrending";
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "fetchTopRated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 10000 } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;

  return (
    <div>
      <Results results={results} />
      <div className="nb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl">
        {!session && <a href="/api/auth/Login">Login</a>}
        {session && <a href="/api/auth/Logout">Logout</a>}
      </div>
    </div>
  );
}
