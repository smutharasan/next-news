import { useRouter } from "next/router";
import { Toolbar } from "../../components/toolbar";
import styles from "../../styles/Feed.module.css";

export const feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  console.log(pageNumber, articles);
  return (
    <div className="page-container">
      <Toolbar></Toolbar>
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage}></img>}
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`).then(() => {
                return window.scrollTo(0, 0);
              });
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`).then(() => {
                return window.scrollTo(0, 0);
              });
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = (pageContext) => {
  const pageNumber = pageContext.query.pageid;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  return fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  )
    .then((response) => response.json())
    .then((givenNewsList) => {
      const { articles } = givenNewsList;
      return {
        props: {
          articles,
          pageNumber: Number.parseInt(pageNumber),
        },
      };
    })
    .catch((err) => {
      console.error("fetch failed ", err);
    });
};
export default feed;
