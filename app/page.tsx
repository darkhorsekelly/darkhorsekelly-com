import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function Home() {
  const contentDir = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(contentDir);

  const posts = filenames.map(filename => {
    const filePath = path.join(contentDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return data;
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Dark Horse Kelly</h1>
            <p className="text-lg">A Generalist Notebook</p>
        </div>
        <section>
          <h2>Posts</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <h3>{post.title}</h3>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
