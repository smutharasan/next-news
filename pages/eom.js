import styles from "../styles/EOM.module.css";
import { Toolbar } from "../components/toolbar";

export const EOM = ({ employee }) => {
  return (
    <div className="page-container">
      <Toolbar></Toolbar>
      <div className={styles.main}>
        <h1>Employee of the Month</h1>
        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image}></img>
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = (pageContext) => {
  return fetch(
    "https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth"
  )
    .then((response) => response.json())
    .then((employee) => {
      return {
        props: {
          employee: employee,
        },
      };
    })
    .catch((err) => {
      console.error("fetch failed ", err);
    });
};

export default EOM;
