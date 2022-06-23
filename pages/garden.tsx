import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { GetStaticProps, InferGetStaticPropsType, PageConfig } from "next";
import Head from "next/head";
import Link from "next/link";
import { IntroHero } from "../components/IntroHero";
import { SkipLink } from "../components/SkipLink";

// TODO: Make each post a link to a dedicated page
// TODO: TONNES of styling, this is just a rough & ready listing for now.

export const getStaticProps: GetStaticProps = async (context) => {
  const postsDirectory = "posts/garden";
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`${postsDirectory}/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);

    return {
      slug,
      frontmatter,
      content,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default function Garden({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts);
  return (
    <>
      <Head>
        <title>Jefferson Bledsoe - Garden</title>
        <meta name="description" content="My digital garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SkipLink />

      <Link href="/">
        <a>Home</a>
      </Link>
      <main style={{ marginBlockStart: "8rem" }} id="main-content">
        <IntroHero text="Digital Garden" />

        <p>
          Welcome to my digital garden! Here is where I publish anything that
          comes to mind which might be helpful or just entertaining to future me
          or maybe even you! This page is a <b>HUGE</b> work-in-progress right
          now, but each garden 'post' I make will currenty be shown on this
          page. Expect a better browsing experience with links to full pages and
          pagination in the future as this garden grow.
        </p>

        <ul role="list" style={{}}>
          {posts.map((post) => {
            return (
              <li
                style={{
                  borderTopStyle: "solid",
                  borderTopWidth: "2px",
                  marginBlock: "80px",
                }}
                key={post.slug}
              >
                <h2>{post?.frontmatter?.title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: md().render(post.content),
                  }}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export const config: PageConfig = {
  unstable_runtimeJS: false,
};
