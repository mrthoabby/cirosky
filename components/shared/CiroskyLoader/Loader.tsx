import defaultStyles from "./css/loader.module.css";
export default function Loader(): JSX.Element {
  return (
    <section className={defaultStyles.container}>
      <span className={defaultStyles.loader}></span>
    </section>
  );
}
